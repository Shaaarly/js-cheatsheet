// 13-async-await — Ejercicio 1
// Convierte esta función a async/await (misma lógica, sin .then).
//
// --- Función a convertir ---
// function get() { return fetch("/api/data").then(r => r.json()); }

// async function get() {
//     try {
//         const res = await fetch("/api/data")
//         if(!res.ok) throw new Error(res.statusText)
//         const data = await res.json()
//         return data
//     } catch (e) {
//         console.error(e.message)
//     }
// }

const url = "https://pokeapi.co/api/v2/pokemon/1";

async function get(url) {
    const res = await fetch(url)
    return res.json();
}
console.log(get(url).then(data => console.log(data)))