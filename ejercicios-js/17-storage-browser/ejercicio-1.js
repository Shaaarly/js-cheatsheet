// 17-storage-browser — Ejercicio 1
// localStorage ultimaVisita = new Date().toISOString(); luego getItem y console.log (navegador)
localStorage.setItem("ultimaVisita", new Date().toISOString());
console.log(localStorage.getItem("ultimaVisita"));