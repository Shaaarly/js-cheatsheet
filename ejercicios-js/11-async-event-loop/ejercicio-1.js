// 11-async-event-loop — Ejercicio 1
// Orden de salida: console.log(\"a\"); setTimeout(…\"b\",0); Promise.resolve().then(…\"c\"); console.log(\"d\");
console.log("a");
setTimeout(() => console.log("b"), 0);
Promise.resolve().then(() => console.log("c"));
console.log("d");