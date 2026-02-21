// 17-storage-browser — Ejercicio 5
// Función que lea document.cookie y devuelva objeto { nombreCookie: valor } (navegador)
function getCookies() {
  return Object.fromEntries(
    document.cookie.split("; ").filter(Boolean).map(s => {
      const [k, ...v] = s.split("=");
      return [k, v.join("=").trim()];
    })
  );
}