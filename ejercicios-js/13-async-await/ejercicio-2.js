// 13-async-await — Ejercicio 2
// Función async que llame a /api/pedidos y /api/productos en paralelo; devolver { pedidos, productos }.
// Usa Promise.all y await. (Puedes usar URLs reales como PokeAPI para probar.)
//
const urlPedidos = "https://pokeapi.co/api/v2/pokemon?limit=5";
const urlProductos = "https://pokeapi.co/api/v2/pokemon?limit=3";

async function getPedidosYProductos() {
    const [pedidos, productos] = await Promise.all([
        fetch(urlPedidos).then(r => r.json()),
        fetch(urlProductos).then(r => r.json())
    ])
    return {pedidos, productos}
}

getPedidosYProductos().then(({pedidos, productos}) => {
    console.log("Pedidos", pedidos.results.map(p => p.name))
    console.log("Productos", productos.results.map(p => p.name))
})