// 16-events — Ejercicio 5
// Input búsqueda: input → #caracteres con número de caracteres sin espacios (necesita HTML)

const span = document.getElementById("caracteres")
const input = document.getElementById("busqueda")

input.addEventListener("input", (e) => {
    span.textContent = e.target.value.replace(/\s/g, "").length
})