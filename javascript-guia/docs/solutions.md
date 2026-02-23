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

**Ejercicios React y Redux (cap. 19 y 20):** En el examen **no puede haber ningún error de linter**. Es obligatorio instalar ESLint en cada proyecto React/Redux, configurarlo para React y hacer que `npm run lint` termine sin errores. En cada directorio de ejercicio (y en `pokedex-app/`) el README indica los pasos. Comandos típicos:

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npx eslint --init
```

Elige: JavaScript, React, navegador. Añade en `package.json`: `"lint": "eslint src/"`. Ejecuta `npm run lint` y corrige todos los errores.

**Resto de ejercicios JS (opcional):** Para revisar sintaxis y estilo en ejercicios sin React:

```bash
# En la raíz del proyecto (donde están los ejercicios)
npm init -y
npm install -D eslint
npx eslint --init
```

Responde al asistente (por ejemplo: JavaScript, sin framework, estilo recomendado). Luego: `npx eslint ejercicios-js/15-dom` o `npx eslint ejercicios-js`.

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

## Tema 19 — React desde cero (mini apps)

Enunciados en [19-react-desde-cero.md](19-react-desde-cero.md#10-ejercicios). Cada ejercicio se implementa en un proyecto Vite + React (por ejemplo en `src/App.jsx`).

### 19.1. Contador

```jsx
function Contador() {
  const [n, setN] = useState(0);
  return (
    <div>
      <p>{n}</p>
      <button onClick={() => setN(n + 1)}>+1</button>
      <button onClick={() => setN(n - 1)}>-1</button>
    </div>
  );
}
```

### 19.2. Saludo con props

```jsx
function Saludo({ nombre }) {
  return <p>Hola, {nombre}</p>;
}
// Uso: <Saludo nombre="Ana" />
```

### 19.3. Todo list

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [texto, setTexto] = useState("");
  const add = () => {
    if (!texto.trim()) return;
    setTodos([...todos, { id: crypto.randomUUID(), texto: texto.trim(), done: false }]);
    setTexto("");
  };
  const toggle = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id));
  return (
    <div>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <button onClick={add}>Añadir</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>{t.texto}</span>
            <button onClick={() => remove(t.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 19.4. Lista desde PokeAPI

```jsx
function ListaPokeAPI() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then((data) => { setList(data.results); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <ul>
      {list.map((p) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </ul>
  );
}
```

**Recordatorios:** usar `setList(data.results)` (llamada a función), no `setList[data.results]`. Si el fetch va en un botón, hacerlo en el handler y llamar `onClick={() => pedirPokemons(n)}`; poner `setLoading(false)` en `.finally()`. Key desde datos (`key={p.name}`), nunca con setState. Imágenes: fetch a la `url` de cada resultado dentro del componente hijo; sprite en `data.sprites.front_default`; `src={imgUrl}`. Hooks siempre dentro del cuerpo del componente.

### 19.5. Formulario controlado

```jsx
function FormularioControlado() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre, email });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### 19.6. Contador con límites (0–10)

```jsx
function ContadorLimites() {
  const [n, setN] = useState(0);
  return (
    <div>
      <p>{n}</p>
      <button onClick={() => setN((c) => c + 1)} disabled={n >= 10}>+1</button>
      <button onClick={() => setN((c) => c - 1)} disabled={n <= 0}>-1</button>
    </div>
  );
}
```

---

## Tema 20 — React + Redux (mini-ejercicios)

Enunciados en [20-react-redux-bridge.md](20-react-redux-bridge.md#8-mini-ejercicios). Soluciones resumidas:

**1. Incrementar qty del item con id 2 (inmutable):**

```js
const nuevoEstado = {
  ...state,
  items: state.items.map((item) =>
    item.id === 2 ? { ...item, qty: item.qty + 1 } : item
  )
};
```

**2. Reducer counter (increment/decrement):**

```js
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "counter/increment":
      return { ...state, value: state.value + 1 };
    case "counter/decrement":
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}
```

**3. Thunk crearPedido:**

```js
function crearPedido(pedido) {
  return async (dispatch) => {
    dispatch({ type: "pedidos/creating" });
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      dispatch({ type: "pedidos/created", payload: data });
    } catch (e) {
      dispatch({ type: "pedidos/error", payload: e.message });
    }
  };
}
```

**4. ¿Por qué no `state.loading = true`?**  
Porque mutas el estado. Redux (y React) comparan por referencia; el reducer debe devolver un **nuevo** objeto.

**5. Selector suma de totales:**

```js
const selectTotalPedidos = (state) =>
  state.pedidos.list.reduce((s, p) => s + p.total, 0);
```

**6. Normalizar array a `{ byId, ids }`:**

```js
const normalized = list.reduce(
  (acc, item) => ({
    byId: { ...acc.byId, [item.id]: item },
    ids: [...acc.ids, item.id]
  }),
  { byId: {}, ids: [] }
);
```

Versión extendida con todos los detalles en [20-react-redux-bridge.md § Soluciones](20-react-redux-bridge.md#9-soluciones).

---

**[⬅ Volver al índice](../README.md)**
