# 7b. Temporizadores: setTimeout, setInterval y delay

**[⬅ Volver al índice](../README.md)**

**Qué problema resuelve:** ejecutar una función más tarde, repetirla cada cierto tiempo, o cancelarla antes de que ocurra.

**Qué necesitas saber antes:** [funciones y arrow functions](07-functions.md). Las promesas (`delay`) se completan en el [capítulo 12](12-promises.md); aquí solo se presenta el patrón.

En la ruta desde cero, lee este capítulo antes de promesas, async/await y el event loop.

---

## Mini-índice del capítulo

1. [setTimeout y clearTimeout](#1-settimeout-y-cleartimeout)
2. [setInterval y clearInterval](#2-setinterval-y-clearinterval)
3. [El retardo es un mínimo](#3-el-retardo-es-un-mínimo)
4. [Pasa una función, no un string](#4-pasa-una-función-no-un-string)
5. [setTimeout recursivo](#5-settimeout-recursivo)
6. [delay: el timer como promesa](#6-delay-el-timer-como-promesa)
7. [debounce](#7-debounce)
8. [Timers en Node](#8-timers-en-node)
9. [Timer de JavaScript y timeout de una operación](#9-timer-de-javascript-y-timeout-de-una-operación)
10. [Checklist rápido](#10-checklist-rápido)
11. [Mini-ejercicios](#11-mini-ejercicios)
12. [Soluciones](#12-soluciones)

Referencia: [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout), [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval).

---

## 1. setTimeout y clearTimeout

`setTimeout(fn, ms)` programa **una** llamada a `fn` cuando hayan pasado al menos `ms` milisegundos. Devuelve un **id** numérico. `clearTimeout(id)` cancela esa llamada si todavía no se ha ejecutado.

```js
console.log("antes");

const id = setTimeout(() => {
  console.log("dentro");
}, 1000);

console.log("después");
// Orden: "antes", "después", y un segundo más tarde "dentro"
```

El código que sigue a `setTimeout` no espera. Por eso "después" sale antes que "dentro".

Cancelar:

```js
const id = setTimeout(() => console.log("no debe salir"), 1000);
clearTimeout(id);
```

---

## 2. setInterval y clearInterval

`setInterval(fn, ms)` llama a `fn` **cada** `ms` milisegundos, una vez tras otra, hasta que la canceles con `clearInterval(id)`.

```js
let n = 0;
const id = setInterval(() => {
  n += 1;
  console.log(n);
  if (n === 3) clearInterval(id);
}, 500);
```

`setTimeout` y `setInterval` comparten el mismo grupo de ids. Aun así, cancela cada uno con su pareja: `clearTimeout` con `setTimeout`, `clearInterval` con `setInterval`.

---

## 3. El retardo es un mínimo

`1000` significa "no antes de 1 segundo", no "exactamente al segundo". Si el hilo está ocupado con otro trabajo, la función espera a que ese trabajo termine.

`setTimeout(fn, 0)` tampoco significa "ahora". Significa "cuando acabes el código que ya está en marcha". El orden exacto frente a las promesas está en el [capítulo 11](11-async-event-loop.md). Léelo después de haber visto un timer y una promesa.

Los timers anidados (un timeout que programa otro) pueden imponer un mínimo de 4 ms a partir del quinto nivel. En la práctica: no uses timers para medir tiempos cortos con precisión.

---

## 4. Pasa una función, no un string

```js
setTimeout(() => console.log("ok"), 200);
```

La forma `setTimeout("console.log('ok')", 200)` trata el texto como código y es un riesgo de seguridad. Pasa siempre una función.

Los argumentos extra se reenvían a esa función:

```js
setTimeout((nombre) => console.log(nombre), 200, "Ana");
```

---

## 5. setTimeout recursivo

`setInterval` vuelve a disparar aunque la función anterior todavía no haya terminado. Si el trabajo dura más que el intervalo, las llamadas se pisan.

Programa la siguiente vuelta **al acabar** la actual:

```js
function tick() {
  console.log("tick", Date.now());
  setTimeout(tick, 1000);
}
tick();
```

Para poder pararlo, guarda el id:

```js
let id;
function tick() {
  console.log("tick");
  id = setTimeout(tick, 1000);
}
tick();
// más tarde:
clearTimeout(id);
```

---

## 6. delay: el timer como promesa

A veces quieres **esperar** y seguir en la línea de abajo. Eso es una promesa que se cumple cuando el timer dispara. El detalle de `new Promise` está en el capítulo 12; el patrón es este:

```js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log("inicio");
  await delay(500);
  console.log("medio segundo después");
}
```

`await delay(500)` pausa **esa función**, no el resto del programa. Quien no haya leído async/await puede saltar este apartado y volver después del capítulo 13.

---

## 7. debounce

`debounce(fn, ms)` devuelve una función que espera a que pasen `ms` **sin nuevas llamadas** antes de ejecutar `fn`. Cada llamada nueva cancela la anterior. Sirve para no reaccionar a cada tecla de un buscador.

```js
function debounce(fn, ms) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), ms);
  };
}

const buscar = debounce((texto) => console.log("busco", texto), 300);
buscar("a");
buscar("ab");
buscar("abc");
// una sola línea, "busco abc", 300 ms después de la última llamada
```

---

## 8. Timers en Node

En Node existen las mismas funciones globales `setTimeout` y `setInterval`. Además, el módulo `node:timers/promises` devuelve una promesa y se puede cancelar con `AbortSignal`:

```js
import { setTimeout as delay } from "node:timers/promises";

await delay(500);
console.log("listo");
```

Ese `import` es de módulos (capítulo 9). En el navegador usa el `delay` de la sección 6.

---

## 9. Timer de JavaScript y timeout de una operación

Un **timer** (`setTimeout`) programa una función.

Un **timeout de operación** es otra decisión: "si esta petición tarda más de N ms, cancélala". Se construye *con* un timer, pero el resultado es rechazar un `fetch` o abortar una señal. Dos formas, desarrolladas en el [capítulo 14](14-fetch-apis.md):

- `AbortController` + `setTimeout` + `clearTimeout`
- `AbortSignal.timeout(ms)`, que aborta solo y produce un error de nombre `TimeoutError`

En Playwright la palabra timeout es un tercer sistema: límite del test, de la aserción y de la acción. No se escribe con `setTimeout`. Está en el [capítulo 24](24-puente-playwright.md).

---

## 10. Checklist rápido

- [ ] `setTimeout` ejecuta una vez y devuelve un id; `clearTimeout` lo cancela.
- [ ] `setInterval` repite; `clearInterval` lo para.
- [ ] El retardo es un mínimo. `0` no significa "ahora mismo".
- [ ] Paso una función, no un string.
- [ ] Si el trabajo puede durar más que el intervalo, uso `setTimeout` recursivo.
- [ ] `delay(ms)` es el timer envuelto en una promesa.
- [ ] El timeout de un `fetch` o de Playwright no es la misma API que `setTimeout`.

---

## 11. Mini-ejercicios

1. Imprime `"listo"` un segundo después de `"ya"`, sin bloquear el `"ya"`.
2. Programa un mensaje a los 2 segundos y cancélalo antes de que salga.
3. Un reloj que imprima 1, 2 y 3 con `setInterval` y se pare al llegar a 3.
4. Escribe `delay(ms)` y una función `async` que imprima `"antes"`, espere 300 ms y luego `"después"`.
5. Implementa `debounce` y comprueba que tres llamadas seguidas solo disparan la última.
6. En una frase: qué hace `setTimeout` y qué hace el timeout de un test de Playwright.

---

## 12. Soluciones

<details>
<summary>1. Esperar 1 segundo</summary>

```js
console.log("ya");
setTimeout(() => console.log("listo"), 1000);
```
</details>

<details>
<summary>2. Cancelar</summary>

```js
const id = setTimeout(() => console.log("tarde"), 2000);
clearTimeout(id);
```
</details>

<details>
<summary>3. Reloj hasta 3</summary>

```js
let n = 0;
const id = setInterval(() => {
  n += 1;
  console.log(n);
  if (n === 3) clearInterval(id);
}, 1000);
```
</details>

<details>
<summary>4. delay</summary>

```js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log("antes");
  await delay(300);
  console.log("después");
}
main();
```
</details>

<details>
<summary>5. debounce</summary>

```js
function debounce(fn, ms) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), ms);
  };
}

const guardar = debounce((texto) => console.log(texto), 200);
guardar("a");
guardar("ab");
guardar("abc");
// "abc"
```
</details>

<details>
<summary>6. Dos timeouts distintos</summary>

`setTimeout` encola una función para más tarde. El timeout de Playwright es el tiempo máximo que el test, la aserción o la acción pueden tardar antes de fallar. No se programa con `setTimeout`.
</details>

---

**Siguiente en la ruta desde cero:** [12 - Promesas](12-promises.md)

**[⬅ Volver al índice](../README.md)**
