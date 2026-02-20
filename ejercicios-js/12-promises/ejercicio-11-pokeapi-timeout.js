// 12-promises — Ejercicio 11 (PokeAPI)
// getPokemonConTimeout(id, ms): fetch a .../pokemon/{id}/; si tarda más de ms ms, rechazar con Error("Timeout"). Usa Promise.race.
// Node 18+: node ejercicio-11-pokeapi-timeout.js
//
const BASE = "https://pokeapi.co/api/v2";

function getPokemonConTimeout(id, ms = 100) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), ms)
    )
    const fetchP = fetch(`${BASE}/pokemon/${id}/`).then(r => r.json)
    return Promise.race([fetchP, timeout])
}

console.log(getPokemonConTimeout(1, 1))