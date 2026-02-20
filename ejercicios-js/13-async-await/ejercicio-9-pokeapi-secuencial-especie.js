// 13-async-await — Ejercicio 9 (PokeAPI) — Secuencial con dependencia
// Obtén .../pokemon?limit=3; con la primera URL de results haz segundo fetch; de ese Pokémon obtén species.url; tercer fetch a esa URL.
// Muestra el nombre del Pokémon y el name de la especie (species).
// Node 18+: node ejercicio-9-pokeapi-secuencial-especie.js
//
const BASE = "https://pokeapi.co/api/v2";

async function obtenerEspecie() {
    const res = await fetch(`${BASE}/pokemon?limit=3`)
    if(!res.ok) throw new Error(res.status)
    const list = await res.json()
    const firstUrl = list.results[0].url
    const pokemonRes = await fetch(firstUrl)
    const pokemon = await pokemonRes.json()
    const speciesRes = await fetch(pokemon.species.url)
    const species = await speciesRes.json();
    console.log(pokemon.name, species.name)

    // .then(d => d.results[0].url)
    // .then(url => fetch(url))
    // .then(r => r.json())
    // .then(d => fetch(d.species.url))
    // .then(r => r.json())
    // .then(d => d.name)
    // .then(console.log)

}

obtenerEspecie()