// 14-fetch-apis — Ejercicio 12 (PokeAPI)
// Helper pokeApi(path): GET a base + path, res.ok → json, si no → throw
// Ejecutar con: node ejercicio-8-pokeapi-helper.js (Node 18+)

const BASE = "https://pokeapi.co/api/v2";

async function pokeApi(path) {
  const res = await fetch(`${BASE}/${path}`);
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

pokeApi("pokemon/1")
  .then((p) => console.log(p.name))
  .catch(console.error);

pokeApi("pokemon?limit=3")
  .then((data) => console.log(data.results.map((r) => r.name)))
  .catch(console.error);
