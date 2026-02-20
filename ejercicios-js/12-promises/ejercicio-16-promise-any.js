// 12-promises — Ejercicio 16
// Array de 3 URLs: dos rotas y una válida (PokeAPI). Usa Promise.any para quedarte con la primera que responda.
// Si todas fallan, captura el AggregateError (.catch(e => console.log(e.name, e.errors))).
// Node 18+: node ejercicio-16-promise-any.js
//
const urls = [
  "https://url-inexistente-1.com",
  "https://url-inexistente-2.com",
  "https://pokeapi.co/api/v2/pokemon/1/"
];

const datos = Promise.any(urls.map((url) => fetch(url).then((r) => r.json())))
  .then((d) => console.log(d.name))
  .catch((e) => console.log(e.name, e.errors))

console.log(datos)