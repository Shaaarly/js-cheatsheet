// 16-events — Ejercicio 1
// Listener en botón: click → console.log(e.target.textContent) (necesita HTML con botón)

const section = document.querySelector("section[aria-labelledby='titulo-ej1']")
section.addEventListener("click", (e) => {
    const button = e.target.closest("button")
    if(!button) return
    console.log("click", e.target.textContent)
})