// 12-promises — Ejercicio 20 (PokeAPI)
// Fetch .../pokemon?limit=1 → toma URL del primer resultado → fetch a esa URL → del Pokémon obtén species.url → fetch a esa URL → muestra name de la especie.
// Node 18+: node ejercicio-20-pokeapi-primera-especie.js
//
const BASE = "https://pokeapi.co/api/v2/pokemon?limit=1";


const datos = fetch(BASE)
    .then(r => r.json())
    .then(d => fetch(d.results[0].url))
    .then(r => r.json())
    .then(pd => fetch(pd.species.url))
    .then(r => r.json())
    .then(d => console.log(d.name))
    .catch(console.error)