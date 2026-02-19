// 06-objects — Ejercicio 4
//
// --- Datos de partida ---
const defaults = { tema: "light", idioma: "es" };
const config = { idioma: "en" };

const nuevaConfig = { ...defaults, ...config}

console.log(nuevaConfig)