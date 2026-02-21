// 15-dom — Ejercicio 6
// DocumentFragment con 3 div.card; append fragment a contenedor

const div = document.querySelector("#contenedor-cards")

const fragment = document.createDocumentFragment()
for (let i = 0; i < 3; i++) {
    const el = document.createElement("div")
    el.classList.add("card")
    fragment.append(el)
}

div.append(fragment)