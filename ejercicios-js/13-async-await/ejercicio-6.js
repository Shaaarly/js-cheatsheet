// 13-async-await — Ejercicio 6
// Dado un array de IDs, obtén cada recurso en paralelo y devuelve array de resultados (solo los que se resuelvan; si uno falla, no romper todo). Usa Promise.allSettled.
//
const BASE = "https://pokeapi.co/api/v2/pokemon";
const ids = [1, 2, 99999, 4];
// fetchItem(id) puede ser: (id) => fetch(`${BASE}/${id}/`).then(r => r.json())

async function devolverArray() {
    const resultados = await Promise.allSettled(
        ids.map(id => fetch(`${BASE}/${id}`).then(r => r.json()))
    )
    return resultados.filter(r => r.status === "fulfilled").map(d => d.value.name)

}


devolverArray().then(console.log)