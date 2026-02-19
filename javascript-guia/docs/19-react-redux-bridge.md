# 19. Puente a React + Redux: inmutabilidad, reducers, async thunks

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Conceptos JS imprescindibles para React/Redux](#1-conceptos-js-imprescindibles-para-reactredux)
2. [Inmutabilidad y pure functions](#2-inmutabilidad-y-pure-functions)
3. [Reducers y estado](#3-reducers-y-estado)
4. [Async thunks: promesas + async/await + fetch](#4-async-thunks-promesas--asyncawait--fetch)
5. [Patrones: datos normalizados, loading/error](#5-patrones-datos-normalizados-loadingerror)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. Conceptos JS imprescindibles para React/Redux

- **Inmutabilidad**: no mutar estado; crear copias (spread, slice, map, filter) y devolver nuevo estado. React y Redux dependen de referencias para saber si algo cambió.
- **Pure functions**: misma entrada → misma salida; sin efectos secundarios (no mutar argumentos, no leer/escribir global). Reducers deben ser puros.
- **map, filter, reduce**: transformar listas sin mutar; pipelines de datos.
- **Spread/rest y destructuring**: `{ ...state, campo: valor }`, `const { id, ...rest } = obj`.
- **Módulos (import/export)**: organización de actions, reducers, selectors.
- **Async/await y fetch**: llamadas API; en Redux con thunks (función que devuelve otra función que hace dispatch).
- **Referencia vs valor**: comparar por referencia; actualizar estado con nuevos objetos/arrays.

---

## 2. Inmutabilidad y pure functions

**Actualizar estado sin mutar:**
```js
// Objeto: nuevo objeto con spread
const nuevoEstado = { ...estado, loading: true };
const actualizarUsuario = (state, payload) => ({
  ...state,
  user: { ...state.user, ...payload }
});

// Array: no push/splice; usar spread o concat/slice
const nuevosItems = [...state.items, nuevoItem];
const sinUno = state.items.filter((_, i) => i !== index);
const actualizado = state.items.map((item, i) =>
  i === index ? { ...item, ...cambios } : item
);
```

**Pure function:** no muta argumentos, no side effects, mismo input → mismo output.
```js
function totalItems(items) {
  return items.reduce((sum, i) => sum + i.cantidad, 0);
}
```

---

## 3. Reducers y estado

Un **reducer** es una función pura `(state, action) => newState`. Recibe el estado actual y una acción; devuelve el **nuevo** estado (nunca mutar state).  
*En una frase:* reducer = (state, action) => nuevo estado; puro, sin mutar.

```js
function pedidosReducer(state = { list: [], loading: false }, action) {
  switch (action.type) {
    case "pedidos/loading":
      return { ...state, loading: true };
    case "pedidos/loaded":
      return { ...state, list: action.payload, loading: false };
    case "pedidos/error":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
```

Siempre devolver un nuevo objeto; no hacer `state.loading = true`.

---

## 4. Async thunks: promesas + async/await + fetch

*(Promesas y async/await se ven en el [cap. 12](12-promises.md) y [cap. 13](13-async-await.md).)*

Un **thunk** es una función que devuelve una función (que recibe `dispatch`). Dentro se hacen llamadas async y se despachan acciones (loading, success, error).

**Por qué thunk:** centralizar la lógica async en un solo sitio (no dispersar fetch en cada componente), poder testearla, reutilizarla y tener loading/error en el estado de Redux; el componente solo hace `dispatch(fetchPedidos())` y se re-renderiza cuando el reducer actualiza el estado.

**Flujo del thunk:** quien hace el dispatch suele ser el componente (p. ej. en `useEffect`). Orden: 1) `dispatch(fetchPedidos())` → 2) el thunk se ejecuta → 3) `dispatch({ type: "pedidos/loading" })` → 4) fetch → 5) `dispatch({ type: "pedidos/loaded", payload })` o `"pedidos/error"`. El componente **no recibe** el resultado del thunk; se actualiza porque el reducer cambia el estado y React re-renderiza al leer ese estado (p. ej. con `useSelector`).

```js
function fetchPedidos() {
  return async (dispatch) => {
    dispatch({ type: "pedidos/loading" });
    try {
      const res = await fetch("/api/pedidos");
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      dispatch({ type: "pedidos/loaded", payload: data });
    } catch (e) {
      dispatch({ type: "pedidos/error", payload: e.message });
    }
  };
}
// Uso en componente: dispatch(fetchPedidos())
```

*En una frase:* thunk = función que devuelve async (dispatch) => { dispatch(loading) → fetch → dispatch(loaded | error) }; el componente solo despacha y lee el estado.

**Forma de acciones (FSA):** conviene que las acciones sean objetos `{ type, payload }`. Opcional: `error: true` si el payload es un error, y `meta` para datos extra. Usar `payload` para el dato principal hace el código predecible y compatible con Redux Toolkit.

