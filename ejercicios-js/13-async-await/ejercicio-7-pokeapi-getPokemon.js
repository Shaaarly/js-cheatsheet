// 13-async-await — Ejercicio 7 (PokeAPI)
// getPokemon(nameOrId): async que hace fetch y devuelve el objeto o lanza si !res.ok
// Ejecutar con: node ejercicio-7-pokeapi-getPokemon.js (Node 18+)

const BASE = "https://pokeapi.co/api/v2";

async function getPokemon(nameOrId) {
  const res = await fetch(`${BASE}/pokemon/${nameOrId}/`);
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

getPokemon("pikachu")
  .then((p) => console.log(p.name, p.weight))
  .catch((e) => console.error(e));
