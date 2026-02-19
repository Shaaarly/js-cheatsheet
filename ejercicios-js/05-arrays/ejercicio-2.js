// 05-arrays — Ejercicio 2
//
// --- Datos de partida ---
const pedidos = [
  { id: 1, estado: "pendiente", total: 50 },
  { id: 2, estado: "cancelado", total: 30 },
  { id: 3, estado: "pagado", total: 50 },
  { id: 4, estado: "cancelado", total: 20 }
];
const pedidos = [
        { id: 1, total: 10, estado: "cancelado" },
        { id: 2, total: 20, estado: "cancelado" },
        { id: 3, total: 45, estado: "enviado" },
        { id: 4, total: 13, estado: "enviado" },
        { id: 5, total: 25, estado: "pendiente" },
        { id: 6, total: 15, estado: "pendiente" }
];

const cancelados = pedidos.filter(p => p.estado === "cancelado")

console.log(cancelados)