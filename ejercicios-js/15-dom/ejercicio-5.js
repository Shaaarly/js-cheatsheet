// 15-dom — Ejercicio 5
//
// --- Datos de partida ---
const items = ["A", "B", "C"];

const div = document.querySelector("#contenedor-lista")
const ul = document.createElement("ul")

items.map(i => {
    const li = document.createElement("li")
    li.textContent = i
    ul.append(li)
})

div.append(ul)