// 13-async-await — Ejercicio 8 (PokeAPI)
// Primeros N en paralelo: fetch a .../pokemon?limit=n, extrae URLs de results, Promise.all a cada URL; devuelve array con nombre y weight.
// Node 18+: node ejercicio-8-pokeapi-paralelo.js
//
const BASE = "https://pokeapi.co/api/v2";


async function getNPokemons(n) {
    const res = await fetch(`${BASE}/pokemon?limit=${n}`)
    if (!res.ok) throw new Error(res.status)
    const data = await res.json()
    const urls = data.results.map(p => p.url)
    const pokemons = await Promise.all(urls.map(url => fetch(url).then(r => r.json())))
    return pokemons.map(p => ({ name: p.name, weight: p.weight }))
}

const pokemons = await getNPokemons(6)

console.log(pokemons)