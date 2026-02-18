# Soluciones de ejercicios adicionales

**[⬅ Volver al índice](../README.md)**  
**Enunciados:** [exercises.md](exercises.md)

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
