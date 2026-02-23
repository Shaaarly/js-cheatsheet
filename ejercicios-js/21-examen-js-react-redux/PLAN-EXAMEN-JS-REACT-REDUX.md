# Examen práctico: JS → React → Redux

**Objetivo:** Practicar el flujo típico del examen: una app funcional en **JavaScript base** que primero migras a **React** y después a **Redux**. La app tiene dificultad de examen (estado, fetch, listas, filtros) pero está acotada para que **JS → React** y **React → Redux** no superen ~3 h en total (~1 h cada migración si ya dominas los conceptos).

---

## App base (JavaScript)

**Ubicación:** `app-vanilla/` — abre `index.html` en el navegador (o `npx serve app-vanilla` si hay CORS).

**Funcionalidad:**
- **Estado:** `tasks` (array de `{ id, text, completed }`), `loading`, `error`, `filter` ('all' | 'active' | 'completed').
- **Carga inicial:** fetch a `https://jsonplaceholder.typicode.com/todos?_limit=5`; mapear a `{ id, text, completed }`.
- **Añadir tarea:** formulario con input; al enviar, añadir a `tasks` (id con `Date.now()`) y repintar.
- **Marcar completada:** checkbox por tarea; toggle de `completed` y repintar.
- **Borrar:** botón por tarea; filtrar por id y repintar.
- **Filtro:** botones Todas / Activas / Completadas; lista mostrada según `filter` (sin nueva petición).

**Estructura del código base:** un objeto `state`, `getFilteredTasks()`, `render()` que actualiza el DOM desde `state`, y funciones `loadTasks`, `addTask`, `toggleTask`, `deleteTask`, `setFilter`. Event listeners en `init()`.

Asegúrate de entender bien esta app antes de migrar: qué vive en el estado, qué acciones lo modifican y cómo se pinta el DOM.

---

# Parte 1: Migrar a React (~1 h)

**Objetivo:** Misma funcionalidad con React (componentes, useState, useEffect). Crear proyecto Vite+React en una carpeta `app-react/` (o dentro de este directorio).

## Paso 1.1. Proyecto y estructura (≈10 min)

- `npm create vite@latest app-react -- --template react` (o crear dentro de `21-examen-js-react-redux/`).
- Bootstrap por CDN en `index.html`.
- Componentes sugeridos: `App`, `AddTask` (formulario), `TaskList` (lista), `TaskItem` (una tarea con checkbox y botón borrar), `FilterButtons` (Todas / Activas / Completadas). Puedes empezar con menos (p. ej. todo en App) y extraer después.

## Paso 1.2. Estado en App (≈15 min)

- Estado equivalente al JS: `tasks`, `loading`, `error`, `filter`.
- `useEffect` con `[]` que haga el fetch a la misma URL, actualice `tasks`/`loading`/`error` (y en `.finally()` poner `loading = false`).
- Lista filtrada: función o variable derivada `getFilteredTasks()` / `filteredTasks` según `tasks` y `filter`.

## Paso 1.3. Formulario y lista (≈20 min)

- `AddTask`: input controlado + botón; recibe `onAdd(text)`. En App, `addTask` que haga `setTasks([...tasks, { id: Date.now(), text, completed: false }])`.
- `TaskList`: recibe `tasks` (ya filtradas) y callbacks `onToggle(id)`, `onDelete(id)`. Hace `map` con `key={task.id}` y renderiza `TaskItem` por cada una.
- `TaskItem`: recibe `task`, `onToggle`, `onDelete`; checkbox con `checked={task.completed}` y `onChange` que llama `onToggle(task.id)`; botón que llama `onDelete(task.id)`.

## Paso 1.4. Filtro y mensajes (≈15 min)

- `FilterButtons`: recibe `filter` y `onFilterChange`. Tres botones; el activo según `filter`; `onClick` llama `onFilterChange('all'|'active'|'completed')`. En App, `setFilter` actualiza el estado.
- Mostrar loading (spinner) y error (alert) como en la app JS. Lista vacía tras filtrar: mensaje "No hay tareas".

Comprobar que la app React hace exactamente lo mismo que la vanilla. `npm run lint` sin errores.

---

# Parte 2: Migrar React a Redux (~1 h)

**Objetivo:** Mismo comportamiento con estado global: store, slice(s), thunk para el fetch, selectores para la lista filtrada.

## Paso 2.1. Store y slice de tareas (≈15 min)

- `npm install @reduxjs/toolkit react-redux`.
- Store con `configureStore`. Slice `tasks` (o `taskList`) con estado inicial: `{ items: [], loading: false, error: null }`.
- Reducers (o extraReducers con createAsyncThunk): p. ej. `loading`, `loaded` (payload: array de tareas), `error`, `addTask`, `toggleTask`, `deleteTask`. Las acciones `addTask`/`toggleTask`/`deleteTask` reciben payload (id o objeto) y actualizan `items` de forma inmutable.
- En `main.jsx`, `<Provider store={store}>` envolviendo la app.

## Paso 2.2. Thunk para cargar tareas (≈15 min)

- `createAsyncThunk('tasks/fetchTasks', async () => { ... fetch ... return data })`. En el slice, `extraReducers` para pending/fulfilled/rejected: actualizar `loading` y `items` o `error`.
- En el componente que antes hacía el fetch en `useEffect`, sustituir por `useEffect(() => { dispatch(fetchTasks()); }, [dispatch])`. Leer `items`, `loading`, `error` del store con `useSelector`.

## Paso 2.3. Filtro en Redux y selector (≈15 min)

- Añadir al estado (mismo slice o uno `filter`) el campo `filter: 'all'`. Acción `setFilter` con payload 'all' | 'active' | 'completed'.
- Selector: función que recibe `state` y devuelve la lista filtrada según `state.tasks.items` y `state.tasks.filter` (o el path que uses). Opcional: `createSelector` de RTK para memoización.
- El componente de filtros hace `dispatch(setFilter(...))` y el de la lista usa el selector en `useSelector(selectFilteredTasks)`.

## Paso 2.4. Conectar añadir / toggle / borrar (≈15 min)

- Las acciones `addTask`, `toggleTask`, `deleteTask` ya están en el slice; los componentes las despachan con `dispatch(addTask({ id, text, completed }))`, `dispatch(toggleTask(id))`, `dispatch(deleteTask(id))`.
- Eliminar el estado local de tareas de App; todo viene del store. Comprobar que la app sigue igual y que `npm run lint` pasa.

---

## Resumen de tiempos

| Fase | Tiempo orientativo |
|------|--------------------|
| Entender app JS base | 10–15 min |
| JS → React | ~1 h |
| React → Redux | ~1 h |
| **Total** | **~2 h 15 min – 3 h** |

Si algo se atasca, revisa los caps. 19 (React) y 20 (Redux) de la guía y el PLAN-POKEDEX para patrones (thunks, selectores, componentes conectados).

---

## Checklist rápido

- [ ] App JS: estado claro (tasks, loading, error, filter); fetch, add, toggle, delete, setFilter; render desde state.
- [ ] React: mismos datos en useState; useEffect para fetch; componentes con props y callbacks; lista con key; filtro y lista filtrada.
- [ ] Redux: slice con items/loading/error/filter; thunk fetchTasks; selectores para lista filtrada; dispatch para add/toggle/delete/setFilter; Provider y useSelector/useDispatch.

Este documento es la guía del examen práctico; la app base está en `app-vanilla/`.
