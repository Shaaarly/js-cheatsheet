// 12-promises — Ejercicio 12 (PokeAPI)
// getPokemonOCache(id): si id === 0 devuelve Promise.resolve({ name: "placeholder" }) sin fetch;
// en otro caso fetch a .../pokemon/{id}/ y devuelve el JSON.
// Node 18+: node ejercicio-12-pokeapi-cache.js
//
const BASE = "https://pokeapi.co/api/v2";

function getPokemonOCache(id) {
    if (id === 0) return Promise.resolve({ name: "placeholder" });
    return fetch(`${BASE}/pokemon/${id}`).then(r => r.json());
}

console.log(getPokemonOCache(0))