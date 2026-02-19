// 05-arrays — Ejercicio 6
//
// --- Datos de partida ---
const anidado = [[1, 2], [3, 4], [5]];
const arrays = [[1,2],[3,4],[5]]

const array = arrays.flat().reduce((acc, a) => acc + a, 0)

console.log(array)