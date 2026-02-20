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
7. [Listas y keys](#7-listas-y-keys)
8. [Mini apps para practicar](#8-mini-apps-para-practicar)
9. [Checklist rápido](#9-checklist-rápido)
10. [Ejercicios](#10-ejercicios)

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

**Props:** argumentos que recibe el componente (objeto). Solo lectura; no mutar.

```jsx
function Mensaje({ texto, tipo }) {
  return <p className={tipo}>{texto}</p>;
}
// Uso: <Mensaje texto="Hola" tipo="info" />
```

**children:** contenido entre apertura y cierre. Ej: `<Caja>Contenido</Caja>` → `props.children`.

```jsx
function Caja({ children }) {
  return <div className="caja">{children}</div>;
}
```

---

## 4. Estado con useState

**useState(valorInicial):** devuelve `[valor, setValor]`. Actualizar siempre con el setter; no mutar el estado directamente.

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

**Regla:** cuando algo deba cambiar en pantalla, debe vivir en estado (useState) o venir de props. Actualizar con `setX(nuevoValor)`; para objetos/arrays, crear copias (spread) y no mutar.

```jsx
const [user, setUser] = useState({ name: "", age: 0 });
// Bien:
setUser({ ...user, name: "Ana" });
// Mal: user.name = "Ana"; setUser(user);
```

---

## 5. Eventos y formularios

**Sintaxis:** `onClick`, `onChange`, `onSubmit` con función (no llamada). Reciben el evento (e).

```jsx
<button onClick={() => setCount(c => c + 1)}>+</button>
<input onChange={(e) => setNombre(e.target.value)} value={nombre} />
<form onSubmit={(e) => { e.preventDefault(); enviar(); }}>
```

**Formulario controlado:** el input tiene `value={estado}` y `onChange` que actualiza ese estado. Así React “posee” el valor.

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

**Cleanup (opcional):** si el callback devuelve una función, React la ejecuta al desmontar o antes de volver a ejecutar el efecto.

---

## 7. Listas y keys

Renderizar listas con `.map()` y devolver JSX. Cada elemento debe tener una **key** única y estable (id o nombre, no el índice si la lista puede reordenarse).

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

---

## 9. Checklist rápido

- [ ] Componente = función que devuelve JSX; nombre en mayúscula.
- [ ] Props: solo lectura; expresiones en `{ }`; `className` y `htmlFor`.
- [ ] useState(ini) → [valor, setValor]; actualizar con setter; no mutar estado.
- [ ] Eventos: onClick/onChange/onSubmit con función; formularios controlados (value + onChange).
- [ ] useEffect(callback, [deps]); vacío [] = solo al montar; fetch en useEffect.
- [ ] Listas: map + key única (id o name).

---

## 10. Ejercicios

1. **Contador:** mini app con un número y botones +1 y -1 (useState).
2. **Saludo con props:** componente que recibe `nombre` y muestra "Hola, {nombre}".
3. **Todo list:** estado con array de tareas; input + botón para añadir; lista con key por id; opción de marcar completada o borrar.
4. **Lista desde PokeAPI:** useEffect que hace fetch a `.../pokemon?limit=10`; estado para la lista y para loading; mostrar nombres (y opcionalmente imagen con la URL del sprite que devuelve la API).
5. **Formulario controlado:** dos inputs (nombre, email) en estado; onSubmit que muestre por consola o en un <p> los valores.
6. **Contador con límites:** como el contador pero con botones que no pasen de 0 ni de 10 (deshabilitar o no sumar/restar fuera de rango).

Las mini apps **Contador**, **Todo list** y **Lista desde API** se pueden reutilizar en el [cap. 20 - React + Redux](20-react-redux-bridge.md) para practicar reducers, estado global y thunks (cargar la lista con Redux en lugar de useState + useEffect local).

---

**[⬅ Volver al índice](../README.md)**
