// 12-promises — Ejercicio 4
// Promise.race entre fetch(url) y timeout 3s

function fetchConTimeout(url) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout")), 3000)
        )
    ]);
}