// 15-dom — Ejercicio 1
// querySelector #lista-pedidos .pedido; mostrar textContent (necesita HTML con #lista-pedidos)

const lista = document.querySelector("#lista-pedidos")
const primerPedido = lista?.querySelector(".pedido")
console.log(primerPedido?.textContent)