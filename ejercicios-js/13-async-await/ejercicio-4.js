// 13-async-await — Ejercicio 4
// retry(fn, n): ejecuta la función async fn hasta que tenga éxito o hayas intentado n veces (en caso de error, reintentar).
// Firma: async function retry(fn, n) { ... }


async function retry(fn, n) {
    for( let i = 0; i < n; i++) {
        try {
           return await fn()
        } catch(e) {
            if (i === n - 1) throw e
        }
    }
}
