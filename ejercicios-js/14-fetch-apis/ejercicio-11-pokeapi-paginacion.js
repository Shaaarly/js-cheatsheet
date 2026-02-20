// 14-fetch-apis — Ejercicio 11 (PokeAPI) — Paginación
// Obtén la "página 2" de Pokémon: offset=20&limit=20. Muestra los nombres del array results.
// Node 18+: node ejercicio-11-pokeapi-paginacion.js
//
const BASE = "https://pokeapi.co/api/v2";

const res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");
const data = await res.json();
data.results.forEach(p => console.log(p.name));