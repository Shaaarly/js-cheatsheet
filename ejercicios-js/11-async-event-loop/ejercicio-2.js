// 11-async-event-loop — Ejercicio 2
// Orden: 1, Promise.then(2), setTimeout(3), 4
console.log(1);
Promise.resolve().then(() => console.log(2));
setTimeout(() => console.log(3), 0);
console.log(4);