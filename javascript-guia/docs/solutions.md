# Soluciones de ejercicios adicionales

**[⬅ Volver al índice](../README.md)**  
**Enunciados:** [exercises.md](exercises.md)

---

## Cómo ejecutar y visualizar los ejercicios

### Ejercicios con Node (consola)

La mayoría de ejercicios (fundamentos, arrays, funciones, promesas, async/await, fetch sin DOM, etc.) se ejecutan con Node:

```bash
# Desde la raíz del repo o desde la carpeta del ejercicio
node ejercicios-js/01-basics/ejercicio-1.js
node ejercicios-js/12-promises/ejercicio-1.js
```

### Ejercicios de DOM y eventos en el navegador

Los ejercicios que usan **DOM** (cap. 15), **eventos** (cap. 16), **extras 10, 11, 13** y el **bloque 6 del examen mental** necesitan un HTML que cargue el script y tenga los elementos que usa el ejercicio (por ejemplo `#lista-pedidos`, `#f`, `#list`, botones, etc.).

**Opción 1 — HTML mínimo en la misma carpeta**

Crea un `index.html` en la carpeta del ejercicio (o en `ejercicios-js/15-dom/`, `ejercicios-js/16-events/`, etc.) que tenga los id/clases que pide el enunciado y cargue tu script:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>DOM / Eventos</title>
</head>
<body>
  <div id="lista-pedidos">
    <div class="pedido">Pedido 1</div>
    <div class="pedido">Pedido 2</div>
  </div>
  <!-- Ajusta los id/clases según el ejercicio -->
  <script src="ejercicio-1.js"></script>
</body>
</html>
```

Luego abre ese HTML en el navegador (doble clic o arrastrar el archivo, o con un servidor local).

**Opción 2 — Servidor local (recomendado para evitar restricciones de CORS en fetch)**

Si el ejercicio hace `fetch` a una API, es mejor servir los archivos por HTTP:

```bash
# Con Node (npx no instala globalmente)
npx serve ejercicios-js/15-dom
# o desde la raíz:
npx serve .
```

Luego abre en el navegador la URL que indique `serve` (por ejemplo `http://localhost:3000`) y navega hasta la carpeta y el `index.html`.

**Opción 3 — Extensión “Live Server” en VS Code / Cursor**

Clic derecho en el `index.html` → “Open with Live Server”. Abre la página en el navegador y recarga al cambiar el código.

### Ejercicios de React (cap. 19)

Son mini apps en **JSX** que se desarrollan dentro de un proyecto **Vite + React**.

**Instalación y arranque:**

```bash
# Crear proyecto (solo la primera vez)
npm create vite@latest mi-app -- --template react
cd mi-app
npm install
# Arrancar servidor de desarrollo
npm run dev
```

Abre en el navegador la URL que muestre Vite (por ejemplo `http://localhost:5173`). Los archivos de `ejercicios-js/19-react-desde-cero/*.jsx` son plantillas/enunciados: implementa el código en tu proyecto (por ejemplo en `App.jsx` o en componentes dentro de `src/`).

### Ejercicios de React + Redux (cap. 20)

Los ejercicios del cap. 20 se hacen en el **mismo proyecto React** (o en uno que ya tengas). Instala Redux y arranca el proyecto:

```bash
cd mi-app
npm install @reduxjs/toolkit react-redux
npm run dev
```

Implementa los ejercicios (reducers, thunks, etc.) en tu app y visualiza en el navegador como en el cap. 19.

### Comandos necesarios (resumen)

| Qué | Comando |
|-----|--------|
| Ejecutar un .js con Node | `node ruta/al/archivo.js` |
| Servidor estático (HTML/DOM) | `npx serve .` o `npx serve ejercicios-js/15-dom` |
| Crear proyecto React (Vite) | `npm create vite@latest mi-app -- --template react` |
| Instalar dependencias (React/Redux) | `cd mi-app` → `npm install` |
| Redux en proyecto existente | `npm install @reduxjs/toolkit react-redux` |
| Arrancar React en desarrollo | `npm run dev` |

