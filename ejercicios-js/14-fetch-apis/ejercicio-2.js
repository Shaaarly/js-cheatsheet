// 14-fetch-apis — Ejercicio 2
//
// --- Datos de partida ---
const pedido = { clienteId: 1, lineas: [{ productoId: 10, cantidad: 2 }] };

async function postPedido(pedido) {
    const res = await fetch("/api/pedidos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido)
    });
    if(!res.ok) throw new Error(res.status)
    return res.json()
}