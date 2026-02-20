// 14-fetch-apis — Ejercicio 4
// Añade un timeout de 4 segundos a un fetch usando AbortController (signal en options; setTimeout + controller.abort()).
//
const url = "https://pokeapi.co/api/v2/pokemon/1/";

const controller = new AbortController();
const t = setTimeout(() => controller.abort(), 4000)
const res = await fetch(url, {signal: controller.signal})
clearTimeout(t)