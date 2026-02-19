// 01-basics — Ejercicio 1: Variables (const/let, mutación)
//
// --- Datos de partida ---
const config = { maxReintentos: 3 };
let contador = 0;

// for (let i = 0; i < config.maxReintentos; i++) {
//     contador++
//     console.log("Intento: ", contador)
// }

while ( contador < config.maxReintentos ) {
    contador ++
    console.log("Intento: ", contador)
}
config = {}
config.maxReintentos = 5;
console.log(config.maxReintentos)
