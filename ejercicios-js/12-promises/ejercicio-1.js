// 12-promises — Ejercicio 1
// Promesa que resuelve en 1s con \"listo\"; .then(console.log)

const promesa = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Listo");
    }
    , 1000)
}).then(console.log)