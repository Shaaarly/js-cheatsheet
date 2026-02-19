// 07-functions — Ejercicio 1
//
// --- Datos de partida ---
const pedidos = [
  { id: 1, estado: "pagado" },
  { id: 2, estado: "pendiente" },
  { id: 3, estado: "pendiente" }
];


const primerPedido = pedidos.find(p => p.estado === "pendiente" || p.estado === undefined);
// const primerPendiente = (pedidos) => pedidos.find(p => p.estado === "pendiente");

console.log(primerPedido)