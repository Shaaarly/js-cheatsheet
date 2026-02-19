// 04-numbers-math-dates — Ejercicio 4
//
// --- Datos de partida ---
const d = new Date();

function primerDiaDelMes(d) {
    const r = new Date(d)
    r.setDate(1)
    return r;
}

console.log(primerDiaDelMes("2026-03-05"))