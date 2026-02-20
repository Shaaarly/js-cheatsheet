// 12-promises — Ejercicio 8 (PokeAPI)
// Promise.all: obtén en paralelo los Pokémon con id 1, 4 y 7. Muestra nombre (o el objeto) de cada uno.
// Node 18+: node ejercicio-8-pokeapi-promise-all.js
//
const BASE = "https://pokeapi.co/api/v2";
const ids = [1, 4, 7];


const datos = await Promise.all(
    ids.map(id => 
        fetch(`${BASE}/pokemon/${id}/`).then(r => r.json())
    )
).then(pokemons => pokemons.map(p => ({ name: p.name})))

console.log(datos)