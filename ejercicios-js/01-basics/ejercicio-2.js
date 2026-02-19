// 01-basics — Ejercicio 2: Operadores (?. y ??)
//
// --- Datos de partida ---
const usuario = { nombre: "Ana" };
// o: const usuario = { email: "a@b.com" };
// o: const usuario = {};

const user = { email: "Ana"}
const name = user?.name ?? 'Anonimous';
const email = user?.email ?? 'N/A'

console.log(name, email)