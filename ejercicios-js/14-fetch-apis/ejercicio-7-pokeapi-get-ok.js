// 14-fetch-apis — Ejercicio 7 (PokeAPI)
// GET a .../pokemon/25/. Si res.ok, parsea JSON y muestra name y height; si no, muestra res.status y res.statusText.
// Node 18+: node ejercicio-7-pokeapi-get-ok.js
//
const url = "https://pokeapi.co/api/v2/pokemon/25/";

const res = await fetch(url)
if (!res.ok) console.log(res.status, res.statusText);
const data = await res.json();
const pokemon = { name: data.name, height: data.height}
console.log(pokemon)