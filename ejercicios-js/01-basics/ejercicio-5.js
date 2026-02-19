// 01-basics — Ejercicio 5: Switch (obtenerEtiquetaEstado)
// Sin datos de partida; prueba con "P", "E", "C" u otro valor.

function obtenerEtiquetaEstado(estado) {
    switch (estado) {
        case 'pendiente':
            console.log("P")
            break
        case 'enviado':
            console.log("E")
            break
        case 'cancelado':
            console.log("C")
            break
        default:
            console.log("Desconocido")
    }
}

obtenerEtiquetaEstado('banana')