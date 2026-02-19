// 12-promises — Ejercicio 18 (PokeAPI)
// Fetch .../pokemon?limit=20, devuelve array de nombres (results[].name)
// Ejecutar: node ejercicio-9-pokeapi-lista-nombres.js (Node 18+)

fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
  .then((r) => r.json())
  .then((data) => data.results.map((p) => p.name))
  .then(console.log)
  .catch(console.error);
