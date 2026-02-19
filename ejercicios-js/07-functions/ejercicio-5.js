// 07-functions — Ejercicio 5
// Sin datos: mapWith(fn) que devuelve (arr) => arr.map(fn)

const mapWith = (fn) => (arr) => arr.map(fn);

const porDos = mapWith(x => x*2);
console.log(porDos([1, 2, 3]))