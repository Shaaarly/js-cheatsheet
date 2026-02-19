// 01-basics — Ejercicio 4: Ternario y lógicos (mensaje según total)
//
// --- Datos de partida ---
const pedido = { total: 30 };
// Prueba también con total: 0 y total: 60

const pedido = { total: 60 }

let mensaje = pedido.total === 0 ? "Carrito vacio" : pedido.total < 50 ? "Añade mas para envio gratis" : "Envio gratis!"

console.log(mensaje)