// 01-basics — Ejercicio 6: Bucle for (suma índices pares)
//
// --- Datos de partida ---
const nums = [10, 20, 30, 40, 50];

const numeros = [1, 1, 1, 1, 5, 2, 6, 2, 6, 3, 7];
let suma = 0;

for (let i = 0; i < numeros.length; i+=2) {
    suma += numeros[i]
}

console.log(suma)