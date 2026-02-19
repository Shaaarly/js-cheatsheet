// 01-basics — Ejercicio 3: Control de flujo (for...of, contar estados)
//
// --- Datos de partida ---
const pedidos = [
  { id: 1, estado: "pendiente" },
  { id: 2, estado: "pendiente" },
  { id: 3, estado: "pagado" },
  { id: 4, estado: "pagado" },
  { id: 5, estado: "enviado" },
  { id: 6, estado: "enviado" }
];

const pedidos = [
   { id: 1, estado: 'pendiente'},
    {id: 2, estado: 'pendiente'},
    {id: 3, estado: 'pagado'},
    {id: 4, estado: 'pagado'},
    {id: 5, estado: 'pagado'},
    {id: 6, estado: 'enviado'},
    {id: 7, estado: 'enviado'},
]

const conteo = {pendiente: 0, pagado: 0, enviado: 0}

for (const p of pedidos) {
    if(conteo.hasOwnProperty(p.estado)) {
        conteo[p.estado]++
    }
}

console.log(conteo)