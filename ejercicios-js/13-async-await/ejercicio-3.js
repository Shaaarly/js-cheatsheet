// 13-async-await — Ejercicio 3
// Dentro de una función async, captura el error si await fetch(...) falla (red o 404). Usa try/catch.
//
const url = "https://pokeapi.co/api/v2/pokemon/19/"; // puede fallar 404


async function datos() {
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(res.status)
        return await res.json()
    } catch (e) {
        console.error(e)
    }
}

datos().then(console.log)