// 12-promises — Ejercicio 19 (PokeAPI)
// Obtén en paralelo los Pokémon con id 1, 2, 3, 4, 5. Con then (sin await), encuentra el de mayor weight y muestra su nombre y peso.
// Node 18+: node ejercicio-19-pokeapi-mas-pesado.js
//
const BASE = "https://pokeapi.co/api/v2/pokemon/";

const ids = [
    1,
    2,
    3,
    4,
    5,
]

// const pokemonMasPesado = urls.map(url => fetch(url).then(r => r.json()).then(p => Math.max(p.weight)).then(console.log))

// console.log(pokemonMasPesado)

Promise.all(ids.map((id) =>
    fetch(`${BASE}${id}`).then(r => r.json())
))
    .then((pokemons) => {
        const max = pokemons.reduce((a, b) => (a.weight > b.weight ? a : b))
        console.log(max.name, max.weight)
    })
    .catch(console.error)
