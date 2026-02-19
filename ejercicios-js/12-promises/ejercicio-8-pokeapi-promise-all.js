// 12-promises — Ejercicio 8 (PokeAPI)
// Promise.all: obtén en paralelo los Pokémon con id 1, 4 y 7.
// Ejecutar con: node ejercicio-8-pokeapi-promise-all.js (Node 18+)

const BASE = "https://pokeapi.co/api/v2";
const ids = [1, 4, 7];

Promise.all(
  ids.map((id) =>
    fetch(`${BASE}/pokemon/${id}/`).then((r) => r.json())
  )
)
  .then((pokemons) => {
    pokemons.forEach((p) => console.log(p.name));
  })
  .catch((err) => console.error(err));
