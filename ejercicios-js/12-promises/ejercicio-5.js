// 12-promises — Ejercicio 5
// Con Promise.allSettled, procesa un array de promesas y devuelve { exitosas: [], fallidas: [] } con valores y razones.
//
// --- Datos de partida ---
const promesas = [
  Promise.resolve(1),
  Promise.reject(new Error("fallo")),
  Promise.resolve(3)
];
