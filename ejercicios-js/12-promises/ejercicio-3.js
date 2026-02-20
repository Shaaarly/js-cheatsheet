// 12-promises — Ejercicio 3
// Dado un array de URLs, usa Promise.all para hacer fetch a todas y devolver array de resultados (JSON).
// ¿Qué pasa si una petición falla?
//
// --- URLs de ejemplo ---
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2"
];

const datos = await Promise.all(urls.map(url => fetch(url).then(r => r.json())))

console.log(datos)