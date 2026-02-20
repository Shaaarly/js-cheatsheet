// 14-fetch-apis — Ejercicio 5
// Obtén la segunda página de resultados: query params page=2, limit=10 (o offset/limit según la API).
//
const baseUrl = "https://pokeapi.co/api/v2/pokemon";
// Ejemplo: ?offset=20&limit=10 para "página 2" de 10 resultados

const res = await fetch("/api/items?page=2&limit=10")
const data = await res.json()