// 12-promises — Ejercicio 10 (PokeAPI)
// Encadenamiento: primero fetch a .../pokemon?limit=5; del JSON toma la primera URL de results; segundo fetch a esa URL.
// Con el resultado muestra el nombre y base_experience del primer Pokémon de la lista.
// Node 18+: node ejercicio-10-pokeapi-encadenamiento.js
//
const BASE = "https://pokeapi.co/api/v2";


const url = `${BASE}/pokemon?limit=5`

const pokemonsData = await fetch(url)
    .then(r => r.json())
    .then(data => data.results[0].url)
    .then(url => fetch(url).then(r => r.json()))
    .then(pokemon => {
        console.log(pokemon.name, pokemon.base_experience)
    })