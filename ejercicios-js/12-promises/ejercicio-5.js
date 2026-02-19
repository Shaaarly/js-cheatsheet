// 12-promises — Ejercicio 5
//
// --- Datos de partida ---
const promesas = [
  Promise.resolve(1),
  Promise.reject(new Error("fallo")),
  Promise.resolve(3)
];


const resultados = await Promise.allSettled(promesas);
const exitosas = resultados.filter(r => r.status === "fulfilled").map(r => r.value)
const fallidas = resultados.filter(r => r.status === "rejected").map(r => r.reason)
console.log( { exitosas, fallidas })