# 20. Apéndices: tabla rápida, glosario, debugging, buenas prácticas, recursos

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
| **Closure** | Función que “recuerda” variables del ámbito donde fue creada. |
| **Coerción** | Conversión implícita de tipo (ej. string a number en operaciones). |
| **DOM** | Document Object Model; representación en memoria del documento HTML como árbol de nodos. |
| **Event loop** | Mecanismo que ejecuta tareas: call stack, cola de microtasks, cola de macrotasks. |
| **Hoisting** | “Elevación” de declaraciones (var, function) al inicio de su scope. |
| **Inmutabilidad** | No modificar datos en sitio; crear copias para cambios. |
| **Microtask** | Tarea con prioridad sobre macrotasks (then/catch/finally de promesas, queueMicrotask). |
| **Mutador** | Método que modifica el objeto/array original (ej. push, sort, splice). |
| **Pure function** | Misma entrada → misma salida; sin efectos secundarios ni mutación. |
| **Reducer** | Función (state, action) => newState; pura; usada en Redux. |
| **Scope** | Ámbito donde una variable es visible (global, función, bloque). |
| **TDZ** | Temporal Dead Zone: zona donde let/const no son accesibles hasta su línea de declaración. |
| **Thunk** | Función que devuelve una función (en Redux: async thunk para side effects y dispatch). |
| **Truthy/Falsy** | Valores que se evalúan como true/false en contextos booleanos. |

---

## Recursos (opcional)

- **MDN (JavaScript)**: documentación de referencia de la Web.
- **ECMAScript**: especificación del lenguaje; para profundizar en comportamiento.
- **Redux**: documentación oficial y Redux Toolkit para thunks y slices.
- **React**: documentación oficial; hooks y “Thinking in React” para estado y flujo de datos.

---

**[⬅ Volver al índice](../README.md)**
