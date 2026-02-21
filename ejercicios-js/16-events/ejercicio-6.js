// 16-events — Ejercicio 6
// select change: mostrar value y textContent de la opción elegida (necesita HTML)


const select = document.getElementById("select-ej6")

select.addEventListener("change", (e) => {
    console.log(e.target.value, e.target.options[e.target.selectedIndex].textContent)
    // const opt = e.target.options[e.target.selectedIndex];
    // console.log(opt.value, opt.textContent);
})