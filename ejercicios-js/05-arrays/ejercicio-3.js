// 05-arrays — Ejercicio 3
//
// --- Datos de partida ---
const pedidos = [
  { id: 1, total: 80 },
  { id: 2, total: 20 },
  { id: 3, total: 50 }
];
const pedidos = [
        { id: 1, total: 10, estado: "cancelado" },
        { id: 2, total: 20, estado: "cancelado" },
        { id: 3, total: 45, estado: "enviado" },
        { id: 4, total: 13, estado: "enviado" },
        { id: 5, total: 25, estado: "pendiente" },
        { id: 6, total: 15, estado: "pendiente" }
];

const ordenado = [...pedidos].sort((a, b) => b.total - a.total)

console.log(ordenado)