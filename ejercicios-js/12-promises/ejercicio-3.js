// 12-promises — Ejercicio 3
//
// --- Datos de partida ---
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2"
];


// const datos = await Promise.all([
//   fetch(urls[0]).then(r => r.json()),
//   fetch(urls[1]).then(r => r.json())
// ])

const datos = await Promise.all(urls.map(url => fetch(url).then(r => r.json())))

console.log(datos)