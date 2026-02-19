// 13-async-await — Ejercicio 8 (PokeAPI)
// Primeros N en paralelo: fetch lista, luego Promise.all a cada URL
// Ejecutar con: node ejercicio-8-pokeapi-paralelo.js (Node 18+)

const BASE = "https://pokeapi.co/api/v2";

async function getPrimerosN(n) {
  const res = await fetch(`${BASE}/pokemon?limit=${n}`);
  const data = await res.json();
  const urls = data.results.map((p) => p.url);
  const pokemons = await Promise.all(
    urls.map((url) => fetch(url).then((r) => r.json()))
  );
  return pokemons.map((p) => ({ name: p.name, weight: p.weight }));
}

getPrimerosN(5).then(console.log).catch(console.error);
