// 14-fetch-apis — Ejercicio 7 (PokeAPI)
// GET a .../pokemon/25/; si res.ok muestra name y height, si no status y statusText
// Ejecutar con: node ejercicio-7-pokeapi-get-ok.js (Node 18+)

const url = "https://pokeapi.co/api/v2/pokemon/25/";

fetch(url).then((res) => {
  if (res.ok) {
    return res.json().then((data) => {
      console.log("Nombre:", data.name, "Altura:", data.height);
    });
  }
  console.log("Error:", res.status, res.statusText);
});
