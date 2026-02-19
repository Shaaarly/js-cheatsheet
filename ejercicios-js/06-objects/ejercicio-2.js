// 06-objects — Ejercicio 2
//
// --- Datos de partida ---
const obj = { a: 1, b: 2, c: 3 };
const claves = ["a", "c"];

function tieneTodasLasClaves(obj, claves) {
       return claves.every(c => Object.hasOwn(obj, c))
}


console.log(tieneTodasLasClaves(obj, claves))