**Requisitos:** tener instalado **Node.js** (incluye `npm` y `npx`). Descarga desde [nodejs.org](https://nodejs.org).

### Linter (ESLint)

Para revisar sintaxis y estilo en los ejercicios JS (opcional):

```bash
# En la raíz del proyecto (donde están los ejercicios)
npm init -y
npm install -D eslint
npx eslint --init
```

Responde al asistente (por ejemplo: JavaScript, sin framework, estilo recomendado). Luego:

```bash
# Comprobar una carpeta
npx eslint ejercicios-js/15-dom
# Comprobar todo
npx eslint ejercicios-js
```

Si usas el proyecto Vite de React, ESLint se puede integrar en el propio proyecto con `npm create vite@latest` y añadiendo después `eslint` y la config que prefieras (por ejemplo `eslint-plugin-react`).

---

## 1. Positivo / negativo / cero

```js
function signo(n) {
  return n > 0 ? "positivo" : n < 0 ? "negativo" : "cero";
}
```

---

## 2. Agrupar por tipo

```js
function agruparPorTipo(arr) {
  return arr.reduce(
    (acc, item) => {
      const t = typeof item;
      const key = t === "object" && item !== null ? "others" : t === "number" ? "numbers" : t === "string" ? "strings" : "others";
      acc[key].push(item);
      return acc;
    },
    { numbers: [], strings: [], others: [] }
  );
}
```

---

## 3. Array sin valor (sin filter)

```js
function sinValor(arr, valor) {
  const out = [];
  for (const x of arr) {
    if (x !== valor) out.push(x);
  }
  return out;
}
```

---

## 4. Mayor total pendiente

```js
function mayorPendiente(pedidos) {
  return pedidos
    .filter((p) => p.estado === "pendiente")
    .reduce((best, p) => (!best || p.total > best.total ? p : best), null);
}
```

---

## 5. Objeto con solo ciertas claves

```js
function pick(obj, keys) {
  return keys.reduce((acc, k) => {
    if (Object.hasOwn(obj, k)) acc[k] = obj[k];
    return acc;
  }, {});
}
```

---

## 6. Aplanar profundidad arbitraria (sin flat)

```js
function aplanar(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? aplanar(item) : item);
  }, []);
}
```

---

## 7. pipe

```js
function pipe(...fns) {
  return (x) => fns.reduce((v, f) => f(v), x);
}
```

---

## 8. debounce

```js
function debounce(fn, ms) {
  let id;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => fn.apply(this, args), ms);
  };
}
```

---

## 9. fetch con reintentos

```js
async function fetchConReintentos(url, max = 3) {
  let lastError;
  for (let i = 0; i < max; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
    } catch (e) {
      lastError = e;
      if (i < max - 1) await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw lastError;
}
```

---

## 10. Lista con delegación

```js
function renderList(contenedor, items) {
  const ul = document.createElement("ul");
  items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.append(li);
  });
  ul.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) {
      const index = [...ul.querySelectorAll("li")].indexOf(li);
      console.log(index);
    }
  });
  contenedor.append(ul);
}
```

---

## 11. Form nombre/email y validación

```html
<form id="f">
  <input name="nombre" />
  <input name="email" type="email" />
  <button type="submit">Enviar</button>
  <div id="msg"></div>
</form>
```

```js
document.querySelector("#f").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const nombre = fd.get("nombre")?.trim();
  const email = fd.get("email")?.trim();
  const msg = document.querySelector("#msg");
  if (!nombre || !email) {
    msg.textContent = "Nombre y email obligatorios";
    msg.style.color = "red";
  } else {
    msg.textContent = "Enviado correctamente";
    msg.style.color = "green";
  }
});
```

---

## 12. API local de pedidos

```js
let pedidos = [
  { id: 1, total: 50, estado: "pendiente" },
  { id: 2, total: 120, estado: "pagado" }
];

function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getAll() {
  await delay();
  return [...pedidos];
}

async function getById(id) {
  await delay();
  const p = pedidos.find((x) => x.id === id);
  if (!p) throw new Error("No encontrado");
  return { ...p };
}

async function update(id, data) {
  await delay();
  const i = pedidos.findIndex((x) => x.id === id);
  if (i === -1) throw new Error("No encontrado");
  pedidos[i] = { ...pedidos[i], ...data };
  return { ...pedidos[i] };
}
```

---

## 13. Fetch, loading, lista, error

```js
const listEl = document.querySelector("#list");
const loadingEl = document.querySelector("#loading");
const errorEl = document.querySelector("#error");

async function load() {
  loadingEl.textContent = "Cargando...";
  errorEl.textContent = "";
  listEl.innerHTML = "";
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    data.slice(0, 10).forEach((post) => {
      const li = document.createElement("li");
      li.textContent = post.title;
      listEl.append(li);
    });
  } catch (e) {
    errorEl.textContent = e.message;
  } finally {
    loadingEl.textContent = "";
  }
}
load();
```

---

**[⬅ Volver al índice](../README.md)**
