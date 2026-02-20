// 12-promises — Ejercicio 2
// Implementa delay(ms) que devuelva una promesa que se cumpla tras ms milisegundos.

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve("Delay de " + ms + "ms"), ms)).then(console.log)
}

delay(1000)