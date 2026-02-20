// 12-promises — Ejercicio 9 (PokeAPI)
// Promise.allSettled: fetch a .../pokemon/1/, .../pokemon/9999/ (puede fallar) y .../pokemon/pikachu.
// Separa resultados exitosos y fallidos; para los exitosos muestra el nombre.
// Node 18+: node ejercicio-9-pokeapi-allSettled.js
//
const BASE = "https://pokeapi.co/api/v2";

const urls = [
    `${BASE}/pokemon/1`,
    `${BASE}/pokemon/1231`,
    `${BASE}/pokemon/231`,
    `${BASE}/pokemon/61411`,
    `${BASE}/pokemon/21`,
]

const resultados = await Promise.allSettled(
    urls.map(url => fetch(url).then(r => r.json()))
).then(
    results => {
        const ok = results.filter(r => r.status === "fulfilled").map(p => p.value.name)
        const rejected = results.filter(r => r.status === "rejected").map(p => p.reason)
        return { ok, rejected}
    }
)

console.log(resultados)

 