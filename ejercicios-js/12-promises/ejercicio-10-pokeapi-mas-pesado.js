// 12-promises — Ejercicio 19 (PokeAPI)
// Obtén en paralelo Pokémon 1–5; muestra el de mayor weight
// Ejecutar: node ejercicio-10-pokeapi-mas-pesado.js (Node 18+)

Promise.all(
  [1, 2, 3, 4, 5].map((id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((r) => r.json())
  )
)
  .then((pokemons) => {
    const max = pokemons.reduce((a, b) => (a.weight > b.weight ? a : b));
    console.log("Más pesado:", max.name, "peso:", max.weight);
  })
  .catch(console.error);
