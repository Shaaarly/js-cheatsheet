// 12-promises — Ejercicio 7 (PokeAPI)
// Fetch a .../pokemon/1/, muestra nombre y tipos. Usa then/catch.
// Ejecutar con: node ejercicio-7-pokeapi-then-catch.js (Node 18+)

const BASE = "https://pokeapi.co/api/v2";

fetch(`${BASE}/pokemon/1/`)
  .then((r) => r.json())
  .then((data) => {
    console.log("Nombre:", data.name);
    console.log("Tipos:", data.types.map((t) => t.type.name));
  })
  .catch((err) => console.error(err));
