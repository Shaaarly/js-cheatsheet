// 16-events — Ejercicio 2
// Form #pedido: submit preventDefault; FormData; console.log Object.fromEntries (necesita HTML)

const form = document.getElementById("pedido")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    // console.log({name: e.target[0].value, cantidad: e.target[1].value, notas: e.target[2].value})
    const fd = new FormData(e.target)
    console.log(Object.fromEntries(fd))
})