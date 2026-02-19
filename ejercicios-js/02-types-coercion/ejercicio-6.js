// 02-types-coercion — Ejercicio 6
//
// --- Datos de partida ---
const obj = {};
// Prueba también: null, undefined, { a: 1 }

function esObjetoVacio(obj) {
    if(obj == null || typeof obj !== "object" ) return false;
    return Object.keys(obj).length === 0
}

esObjetoVacio(obj);