// 10-error-handling — Ejercicio 1
//
// --- Datos de partida ---
const str = '{"a": 1}';
// Prueba fallo: const str = "no es json";

let data;
try {
    data = JASON.parse(str)
} catch {
    data = { error: true }
}