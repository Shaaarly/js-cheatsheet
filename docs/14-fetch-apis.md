# 14. Fetch y APIs: GET/POST/PUT/PATCH/DELETE, headers, JSON, status, AbortController

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [fetch básico y métodos HTTP](#1-fetch-básico-y-métodos-http)
2. [Headers y body](#2-headers-y-body)
3. [JSON y códigos de estado](#3-json-y-códigos-de-estado)
4. [AbortController y timeout](#4-abortcontroller-y-timeout)
5. [Paginación y reintentos](#5-paginación-y-reintentos)
6. [Errores típicos y trampas de examen](#6-errores-típicos-y-trampas-de-examen)
7. [Checklist rápido](#7-checklist-rápido)
8. [Mini-ejercicios](#8-mini-ejercicios)
9. [Soluciones](#9-soluciones)

---

## 1. fetch básico y métodos HTTP

**fetch(url, options?)**: devuelve una **Promise** que se cumple con un objeto **Response**. No rechaza por 404/500; hay que comprobar `response.ok` o `response.status`.

- **GET**: por defecto (sin body). Para leer recursos.
- **POST**: crear recurso. Body en options.
- **PUT**: reemplazar recurso. Body en options.
- **PATCH**: actualización parcial. Body en options.
- **DELETE**: eliminar. Normalmente sin body.

```js
const res = await fetch("/api/pedidos");
const resPost = await fetch("/api/pedidos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ clienteId: 1, lineas: [] })
});
```

---

## 2. Headers y body

- **headers**: objeto o instancia de `Headers`. Común: `Content-Type: application/json`, `Authorization: Bearer <token>`.
- **body**: string (para JSON), FormData, Blob, etc. GET/HEAD no suelen llevar body.

```js
const res = await fetch("/api/pedidos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "Accept": "application/json"
  },
  body: JSON.stringify(pedido)
});
```

**Leer respuesta**: `res.json()`, `res.text()`, `res.blob()`. Cada uno consume el body; no se puede leer dos veces.

```js
const data = await res.json();
```

---

## 3. JSON y códigos de estado

- **response.ok**: true si status 200–299.
- **response.status**: código numérico (200, 201, 400, 404, 500).
- **response.statusText**: texto (ej. "OK", "Not Found").

Patrón típico: comprobar ok y parsear JSON, o lanzar error con status.

```js
async function api(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  return data;
}
```

**Casos reales**: 200 OK datos; 201 Created con Location; 400 Bad Request validación; 401 Unauthorized; 404 Not Found; 500 Server Error.

---

## 4. AbortController y timeout

**AbortController** permite cancelar un fetch. Se pasa `signal` en options; al llamar `controller.abort()`, la promesa de fetch se rechaza con AbortError.

```js
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);
try {
  const res = await fetch(url, { signal: controller.signal });
  const data = await res.json();
  return data;
} catch (e) {
  if (e.name === "AbortError") throw new Error("Timeout");
  throw e;
} finally {
  clearTimeout(timeout);
}
```

---

## 5. Paginación y reintentos

**Paginación básica** (query params):
```js
async function getPedidosPagina(pagina = 1, tam = 10) {
  const res = await fetch(`/api/pedidos?page=${pagina}&limit=${tam}`);
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return { items: data.items, total: data.total, pagina, tam };
}
```

**Reintentos simples**:
```js
async function fetchConReintento(url, max = 3) {
  for (let i = 0; i < max; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      if (res.status >= 500) throw new Error(res.statusText);
      throw new Error(res.statusText);
    } catch (e) {
      if (i === max - 1) throw e;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

---

## 6. Errores típicos y trampas de examen

- **fetch no rechaza por 4xx/5xx**: hay que comprobar `res.ok` o `res.status` y lanzar o manejar error.
- **body** se consume una vez: no hacer `res.json()` y luego `res.text()`.
- **POST/PUT/PATCH**: enviar `body` como string con `JSON.stringify` y header `Content-Type: application/json`.
- **CORS**: si la API está en otro origen, el servidor debe enviar cabeceras CORS correctas; fetch en el cliente no las evita.
- **AbortController**: un mismo signal puede usarse para varios fetch; abort() cancela todos.

---

## 7. Checklist rápido

- [ ] fetch devuelve Promise<Response>; no rechaza por status 4xx/5xx.
- [ ] Comprobar res.ok o res.status antes de usar datos.
- [ ] POST/PUT/PATCH: Content-Type: application/json y body: JSON.stringify(...).
- [ ] res.json() / res.text() consumen el body una sola vez.
- [ ] AbortController + signal para cancelar o implementar timeout.

---

## 8. Mini-ejercicios

1. Escribe una llamada fetch GET a `/api/pedidos/1` y devuelve el JSON solo si res.ok; si no, lanza Error con el status.
2. Implementa una función `postPedido(pedido)` que envíe un POST a `/api/pedidos` con el cuerpo en JSON y devuelva el JSON de la respuesta.
3. ¿Por qué este código puede fallar? `const data = await res.json(); if (!res.ok) throw new Error(data.message);`
4. Añade un timeout de 4 segundos a un fetch usando AbortController.
5. Obtén la segunda página de resultados (page=2, limit=10) de una API que use query params.
6. Escribe un helper `api(method, path, body?)` que envíe Content-Type application/json, haga el fetch y devuelva el JSON si ok, o lance si no.

---

## 9. Soluciones

<details>
<summary>1. GET y lanzar si no ok</summary>

```js
const res = await fetch("/api/pedidos/1");
if (!res.ok) throw new Error(res.status);
return res.json();
```
</details>

<details>
<summary>2. postPedido</summary>

```js
async function postPedido(pedido) {
  const res = await fetch("/api/pedidos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido)
  });
  if (!res.ok) throw new Error(res.status);
  return res.json();
}
```
</details>

<details>
<summary>3. Por qué puede fallar</summary>

Si res no es ok, el body puede no ser JSON (ej. HTML de error). Hacer res.json() puede lanzar. Mejor: comprobar res.ok antes, o hacer res.json() en try y luego comprobar ok.
</details>

<details>
<summary>4. Timeout con AbortController</summary>

```js
const c = new AbortController();
const t = setTimeout(() => c.abort(), 4000);
const res = await fetch(url, { signal: c.signal });
clearTimeout(t);
```
</details>

<details>
<summary>5. Segunda página</summary>

```js
const res = await fetch("/api/items?page=2&limit=10");
const data = await res.json();
```
</details>

<details>
<summary>6. Helper api(method, path, body?)</summary>

```js
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
```
</details>

---

**[⬅ Volver al índice](../README.md)**
