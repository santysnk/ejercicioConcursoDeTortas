import * as rs from 'readline-sync'
/*
### ¡Gran Concurso de Tortas de Tres Arroyos! 🎂

Te toca ser jurado de un concurso de tortas, y el número de participantes puede variar. 
Tu tarea es pedir al usuario cuántos concursantes habrá y luego solicitar las puntuaciones de `Sabor`, `Presentación` y `Dificultad` 
para cada torta. Al final, debes determinar qué torta tiene el mayor puntaje. 

Y si hay empate? 🤔 En ese caso, informaremos que se produjo un empate 
(no es necesario indicar si fueron dos o mas empates ni entre que tortas es el empate, 
solo basta con indicar que se produjo empate si al menos existe uno).

## Funciones a implementar:
calcularPuntaje(sabor, presentacion, dificultad):
Recibe tres números entre 1 y 5 que representan las puntuaciones de una torta y devuelve la suma de esos números (el puntaje total del pastel).

determinarGanador():
Utiliza la librería readline-sync para pedir al usuario el número de participantes, luego solicita las puntuaciones de cada uno de ellos 
y usa la función calcularPuntaje para determinar la torta con el mayor puntaje.

*Si lo consideran necesario, pueden implementar funciones extra.
*/

console.clear()
console.log(" CONCURSO DE TORTAS");
console.log("---------------------");

const critSabor: string = "Sabor";
const critPresen: string = "Presentacion";
const critDifi: string = "Dificultad";

let cantConcursantes: number = rs.questionInt("ingrese la cantidad de participantes: ")
let participanteGanador:number=0;
let puntGanador:number=0;
let hayEmpate:boolean = false;

console.clear()
console.log(`La competencia tiene: ${cantConcursantes} participantes!!, se debe evaluar de cada uno de ellos \
           \ncon una puntuacion de 1 a 5: sabor, presentacion y dificultad`);
console.log("---------------------------------------------------------------------------------\n");

let comprobarPuntaje = (compPuntaje:number,nomCrit:string):number => {
    //Funcion para validar que la nota se encuentre entre 0 y 5
    while(compPuntaje < 0 || compPuntaje > 5){
        compPuntaje = rs.questionInt(`Ingrese un puntaje valido (entre 0 y 5), para ${nomCrit}: `)
    }
    return compPuntaje
}

let criterio = (nomCrit:string) : number => {
    /*Funcion para asignar por teclado la nota a cada criterio. se crea variable puntaje y se llama a la funcion
    comprobarPuntaje para comprobar que la nota este entre el rango deseado, tambien se pasa el nombre del criterio 
    que es una constante, solo para ser mas especifico por consola.*/
    let puntaje = comprobarPuntaje(rs.questionInt(`Ingrese puntaje de ${nomCrit}: `),nomCrit);
    return puntaje
}

let calcularPuntaje = (sabor:number, presentacion:number, dificultad:number): number =>{
    //Esta funcion toma los 3 puntajes ingresados antes, los suma y los retorna 
    let sumaPuntajes:number = sabor+presentacion+dificultad;
    return sumaPuntajes
}

let comprobarGanador = (participante:number,puntajeParticipante:number):void => {
    /*Funcion que toma el numero del participante y su nota. inicialmente se almacenan en variables inicializadas en 0,
    y luego se compara por cada participante, si hay una nota mayor, estos datos se reemplazan por los nuevos. 
    Ademas se comprueba el caso de notas iguales, y si es que hay empate, se modifica la variable hayEmpate, para indicarlo luego.*/

    if (puntajeParticipante > puntGanador){
        puntGanador = puntajeParticipante;
        participanteGanador = participante;
        hayEmpate = false;
    }else if (puntajeParticipante === puntGanador){
        hayEmpate = true;
        console.log("")
    }
}

for ( let i:number = 1;i <= cantConcursantes;i++ ){
    console.log(`Puntajes del participante: ${i}`);
    console.log("-----------------------------");
    let puntajeSabor:number = criterio(critSabor);              
    let puntajePresentacion:number = criterio(critPresen);        
    let puntajeDificultad:number = criterio(critDifi);           
    let puntuacionFinal:number = calcularPuntaje(puntajeSabor,puntajePresentacion,puntajeDificultad);
    console.log("\n+---------------------------------------------+");
    console.log(`| El puntaje del participante ${i} es de: ${puntuacionFinal} !!! |`);
    console.log("+---------------------------------------------+\n");
    comprobarGanador(i,puntuacionFinal);
}

if (hayEmpate){
    console.log(`Se ha producido un empate en el primer puesto!!! \nhay dos participantes con el mismo puntaje: ${puntGanador}.`);
    console.log("------------------------------------------------");
}else{
    console.log(`TENEMOS UN GANADOR !!!`);
    console.log("----------------------");
    console.log(`El ganador es el participante ${participanteGanador}, con un puntaje de ${puntGanador}. `);
}




