// 14-fetch-apis — Ejercicio 9 (PokeAPI) — Headers
// GET a .../pokemon/1/ añadiendo en options headers: { "Accept": "application/json" }. Parse JSON y muestra name.
// Node 18+: node ejercicio-9-pokeapi-headers.js
//
const BASE = "https://pokeapi.co/api/v2";

const res = await fetch("https://pokeapi.co/api/v2/pokemon/1/", {
  headers: { Accept: "application/json" }
});
const data = await res.json();
console.log(data)