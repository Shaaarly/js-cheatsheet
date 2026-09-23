# Índice de capítulos <a id="inicio"></a>

Listado de toda la guía. Qué ruta seguir, qué se aprende en cada una y en qué orden leer está en la [guía de rutas](../README.md).

Los capítulos enlazan aquí con «Volver al índice». Varios abren con un aviso de primera lectura: esas secciones son las de la ruta desde cero; el resto es dominio o React.

**Contenido de esta página:** [Índice maestro](#índice-maestro-table-of-contents) · [Referencia rápida](#referencia-rápida) · [Mapa de navegación por tema](#mapa-de-navegación-por-tema) · [Convenciones](#convenciones-de-la-guía)

---

## Índice maestro (Table of Contents) <a id="índice-maestro-table-of-contents"></a>

### Parte I — Fundamentos <a id="parte-i"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 0 | [Guía de rutas](../README.md) | Para quién es cada ruta, objetivos y recomendaciones |
| 00 | [00 - Entorno y primer programa](docs/00-entorno-y-primer-programa.md) | Consola, Node y `<script>` |
| 1 | [01 - Fundamentos](docs/01-basics.md) | Sintaxis, variables, operadores, control de flujo |
| 2 | [02 - Tipos y coerción](docs/02-types-coercion.md) | Primitives vs reference, truthy/falsy, `==` vs `===` |
| 3 | [03 - Strings](docs/03-strings.md) | Métodos y casos reales |
| 4 | [04 - Numbers, Math, Intl y fechas](docs/04-numbers-math-dates.md) | Métodos y casos reales |

### Parte II — Estructuras de datos <a id="parte-ii"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 5 | [05 - Arrays](docs/05-arrays.md) | Mutadores, no mutadores, iteración, pipelines |
| 6 | [06 - Objetos](docs/06-objects.md) | CRUD, Object.keys/values/entries, prototipos, clases |

### Parte III — Funciones y contexto <a id="parte-iii"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 7 | [07 - Funciones](docs/07-functions.md) | Declarations, expressions, arrow, closures, HOF |
| 07b | [07b - Temporizadores](docs/07b-temporizadores.md) | setTimeout, setInterval, delay, debounce |
| 8 | [08 - Scope, hoisting y this](docs/08-scope-hoisting-this.md) | Lexical scope, block scope, `this`, bind/call/apply |
| 08b | [08b - Map, Set y regex](docs/08b-map-set-regex.md) | Colecciones y expresiones regulares mínimas |

### Parte IV — Módulos y errores <a id="parte-iv"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 9 | [09 - Módulos](docs/09-modules.md) | import/export, named vs default, organización |
| 10 | [10 - Manejo de errores](docs/10-error-handling.md) | try/catch/finally, throw, custom errors |

### Parte V — Asincronía <a id="parte-v"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 11 | [11 - Asincronía y Event Loop](docs/11-async-event-loop.md) | Call stack, microtasks, macrotasks |
| 12 | [12 - Promesas](docs/12-promises.md) | new Promise, then/catch/finally, all/allSettled/race/any |
| 13 | [13 - Async/Await](docs/13-async-await.md) | Secuencial vs paralelo, manejo de errores |
| 14 | [14 - Fetch y APIs](docs/14-fetch-apis.md) | GET/POST/PUT/PATCH/DELETE, headers, abort, retries |

### Parte VI — DOM y navegador <a id="parte-vi"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 15 | [15 - DOM](docs/15-dom.md) | querySelector, createElement, classList, dataset, performance |
| 16 | [16 - Eventos](docs/16-events.md) | Bubbling/capture, delegation, forms |
| 17 | [17 - Storage y navegador](docs/17-storage-browser.md) | localStorage, sessionStorage, cookies, JSON |

### Parte VII — Examen, React y Redux <a id="parte-vii"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 18 | [18 - Testing mental para examen](docs/18-exam-mental-test.md) | Ejercicios tipo examen por bloques |
| 19 | [19 - React desde cero](docs/19-react-desde-cero.md) | Componentes, estado, efectos; mini apps para practicar |
| 20 | [20 - Puente a React + Redux](docs/20-react-redux-bridge.md) | Inmutabilidad, reducers, async thunks; usa las mini apps del cap. 19 |
| 20a | [20a - Ejemplo completo React + Redux](docs/20a-ejemplo-mini-app-redux.md) | Mini app de referencia: store, 2 slices, thunk, selectores, localStorage |
| 21 | [21 - Apéndices](docs/21-appendices.md) | Tabla rápida, glosario, recursos |

### Parte VIII — TypeScript y Playwright <a id="parte-viii"></a>

| # | Capítulo | Descripción |
|---|----------|-------------|
| 22 | [22 - TypeScript desde JS](docs/22-typescript-fundamentos.md) | Anotaciones, uniones, estrechamiento, unknown |
| 23 | [23 - Funciones, clases y genéricos](docs/23-typescript-funciones-clases.md) | Promise, clases, import type, test.extend |
| 24 | [24 - Puente a Playwright](docs/24-puente-playwright.md) | Un test, locators, timeouts y un page object |

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
- **Temporizadores** → [07b](docs/07b-temporizadores.md)  
- **Map, Set y regex** → [08b](docs/08b-map-set-regex.md)  
- **Módulos** → [09](docs/09-modules.md)  
- **Errores** → [10](docs/10-error-handling.md)  
- **Async: Event Loop, Promesas, Async/Await** → [11](docs/11-async-event-loop.md), [12](docs/12-promises.md), [13](docs/13-async-await.md)  
- **APIs (fetch)** → [14](docs/14-fetch-apis.md)  
- **DOM y eventos** → [15](docs/15-dom.md), [16](docs/16-events.md)  
- **Storage** → [17](docs/17-storage-browser.md)  
- **Examen** → [18](docs/18-exam-mental-test.md)  
- **React** → [19](docs/19-react-desde-cero.md) · **React/Redux** → [20](docs/20-react-redux-bridge.md) · **Ejemplo completo Redux** → [20a](docs/20a-ejemplo-mini-app-redux.md)  
- **TypeScript** → [22](docs/22-typescript-fundamentos.md), [23](docs/23-typescript-funciones-clases.md)  
- **Playwright** → [24](docs/24-puente-playwright.md)  

---

## Convenciones de la guía

- **Muta / No muta**: en arrays y objetos se indica explícitamente si el método modifica el original.
- **Complejidad**: se indica O(n), O(1) cuando es relevante para exámenes o entrevistas.
- **Ejemplos**: orientados a casos de app real (pedidos, formularios, APIs, DOM).
- **Español**: neutro, profesional, directo.

**[⬅ Inicio](#inicio)**
