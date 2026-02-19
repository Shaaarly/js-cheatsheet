// 06-objects — Ejercicio 6
// --- Datos de partida ---
// Clase LineaPedido con productoId, cantidad, precio y getter subtotal.

class LineaPedido {
    constructor(productoId, cantidad, precio) {
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    get subtotal() {
        return this.cantidad * this.precio;
    }
}
