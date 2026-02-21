// 17-storage-browser — Ejercicio 2
//
// --- Datos de partida ---
const config = { tema: "dark", notificaciones: true };

function getConfig() {
  try {
    return JSON.parse(localStorage.getItem("config") ?? "{}");
  } catch {
    return {};
  }
}
function setConfig(obj) {
  localStorage.setItem("config", JSON.stringify(obj));
}