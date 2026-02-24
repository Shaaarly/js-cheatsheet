# 20a. Ejemplo completo: mini app React + Redux

**[⬅ Volver al índice](../README.md)** · Requisito: [Cap. 20 - React + Redux](20-react-redux-bridge.md)

Este tema contiene una **mini app completa** que usa React y Redux con la mayor parte de los conceptos del capítulo 20: store, dos slices (uno con thunk async y otro solo síncrono con persistencia), selectores, Provider, useSelector y useDispatch en varios componentes.

---

## Mini-índice

1. [Qué hace la app](#1-qué-hace-la-app)
2. [Estructura de archivos](#2-estructura-de-archivos)
3. [Store](#3-store)
4. [Slice 1: lista (async thunk)](#4-slice-1-lista-async-thunk)
5. [Slice 2: favoritos (síncrono + localStorage)](#5-slice-2-favoritos-síncrono--localstorage)
6. [Selector derivado (createSelector)](#6-selector-derivado-createselector)
7. [main.jsx y App](#7-mainjsx-y-app)
8. [Componentes conectados](#8-componentes-conectados)
9. [Conceptos de Redux que cubre este ejemplo](#9-conceptos-de-redux-que-cubre-este-ejemplo)

---

## 1. Qué hace la app

- **Lista:** al cargar la app se pide a la PokeAPI una lista de Pokémon (`limit=20`). Se muestra en tarjetas con nombre; hay estado de carga y de error.
- **Favoritos:** el usuario puede añadir o quitar nombres de la lista de favoritos. Esa lista se **persiste en localStorage** y se restaura al recargar.
- **Selector:** se usa un selector memoizado para combinar lista + favoritos y marcar qué ítems son favoritos (sin tocar el estado).

API usada: [PokeAPI](https://pokeapi.co/) (sin API key). Endpoint: `https://pokeapi.co/api/v2/pokemon?limit=20`.

---

## 2. Estructura de archivos

```
src/
  main.jsx
  App.jsx
  App.css
  store/
    store.js
  features/
    pokemonList/
      pokemonListSlice.js
    favorites/
      favoritesSlice.js
  selectors/
    pokemonSelectors.js
  components/
    PokemonList.jsx
    PokemonCard.jsx
    Favorites.jsx
```

---

## 3. Store

Un solo store con dos reducers. El store se crea una vez y se pasa al Provider en `main.jsx`.

```js
// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import pokemonListReducer from "../features/pokemonList/pokemonListSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    pokemonList: pokemonListReducer,
    favorites: favoritesReducer,
  },
});
```

---

## 4. Slice 1: lista (async thunk)

Incluye: **initialState**, **createAsyncThunk** (fetch con argumento opcional), **extraReducers** (pending, fulfilled, rejected) y un reducer síncrono para limpiar el error.

```js
// src/features/pokemonList/pokemonListSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const LIMIT = 20;

export const fetchPokemonList = createAsyncThunk(
  "pokemonList/fetch",
  async (limit = LIMIT, { rejectWithValue }) => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );
    if (!res.ok) return rejectWithValue(await res.text());
    const data = await res.json();
    return data.results; // [ { name, url }, ... ]
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const pokemonListSlice = createSlice({
  name: "pokemonList",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error?.message ?? "Error";
      });
  },
});

export default pokemonListSlice.reducer;
export const { clearError } = pokemonListSlice.actions;
```

**Conceptos:** initialState, reducers (clearError con payload implícito), createAsyncThunk con argumento, extraReducers, payload en fulfilled/rejected.

---

## 5. Slice 2: favoritos (síncrono + localStorage)

Solo acciones síncronas. El **initialState** lee desde localStorage para persistir favoritos entre recargas. Las acciones añaden o quitan por nombre (string).

```js
// src/features/favorites/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "pokemon-favorites";

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const initialState = {
  names: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const name = action.payload;
      if (!state.names.includes(name)) {
        state.names.push(name);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.names));
      }
    },
    removeFavorite(state, action) {
      const name = action.payload;
      state.names = state.names.filter((n) => n !== name);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.names));
    },
  },
});

export default favoritesSlice.reducer;
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
```

**Conceptos:** initialState con lógica (lectura de localStorage), reducers con payload, persistencia manual en el reducer (alternativa a redux-persist).

---

## 6. Selector derivado (createSelector)

Combinar la lista de Pokémon y la lista de favoritos para obtener ítems con un flag `isFavorite`. Así los componentes no duplican lógica y el resultado se memoiza.

```js
// src/selectors/pokemonSelectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectListItems = (state) => state.pokemonList.items;
export const selectFavoriteNames = (state) => state.favorites.names;

export const selectListWithFavorites = createSelector(
  [selectListItems, selectFavoriteNames],
  (items, favoriteNames) =>
    items.map((item) => ({
      ...item,
      isFavorite: favoriteNames.includes(item.name),
    }))
);
```

**Conceptos:** selectores puros, createSelector (memoización por dependencias). En el componente se usa `useSelector(selectListWithFavorites)`.

---

## 7. main.jsx y App

El Provider envuelve toda la app; el store se importa desde `store/store.js`.

```jsx
// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./store/store.js";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

```jsx
// src/App.jsx
import PokemonList from "./components/PokemonList";
import Favorites from "./components/Favorites";

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Lista Pokémon + Favoritos (Redux)</h1>
      </header>
      <main>
        <PokemonList />
        <aside>
          <Favorites />
        </aside>
      </main>
    </div>
  );
}
```

---

## 8. Componentes conectados

Cada componente usa **useSelector** para leer y **useDispatch** para disparar acciones o thunks.

### PokemonList

Despacha el thunk al montar; lee `items`, `loading` y `error` del slice, y usa el selector derivado para pasar ítems con `isFavorite` a las cards.

```jsx
// src/components/PokemonList.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "../features/pokemonList/pokemonListSlice";
import { selectListWithFavorites } from "../selectors/pokemonSelectors";
import PokemonCard from "./PokemonCard";

export default function PokemonList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.pokemonList);
  const itemsWithFavorites = useSelector(selectListWithFavorites);

  useEffect(() => {
    dispatch(fetchPokemonList(20));
  }, [dispatch]);

  if (loading) return <p>Cargando lista...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!items.length) return <p>No hay datos.</p>;

  return (
    <section className="pokemon-list">
      <h2>Lista</h2>
      <ul>
        {itemsWithFavorites.map((item) => (
          <PokemonCard key={item.name} item={item} />
        ))}
      </ul>
    </section>
  );
}
```

### PokemonCard

Recibe un ítem (con `isFavorite`). Despacha `addFavorite` o `removeFavorite` según el clic.

```jsx
// src/components/PokemonCard.jsx
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";

export default function PokemonCard({ item }) {
  const dispatch = useDispatch();
  const { name, isFavorite } = item;

  return (
    <li className="card">
      <span>{name}</span>
      <button
        type="button"
        onClick={() =>
          dispatch(isFavorite ? removeFavorite(name) : addFavorite(name))
        }
      >
        {isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      </button>
    </li>
  );
}
```

### Favorites

Solo lee del store la lista de nombres y despacha `removeFavorite` al hacer clic.

```jsx
// src/components/Favorites.jsx
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favorites/favoritesSlice";

export default function Favorites() {
  const dispatch = useDispatch();
  const names = useSelector((state) => state.favorites.names);

  return (
    <section className="favorites">
      <h2>Favoritos</h2>
      {names.length === 0 ? (
        <p>Sin favoritos</p>
      ) : (
        <ul>
          {names.map((name) => (
            <li key={name}>
              {name}
              <button
                type="button"
                onClick={() => dispatch(removeFavorite(name))}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
```

---

## 9. Conceptos de Redux que cubre este ejemplo

| Concepto | Dónde en el ejemplo |
|----------|----------------------|
| **Store único** | `store/store.js` con `configureStore` y dos reducers. |
| **Provider** | `main.jsx`: `<Provider store={store}>` envolviendo `App`. |
| **initialState** | En ambos slices; en favorites se lee desde localStorage. |
| **Reducers síncronos** | `clearError`, `addFavorite`, `removeFavorite` con `action.payload`. |
| **createAsyncThunk** | `fetchPokemonList(limit)` con argumento; pending/fulfilled/rejected. |
| **extraReducers** | En pokemonListSlice para las tres acciones del thunk. |
| **Payload** | En todos los reducers y en fulfilled/rejected del thunk. |
| **Dos slices** | pokemonList (datos + async) y favorites (solo sync + persistencia). |
| **useSelector** | En PokemonList (state.pokemonList, selector derivado), en Favorites (state.favorites.names). |
| **useDispatch** | En PokemonList (thunk al montar), PokemonCard (add/remove), Favorites (remove). |
| **Selector memoizado** | `selectListWithFavorites` con createSelector. |
| **Patrón loading/error** | pending → fulfilled/rejected en pokemonListSlice; UI condicional en PokemonList. |
| **Persistencia (localStorage)** | En favoritesSlice: lectura en initialState y escritura en addFavorite/removeFavorite. |

Con esta mini app tienes un ejemplo de referencia que toca los puntos principales del [cap. 20](20-react-redux-bridge.md). Puedes copiar la estructura en un proyecto Vite + React e instalar `@reduxjs/toolkit` y `react-redux` para probarla.

Si al adaptar el ejemplo algo no funciona (input que no escribe, lista que no se muestra, favoritos que no persisten, etc.), consulta la **[sección 7. Errores frecuentes y dudas habituales](20-react-redux-bridge.md#7-errores-frecuentes-y-dudas-habituales)** del cap. 20, donde se recogen soluciones a esos fallos.

---

**[⬅ Volver al índice](../README.md)**
