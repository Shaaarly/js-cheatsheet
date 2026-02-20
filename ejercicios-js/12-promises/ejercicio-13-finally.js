// 12-promises — Ejercicio 13
// Crea una promesa que se resuelva con "ok" tras 500 ms. Encadena .then(v => console.log(v)), .catch(...) y .finally(() => console.log("listo")).
// Comprueba que finally se ejecuta siempre (también si la promesa rechaza).
// Node: node ejercicio-13-finally.js

const promesa = new Promise((resolve) => setTimeout(() => resolve("ok"), 500))
.then(v => console.log(v))
.catch(() => {})
.finally(() => console.log("listo"))

console.log(promesa)