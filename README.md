# Guía completa de JavaScript para DAW <a id="inicio"></a>

Esta página explica **qué es cada ruta**, **qué sabrás al terminarla** y **cómo conviene estudiarla**. El listado de todos los capítulos está en el [índice maestro](javascript-guia/README.md).

No sigas el orden de los archivos (`01`, `02`, `03`…). Cada capítulo termina con un enlace **Siguiente en la ruta desde cero**. Si un archivo abre con un aviso de “primera lectura”, lee solo esas secciones y deja el resto para la ruta de dominio.

---

## Cómo elegir

| Si tu situación es… | Empieza por |
|---------------------|-------------|
| No has programado, o JavaScript es el primer lenguaje | [Ruta 1](#ruta-1--desde-cero). Luego, si quieres profundizar, la [ruta 2](#ruta-2--dominio-del-lenguaje) |
| Ya programas y preparas el examen de DAW | El [atajo de examen](#atajo-de-examen) y después el capítulo 18 |
| Quieres escribir tests con Playwright | [Ruta 3](#ruta-3--bases-para-playwright). Incluye el JavaScript justo y el paso a TypeScript |
| Ya sabes JavaScript y quieres TypeScript | [Ruta 4](#ruta-4--typescript-desde-javascript) |
| Quieres React y Redux | Primero la ruta 1 (o el atajo). Después la [ruta 5](#ruta-5--react-y-redux) |

Recomendación general: haz los ejercicios del capítulo antes de pasar al siguiente. Las soluciones están en `<details>`, al final. En asincronía hay ejercicios con la [PokeAPI](https://pokeapi.co/), sin API key.

---

## Ruta 1 — Desde cero

**Para quién.** Quien todavía no escribe programas, o ha visto JavaScript suelto y no tiene un orden.

**Al terminar sabrás.** Ejecutar código en la consola y con Node, usar variables, condiciones y bucles, escribir funciones, recorrer textos, números, objetos y arrays, leer y escribir módulos, capturar errores, esperar con temporizadores, consumir una API con `fetch` y tocar el DOM, los eventos y `localStorage`.

**Recomendación.** Respeta los avisos de primera lectura. `map` y `filter` van después de las funciones, porque reciben otra función. `var`, hoisting, `==`, prototipos y `Date`/`Intl` no hacen falta todavía: están en la ruta 2.

1. **[00 - Entorno](javascript-guia/docs/00-entorno-y-primer-programa.md)** — consola, Node y un `<script>`
2. **[01 - Fundamentos](javascript-guia/docs/01-basics.md)** — `let`/`const`, operadores, `if` y bucles
3. **[02 - Tipos](javascript-guia/docs/02-types-coercion.md)** — primitivos, truthy/falsy y `===`
4. **[07 - Funciones](javascript-guia/docs/07-functions.md)** — declaración, arrow y callbacks (secciones 1 y 2)
5. **[03 - Strings](javascript-guia/docs/03-strings.md)** y **[04 - Numbers](javascript-guia/docs/04-numbers-math-dates.md)** — secciones 1 a 3 del capítulo 4
6. **[06 - Objetos](javascript-guia/docs/06-objects.md)** — secciones 1 a 3, incluida la desestructuración
7. **[05 - Arrays](javascript-guia/docs/05-arrays.md)** — primera pasada: índice, `push`, `pop`, `for...of`, `includes`. Segunda pasada: `map`, `filter`, `reduce`
8. **[10 - Errores](javascript-guia/docs/10-error-handling.md)** y **[09 - Módulos](javascript-guia/docs/09-modules.md)**
9. **[07b - Temporizadores](javascript-guia/docs/07b-temporizadores.md)** — `setTimeout`, `setInterval`, `delay`
10. **[12 - Promesas](javascript-guia/docs/12-promises.md)** (secciones 1 y 2), **[13 - Async/Await](javascript-guia/docs/13-async-await.md)** (secciones 1 y 3), **[11 - Event loop](javascript-guia/docs/11-async-event-loop.md)** y **[14 - Fetch](javascript-guia/docs/14-fetch-apis.md)**
11. **[15 - DOM](javascript-guia/docs/15-dom.md)**, **[16 - Eventos](javascript-guia/docs/16-events.md)** y **[17 - Storage](javascript-guia/docs/17-storage-browser.md)** — en 16 y 17, salta las secciones marcadas como React

---

## Ruta 2 — Dominio del lenguaje

**Para quién.** Quien ha terminado la ruta 1 y quiere el lenguaje entero, o quien prepara examen y trampas de entrevista.

**Al terminar sabrás.** Por qué `==` convierte tipos, cómo funcionan el scope, el hoisting y `this`, prototipos y clases, fechas, `Map`/`Set` y una regex mínima. El capítulo 18 sirve para comprobar ese nivel.

**Recomendación.** No empieces aquí. Estas secciones están escritas como ampliación de capítulos que ya leíste en la ruta 1.

1. **[02](javascript-guia/docs/02-types-coercion.md)** — coerción y `==`
2. **[08 - Scope, hoisting y this](javascript-guia/docs/08-scope-hoisting-this.md)**
3. **[06](javascript-guia/docs/06-objects.md)** — prototipos y clases; **[04](javascript-guia/docs/04-numbers-math-dates.md)** — `Date` e `Intl`
4. **[08b - Map, Set y regex](javascript-guia/docs/08b-map-set-regex.md)**
5. **[01](javascript-guia/docs/01-basics.md)** — `var`, hoisting, `?.` y `??`
6. **[18 - Examen DAW](javascript-guia/docs/18-exam-mental-test.md)** — comprobación, no un tema nuevo

---

## Ruta 3 — Bases para Playwright

**Para quién.** Quien va a escribir tests de extremo a extremo y no necesita React ni manipular el DOM a mano.

**Al terminar sabrás.** El JavaScript que aparece en un test (`async ({ page }) =>`, `await`, módulos, clases, errores), distinguir `setTimeout` del timeout de Playwright, leer tipos de TypeScript y escribir un page object mínimo.

**Recomendación.** Si ya dominas la ruta 1, no la repitas: entra por las clases del capítulo 6 y sigue en los capítulos 22, 23 y 24. Si no, haz esta lista. `filter` va después de las funciones, porque el callback todavía no existe. El event loop ([11](javascript-guia/docs/11-async-event-loop.md)) es opcional: explica por qué `await` no congela el resto del runner. Esta ruta no incluye DOM, eventos, storage, React ni Redux.

1. **[00](javascript-guia/docs/00-entorno-y-primer-programa.md)** — Node
2. **[01](javascript-guia/docs/01-basics.md)** primera lectura y **[02](javascript-guia/docs/02-types-coercion.md)** tipos y `===`
3. **[03 - Strings](javascript-guia/docs/03-strings.md)** y la regex mínima de **[08b](javascript-guia/docs/08b-map-set-regex.md)** (`toHaveURL(/intro/)`)
4. **[05 - Arrays](javascript-guia/docs/05-arrays.md)** `length` e `includes`, y **[06 - Objetos](javascript-guia/docs/06-objects.md)** con `{ page }`
5. **[07 - Funciones](javascript-guia/docs/07-functions.md)** y, ya con callbacks, `filter` en el [capítulo 5](javascript-guia/docs/05-arrays.md). Después **[09 - Módulos](javascript-guia/docs/09-modules.md)** y **[10 - Errores](javascript-guia/docs/10-error-handling.md)**
6. **[07b - Temporizadores](javascript-guia/docs/07b-temporizadores.md)** — para no confundirlos con el timeout de un test
7. **[12 - Promesas](javascript-guia/docs/12-promises.md)** y **[13 - Async/Await](javascript-guia/docs/13-async-await.md)**
8. **[06](javascript-guia/docs/06-objects.md)** — sección de clases (page object)
9. **[22](javascript-guia/docs/22-typescript-fundamentos.md)**, **[23](javascript-guia/docs/23-typescript-funciones-clases.md)** y **[24 - Puente a Playwright](javascript-guia/docs/24-puente-playwright.md)**

---

## Ruta 4 — TypeScript desde JavaScript

**Para quién.** Quien ya escribe JavaScript (ruta 1, al menos hasta promesas y las clases del capítulo 6) y quiere el lenguaje que usa Playwright por defecto.

**Al terminar sabrás.** Anotar tipos, dejar que el editor los infiera, uniones, estrechamiento, `unknown`, funciones `async` que devuelven `Promise`, clases con `readonly`, y leer un genérico como `test.extend<...>()`.

**Recomendación.** TypeScript no cambia lo que el programa hace al ejecutarse: los tipos desaparecen. Si un ejercicio `.js` de la guía ya te sale, pásalo a `.ts` hasta que compile. El capítulo 24 aplica eso a un test; no sustituye la documentación de Playwright.

1. **[22 - Fundamentos](javascript-guia/docs/22-typescript-fundamentos.md)**
2. **[23 - Funciones, clases y genéricos](javascript-guia/docs/23-typescript-funciones-clases.md)**
3. **[24 - Puente a Playwright](javascript-guia/docs/24-puente-playwright.md)**

---

## Ruta 5 — React y Redux

**Para quién.** Quien ya tiene la ruta 1 (DOM, eventos, promesas, inmutabilidad de arrays y objetos) y quiere componentes, estado y Redux.

**Al terminar sabrás.** Crear componentes, pasar props, guardar estado con `useState`, efectos con `useEffect`, y sustituir ese estado local por reducers y thunks.

**Recomendación.** El [capítulo 18](javascript-guia/docs/18-exam-mental-test.md) cierra la ruta de dominio. No enseña React ni hace falta para empezarlo. Entra en el 19 cuando la ruta 1 (o el atajo de examen) esté hecha. Las secciones “de JS básico a React” de los capítulos 16 y 17 se leen aquí, no durante la ruta 1.

1. **[19 - React desde cero](javascript-guia/docs/19-react-desde-cero.md)**
2. **[20 - React + Redux](javascript-guia/docs/20-react-redux-bridge.md)** y **[20a - Ejemplo](javascript-guia/docs/20a-ejemplo-mini-app-redux.md)**
3. **[Cheat sheet HTML y CSS en React](javascript-guia/docs/react-cheatsheet-html-css.md)**
4. Examen práctico opcional: [app de tareas, de JS a React y a Redux](ejercicios-js/21-examen-js-react-redux/) (~3 h)

---

## Atajo de examen

**Para quién.** Quien ya programa y quiere repasar trampas de DAW, no aprender el lenguaje desde el primer `console.log`.

**Al terminar.** Puedes enfrentarte al capítulo 18 y, si el examen incluye React, seguir por el 19 y el 20.

**Recomendación.** Si algo de esta lista no te suena, vuelve a esa lección en la ruta 1 en lugar de memorizar la trampa.

[01](javascript-guia/docs/01-basics.md), [02](javascript-guia/docs/02-types-coercion.md), [05](javascript-guia/docs/05-arrays.md), [07](javascript-guia/docs/07-functions.md), [08](javascript-guia/docs/08-scope-hoisting-this.md), [12](javascript-guia/docs/12-promises.md), [13](javascript-guia/docs/13-async-await.md), [14](javascript-guia/docs/14-fetch-apis.md), [18](javascript-guia/docs/18-exam-mental-test.md), [19](javascript-guia/docs/19-react-desde-cero.md), [20](javascript-guia/docs/20-react-redux-bridge.md).

---

**Índice de todos los capítulos:** [javascript-guia/README.md](javascript-guia/README.md)

**[⬅ Inicio](#inicio)**
