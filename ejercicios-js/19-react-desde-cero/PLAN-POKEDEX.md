# Plan Pokedex — Tema 19 (React) + Tema 20 (Redux)

Ruta que construye **una Pokedex realista** con PokeAPI: lista de Pokémon, detalle con tipos, stats, altura/peso y habilidades. **Los estilos Bootstrap vienen dados en cada paso** (markup con clases listas); tú te centras en la **lógica React**: componentes, estado, fetch, props.

---

## Objetivo

- **Tema 19:** App tipo Pokedex: lista con sprite y número, búsqueda, detalle al click (tipos, stats, altura, peso, habilidades). UI con Bootstrap ya preparada en el plan.
- **Tema 20:** La misma app con Redux (slices, thunks, selectores).

## Stack

- **Vite + React**
- **Bootstrap vía CDN** (en `index.html`). Clases ya indicadas en cada paso.
- **API:** [PokeAPI](https://pokeapi.co/). Endpoints: `GET .../pokemon?limit=20`, `GET .../pokemon/{id}`.

## Dónde trabajar

Un único proyecto en **`pokedex-app/`**. Linter obligatorio: `npm run lint` sin errores.

---

# Tema 19 — React (8 pasos)

En cada paso hay **markup Bootstrap listo** (solo copiar/adaptar y enlazar tus variables). Lo que tú implementas es la **lógica**: estado, `useEffect`, `fetch`, componentes y props.

---

## Paso 1. Proyecto base y layout (estilos listos)

**Objetivo:** Proyecto Vite+React, Bootstrap enlazado, estructura de página fija.

**Qué hacer:** Crea el proyecto en `pokedex-app/` con `npm create vite@latest . -- --template react`. En `index.html` añade el CDN de Bootstrap (CSS en `<head>`; JS opcional antes de `</body>` si más adelante usas modal). En `App.jsx`, monta este layout (sin estado aún):

**Markup Bootstrap (listo):**

```jsx
return (
  <>
    <nav className="navbar navbar-dark bg-danger">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Pokédex</span>
      </div>
    </nav>
    <main className="container-fluid py-4">
      <h2 className="h5 text-muted mb-3">Lista de Pokémon</h2>
      {/* Aquí irá la lista en pasos siguientes */}
    </main>
  </>
);
```

**Lógica que implementas:** Ninguna aún. Solo dejar el layout y comprobar que Bootstrap se ve bien.

---

## Paso 2. Lista desde API (fetch, loading, error)

**Objetivo:** Cargar la lista de Pokémon y mostrarla; manejar loading y error.

**Qué hacer:** En `App.jsx` (o en un componente `PokemonList` que prefieras), usa estado: `lista` (array), `loading` (boolean), `error` (string o null). En `useEffect` con dependencias `[]`, haz `fetch('https://pokeapi.co/api/v2/pokemon?limit=20')`, parsea JSON, guarda `data.results` en `lista` y en `.catch` guarda el mensaje en `error`. Pon `loading = true` antes del fetch y `false` al terminar (en `.finally()` o en cada rama). Muestra condicionalmente: si `loading`, un indicador; si `error`, mensaje; si no, la lista de nombres.

**Markup Bootstrap (listo):** Usa estas estructuras para no perder tiempo en estilos.

- **Cargando:**
```jsx
{loading && (
  <div className="text-center py-5">
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
    <p className="mt-2 text-muted">Cargando Pokémon...</p>
  </div>
)}
```

- **Error:**
```jsx
{error && (
  <div className="alert alert-danger" role="alert">
    Error: {error}
  </div>
)}
```

- **Lista (por ahora solo nombres):**
```jsx
{!loading && !error && (
  <ul className="list-group list-group-flush">
    {lista.map((p) => (
      <li key={p.name} className="list-group-item">{p.name}</li>
    ))}
  </ul>
)}
```

**Lógica que implementas:** `useState` para `lista`, `loading`, `error`. `useEffect` con fetch; actualizar estado en then/catch/finally. Renderizado condicional con el markup de arriba.

---

## Paso 3. Componente PokemonCard (sprite, número, nombre)

**Objetivo:** Extraer cada ítem de la lista a un componente reutilizable que muestre imagen, número e nombre.

**Qué hacer:** La API devuelve `{ name, url }`. La `url` es tipo `https://pokeapi.co/api/v2/pokemon/25/` — puedes extraer el **id** con `url.split('/').filter(Boolean).pop()`. El sprite oficial está en: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`. Crea un componente `PokemonCard` que reciba `pokemon` (objeto con `name` y `url`), calcule el `id` y muestre la imagen, el número (#id) y el nombre. Úsalo dentro del `map` de la lista.

**Markup Bootstrap (listo):** Estructura de card que puedes usar dentro de un grid en el siguiente paso.

```jsx
// En PokemonCard.jsx — recibe props: pokemon = { name, url }
function PokemonCard({ pokemon }) {
  const id = pokemon.url.split('/').filter(Boolean).pop();
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body text-center p-3">
        <img src={imgUrl} alt={pokemon.name} className="card-img-top" style={{ width: '96px', height: '96px', objectFit: 'contain' }} />
        <span className="text-muted small">#{id}</span>
        <h6 className="card-title text-capitalize mb-0">{pokemon.name}</h6>
      </div>
    </div>
  );
}
```

**Lógica que implementas:** Extraer `id` de `url`, construir `imgUrl`, recibir `pokemon` por props. En el padre, sustituir el `<li>` por `<PokemonCard key={p.name} pokemon={p} />` (o el nombre de la prop que uses).

---

## Paso 4. Grid de cards y clic para seleccionar

**Objetivo:** Mostrar las cards en un grid y guardar en estado el Pokémon seleccionado al hacer click.

**Qué hacer:** En el componente que tiene la lista, envuelve el `map` de cards en un grid de Bootstrap. Añade estado `pokemonSeleccionado` (objeto `{ name, url }` o solo `id`, como prefieras). Pasa a `PokemonCard` un callback, p. ej. `onClick` o `onSelect`, que al hacer click en la card llame a ese callback con el Pokémon (o su id). En el padre, en ese callback haz `setPokemonSeleccionado(pokemon)` (o el id). Por ahora no hace falta mostrar aún el detalle; solo asegúrate de que al hacer click el estado se actualice (puedes mostrar temporalmente el nombre en pantalla para comprobarlo).

**Markup Bootstrap (listo):**

```jsx
<div className="row g-3">
  {listaFiltrada.map((p) => (
    <div key={p.name} className="col-6 col-md-4 col-lg-3">
      <div
        className="card shadow-sm h-100 cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={() => onSelectPokemon(p)}
        onKeyDown={(e) => e.key === 'Enter' && onSelectPokemon(p)}
      >
        {/* Aquí el contenido de PokemonCard, o <PokemonCard pokemon={p} onSelect={() => onSelectPokemon(p)} /> */}
      </div>
    </div>
  ))}
