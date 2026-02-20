// 12-promises — Ejercicio 15
// Crea una promesa que rechace tras 1 s con new Error("fallo"). Captúrala con .catch(e => console.log(e.message)) y devuelve en el catch el string "recuperado".
// ¿Con qué se cumple la promesa resultante? Comprueba con .then(console.log).
// Node: node ejercicio-15-promesa-rechaza.js

const promesa = new Promise((_, rejected) => setTimeout(() => rejected(new Error("fallo")), 1000))
.catch((e) => {
    console.log(e.message)
    return "recuperado"
    }
)
.then(console.log)
    