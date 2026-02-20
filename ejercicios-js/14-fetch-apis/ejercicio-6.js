// 14-fetch-apis — Ejercicio 6
// Helper api(method, path, body?): envíe Content-Type application/json, haga fetch y devuelva JSON si res.ok, o lance si no.
// Firma: async function api(method, path, body) { ... }
// (path puede ser absoluto o relativo; para probar usa base de PokeAPI.)

async function api(method, path, body) {
    const options = {
        method,
        headers: { "Content-Type": "application/json" }
    };
    if (body != null) options.body = JSON.stringify(body);
    const res = await fetch(path, options);
    if (!res.ok) throw new Error(res.status);
    return res.json();
}