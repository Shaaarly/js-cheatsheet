// 14-fetch-apis — Ejercicio 1
// GET a la URL; devolver JSON solo si res.ok; si no, lanzar Error(res.status).
//
const url = "https://pokeapi.co/api/v2/pokemon/1/";

const res = await fetch("/api/pedidos/1")
if(!res.ok) throw new Error(res.status)
return res.json()