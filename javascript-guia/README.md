# Guía completa de JavaScript para DAW

Guía técnica de JavaScript desde cero hasta nivel avanzado: tipos, estructuras, funciones, objetos, arrays, módulos, DOM, eventos, fetch, promesas, async/await, errores, patrones comunes y preparación directa para **React + Redux** (async thunks y manejo de estado).

---

## Cómo usar esta guía

### Ruta rápida para examen
1. **[01 - Fundamentos](docs/01-basics.md)** → variables, operadores, control de flujo  
2. **[02 - Tipos y coerción](docs/02-types-coercion.md)** → primitives vs reference, `==` vs `===`, truthy/falsy  
3. **[05 - Arrays](docs/05-arrays.md)** → métodos mutadores y no mutadores, pipelines  
4. **[07 - Funciones](docs/07-functions.md)** → declarations, arrow, closures, HOF  
5. **[08 - Scope, hoisting y this](docs/08-scope-hoisting-this.md)** → lexical scope, `this`, bind/call/apply  
6. **[12 - Promesas](docs/12-promises.md)**, **[13 - Async/Await](docs/13-async-await.md)** y **[14 - Fetch y APIs](docs/14-fetch-apis.md)** — con **ejercicios usando la [PokeAPI](https://pokeapi.co/)** para practicar con datos reales (sin API key).  
7. **[18 - Testing mental para examen](docs/18-exam-mental-test.md)** → ejercicios tipo examen  
8. **[Cheat sheet](docs/cheatsheet.md)** → tabla rápida de métodos  

### Ruta larga (estudio completo)
Sigue el índice maestro en orden. Cada capítulo incluye ejemplos, trampas de examen, checklist y mini-ejercicios. En los capítulos de asincronía (12, 13, 14) hay ejercicios extra con PokeAPI.

---

## Índice maestro (Table of Contents)

### Parte I — Fundamentos

| # | Capítulo | Descripción |
|---|----------|-------------|
| 0 | [Cómo usar esta guía](#cómo-usar-esta-guía) | Ruta rápida y ruta larga |
| 1 | [01 - Fundamentos](docs/01-basics.md) | Sintaxis, variables, operadores, control de flujo |
| 2 | [02 - Tipos y coerción](docs/02-types-coercion.md) | Primitives vs reference, truthy/falsy, `==` vs `===` |
| 3 | [03 - Strings](docs/03-strings.md) | Métodos y casos reales |
| 4 | [04 - Numbers, Math, Intl y fechas](docs/04-numbers-math-dates.md) | Métodos y casos reales |

### Parte II — Estructuras de datos

| # | Capítulo | Descripción |
|---|----------|-------------|
| 5 | [05 - Arrays](docs/05-arrays.md) | Mutadores, no mutadores, iteración, pipelines |
| 6 | [06 - Objetos](docs/06-objects.md) | CRUD, Object.keys/values/entries, prototipos, clases |

### Parte III — Funciones y contexto

| # | Capítulo | Descripción |
|---|----------|-------------|
| 7 | [07 - Funciones](docs/07-functions.md) | Declarations, expressions, arrow, closures, HOF |
| 8 | [08 - Scope, hoisting y this](docs/08-scope-hoisting-this.md) | Lexical scope, block scope, `this`, bind/call/apply |

### Parte IV — Módulos y errores

| # | Capítulo | Descripción |
|---|----------|-------------|
| 9 | [09 - Módulos](docs/09-modules.md) | import/export, named vs default, organización |
| 10 | [10 - Manejo de errores](docs/10-error-handling.md) | try/catch/finally, throw, custom errors |

### Parte V — Asincronía

| # | Capítulo | Descripción |
|---|----------|-------------|
| 11 | [11 - Asincronía y Event Loop](docs/11-async-event-loop.md) | Call stack, microtasks, macrotasks |
| 12 | [12 - Promesas](docs/12-promises.md) | new Promise, then/catch/finally, all/allSettled/race/any |
| 13 | [13 - Async/Await](docs/13-async-await.md) | Secuencial vs paralelo, manejo de errores |
| 14 | [14 - Fetch y APIs](docs/14-fetch-apis.md) | GET/POST/PUT/PATCH/DELETE, headers, abort, retries |

### Parte VI — DOM y navegador

| # | Capítulo | Descripción |
|---|----------|-------------|
| 15 | [15 - DOM](docs/15-dom.md) | querySelector, createElement, classList, dataset, performance |
| 16 | [16 - Eventos](docs/16-events.md) | Bubbling/capture, delegation, forms |
| 17 | [17 - Storage y navegador](docs/17-storage-browser.md) | localStorage, sessionStorage, cookies, JSON |

### Parte VII — Examen y React/Redux

| # | Capítulo | Descripción |
|---|----------|-------------|
| 18 | [18 - Testing mental para examen](docs/18-exam-mental-test.md) | Ejercicios tipo examen por bloques |
| 19 | [19 - Puente a React + Redux](docs/19-react-redux-bridge.md) | Inmutabilidad, reducers, async thunks, patrones |
| 20 | [20 - Apéndices](docs/20-appendices.md) | Tabla rápida, glosario, recursos |

### Referencia rápida

| Recurso | Enlace |
|---------|--------|
| **Cheat sheet** (tablas de métodos) | [docs/cheatsheet.md](docs/cheatsheet.md) |
| **Ejercicios adicionales** | [docs/exercises.md](docs/exercises.md) (opcional) |
| **Soluciones** | [docs/solutions.md](docs/solutions.md) (opcional) |

---

## Mapa de navegación por tema

- **Variables y tipos** → [01](docs/01-basics.md), [02](docs/02-types-coercion.md)  
- **Strings / Numbers / Fechas** → [03](docs/03-strings.md), [04](docs/04-numbers-math-dates.md)  
- **Arrays (mutar vs no mutar)** → [05](docs/05-arrays.md), [cheatsheet](docs/cheatsheet.md)  
- **Objetos y clases** → [06](docs/06-objects.md)  
- **Funciones y closures** → [07](docs/07-functions.md), [08](docs/08-scope-hoisting-this.md)  
- **Módulos** → [09](docs/09-modules.md)  
- **Errores** → [10](docs/10-error-handling.md)  
- **Async: Event Loop, Promesas, Async/Await** → [11](docs/11-async-event-loop.md), [12](docs/12-promises.md), [13](docs/13-async-await.md)  
- **APIs (fetch)** → [14](docs/14-fetch-apis.md)  
- **DOM y eventos** → [15](docs/15-dom.md), [16](docs/16-events.md)  
- **Storage** → [17](docs/17-storage-browser.md)  
- **Examen** → [18](docs/18-exam-mental-test.md)  
- **React/Redux** → [19](docs/19-react-redux-bridge.md)  

---

## Convenciones de la guía

- **Muta / No muta**: en arrays y objetos se indica explícitamente si el método modifica el original.
- **Complejidad**: se indica O(n), O(1) cuando es relevante para exámenes o entrevistas.
- **Ejemplos**: orientados a casos de app real (pedidos, formularios, APIs, DOM).
- **Español**: neutro, profesional, directo.

**[⬅ Inicio](#guía-completa-de-javascript-para-daw)**
