// 03-strings — Ejercicio 2
//
// --- Datos de partida ---
const str = "hola mundo";

function capitalizar(str) {
    if(!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

console.log(capitalizar("manoLito esCOBAR"))