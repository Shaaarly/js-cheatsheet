// 14-fetch-apis — Ejercicio 12 (PokeAPI)
// Helper pokeApi(path): GET a https://pokeapi.co/api/v2/${path}; si res.ok devuelve res.json(), si no throw Error(res.status).
// Ejemplo de uso: pokeApi("pokemon/1"), pokeApi("pokemon?limit=5")
// Node 18+: node ejercicio-8-pokeapi-helper.js
//
const BASE = "https://pokeapi.co/api/v2";
