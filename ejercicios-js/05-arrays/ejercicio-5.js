// 05-arrays — Ejercicio 5
//
// --- Datos de partida ---
const items = [
  { id: 1, nombre: "Ana" },
  { id: 2, nombre: "Bruno" },
  { id: 3, nombre: "Clara" }
];
const lineas = [
  { id: 101, nombre: 'pepe'},
  { id: 102, nombre: 'mario'},
  { id: 103, nombre: 'maria'},
  { id: 104, nombre: 'jose'},
  { id: 105, nombre: 'pepe'},
  { id: 106, nombre: 'mario'}
];

const users = lineas.reduce((acc, {id, nombre}) => {
    acc[id] = nombre
    return acc
})
console.log(users)