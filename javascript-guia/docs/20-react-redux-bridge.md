# 20. Puente a React + Redux: inmutabilidad, reducers, async thunks

**[⬅ Volver al índice](../README.md)**

Recomendado tener hechas las **mini apps** del [cap. 19 (React desde cero)](19-react-desde-cero.md) (Contador, Todo list, Lista desde API). Puedes reutilizarlas aquí: sustituir estado local (useState/useEffect) por Redux (store, dispatch, useSelector) para practicar reducers y thunks.

---

## Mini-índice del capítulo

0. [Preparar proyecto y archivos](#0-preparar-proyecto-y-archivos)
1. [Conceptos JS imprescindibles para React/Redux](#1-conceptos-js-imprescindibles-para-reactredux)
2. [Inmutabilidad y pure functions](#2-inmutabilidad-y-pure-functions)
3. [Reducers y estado](#3-reducers-y-estado) · [3.1 Estado inicial y payload](#31-estado-inicial-y-payload) · [3.2 Un slice o varios](#32-un-slice-o-varios)
4. [Async thunks: promesas + async/await + fetch](#4-async-thunks-promesas--asyncawait--fetch)
5. [Conexión React–Redux: Provider, useSelector, useDispatch](#5-conexión-reactredux-provider-useselector-usedispatch) · [5.1 Por qué useSelector recibe una función](#51-por-qué-useselector-recibe-una-función)
6. [Patrones: datos normalizados, loading/error](#6-patrones-datos-normalizados-loadingerror)
7. [Checklist rápido](#7-checklist-rápido)
8. [Mini-ejercicios](#8-mini-ejercicios)
9. [Soluciones](#9-soluciones)

---

## 0. Preparar proyecto y archivos

**Crear proyecto:** Vite + React (o Create React App). Instalar Redux Toolkit y react-redux:

```bash
npm create vite@latest mi-app -- --template react
cd mi-app && npm install
npm install @reduxjs/toolkit react-redux
```

Opcional: React Router si más adelante quieres rutas.

**Archivos que tienes que crear:**

| Archivo | Qué hace |
|--------|-----------|
| **src/store/store.js** (o index.js) | Crea el store con `configureStore` y registra los reducers (tus slices). Se crea **una sola vez** en toda la app. |
| **src/features/&lt;nombre&gt;/&lt;nombre&gt;Slice.js** | Define `initialState`, `reducers` (y opcionalmente `extraReducers` para thunks). Exporta por defecto el **reducer** y, si los usas en componentes, las **acciones** (y el thunk). |
| **src/main.jsx** | Importa el store y `Provider` de react-redux; envuelve `<App />` con `<Provider store={store}>`. |

No hace falta un archivo aparte para "tratar" el store: se crea en `store/store.js`, se pasa una vez al Provider en `main.jsx`, y el resto de la app usa `useSelector` y `useDispatch` sin tocar el store de nuevo.

**Ejemplo de store:**

```js
// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    // otros slices: favorites: favoritesReducer,
  },
});
```

**main.jsx con Provider:** hay que importar `Provider` y envolver la app. El store se pasa solo aquí:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

Orden habitual: `StrictMode` → `Provider` → `App`. Todo el árbol bajo `App` puede usar `useSelector` y `useDispatch`.

**Dónde crear el slice:** si en el store pones `import weatherReducer from '../features/weather/weatherSlice'`, el archivo debe estar en **src/features/weather/weatherSlice.js**. En ese archivo debes exportar **por defecto** el reducer (`export default weatherSlice.reducer`) para que el import funcione. Las acciones y el thunk se exportan como nombrados: `export const { setTempUnit, setWeather } = weatherSlice.actions;` y `export { fetchWeatherByCity };`.

**Persistir favoritos (localStorage):** opción A) `redux-persist` con blacklist para persistir solo `favoriteCities`. Opción B) en el reducer de "añadir favorito" (o en un thunk) hacer además `localStorage.setItem('favoriteCities', JSON.stringify(...))` y en el `initialState` del slice leer desde `localStorage` al crear el store (o en el primer init). La B es más directa si solo persistes favoritos.

**Orden de implementación sugerido:** 1) Crear proyecto React + Redux (store + slice con estado inicial y reducers mínimos). 2) Implementar el thunk de búsqueda y conectar la API o fakeFetch; comprobar con Redux DevTools que el estado se actualiza. 3) Añadir acciones y estado para tempUnit y favoriteCities; persistir favoritos si aplica. 4) Crear componentes de presentación y conectarlos al store con useSelector/useDispatch.

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

Un **reducer** es una función pura `(state, action) => newState`. Recibe el estado actual y una acción; devuelve el **nuevo** estado (nunca mutar state). En Redux **solo se puede cambiar el estado** pasando por un reducer; no hay "setState" directo sobre el store.

*En una frase:* reducer = (state, action) => nuevo estado; puro, sin mutar.

Con **createSlice** (Redux Toolkit) no escribes el switch a mano: defines un objeto `reducers` por nombre; cada función recibe `state` y `action`. Por dentro, Toolkit usa **Immer**, así que puedes escribir como si mutaras `state`; Toolkit genera el nuevo estado de forma inmutable y genera automáticamente las acciones.

```js
import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: { weather: null, forecast: null, loading: false, error: null },
  reducers: {
    setTempUnit(state, action) {
      state.tempUnit = action.payload; // 'metric' o 'imperial'
    },
    setWeather(state, action) {
      state.weather = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default weatherSlice.reducer;
export const { setTempUnit, setWeather, setError } = weatherSlice.actions;
```

En el componente: `dispatch(setTempUnit('imperial'))`; Redux llamará al reducer con el state actual y la acción; el reducer actualiza el estado. Siempre devolver (o con Immer, "mutar") un nuevo estado; no hacer mutaciones fuera de createSlice.

### 3.1. Estado inicial y payload

**initialState:** es el valor con el que empieza ese trozo del estado. La idea es la misma que el argumento de `useState(0)` o `useState({})`, pero con dos diferencias importantes:

| | useState (React) | initialState en Redux |
|--|------------------|------------------------|
| **Dónde está** | En el componente | En el store (fuera de los componentes) |
| **Quién lo ve** | Solo ese componente (y los que reciben props) | Cualquier componente que use `useSelector` |
| **Persistencia** | Se pierde al desmontar el componente | Persiste mientras la app esté abierta (y puedes añadir localStorage, etc.) |

Así que **initialState** en Redux es el "valor inicial" del estado global de ese slice. Solo cambia cuando se disparan acciones que pasan por los reducers.

**Payload:** es el "contenido" o datos que llevas dentro de la acción. La acción es un objeto `{ type, payload }`. Lo que pasas al hacer `dispatch(nombreAccion(dato))` es el **payload**; en el reducer lo usas como `action.payload`.

```js
dispatch(setTempUnit('imperial'));  // payload = 'imperial'
dispatch(setWeather(data));         // payload = data (objeto del API)
dispatch(setError('City not found')); // payload = 'City not found'
```

En el reducer: `state.tempUnit = action.payload;`. Cuando la acción solo indica un tipo (ej. "limpiar error") sin datos, el reducer puede ignorar `action.payload`.

### 3.2. Un slice o varios

**Puedes usar un solo slice** y está bien. No es obligatorio tener varios.

- **Un solo slice:** app pequeña o mediana; todo el estado muy relacionado (ej. clima: weather, forecast, favoriteCities, tempUnit, loading, error). Un único archivo, menos ficheros, más simple. El store tendría `reducer: { weather: weatherReducer }`.
- **Varios slices:** cuando quieres separar por **dominio** (ej. "clima" vs "favoritos") o por responsabilidad; o cuando un archivo se hace muy grande. Ejemplo: `weatherSlice` (weather, forecast, tempUnit, loading, error) y `favoritesSlice` (favoriteCities + persistencia). El store: `reducer: { weather: weatherReducer, favorites: favoritesReducer }`. En componentes: `state.weather.weather`, `state.favorites.favoriteCities`.

Recomendación: empezar con **un slice**; añadir más cuando el dominio sea claramente distinto o cuando ayude a organizar.

**Resumen del flujo en el slice:** tienes **initialState** (valor con el que empieza ese trozo del estado), **reducers** (cambian el estado de forma síncrona cuando disparas una acción), **thunks** con `createAsyncThunk` (lógica asíncrona: fetch, promesas) y **extraReducers** (donde el slice reacciona a las acciones del thunk: pending / fulfilled / rejected, y actualiza loading, datos, error). Todo eso se exporta (reducer por defecto, acciones y thunk como nombrados). En los componentes: **dispatch** para causar cambios (buscar, guardar favorito, cambiar unidad); **useSelector** para leer el estado y que el componente se re-renderice cuando cambie.

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

**Thunk con argumentos:** el `payloadCreator` de `createAsyncThunk` puede recibir un argumento; ese valor se pasa al llamar al thunk desde el componente. Ejemplo: cargar detalle por id.

```js
// En el slice: el primer parámetro del payloadCreator es el argumento (aquí id)
export const fetchPokemonDetail = createAsyncThunk(
  "pokemonDetail/fetch",
  async (id, { rejectWithValue }) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) return rejectWithValue(await res.text());
    return res.json();
  }
);
```

En el componente: se obtiene el id (p. ej. del click en una card) y se despacha pasando ese id:

```jsx
// Al hacer click en una card: dispatch(fetchPokemonDetail(pokemon.id))
<button onClick={() => dispatch(fetchPokemonDetail(pokemon.id))}>Ver detalle</button>
```

---

## 5. Conexión React–Redux: Provider, useSelector, useDispatch

Para que la app React use el store de Redux hace falta: 1) crear el store (en `store/store.js`) y envolver la app con `<Provider>` en `main.jsx`, 2) en los componentes, leer estado con `useSelector` y despachar acciones con `useDispatch`.

**1. Store y Provider:** el store se crea en un archivo aparte (ver [§0](#0-preparar-proyecto-y-archivos)); en `main.jsx` solo se importa y se pasa al Provider:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

**2. En el componente: leer estado y despachar**

```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidos } from "./store/pedidosSlice";

function ListaPedidos() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.pedidos);

  useEffect(() => {
    dispatch(fetchPedidos());
  }, [dispatch]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <ul>
      {list.map((p) => <li key={p.id}>{p.nombre}</li>)}
    </ul>
  );
}
```

**Resumen en una frase:** **dispatch** = "haz algo" (ejecutar reducer o thunk → el estado puede cambiar). **useSelector** = "dame esta parte del estado y avísame cuando cambie" (solo lectura; para pintar o decidir en el componente). Todo lo que hace la app al buscar o guardar (thunks, acciones síncronas) se dispara con `dispatch`; lo que se muestra en pantalla se lee con `useSelector`.

- **useDispatch():** devuelve la función `dispatch`. Se usa para enviar acciones (o thunks): `dispatch(setTempUnit('imperial'))`, `dispatch(fetchWeatherByCity({ city, unit }))`.
- **useSelector(selector):** devuelve la porción de estado que devuelve la función selector; cuando **esa porción** cambia, el componente se re-renderiza. Sin useSelector, el componente no "ve" el estado de Redux.

### 5.1. Por qué useSelector recibe una función

El hook necesita saber **de qué parte del estado** quieres leer y **cuándo re-renderizar**. Por eso recibe una **función** (el selector), no el estado directamente.

- **El parámetro (state):** lo pone Redux. Cuando el hook se ejecuta, Redux llama a tu función pasándole el **estado actual del store** (todo el árbol: `state.weather`, `state.favorites`, etc.).
- **La arrow function:** es la "receta": recibe ese `state` y devuelve el trozo que te interesa. Redux no sabe que quieres `state.weather.weather`; tú lo defines devolviendo eso.

Es decir: tú no pasas el estado (no lo tienes). Pasas una función que dice "dado el estado, devuélveme esto". Redux tiene el estado y llama a tu función con él; usa el resultado para darte el valor y para decidir si re-renderizar (compara el valor devuelto con el anterior; si es igual por referencia, no re-renderiza).

```jsx
useSelector(state => state.weather.weather);  // Redux hace: tuFuncion(estadoActual)
```

---

## 6. Patrones: datos normalizados, loading/error

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

**Selectores:** funciones puras `state => valor` que derivan datos del estado (p. ej. suma de totales, lista filtrada). Centralizan la forma de "leer" el estado y facilitan cambios de estructura.

Selector simple:

```js
const selectTotal = (state) =>
  state.pedidos.list.reduce((s, p) => s + p.total, 0);
```

**createSelector (memoizado):** con `createSelector` de `@reduxjs/toolkit` (o `reselect`) el resultado solo se recalcula cuando cambian las dependencias (p. ej. lista o filtro). Útil para listas filtradas o derivadas costosas.

```js
import { createSelector } from "@reduxjs/toolkit";

const selectList = (state) => state.pokemon.list;
const selectSearchQuery = (state) => state.search.query;

export const selectFilteredList = createSelector(
  [selectList, selectSearchQuery],
  (list, query) => {
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter((p) => p.name.toLowerCase().includes(q));
  }
);
// En el componente: const list = useSelector(selectFilteredList);
```

---

## 7. Checklist rápido

- [ ] Proyecto: store en `store/store.js`, slice(s) en `features/<nombre>/<nombre>Slice.js`, Provider en main.jsx envolviendo App.
- [ ] initialState: valor inicial del slice (global, persistente en sesión); solo cambia vía reducers.
- [ ] Reducers: única forma de cambiar estado; en createSlice con Immer puedes "mutar" state; payload = datos de la acción (action.payload).
- [ ] Un slice está bien; varios cuando domines distintos (ej. weather vs favorites).
- [ ] Thunk: createAsyncThunk + extraReducers (pending/fulfilled/rejected); despachar loading antes de fetch, loaded/error después.
- [ ] dispatch = causar cambios (acciones y thunks); useSelector(selector) = leer estado y re-renderizar cuando cambie esa parte; el selector recibe state (inyectado por Redux) y devuelve el trozo que quieres.
- [ ] No mutar state fuera de createSlice; normalizar cuando convenga; loading/error en el slice.

---

## 8. Mini-ejercicios

1. Dado un estado `{ items: [{ id: 1, qty: 2 }, { id: 2, qty: 1 }] }`, escribe la actualización **inmutable** para incrementar `qty` del item con id 2 en 1.
2. Escribe un reducer que maneje las acciones "counter/increment" y "counter/decrement" (estado: { value: 0 }).
3. Implementa un thunk `crearPedido(pedido)` que dispare "pedidos/creating", luego POST a "/api/pedidos", y dispare "pedidos/created" con la respuesta o "pedidos/error" si falla.
4. ¿Por qué en un reducer no debes hacer `state.loading = true`?
5. Dado un array de pedidos con `total`, escribe un selector puro que devuelva la suma de totales.
6. Normaliza un array `[{ id: 1, name: "A" }, { id: 2, name: "B" }]` a la forma `{ byId: {}, ids: [] }`.

**Con mini apps (cap. 19):** opcionalmente, toma tu **Contador** o **Lista desde API** (PokeAPI) y añade Redux: store con el reducer correspondiente, dispatch de acciones desde el componente, lectura del estado con useSelector. Para la lista, sustituye el useEffect + useState por un thunk que haga fetch y guarde los datos en el store.

### 7.1. Ejercicios Pokedex (Redux)

Si has seguido la **ruta Pokedex** del [cap. 19](19-react-desde-cero.md) (app única en `pokedex-app/`), puedes migrar esa misma app a Redux en 6 pasos. El plan con los enunciados está en [PLAN-POKEDEX.md](../../ejercicios-js/19-react-desde-cero/PLAN-POKEDEX.md) (sección "Tema 20 — Redux").

**Pasos (Tema 20):** 1) Store y slice `pokemonList` (lista, loading, error); sustituir useState por useSelector/dispatch · 2) Thunk `fetchPokemonList`; dispatch desde componente · 3) Slice `pokemonDetail` + thunk `fetchPokemonDetail(id)`; click en card dispara thunk · 4) Slice búsqueda `searchQuery`; selector lista filtrada · 5) Selectores con createSelector; opcional normalización · 6) Refactor: carpetas, nombres consistentes.

---

## 9. Soluciones

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

**Ejemplo completo:** para ver todo esto aplicado en una mini app (store, dos slices, thunk, selectores, localStorage y componentes conectados), sigue el **[cap. 20a - Ejemplo completo React + Redux](20a-ejemplo-mini-app-redux.md)**.

**[⬅ Volver al índice](../README.md)**