</div>
```

**Lógica que implementas:** Estado `pokemonSeleccionado`. Función `onSelectPokemon(p)` que hace `setPokemonSeleccionado(p)`. Pasar esa función a las cards (o al contenedor que hace el map). Decidir si `PokemonCard` recibe `onSelect` y llama `onSelect(pokemon)` desde dentro de la card.

---

## Paso 5. Vista detalle (fetch por id)

**Objetivo:** Cuando hay `pokemonSeleccionado`, hacer fetch al detalle (`/pokemon/{id}`) y mostrar un panel o sección de detalle.

**Qué hacer:** Crea un componente `PokemonDetail` que reciba `pokemonSeleccionado` (objeto con `name`, `url`) o solo `id`. Si no hay selección, no renderices nada (o null). Si hay, en `useEffect` con dependencia `[id]` (o `[pokemonSeleccionado]`), haz `fetch` a `https://pokeapi.co/api/v2/pokemon/{id}`. Guarda en estado local del componente (o en App, como prefieras) los datos del detalle: `detail` (objeto de la API), `loading`, `error`. La respuesta incluye: `name`, `id`, `sprites.front_default` (o `other['official-artwork'].front_default`), `types`, `stats`, `height`, `weight`, `abilities`.

**Markup Bootstrap (listo) — detalle:** Cuando tengas `detail` cargado, usa esta estructura. Sustituye las llaves por los datos reales que devuelve la API.

