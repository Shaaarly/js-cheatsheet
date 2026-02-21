// 15-dom — Ejercicio 3
// #formulario: addClass cargando; setTimeout 2s; removeClass cargando

const formulario = document.querySelector("#formulario")
formulario.classList.add("cargando")
setTimeout(() => formulario.classList.remove("cargando"), 2000)