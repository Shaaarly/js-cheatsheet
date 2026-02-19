// 10-error-handling — Ejercicio 4
// parsearNumero(str) que lance si !Number.isFinite(Number(str))

function parsearNumero(str) {
    const n = Number(str);
    if (!Number.isFinite(n)) throw new Error("No es un número válido");
    return n;
}