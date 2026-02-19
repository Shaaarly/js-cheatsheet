// 06-objects — Ejercicio 5
//
// --- Datos de partida ---
const obj = { a: 5, b: 15, c: 3, d: 20 };

const valores = Object.fromEntries(
    Object.entries(obj).filter(([, v]) => typeof v === "number" && v > 10)
)

console.log(valores)