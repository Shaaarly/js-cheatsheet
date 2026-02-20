// 14-fetch-apis — Ejercicio 10 (PokeAPI) — Timeout con AbortController
// fetchPokemonConTimeout(id, ms): GET a .../pokemon/{id}/ con timeout de ms; si expira, rechaza con Error("Timeout"). Usa AbortController + setTimeout + signal.
// Node 18+: node ejercicio-10-pokeapi-timeout-abort.js
//
const BASE = "https://pokeapi.co/api/v2";

async function fetchPokemonConTimeout(id, ms) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(res.status);
    return res.json();
  } catch (e) {
    if (e.name === "AbortError") throw new Error("Timeout");
    throw e;
  }
}

const pokeData = await fetchPokemonConTimeout(4, 400)
console.log(pokeData)