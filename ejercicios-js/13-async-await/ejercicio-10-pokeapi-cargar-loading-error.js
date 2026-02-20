// 13-async-await — Ejercicio 10 (PokeAPI) — try/catch en UI
// cargarPokemon(id): async que pone loading = true, fetch a .../pokemon/{id}/, en éxito guarda datos, en catch guarda mensaje en error, finally loading = false.
// Usa variables locales (let loading, data, error) y devuelve o muestra { loading, data, error }.
// Node 18+: node ejercicio-10-pokeapi-cargar-loading-error.js
//
const BASE = "https://pokeapi.co/api/v2";

async function cargarPokemon(id) {
    let loading = true;
    let name = null
    let error = null
    try {
        const res = await fetch(`${BASE}/pokemon/${id}`)
        if(!res.ok) throw new Error(res.status)
        name = await res.json().then(d => d.name);
    } catch (e) {
        error = e.message
    } finally {
        loading = false
    }
    return { loading, name, error}
}

const datos = await cargarPokemon(110)
console.log(datos)