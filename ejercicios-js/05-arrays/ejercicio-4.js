// 05-arrays — Ejercicio 4
//
// --- Datos de partida ---
const lineas = [
  { productoId: 101, cantidad: 2 },
  { productoId: 102, cantidad: 1 },
  { productoId: 101, cantidad: 3 },
  { productoId: 103, cantidad: 5 },
  { productoId: 102, cantidad: 2 }
];
const lineas = [
  { productoId: 101, cantidad: 2 },
  { productoId: 102, cantidad: 1 },
  { productoId: 101, cantidad: 3 },
  { productoId: 103, cantidad: 5 },
  { productoId: 102, cantidad: 2 },
  { productoId: 101, cantidad: 1 }
];

const porProducto = lineas.reduce((acc, l) => {
    acc[l.productoId] = (acc[l.productoId] ?? 0) + l.cantidad 
    return acc
}, {})

console.log(porProducto)