**createAsyncThunk (Redux Toolkit):** firma `createAsyncThunk(typePrefix, payloadCreator)`. El `payloadCreator` puede ser `async (arg, { dispatch, getState }) => ...` (por ejemplo una llamada fetch). Se generan automáticamente los tipos `pending`, `fulfilled` y `rejected`; se usan en el slice con `extraReducers(builder)` y `builder.addCase(nombreThunk.fulfilled, (state, action) => ...)`.

Ejemplo mínimo:

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPedidos = createAsyncThunk(
  "pedidos/fetch",
  async (_, { rejectWithValue }) => {
    const res = await fetch("/api/pedidos");
    if (!res.ok) return rejectWithValue(await res.text());
    return res.json();
  }
);

const slice = createSlice({
  name: "pedidos",
  initialState: { list: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPedidos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPedidos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message;
      });
  }
});
// En el componente: dispatch(fetchPedidos())
```

---

## 5. Patrones: datos normalizados, loading/error

**Normalizar datos:** guardar listas por id en un objeto y array de ids para orden.
```js
const normalized = {
  byId: { 1: { id: 1, name: "A" }, 2: { id: 2, name: "B" } },
  ids: [1, 2]
};
```

**Patrón loading/error:** en el thunk se despacha loading → fetch → loaded o error. En el reducer se refleja la secuencia: al empezar, `loading: true`, `error: null`; al terminar bien, `loading: false`, datos en estado; al fallar, `loading: false`, `error: mensaje`. Así el componente puede mostrar spinner o mensaje de error según el estado.

```js
state = {
  items: [],
  loading: false,
  error: null
};
// Antes del fetch: { loading: true, error: null }
// Tras éxito: { loading: false, items: [...], error: null }
// Tras fallo: { loading: false, error: "mensaje" }
```

**Selectores:** funciones puras `state => valor` que derivan datos del estado (p. ej. suma de totales, lista filtrada). Centralizan la forma de "leer" el estado y facilitan cambios de estructura. Con Redux Toolkit se puede usar `createSelector` (de Reselect) para memoizar y evitar recálculos cuando las entradas no cambian.

```js
const selectTotal = (state) =>
  state.pedidos.list.reduce((s, p) => s + p.total, 0);
```

---

## 6. Checklist rápido

- [ ] No mutar state; usar spread, map, filter, slice para nuevos objetos/arrays.
- [ ] Reducers: (state, action) => newState; puros.
- [ ] Thunk: función que devuelve async (dispatch) => { fetch + dispatch(actions) }.
- [ ] Despachar loading antes de fetch, loaded/error después.
- [ ] Normalizar cuando convenga (byId + ids); loading/error en el slice.

---

## 7. Mini-ejercicios

1. Dado un estado `{ items: [{ id: 1, qty: 2 }, { id: 2, qty: 1 }] }`, escribe la actualización **inmutable** para incrementar `qty` del item con id 2 en 1.
2. Escribe un reducer que maneje las acciones "counter/increment" y "counter/decrement" (estado: { value: 0 }).
3. Implementa un thunk `crearPedido(pedido)` que dispare "pedidos/creating", luego POST a "/api/pedidos", y dispare "pedidos/created" con la respuesta o "pedidos/error" si falla.
4. ¿Por qué en un reducer no debes hacer `state.loading = true`?
5. Dado un array de pedidos con `total`, escribe un selector puro que devuelva la suma de totales.
6. Normaliza un array `[{ id: 1, name: "A" }, { id: 2, name: "B" }]` a la forma `{ byId: {}, ids: [] }`.

---

## 8. Soluciones

<details>
<summary>1. Incrementar qty de id 2</summary>

```js
const nuevoEstado = {
  ...state,
  items: state.items.map((item) =>
    item.id === 2 ? { ...item, qty: item.qty + 1 } : item
  )
};
```
</details>
<details>
<summary>2. Reducer counter</summary>

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
</details>
<details>
<summary>3. Thunk crearPedido</summary>

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
</details>
<details>
<summary>4. Por qué no state.loading = true</summary>

Porque mutas el estado. Redux (y React) comparan por referencia; si mutas, la referencia es la misma y puede no detectarse el cambio. El reducer debe devolver un nuevo objeto.
</details>
<details>
<summary>5. Selector suma totales</summary>

```js
const selectTotalPedidos = (state) =>
  state.pedidos.list.reduce((s, p) => s + p.total, 0);
```
</details>
<details>
<summary>6. Normalizar array</summary>

`acc` es un objeto **local** del reduce (no es el estado de Redux); aun así, por coherencia con el mensaje de no mutar, aquí va una versión inmutable:

```js
const normalized = list.reduce(
  (acc, item) => ({
    byId: { ...acc.byId, [item.id]: item },
    ids: [...acc.ids, item.id]
  }),
  { byId: {}, ids: [] }
);
```
</details>

---

**[⬅ Volver al índice](../README.md)**
