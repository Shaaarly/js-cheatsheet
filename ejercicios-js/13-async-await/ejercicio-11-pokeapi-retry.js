// 13-async-await — Ejercicio 11 (PokeAPI) — retry con fetch
// Implementa retry(fn, n) que ejecute la función async fn hasta éxito o n intentos. Úsala para intentar 3 veces fetch("https://pokeapi.co/api/v2/pokemon/1/").then(r => r.json()).
// Node 18+: node ejercicio-11-pokeapi-retry.js
//
const BASE = "https://pokeapi.co/api/v2";

async function retry(fn, n) {
    for(let i = 0; i < n; i++) {
        try {
            return await fn()
        } catch (e) {
            if( i === n - 1) throw e;
        }
    }
}

const p = await retry(
    () => fetch(`${BASE}/pokemon/1`).then(r=> r.json()),
    3
)

console.log(p)