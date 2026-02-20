// 13-async-await — Ejercicio 7 (PokeAPI)
// getPokemon(nameOrId): función async que hace fetch, comprueba res.ok, devuelve res.json() o lanza Error(res.status).
// Node 18+: node ejercicio-7-pokeapi-getPokemon.js
//
const BASE = "https://pokeapi.co/api/v2";


async function getPokemonConTimeout(nameOrId) {
    const res = await fetch(`${BASE}/pokemon/${nameOrId}`)
    if (!res.ok) throw new Error(res.status)
    return res.json()
}

const datos = getPokemonConTimeout(122).then(d => d.name).then(console.log)