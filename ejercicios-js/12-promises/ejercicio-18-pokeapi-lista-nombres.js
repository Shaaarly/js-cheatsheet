// 12-promises — Ejercicio 18 (PokeAPI)
// Con then/catch: fetch a .../pokemon?limit=20, parsea JSON y devuelve solo un array de nombres (results[].name).
// Node 18+: node ejercicio-18-pokeapi-lista-nombres.js
//
const BASE = "https://pokeapi.co/api/v2";

const url = `${BASE}/pokemon?limit=20`;

const nombrePokemons = fetch(url).then(r => r.json()).then(d => d.results.map(n => n.name)).then(console.log)