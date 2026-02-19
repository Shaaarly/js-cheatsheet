// 03-strings — Ejercicio 3
//
// --- Datos de partida ---
const csv = "item1, item2, item3";

const string = "item1, item2, item3"

const array = string.split(",").map(s => s.trim());

console.log(array)