```jsx
// Dentro de PokemonDetail, cuando detail existe y !loading && !error
<div className="card shadow">
  <div className="card-body">
    <div className="d-flex justify-content-between align-items-start mb-3">
      <div>
        <span className="text-muted">#{detail.id}</span>
        <h4 className="card-title text-capitalize mb-0">{detail.name}</h4>
      </div>
      <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar" />
    </div>
    <div className="text-center mb-3">
      <img
        src={detail.sprites?.other?.['official-artwork']?.front_default ?? detail.sprites?.front_default}
        alt={detail.name}
        className="img-fluid"
        style={{ maxHeight: '200px' }}
      />
    </div>
    <div className="mb-2">
      <strong>Tipos:</strong>{' '}
      {detail.types?.map((t) => (
        <span key={t.type.name} className="badge bg-primary me-1">{t.type.name}</span>
      ))}
    </div>
    <p className="mb-1"><strong>Altura:</strong> {detail.height / 10} m</p>
    <p className="mb-2"><strong>Peso:</strong> {detail.weight / 10} kg</p>
    <p className="mb-1"><strong>Habilidades:</strong> {detail.abilities?.map((a) => a.ability.name).join(', ')}</p>
    <p className="mb-0"><strong>Stats:</strong></p>
    <ul className="list-unstyled small">
      {detail.stats?.map((s) => (
        <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
      ))}
    </ul>
  </div>
</div>
```

**Lógica que implementas:** En `PokemonDetail`, estado `detail`, `loading`, `error`. `useEffect` que hace fetch a `.../pokemon/{id}` cuando hay id. Pasar `onClose` desde App para hacer `setPokemonSeleccionado(null)`. Mostrar spinner/error mientras carga el detalle.

---

## Paso 6. Botón cerrar y mostrar/ocultar detalle

**Objetivo:** Mostrar el panel de detalle solo cuando hay selección; botón cerrar que limpia la selección.

**Qué hacer:** En `App.jsx`, renderiza `PokemonDetail` solo cuando `pokemonSeleccionado` no sea null, pasando `pokemonSeleccionado` y una función `onClose` que haga `setPokemonSeleccionado(null)`. En `PokemonDetail`, el botón de cerrar (ya en el markup de arriba) debe llamar a `onClose`. Opcional: mostrar el detalle en un sidebar o debajo de la lista; el layout puede ser una fila con la lista a la izquierda y el detalle a la derecha en pantallas grandes (Bootstrap: `row`, `col-md-8`, `col-md-4`).

**Markup Bootstrap (listo) — contenedor lista + detalle:**

```jsx
<div className="row">
  <div className="col-md-7 col-lg-8">
    {/* Grid de cards (paso 4) */}
  </div>
  <div className="col-md-5 col-lg-4">
    {pokemonSeleccionado && (
      <PokemonDetail
        pokemonSeleccionado={pokemonSeleccionado}
        onClose={() => setPokemonSeleccionado(null)}
      />
    )}
  </div>
</div>
```

**Lógica que implementas:** Condicional `pokemonSeleccionado && <PokemonDetail ... />`. Callback `onClose` que limpia el estado.

---

## Paso 7. Búsqueda por nombre

**Objetivo:** Input controlado que filtra la lista por nombre antes de mostrarla.

**Qué hacer:** Añade estado `searchQuery` (string). Un `<input>` con `value={searchQuery}` y `onChange={(e) => setSearchQuery(e.target.value)}`. Calcula la lista filtrada: `lista.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))`. Usa esa lista filtrada en el grid de cards en lugar de `lista`. No hace falta nueva petición a la API; el filtro es en cliente.

**Markup Bootstrap (listo):**

