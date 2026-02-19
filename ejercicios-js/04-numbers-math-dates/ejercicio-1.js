// 04-numbers-math-dates — Ejercicio 1
//
// --- Datos de partida ---
const str = "19.99";
// Prueba también "abc", ""

const str = "19.99"


function aNumero(str) {
    const n = Number(str)
    return Number.isFinite(n) ? n : 0;
}

console.log(aNumero(str))