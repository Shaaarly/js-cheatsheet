// 06-objects — Ejercicio 1
//
// --- Datos de partida ---
const pedido = { id: 1, cliente: "ana", estado: "pendiente" };

const result = Object.fromEntries(
   
    Object.entries(pedido).map(([k, v]) => [
        k,
        typeof v ==="string" ? v.toUpperCase() : v
    ])
    
)

console.log(result)