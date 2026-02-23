# 19. React desde cero: componentes, estado, efectos y mini apps

**[⬅ Volver al índice](../README.md)**

Este capítulo permite aprender React desde cero para construir **mini apps** (estilo examen) y reutilizarlas después en el [cap. 20 (React + Redux)](20-react-redux-bridge.md).

---

## Mini-índice del capítulo

1. [Entorno y primer componente](#1-entorno-y-primer-componente)
2. [JSX: sintaxis y expresiones](#2-jsx-sintaxis-y-expresiones)
3. [Props y composición](#3-props-y-composición)
4. [Estado con useState](#4-estado-con-usestate)
5. [Eventos y formularios](#5-eventos-y-formularios)
6. [useEffect: side effects](#6-useeffect-side-effects)
7. [Listas y keys](#7-listas-y-keys) · [7.1 Callback props](#71-callback-props-elevar-estado-y-pasar-handlers)
8. [Mini apps para practicar](#8-mini-apps-para-practicar)
9. [Checklist rápido](#9-checklist-rápido)
10. [Ejercicios](#10-ejercicios)
11. [Ejercicios Pokedex (ruta única)](#101-ejercicios-pokedex-ruta-única)

---

## 1. Entorno y primer componente

**Requisitos:** Node.js instalado. Crear proyecto con Vite (recomendado) o Create React App.

```bash
npm create vite@latest mi-app -- --template react
cd mi-app && npm install && npm run dev
```

**Componente:** una función que devuelve JSX (o null). El nombre en mayúscula.

```jsx
function Saludo() {
  return <h1>Hola</h1>;
}

// Uso en App.jsx:
<Saludo />
```

**Exportar:** `export default Saludo` o `export function Saludo`.

---

## 2. JSX: sintaxis y expresiones

- **Una raíz:** el return debe tener un solo elemento padre (o Fragment `<>...</>`).
- **Expresiones en JS:** entre llaves `{ }`. Ej: `{2 + 2}`, `{nombre}`, `{items.length}`.
- **Atributos:** `className` en lugar de `class`; `htmlFor` en lugar de `for`. Estilos: objeto `style={{ color: "red" }}`.
- **Comentarios:** `{/* comentario */}`.

```jsx
function Tarjeta({ titulo, activo }) {
  return (
    <div className={activo ? "activo" : ""}>
      <h2>{titulo}</h2>
    </div>
  );
}
```

---

## 3. Props y composición

**Props:** el componente recibe **un solo argumento**, que es el objeto con todas las props. Si escribes `function Saludo(text)`, entonces `text` es el objeto completo (p. ej. `{ nombre: "Ana" }`), no el valor de una prop llamada "nombre". Por eso lo habitual es **desestructurar**: `function Saludo({ nombre })` para usar directamente el valor.

```jsx
function Mensaje({ texto, tipo }) {
  return <p className={tipo}>{texto}</p>;
}
// Uso: <Mensaje texto="Hola" tipo="info" />
```

**Error frecuente:** si defines `function Saludo(props)` o `function Saludo(text)` y en el JSX haces `<p>{text}</p>`, estás intentando renderizar un **objeto**. React no puede mostrar objetos como hijos y puede dar pantalla en blanco o el error *"Objects are not valid as a React child"*. **Solución:** desestructurar las props que necesites, p. ej. `function Saludo({ nombre })` y entonces `<p>{nombre}</p>` sí muestra el valor.

```jsx
// Mal: text es el objeto { nombre: "Ana" }
function Saludo(text) {
  return <p>{text}</p>;  // ❌ renderiza un objeto
}
// Bien:
function Saludo({ nombre }) {
  return <p>Hola, {nombre}</p>;
}
```

**children:** contenido entre apertura y cierre. Ej: `<Caja>Contenido</Caja>` → `props.children`.

```jsx
function Caja({ children }) {
  return <div className="caja">{children}</div>;
}
```

---

## 4. Estado con useState

**useState(valorInicial):** devuelve `[valor, setValor]`. Actualizar siempre con el setter; no mutar el estado directamente. El **setter no devuelve el nuevo valor** (devuelve `undefined`); no se puede hacer `valor = setValor(x)` para "obtener" el valor actualizado — el nuevo valor se verá en el **siguiente render**.

```jsx
import { useState } from "react";

function Contador() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

**Importante:** **nunca** llames al setter durante el render del componente (en el cuerpo de la función, antes del return, ni en el JSX que se evalúa al pintar). Eso provoca un bucle infinito y el error *"Too many re-renders"*: render → setState → re-render → setState → … **Solución:** llamar al setter solo dentro de manejadores de eventos (`onClick`, `onChange`, `onSubmit`) o dentro de `useEffect`.

**Setter en forma funcional:** en lugar de pasar el nuevo valor, puedes pasar una **función** que recibe el valor actual y devuelve el nuevo: `setN((c) => c - 1)`. React llama a esa función pasándole el estado actual como argumento (`c`); no es una variable que declares tú, sino el valor que React inyecta. Usa la forma funcional cuando el **nuevo estado se calcula a partir del anterior** (contadores, toggles) y sobre todo si: (1) hay **varias actualizaciones seguidas** en el mismo manejador (con `setCount(count + 1)` dos veces se usa el mismo `count` y solo cuenta una; con `setCount(c => c + 1)` dos veces cada una recibe el último valor y cuenta las dos), o (2) actualizas desde **código asíncrono** (setTimeout, fetch, await), donde `count` podría estar desactualizado por la closure. Cuando ya **tienes el valor nuevo** (input, respuesta API, etc.), usa la forma directa: `setNombre(e.target.value)`, `setLista(data.results)`, `setAbierto(true)`.

```jsx
// Depende del valor anterior → forma funcional
<button onClick={() => setN((c) => c + 1)}>+1</button>
<button onClick={() => setN((c) => c - 1)}>-1</button>

// Valor nuevo que ya tienes → forma directa
<input value={nombre} onChange={(e) => setNombre(e.target.value)} />
```

**Input controlado (cambiar un valor desde un input):** el input debe tener `value={estado}` y `onChange` que actualice ese estado.

```jsx
const [nombre, setNombre] = useState("");
<input value={nombre} onChange={(e) => setNombre(e.target.value)} />
```

**Regla:** cuando algo deba cambiar en pantalla, debe vivir en estado (useState) o venir de props. Actualizar con `setX(nuevoValor)`; para objetos/arrays, crear copias (spread) y no mutar.

```jsx
const [user, setUser] = useState({ name: "", age: 0 });
// Bien:
setUser({ ...user, name: "Ana" });
// Mal: user.name = "Ana"; setUser(user);
```

**Inmutabilidad con listas:** `array.push(item)` **muta** el array y devuelve la **longitud** (un número), no el array. Si haces `setList(list.push(item))` estás pasando un número a `setList`, no un array; el estado deja de ser una lista y la app puede fallar o no mostrar nada. Formas correctas:

```jsx
setList([...list, nuevoItem]);                    // añadir
setList(list.filter(t => t.id !== id));           // quitar
setList(list.map(t => t.id === id ? { ...t, done: true } : t));  // actualizar
```

---

## 5. Eventos y formularios

**Sintaxis:** `onClick`, `onChange`, `onSubmit` con función (no llamada). Reciben el evento (e).

```jsx
<button onClick={() => setCount(c => c + 1)}>+</button>
<input onChange={(e) => setNombre(e.target.value)} value={nombre} />
<form onSubmit={(e) => { e.preventDefault(); enviar(); }}>
```

**Formularios:** el evento `onSubmit` va en el **`<form>`**, no en el botón. El botón debe ser `type="submit"` para que al pulsar (o Enter) se dispare el submit del formulario. En el manejador del form hay que llamar a **`e.preventDefault()`** para evitar que la página se recargue.

```jsx
<form onSubmit={(e) => { e.preventDefault(); añadir(); }}>
  <input value={texto} onChange={(e) => setTexto(e.target.value)} />
  <button type="submit">Añadir</button>
</form>
```

**Formulario controlado:** el input tiene `value={estado}` y `onChange` que actualiza ese estado. Así React “posee” el valor. Ejemplo completo con dos campos y envío:

```jsx
function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado({ nombre, email });
    // o console.log({ nombre, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Enviar</button>
      {enviado && <p>Enviado: {enviado.nombre}, {enviado.email}</p>}
    </form>
  );
}
```

---

## 6. useEffect: side effects

**useEffect(callback, [dependencias]):** ejecuta el callback después del render. Si las dependencias cambian, se vuelve a ejecutar; si es `[]`, solo al montar.

```jsx
import { useEffect, useState } from "react";

function ListaDesdeApi() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=5")
      .then(r => r.json())
      .then(data => setItems(data.results));
  }, []); // solo al montar
  return <ul>{items.map(p => <li key={p.name}>{p.name}</li>)}</ul>;
}
```

**Renderizado condicional:** mostrar distinto contenido según el estado (loading, error, datos). Usar ternario o `&&` dentro de `{ }`.

```jsx
if (loading) return <p>Cargando...</p>;
if (error) return <p>Error: {error}</p>;
return <ul>...</ul>;

// O en el mismo return:
return (
  <div>
    {loading && <p>Cargando...</p>}
    {error && <p className="error">{error}</p>}
    {!loading && !error && <ul>{items.map(...)}</ul>}
  </div>
);
```

**Cleanup (opcional):** si el callback devuelve una función, React la ejecuta al desmontar o antes de volver a ejecutar el efecto. Sirve para cancelar peticiones, limpiar timers o suscripciones.

```jsx
useEffect(() => {
  const id = setInterval(() => setCount((c) => c + 1), 1000);
  return () => clearInterval(id);  // cleanup al desmontar
}, []);

// Con fetch: abortar si el componente se desmonta antes de responder
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then((r) => r.json())
    .then(setData)
    .catch((e) => { if (e.name !== "AbortError") setError(e); });
  return () => controller.abort();
}, [url]);
```

---

## 7. Listas y keys

Renderizar listas con `.map()` y **devolver** JSX. Cada elemento debe tener una **key** única y estable que venga de los datos (id o name del item). La key **nunca** debe ser una llamada a setState (p. ej. `key={setId(id+1)}` provoca bucle infinito).

**Error frecuente:** si escribes `list.map(item => { <Card key={item.id} /> })` con **llaves** y sin `return`, la función no devuelve nada (undefined) y no se renderiza ninguna card aunque el array tenga elementos. **Solución:** usar paréntesis `list.map(item => ( <Card key={item.id} ... /> ))` o `return` explícito `list.map(item => { return <Card ... /> })`. Pasa los datos del elemento actual al componente (p. ej. `tarea={item}`), no el estado global.

```jsx
const [todos, setTodos] = useState([{ id: 1, texto: "A" }, { id: 2, texto: "B" }]);
return (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>{todo.texto}</li>
    ))}
  </ul>
);
```

### 7.1. Callback props (elevar estado y pasar handlers)

Cuando el estado vive en el padre (p. ej. lista de tareas) y el hijo (p. ej. una card) debe poder modificar ese estado (marcar completada, borrar), el padre define las funciones que actualizan el estado y las pasa al hijo como props. El hijo solo recibe esas funciones y las llama en `onClick`/`onChange`; no tiene acceso a `setState`.

```jsx
// En App:
const eliminar = (id) => setList(list.filter(t => t.id !== id));
return list.map(t => <Card key={t.id} tarea={t} onBorrar={() => eliminar(t.id)} />);

// En Card:
function Card({ tarea, onBorrar }) {
  return (
    <div>
      <span>{tarea.texto}</span>
      <button onClick={onBorrar}>Eliminar</button>
    </div>
  );
}
```

---

## 8. Mini apps para practicar

Estas mini apps sirven para practicar los conceptos y **reutilizarlas en el cap. 20 (Redux)** añadiendo estado global y thunks.

| Mini app | Conceptos | Descripción breve |
|----------|----------|-------------------|
| **Contador** | useState, onClick | Un número y botones +1 / -1. |
| **Todo list** | useState, listas, keys, formulario | Array de tareas; añadir y marcar completadas (o eliminar). |
| **Lista desde API** | useState, useEffect, fetch, listas | Cargar datos (p. ej. PokeAPI) y mostrar lista (nombre, imagen, etc.). |
| **Formulario controlado** | useState, onChange, onSubmit | Inputs controlados y envío (mostrar por consola o en estado). |

**Contador (ejemplo mínimo):**
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

**Lista PokeAPI (esqueleto):**
```jsx
function ListaPokemon() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then(r => r.json())
      .then(data => { setList(data.results); setLoading(false); });
  }, []);
  if (loading) return <p>Cargando...</p>;
  return (
    <ul>
      {list.map(p => <li key={p.name}>{p.name}</li>)}
    </ul>
  );
}
```

**Variante con botón "Buscar":** si la petición debe dispararse al pulsar un botón (y no al montar), haz el fetch en el **manejador del evento**, no dentro de `useEffect`. En `onClick` hay que **invocar** la función: `onClick={() => pedirPokemons(n)}` (con paréntesis y argumentos). No pongas `useEffect` dentro de esa función — los hooks solo pueden usarse en el cuerpo del componente. Para ver qué devuelve la API, haz `console.log(data)` **dentro** del `.then`, antes de `setList`: `.then(data => { console.log('API:', data); setList(data.results); })`. No uses `.then(console.log)` después de `setList` porque el setter devuelve `undefined`. Actualiza el estado con **`setList(data.results)`** (llamada a la función), no `setList[data.results]`. Para el loading, pon `setLoading(false)` cuando el fetch termine (éxito o error), p. ej. con `.finally(() => setLoading(false))`, y muestra "Cargando..." con un ternario claro: `loading ? <p>Cargando...</p> : <ul>...</ul>`.

**Límite válido:** si el estado del input es `useState(0)`, la URL puede ser `?limit=0` y la API devuelve pocos o ningún resultado. Usa un límite mínimo, p. ej. `const limit = n > 0 ? n : 10` antes del fetch.

**Imágenes (PokeAPI):** la lista `.../pokemon?limit=n` devuelve `{ name, url }` por pokémon; la imagen no está ahí, está en la respuesta del **detalle** (fetch a esa `url`). Opción recomendada: pasar la `url` de detalle a cada componente (p. ej. `<Pokemon name={p.name} url={p.url} />`) y hacer el fetch de la imagen **dentro** de ese componente con `useEffect` y `[url]`; la URL del sprite está en `data.sprites.front_default`. En el `<img>` usa `src={imgUrl}` (expresión), no `src="\`${imgUrl}\`"` (string literal). Los hooks (`useState`, `useEffect`) deben estar **dentro** del cuerpo de la función del componente, nunca en el nivel superior del archivo.

---

## 9. Checklist rápido

- [ ] Componente = función que devuelve JSX; nombre en mayúscula.
- [ ] Props: un solo argumento (objeto); desestructurar para usar valores; no renderizar el objeto.
- [ ] useState(ini) → [valor, setValor]; setter no devuelve valor; no llamar al setter durante el render. Forma funcional setN((c) => c + 1) cuando el nuevo valor depende del anterior (varias actualizaciones o async); forma directa setX(valor) cuando ya tienes el valor (input, API).
- [ ] Eventos: onClick/onChange/onSubmit con función; formularios: onSubmit en `<form>`, preventDefault, botón type="submit".
- [ ] Listas en estado: no mutar (no push); usar setList([...list, item]), filter, map.
- [ ] useEffect(callback, [deps]); vacío [] = solo al montar; cleanup si devuelves función; fetch en useEffect o en handler si es por botón.
- [ ] Renderizado condicional: loading/error con ternario; setLoading(false) en .finally() del fetch.
- [ ] Listas: map debe devolver JSX (paréntesis o return); key única desde datos (id o name); nunca key con setState.
- [ ] Hijo que modifica estado del padre: pasar handlers como props (onBorrar, onToggle) desde el padre.

---

## 10. Ejercicios

1. **Contador:** mini app con un número y botones +1 y -1 (useState).
2. **Saludo con props:** componente que recibe `nombre` y muestra "Hola, {nombre}".
3. **Todo list:** estado con array de tareas; input + botón para añadir; lista con key por id; opción de marcar completada o borrar.
4. **Lista desde PokeAPI:** useEffect que hace fetch a `.../pokemon?limit=10`; estado para la lista y para loading; mostrar nombres (y opcionalmente imagen con la URL del sprite que devuelve la API).
5. **Formulario controlado:** dos inputs (nombre, email) en estado; onSubmit que muestre por consola o en un <p> los valores.
6. **Contador con límites:** como el contador pero con botones que no pasen de 0 ni de 10 (deshabilitar o no sumar/restar fuera de rango).

Las mini apps **Contador**, **Todo list** y **Lista desde API** se pueden reutilizar en el [cap. 20 - React + Redux](20-react-redux-bridge.md) para practicar reducers, estado global y thunks (cargar la lista con Redux en lugar de useState + useEffect local).

### 10.1. Ejercicios Pokedex (ruta única)

Ruta alternativa: **una sola app tipo Pokedex** en **8 pasos**, con lista, detalle (tipos, stats, altura, peso, habilidades) y búsqueda usando [PokeAPI](https://pokeapi.co/) y Bootstrap. **En el plan cada paso incluye el markup Bootstrap listo** (clases y estructura); tú te centras en la **lógica React**: componentes, estado, fetch, props. Al terminar tienes una Pokedex funcional y presentable para migrarla a Redux en el [cap. 20](20-react-redux-bridge.md).

**Stack:** Vite + React, Bootstrap vía CDN, PokeAPI.

**Enlazar Bootstrap por CDN:** en el `index.html` del proyecto (raíz), añade en el `<head>` el CSS de Bootstrap (y opcionalmente el JS antes de `</body>` solo si usas modales/dropdowns):

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
```

**Plan completo:** [PLAN-POKEDEX.md](../../ejercicios-js/19-react-desde-cero/PLAN-POKEDEX.md) (en la carpeta de ejercicios). Proyecto único en `ejercicios-js/19-react-desde-cero/pokedex-app/`.

**Pasos (Tema 19):** 1) Proyecto base y layout (Bootstrap listo) · 2) Lista desde API (fetch, loading, error) · 3) Componente PokemonCard (sprite, número, nombre) · 4) Grid de cards y clic para seleccionar · 5) Vista detalle (fetch por id, tipos, stats, altura, peso, habilidades) · 6) Botón cerrar y mostrar/ocultar detalle · 7) Búsqueda por nombre · 8) Mensajes vacíos y repaso.

---

**[⬅ Volver al índice](../README.md)**
