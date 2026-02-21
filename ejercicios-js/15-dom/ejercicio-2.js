// 15-dom — Ejercicio 2
// createElement button \"Añadir\", clase btn btn-primary; append a #acciones

const div = document.getElementById("acciones")
const button = document.createElement("button")
button.textContent = "Añadir"
button.className = "btn btn.primary"
div.append(button)