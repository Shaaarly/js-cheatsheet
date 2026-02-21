# Guía completa de JavaScript para DAW <a id="inicio"></a>

Guía técnica de JavaScript desde cero hasta nivel avanzado: tipos, estructuras, funciones, objetos, arrays, módulos, DOM, eventos, fetch, promesas, async/await, errores, patrones comunes; **React desde cero** (componentes, estado, mini apps) y **React + Redux** (reducers, async thunks).

**Contenido de esta página:** [Cómo usar esta guía](#cómo-usar-esta-guía) · [Índice maestro](#índice-maestro-table-of-contents) · [Referencia rápida](#referencia-rápida) · [Mapa de navegación por tema](#mapa-de-navegación-por-tema) · [Convenciones](#convenciones-de-la-guía)

---

## Cómo usar esta guía

### Ruta rápida para examen
1. **[01 - Fundamentos](javascript-guia/docs/01-basics.md)** → variables, operadores, control de flujo  
2. **[02 - Tipos y coerción](javascript-guia/docs/02-types-coercion.md)** → primitives vs reference, `==` vs `===`, truthy/falsy  
3. **[05 - Arrays](javascript-guia/docs/05-arrays.md)** → métodos mutadores y no mutadores, pipelines  
4. **[07 - Funciones](javascript-guia/docs/07-functions.md)** → declarations, arrow, closures, HOF  
5. **[08 - Scope, hoisting y this](javascript-guia/docs/08-scope-hoisting-this.md)** → lexical scope, `this`, bind/call/apply  
6. **[12 - Promesas](javascript-guia/docs/12-promises.md)**, **[13 - Async/Await](javascript-guia/docs/13-async-await.md)** y **[14 - Fetch y APIs](javascript-guia/docs/14-fetch-apis.md)** — con **ejercicios usando la [PokeAPI](https://pokeapi.co/)** para practicar con datos reales (sin API key).  
7. **[18 - Testing mental para examen](javascript-guia/docs/18-exam-mental-test.md)** → ejercicios tipo examen  
8. **[19 - React desde cero](javascript-guia/docs/19-react-desde-cero.md)** → componentes, estado, efectos; mini apps  
9. **[20 - Puente a React + Redux](javascript-guia/docs/20-react-redux-bridge.md)** → reducers, async thunks (opcional)  
10. **[Cheat sheet](javascript-guia/docs/cheatsheet.md)** → tabla rápida de métodos  

### Ruta larga (estudio completo)
Sigue el índice maestro en orden. Cada capítulo incluye ejemplos, trampas de examen, checklist y mini-ejercicios. En los capítulos de asincronía (12, 13, 14) hay ejercicios extra con PokeAPI.

---

## Índice maestro (Table of Contents) <a id="índice-maestro-table-of-contents"></a>

### Parte I — Fundamentos <a id="parte-i"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 0 | [Cómo usar esta guía](#cómo-usar-esta-guía) | Ruta rápida y ruta larga |
| 1 | [01 - Fundamentos](javascript-guia/docs/01-basics.md) | Sintaxis, variables, operadores, control de flujo |
| 2 | [02 - Tipos y coerción](javascript-guia/docs/02-types-coercion.md) | Primitives vs reference, truthy/falsy, `==` vs `===` |
| 3 | [03 - Strings](javascript-guia/docs/03-strings.md) | Métodos y casos reales |
| 4 | [04 - Numbers, Math, Intl y fechas](javascript-guia/docs/04-numbers-math-dates.md) | Métodos y casos reales |

### Parte II — Estructuras de datos <a id="parte-ii"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 5 | [05 - Arrays](javascript-guia/docs/05-arrays.md) | Mutadores, no mutadores, iteración, pipelines |
| 6 | [06 - Objetos](javascript-guia/docs/06-objects.md) | CRUD, Object.keys/values/entries, prototipos, clases |

### Parte III — Funciones y contexto <a id="parte-iii"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 7 | [07 - Funciones](javascript-guia/docs/07-functions.md) | Declarations, expressions, arrow, closures, HOF |
| 8 | [08 - Scope, hoisting y this](javascript-guia/docs/08-scope-hoisting-this.md) | Lexical scope, block scope, `this`, bind/call/apply |

### Parte IV — Módulos y errores <a id="parte-iv"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 9 | [09 - Módulos](javascript-guia/docs/09-modules.md) | import/export, named vs default, organización |
| 10 | [10 - Manejo de errores](javascript-guia/docs/10-error-handling.md) | try/catch/finally, throw, custom errors |

### Parte V — Asincronía <a id="parte-v"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 11 | [11 - Asincronía y Event Loop](javascript-guia/docs/11-async-event-loop.md) | Call stack, microtasks, macrotasks |
| 12 | [12 - Promesas](javascript-guia/docs/12-promises.md) | new Promise, then/catch/finally, all/allSettled/race/any |
| 13 | [13 - Async/Await](javascript-guia/docs/13-async-await.md) | Secuencial vs paralelo, manejo de errores |
| 14 | [14 - Fetch y APIs](javascript-guia/docs/14-fetch-apis.md) | GET/POST/PUT/PATCH/DELETE, headers, abort, retries |

### Parte VI — DOM y navegador <a id="parte-vi"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 15 | [15 - DOM](javascript-guia/docs/15-dom.md) | querySelector, createElement, classList, dataset, performance |
| 16 | [16 - Eventos](javascript-guia/docs/16-events.md) | Bubbling/capture, delegation, forms |
| 17 | [17 - Storage y navegador](javascript-guia/docs/17-storage-browser.md) | localStorage, sessionStorage, cookies, JSON |

### Parte VII — Examen, React y Redux <a id="parte-vii"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 18 | [18 - Testing mental para examen](javascript-guia/docs/18-exam-mental-test.md) | Ejercicios tipo examen por bloques |
| 19 | [19 - React desde cero](javascript-guia/docs/19-react-desde-cero.md) | Componentes, estado, efectos; mini apps para practicar |
| 20 | [20 - Puente a React + Redux](javascript-guia/docs/20-react-redux-bridge.md) | Inmutabilidad, reducers, async thunks; usa las mini apps del cap. 19 |
| 21 | [21 - Apéndices](javascript-guia/docs/21-appendices.md) | Tabla rápida, glosario, recursos |

### Referencia rápida

| Recurso | Enlace |
|---------|--------|
| **Cheat sheet** (tablas de métodos) | [javascript-guia/docs/cheatsheet.md](javascript-guia/docs/cheatsheet.md) |
| **Ejercicios adicionales** | [javascript-guia/docs/exercises.md](javascript-guia/docs/exercises.md) (opcional) |
| **Soluciones** | [javascript-guia/docs/solutions.md](javascript-guia/docs/solutions.md) (opcional) |

---

## Mapa de navegación por tema

- **Variables y tipos** → [01](javascript-guia/docs/01-basics.md), [02](javascript-guia/docs/02-types-coercion.md)  
- **Strings / Numbers / Fechas** → [03](javascript-guia/docs/03-strings.md), [04](javascript-guia/docs/04-numbers-math-dates.md)  
- **Arrays (mutar vs no mutar)** → [05](javascript-guia/docs/05-arrays.md), [cheatsheet](javascript-guia/docs/cheatsheet.md)  
- **Objetos y clases** → [06](javascript-guia/docs/06-objects.md)  
- **Funciones y closures** → [07](javascript-guia/docs/07-functions.md), [08](javascript-guia/docs/08-scope-hoisting-this.md)  
- **Módulos** → [09](javascript-guia/docs/09-modules.md)  
- **Errores** → [10](javascript-guia/docs/10-error-handling.md)  
- **Async: Event Loop, Promesas, Async/Await** → [11](javascript-guia/docs/11-async-event-loop.md), [12](javascript-guia/docs/12-promises.md), [13](javascript-guia/docs/13-async-await.md)  
- **APIs (fetch)** → [14](javascript-guia/docs/14-fetch-apis.md)  
- **DOM y eventos** → [15](javascript-guia/docs/15-dom.md), [16](javascript-guia/docs/16-events.md)  
- **Storage** → [17](javascript-guia/docs/17-storage-browser.md)  
- **Examen** → [18](javascript-guia/docs/18-exam-mental-test.md)  
- **React** → [19](javascript-guia/docs/19-react-desde-cero.md) · **React/Redux** → [20](javascript-guia/docs/20-react-redux-bridge.md)  

---

## Convenciones de la guía

- **Muta / No muta**: en arrays y objetos se indica explícitamente si el método modifica el original.
- **Complejidad**: se indica O(n), O(1) cuando es relevante para exámenes o entrevistas.
- **Ejemplos**: orientados a casos de app real (pedidos, formularios, APIs, DOM).
- **Español**: neutro, profesional, directo.

**[⬅ Inicio](#inicio)**