```jsx
<div className="mb-3">
  <label htmlFor="search" className="form-label">Buscar por nombre</label>
  <input
    id="search"
    type="text"
    className="form-control"
    placeholder="Ej. pikachu"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>
```

**Lógica que implementas:** `useState` para `searchQuery`. Variable derivada `listaFiltrada` y usarla en el map de cards.

---

## Paso 8. Mensajes vacíos y repaso

**Objetivo:** Mensaje cuando la búsqueda no devuelve resultados; revisar loading/error en detalle.

**Qué hacer:** Si `listaFiltrada.length === 0` y no estás cargando, muestra un mensaje ("No hay Pokémon que coincidan" o "No se encontraron resultados"). Asegúrate de que en `PokemonDetail` también manejas loading y error (spinner o alert con las mismas clases Bootstrap de antes). Revisa que `npm run lint` pase sin errores.

**Markup Bootstrap (listo):**

```jsx
{!loading && !error && listaFiltrada.length === 0 && (
  <div className="alert alert-info">No hay Pokémon que coincidan con la búsqueda.</div>
)}
```

**Lógica que implementas:** Condicional para lista vacía. En `PokemonDetail`, spinner/alert cuando `loading` o `error` del fetch de detalle.

---

## Resumen Tema 19

| Paso | Enfoque (lógica React) | Estilos |
|------|-------------------------|--------|
| 1 | Layout inicial | Navbar + container (Bootstrap listo) |
| 2 | fetch lista, loading, error | Spinner, alert, list-group |
| 3 | Componente PokemonCard, props, id desde url | Card con imagen y texto |
| 4 | Estado pokemonSeleccionado, callback onSelect | Grid row/col, card clicable |
| 5 | PokemonDetail, fetch por id, tipos/stats/altura/peso/abilities | Card detalle con badges y lista |
| 6 | onClose, mostrar/ocultar detalle | Layout dos columnas |
| 7 | searchQuery, lista filtrada | Input form-control |
| 8 | Lista vacía, loading/error en detalle | Alert info |

Al terminar tienes una Pokedex funcional y presentable sin haber escrito CSS; solo lógica y componentes usando el markup dado.

---

# Tema 20 — Redux (6 pasos)

*(Se mantienen los 6 pasos del plan original: store, slice lista, thunk lista, slice detalle + thunk, slice búsqueda + selector, selectores memoizados y refactor. El documento original más abajo puede servir de referencia; si quieres, en una siguiente iteración se pueden detallar igual que el tema 19 con markup listo.)*

## Paso 1. Store y slice de lista

Sustituir el estado local de la lista por Redux: `configureStore`, slice `pokemonList` con `{ list: [], loading: false, error: null }`, reducers para loading/loaded/error. En el componente, `useSelector` y `dispatch` en lugar de `useState` para lista/loading/error.

## Paso 2. Thunk para cargar lista

`fetchPokemonList` con `createAsyncThunk` (o thunk manual) que haga el fetch y despache fulfilled/rejected. El componente en `useEffect` solo `dispatch(fetchPokemonList())`.

## Paso 3. Slice de detalle y thunk de detalle

Slice `pokemonDetail` con `{ pokemon: null, loading: false, error: null }`. Thunk `fetchPokemonDetail(id)`. Al hacer click en card, `dispatch(fetchPokemonDetail(id))`. Detalle lee del store; botón cerrar despacha acción que pone `pokemon: null`.

## Paso 4. Slice de búsqueda

Estado `searchQuery` en Redux; acción `setSearchQuery`. Input controlado por el store. Selector que devuelva la lista filtrada por nombre.

## Paso 5. Selectores memoizados

`createSelector` para la lista filtrada. Opcional: normalización byId/ids.

## Paso 6. Refactor

Organizar slices/thunks/selectores en carpetas; nombres consistentes; sin lógica de fetch en componentes.

---

Este plan sirve para seguir la ruta paso a paso con el foco en React (y después Redux) y los estilos Bootstrap ya resueltos en el markup.
