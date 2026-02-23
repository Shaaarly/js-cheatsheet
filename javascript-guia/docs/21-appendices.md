# 21. Apéndices: comandos, tabla rápida, glosario, debugging, buenas prácticas, recursos

**[⬅ Volver al índice](../README.md)**

---

## Debugging

- **console.log / console.error / console.warn**: salida en consola; console.table para arrays/objetos.
- **console.trace()**: imprime la pila de llamadas (stack trace) en ese punto.
- **Breakpoints**: en DevTools (Sources); poner breakpoint y ejecutar paso a paso (step over, step into, step out).
- **debugger**: sentencia en el código; si las herramientas están abiertas, pausa la ejecución.
- **Stack trace en errores**: el mensaje de Error incluye la propiedad .stack; útil para ver la cadena de llamadas que llevó al error.
- **Errores típicos**: comprobar tipos (typeof, Array.isArray), null/undefined (optional chaining), y que las promesas tengan .catch o try/catch con await.

---

## Buenas prácticas

- **Naming**: variables/funciones descriptivas (camelCase); constantes en MAYÚSCULAS si son literales; evitar abreviaturas oscuras.
- **Pure functions**: preferir funciones que no muten argumentos ni tengan side effects; mismo input → mismo output.
- **Side effects**: concentrarlos en bordes (I/O, DOM, localStorage); lógica de negocio sin efectos secundarios.
- **Inmutabilidad**: no mutar estado; crear copias con spread, slice, map, filter; especialmente importante en React/Redux.
- **Organización de módulos**: separar por responsabilidad (api, utils, components); barrel (index.js) para reexportar; import/export named o default según convención del proyecto.

---

## Tabla rápida de métodos (resumen)

Ver **[Cheat sheet](cheatsheet.md)** para tablas completas de Arrays, Strings, Object y Promises.

---

## Glosario

| Término | Definición breve |
|---------|------------------|
| **API** | Interfaz para comunicación (ej. HTTP REST); en JS suele referirse a endpoints que consumimos con fetch. |
| **Async** | Operación que no bloquea; el resultado llega después (callbacks, promesas, async/await). |
| **Bubbling** | Fase del evento desde el elemento target hacia los ancestros en el DOM. |
| **Closure** | Función que "recuerda" variables del ámbito donde fue creada. |
| **Coerción** | Conversión implícita de tipo (ej. string a number en operaciones). |
| **DOM** | Document Object Model; representación en memoria del documento HTML como árbol de nodos. |
| **Event loop** | Mecanismo que ejecuta tareas: call stack, cola de microtasks, cola de macrotasks. |
| **Hoisting** | "Elevación" de declaraciones (var, function) al inicio de su scope. |
| **Inmutabilidad** | No modificar datos en sitio; crear copias para cambios. |
| **Microtask** | Tarea con prioridad sobre macrotasks (then/catch/finally de promesas, queueMicrotask). |
| **Mutador** | Método que modifica el objeto/array original (ej. push, sort, splice). |
| **Pure function** | Misma entrada → misma salida; sin efectos secundarios ni mutación. |
| **Provider** | Componente de React-Redux que recibe el store y lo inyecta en el árbol; envuelve la app en `main.jsx`. |
| **Reducer** | Función (state, action) => newState; pura; usada en Redux. |
| **Scope** | Ámbito donde una variable es visible (global, función, bloque). |
| **Slice** | En Redux Toolkit: porción de estado + reducers + acciones generadas; se combina en `configureStore`. |
| **TDZ** | Temporal Dead Zone: zona donde let/const no son accesibles hasta su línea de declaración. |
| **Thunk** | Función que devuelve una función (en Redux: async thunk para side effects y dispatch). |
| **Truthy/Falsy** | Valores que se evalúan como true/false en contextos booleanos. |

---

## Comandos: Vite (React), Redux, ESLint

| Qué | Comando |
|-----|--------|
| **Crear proyecto Vite + React** | `npm create vite@latest nombre-app -- --template react` |
| **Entrar e instalar dependencias** | `cd nombre-app` → `npm install` |
| **Arrancar en desarrollo** | `npm run dev` |
| **Añadir Redux a un proyecto React** | `npm install @reduxjs/toolkit react-redux` |
| **Instalar ESLint (React)** | `npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh` |
| **Inicializar config de ESLint** | `npx eslint --init` (elegir JavaScript, React, browser) |
| **Script lint en package.json** | Añadir `"lint": "eslint src/"` y ejecutar con `npm run lint` |

Crear proyecto dentro de la carpeta actual: `npm create vite@latest . -- --template react` (el `.` es la carpeta actual).

---

## Referencia rápida React + Redux

- **Provider:** `<Provider store={store}>` en `main.jsx`; el store se crea con `configureStore({ reducer: { nombre: slice.reducer } })`.
- **Leer estado:** `useSelector(state => state.nombreSlice.campo)`; el componente se re-renderiza cuando ese trozo de estado cambia.
- **Despachar:** `const dispatch = useDispatch();` y luego `dispatch(accion())` o `dispatch(thunk())` (p. ej. en `useEffect` o en un click).
- **Thunk con argumento:** `dispatch(fetchDetalle(id))`; el thunk recibe `id` como primer argumento del payloadCreator.
- Detalle: [cap. 19 - React](19-react-desde-cero.md) y [cap. 20 - React + Redux](20-react-redux-bridge.md).

---

## Recursos (opcional)

- **MDN (JavaScript)**: documentación de referencia de la Web.
- **ECMAScript**: especificación del lenguaje; para profundizar en comportamiento.
- **Redux**: documentación oficial y Redux Toolkit para thunks y slices.
- **React**: documentación oficial; hooks y "Thinking in React" para estado y flujo de datos.

---

**[⬅ Volver al índice](../README.md)**
