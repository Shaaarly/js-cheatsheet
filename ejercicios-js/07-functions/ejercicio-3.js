// 07-functions — Ejercicio 3
//
// --- Datos de partida ---
const nums = [1, 5, 10, 3];
const limite = 4;


function mayorQue(limite) {
    return (elem) => elem > limite;
}

const filtered = nums.filter( mayorQue(limite))

console.log(filtered)