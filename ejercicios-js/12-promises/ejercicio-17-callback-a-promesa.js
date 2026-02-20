// 12-promises — Ejercicio 17
// delayCallback(ms, callback): estilo Node, callback(err, resultado); tras ms ms llama callback(null, "listo").
// Escribe esa función y envuélvela en otra que devuelva una Promise (sin async/await). Ejemplo: delayPromise(1000).then(console.log).
// Node: node ejercicio-17-callback-a-promesa.js

function delayCallback(ms, callback) {
    const timeout = setTimeout(() => callback(null, "listo"), ms)
}

function delayPromise(ms) {
    return new Promise((resolve, reject) => {
        delayCallback(ms, (err, resultado) => {
            if (err) reject(err);
            else resolve(resultado)
        })
    })
}


console.log(delayPromise(5000))