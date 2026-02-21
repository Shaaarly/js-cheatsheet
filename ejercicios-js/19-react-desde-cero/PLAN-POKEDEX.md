# Plan Pokedex — Tema 19 (React) + Tema 20 (Redux)

Ruta de ejercicios que construye **una sola mini app tipo Pokedex** con PokeAPI: primero en React (tema 19) y después migrada a Redux (tema 20).

---

## Objetivo

- **Al final del tema 19:** App con lista de Pokémon, tarjetas (card), detalle al hacer click, búsqueda por nombre y UI con Bootstrap.
- **Al final del tema 20:** La misma app con estado global Redux (slices, thunks, selectores).

## Stack

- **Vite + React**
- **Bootstrap:** `react-bootstrap` + `bootstrap` o Bootstrap vía CDN (clases en el markup).
- **API:** [PokeAPI](https://pokeapi.co/) (sin API key). Endpoints: `https://pokeapi.co/api/v2/pokemon?limit=20`, `https://pokeapi.co/api/v2/pokemon/{id}`.

## Dónde trabajar

Un único proyecto en **`pokedex-app/`** (dentro de `19-react-desde-cero/`). Los pasos del tema 19 se hacen en ese proyecto; los del tema 20 se aplican en el **mismo** proyecto añadiendo Redux.

---

# Tema 19 — React (6 pasos)

## Paso 1. Proyecto base y primer componente

Crear proyecto Vite+React, instalar Bootstrap (o añadir CDN) y montar el esqueleto de la app.

**Enunciado:** Crea el proyecto con `npm create vite@latest pokedex-app -- --template react`. Instala Bootstrap (`npm install react-bootstrap bootstrap` e importa los CSS en `main.jsx`, o enlaza el CDN de Bootstrap en `index.html`). En `App.jsx`, muestra un título "Pokedex", un navbar simple (opcional) y un `<Container>` que será el área principal. Deja preparado el layout para los siguientes pasos.

## Paso 2. Lista de Pokémon desde API

Cargar la lista inicial desde PokeAPI y mostrarla.

**Enunciado:** Crea un componente (o la lógica en `App`) que en `useEffect` haga `fetch` a `https://pokeapi.co/api/v2/pokemon?limit=20`. Usa estado para `lista` (array de resultados), `loading` (boolean) y `error` (string o null). Mientras `loading` sea true, muestra "Cargando..."; si hay `error`, muéstralo; si no, muestra los nombres en una lista o grid (p. ej. `<ul>` con `list.map(p => <li key={p.name}>{p.name}</li>)`). La respuesta de la API tiene `results` (array de `{ name, url }`).

## Paso 3. Tarjeta de Pokémon (PokemonCard)

Extraer la representación de cada Pokémon a un componente reutilizable.

**Enunciado:** Crea un componente `PokemonCard` que reciba un Pokémon (objeto con `name` y `url`). Para mostrar la imagen (sprite), puedes extraer el id de la `url` (ej. `.../pokemon/25/`) y usar `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`. Muestra en la card: imagen, nombre y opcionalmente el id. Reutiliza `PokemonCard` en la lista del paso 2, dentro de un grid de Bootstrap (p. ej. `Row`/`Col` o `card` con `grid`).

## Paso 4. Detalle de Pokémon

Al hacer click en una card, mostrar el detalle del Pokémon.

**Enunciado:** Añade estado `pokemonSeleccionado` (objeto o null). Al hacer click en una `PokemonCard`, guarda ese Pokémon en el estado (o su `url`/id). Crea un componente o bloque de detalle que, si hay `pokemonSeleccionado`, haga fetch a la URL del Pokémon (o a `https://pokeapi.co/api/v2/pokemon/{id}`) y muestre: imagen, nombre, tipos (`types`), y stats (`stats`). Puedes mostrar el detalle en un modal, un panel lateral o debajo de la lista. Incluye un botón o forma de cerrar/limpiar `pokemonSeleccionado`.

## Paso 5. Búsqueda / filtro

Filtrar la lista por nombre con un input controlado.

**Enunciado:** Añade estado `searchQuery` (string). Un input controlado (value = `searchQuery`, onChange actualiza el estado) que filtre la lista de Pokémon por nombre antes de mostrarla (p. ej. `list.filter(p => p.name.includes(searchQuery.toLowerCase()))`). Muestra la lista filtrada en el grid de cards. No hace falta llamar a la API de búsqueda; filtrar en cliente es suficiente.

## Paso 6. Pulir UI y estilos

Dejar la app presentable con Bootstrap y mensajes claros.

**Enunciado:** Aplica clases de Bootstrap de forma consistente: navbar, container, grid de cards, espaciado (margin/padding). Añade un indicador de carga (spinner o texto "Cargando...") y un mensaje de error amigable si falla el fetch. Opcional: mejorar la tarjeta de detalle (tipos con badges, stats en lista). Objetivo: que la app se vea ordenada y lista para usarla en el tema 20.

---

# Tema 20 — Redux (6 pasos)

## Paso 1. Store y slice de lista

Sustituir el estado local de la lista por Redux.

**Enunciado:** Instala Redux Toolkit y React-Redux (`npm install @reduxjs/toolkit react-redux`). Crea el store con `configureStore`. Crea un slice `pokemonList` con estado inicial `{ list: [], loading: false, error: null }` y reducers que manejen acciones tipo `pokemonList/loading`, `pokemonList/loaded` (payload: lista) y `pokemonList/error` (payload: mensaje). En el componente que mostraba la lista, sustituye `useState` por `useSelector` para leer `list`, `loading` y `error`, y en `useEffect` haz el fetch como hasta ahora pero en lugar de `setList`/`setLoading`/`setError` haz `dispatch` de las acciones correspondientes. Conecta la app con `<Provider store={store}>` en `main.jsx`.

## Paso 2. Thunk para cargar lista

Mover la lógica del fetch a un thunk.

**Enunciado:** Crea un thunk `fetchPokemonList` que despache una acción de loading, haga `fetch` a `https://pokeapi.co/api/v2/pokemon?limit=20`, y despache `loaded` con `data.results` o `error` si falla. Usa `createAsyncThunk` de Redux Toolkit (o una función que devuelva `async (dispatch) => { ... }`). En el reducer del slice, maneja los casos `pending`, `fulfilled` y `rejected` del thunk (o las acciones que despaches). En el componente, en `useEffect` solo haz `dispatch(fetchPokemonList())` y elimina la lógica de fetch local.

## Paso 3. Slice de detalle y thunk de detalle

Gestionar el detalle del Pokémon en Redux.

**Enunciado:** Crea un slice `pokemonDetail` con estado `{ pokemon: null, loading: false, error: null }`. Crea un thunk `fetchPokemonDetail(id)` que reciba el id, despache loading, haga fetch a `https://pokeapi.co/api/v2/pokemon/{id}` y despache el resultado o error. Al hacer click en una card, en lugar de guardar en estado local, haz `dispatch(fetchPokemonDetail(id))`. El componente de detalle debe leer `pokemon`, `loading` y `error` del store con `useSelector` y mostrar el contenido o un botón para "cerrar" (dispatch de una acción que ponga `pokemon: null` en el slice).

## Paso 4. Slice de búsqueda

Estado de búsqueda en Redux y selector para la lista filtrada.

**Enunciado:** Añade al estado (en un slice `search` o dentro de `pokemonList`) un campo `searchQuery` (string). Crea una acción `setSearchQuery` que actualice ese valor. El input de búsqueda debe ser controlado por el store: `value` desde `useSelector` y `onChange` que haga `dispatch(setSearchQuery(e.target.value))`. Crea un selector (función pura `state => ...`) que devuelva la lista de Pokémon filtrada por `searchQuery` (filtrar por nombre). En el componente de la lista, usa ese selector en lugar de la lista cruda.

## Paso 5. Selectores y normalización (opcional)

Selectores memoizados y, si quieres, estructura normalizada.

**Enunciado:** Usa `createSelector` (de `@reduxjs/toolkit` o `reselect`) para el selector de la lista filtrada, de forma que solo se recalcule cuando `list` o `searchQuery` cambien. Opcional: normaliza la lista de Pokémon en el estado (por ejemplo `byId` + `ids`) para no duplicar datos si más adelante mezclas lista y detalle; adapta el thunk y el selector a esa estructura.

## Paso 6. Refactor y buenas prácticas

Organizar código y nombres.

**Enunciado:** Organiza los slices, thunks y selectores en carpetas o archivos coherentes (p. ej. `store/slices/pokemonListSlice.js`, `store/thunks/pokemonThunks.js`, `store/selectors/pokemonSelectors.js`). Usa nombres de acciones y tipos consistentes (prefijo del slice). Revisa que no quede lógica de fetch en componentes; toda la carga de datos debe ir en thunks. La app debe seguir siendo la misma Pokedex pero con estado global Redux y código mantenible.

---

## Resumen

| Tema | Pasos | Resultado |
|------|--------|-----------|
| 19   | 1–6   | Pokedex en React (lista, card, detalle, búsqueda, UI Bootstrap) |
| 20   | 1–6   | Misma Pokedex con Redux (store, thunks, slices, selectores) |

Este documento sirve como plantilla para generar tareas concretas o para seguir la ruta paso a paso.
