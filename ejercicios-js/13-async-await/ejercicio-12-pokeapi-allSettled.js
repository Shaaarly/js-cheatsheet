// 13-async-await — Ejercicio 12 (PokeAPI) — Paralelo + allSettled
// Recibe array de ids [1, 2, 99999, 4] (uno puede fallar). Usa Promise.allSettled; devuelve solo los Pokémon que se cargaron bien (array con al menos { name }).
// Node 18+: node ejercicio-12-pokeapi-allSettled.js
//
const BASE = "https://pokeapi.co/api/v2";
const ids = [1, 2, 99999, 4];

async function pokemonsResolved() {
    const promesas = await Promise.allSettled(
        ids.map(id => fetch(`${BASE}/pokemon/${id}`).then(r => r.json()))
    )
    const pokemonNames = promesas.filter(p => p.status === "fulfilled").map(r => r.value.name)
    return { pokemonNames }
}

const pokemons = await pokemonsResolved()
console.log(pokemons)