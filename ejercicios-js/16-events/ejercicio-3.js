// 16-events — Ejercicio 3
// Delegación en #items: click en li → mostrar data-id (necesita ul#items con li[data-id])

const ul = document.getElementById("items")
ul.addEventListener("click", (e) => {
    const li = e.target.closest("li")
    if(!li) return
    console.log(li.dataset.id)
})