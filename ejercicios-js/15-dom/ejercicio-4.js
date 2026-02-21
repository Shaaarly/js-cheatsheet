// 15-dom — Ejercicio 4
//
// --- Datos de partida ---
const pedido = { id: 42, total: 99 };

const div = document.querySelector("#pedido-card")
div.dataset.pedidoId = pedido.id;
const id = div.dataset.pedidoId;