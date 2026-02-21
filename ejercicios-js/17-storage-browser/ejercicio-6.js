// 17-storage-browser — Ejercicio 6
// addEventListener \"storage\": si key === \"carrito\", actualizar contador con length de JSON.parse(newValue) (navegador)
window.addEventListener("storage", (e) => {
  if (e.key === "carrito") {
    const items = JSON.parse(e.newValue ?? "[]");
    document.querySelector("#contador").textContent = items.length;
  }
});