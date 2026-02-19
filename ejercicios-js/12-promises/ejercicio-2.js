// 12-promises — Ejercicio 2
// delay(ms) que devuelve promesa cumplida tras ms

// function delay(ms) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Resuelto")
//         }, ms)
//     }).then(console.log)
// }

function delay(ms) {
    return new Promise((resolve) => setTimeout(() => resolve("Completado!"), ms))
    .then(console.log)
}


delay(3000)