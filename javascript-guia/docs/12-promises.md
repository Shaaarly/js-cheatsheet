# 12. Promesas: new Promise, then/catch/finally, all/allSettled/race/any

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Qué es una promesa](#1-qué-es-una-promesa)
2. [new Promise, then, catch, finally](#2-new-promise-then-catch-finally)
3. [Promise.all, allSettled, race, any](#3-promiseall-allsettled-race-any)
4. [Patrones y casos reales](#4-patrones-y-casos-reales)
5. [Errores típicos y trampas de examen](#5-errores-típicos-y-trampas-de-examen)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. Qué es una promesa

Una **Promise** representa un valor (o un error) que estará disponible en el futuro. Estados: **pending** → **fulfilled** (valor) o **rejected** (error). Una vez resuelta o rechazada, no cambia.

- **No muta** el valor que recibe; devuelve **nueva promesa** en then/catch/finally.
- Encadenar: `.then(...).catch(...)` devuelve otra promesa.

---

## 2. new Promise, then, catch, finally

**new Promise(executor)**: executor recibe `resolve` y `reject`. Llamar a uno de ellos (solo una vez) resuelve o rechaza la promesa.

```js
const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (ok) resolve(datos);
    else reject(new Error("Falló"));
  }, 1000);
});
```

**then(onFulfilled?, onRejected?)**: registra callbacks. Devuelve **nueva promesa** (resuelta con el valor devuelto por el callback, o rechazada si el callback lanza). O(1) registrar; la ejecución es asíncrona.

**catch(onRejected)**: equivalente a `.then(null, onRejected)`. Captura rechazos; si no lanzas de nuevo, la promesa resultante se cumple.

**finally(onFinally)**: se ejecuta siempre (éxito o error); no recibe valor; la promesa resultante mantiene el estado (o se rechaza si finally lanza).

**Firma de los callbacks:**

| Método | Callback recibe | Devuelve | Nota |
|--------|-----------------|----------|------|
| **then(onFulfilled)** | `valor` (con el que se resolvió la promesa) | Nueva promesa cumplida con el valor devuelto (o rechazada si el callback lanza) | Si devuelves una promesa, se "aplana": el siguiente then recibe su valor resuelto. |
| **then(_, onRejected)** | `razon` (error pasado a reject) | Igual: valor devuelto → siguiente then; si lanzas → siguiente catch | |
| **catch(onRejected)** | `razon` (error) | Equivalente a `.then(null, onRejected)` | Si no re-lanzas, la cadena sigue como cumplida. |
| **finally(onFinally)** | Nada | La promesa resultante mantiene el mismo estado (cumplida/rechazada) que la anterior | Solo para limpiar (cerrar conexión, quitar loading). |

**Encadenamiento:** En `p.then(f1).then(f2).catch(g)`, si **cualquier** paso anterior se rechaza (o f1/f2 lanzan), se salta al `catch(g)`. **Regla práctica:** un solo `.catch()` al final captura cualquier rechazo previo en la cadena.  
*En una frase:* then/catch devuelven nueva promesa; un catch al final de la cadena captura cualquier rechazo anterior.

```js
fetch("/api/pedidos")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => console.log("Listo"));
```

**Promise.resolve(x)** y **Promise.reject(razon)**: crean promesas ya resueltas o rechazadas. Útiles para tests, para envolver un valor en promesa o para empezar una cadena: `Promise.resolve(1).then(x => x + 1)`.

---

## 3. Promise.all, allSettled, race, any

| Método | Comportamiento | Caso típico |
|--------|----------------|-------------|
| **Promise.all(iterable)** | Espera todas; si una falla → rechazo con ese error; si todas ok → array de resultados. | Varias peticiones que deben cumplirse todas. |
| **Promise.allSettled(iterable)** | Espera todas; siempre se cumple; array de `{ status, value? }` o `{ status, reason? }`. | Saber resultado de todas (éxito o fallo) sin fallar en conjunto. |
| **Promise.race(iterable)** | Se resuelve o rechaza cuando la **primera** promesa termina (con su valor o error). | Timeout: race(petición, delay que rechaza). |
| **Promise.any(iterable)** | Se cumple cuando la **primera** se cumple; si **todas** fallan → AggregateError. | Primera fuente que responda (fallback). |

```js
const [pedidos, usuario] = await Promise.all([
  fetch("/api/pedidos").then(r => r.json()),
  fetch("/api/me").then(r => r.json())
]);

const resultados = await Promise.allSettled([p1, p2, p3]);
const ok = resultados.filter(r => r.status === "fulfilled").map(r => r.value);
const fallos = resultados.filter(r => r.status === "rejected").map(r => r.reason);

const conTimeout = Promise.race([
  fetch("/api/lento"),
  new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), 5000))
]);
```

---

## 4. Patrones y casos reales

**Convertir callback a promesa:**
```js
function leerArchivo(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```

**Timeout con race:**
```js
function fetchConTimeout(url, ms) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    )
  ]);
}
```

**Cargar datos y manejar error:**
```js
function cargarPedidos() {
  return fetch("/api/pedidos")
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(data => data.items);
}
```

---

## 5. Errores típicos y trampas de examen

- then/catch/finally **no mutan** la promesa original; devuelven una nueva.
- **Unhandled rejection:** un rechazo que no tiene ningún `.catch()` (ni `try/catch` con `await`) se convierte en "unhandled rejection": el motor avisa y puede fallar en entornos estrictos. **Siempre** termina la cadena con `.catch()` o usa `try/catch` alrededor de `await`.
- **Promise.all**: una sola rechazada → todo el conjunto se rechaza con ese error.
- **Promise.race**: la primera que termine (cumplida o rechazada) gana; si la primera es rechazo, la promesa resultante se rechaza.
- **return** en un then: el valor se convierte en promesa cumplida con ese valor; si devuelves una promesa, se “aplana”.

---

## 6. Checklist rápido

- [ ] new Promise(resolve, reject); then/catch/finally devuelven nueva promesa.
- [ ] all: todas ok → array; una falla → rechazo. allSettled: siempre array de resultados.
- [ ] race: primera que termina (éxito o error). any: primera que cumple; si todas fallan, AggregateError.
- [ ] Capturar rechazos con .catch o try/await para evitar unhandled rejection.

---

## 7. Mini-ejercicios

1. Crea una promesa que se resuelva al cabo de 1 segundo con el valor `"listo"`. Usa then para imprimirlo.
2. Implementa `delay(ms)` que devuelva una promesa que se cumpla tras `ms` milisegundos.
3. Dado un array de URLs, usa Promise.all para hacer fetch a todas y devolver un array de resultados (respuestas en JSON). ¿Qué pasa si una petición falla?
4. Usa Promise.race para que una petición fetch tenga un timeout de 3 segundos (si no responde, rechazar con Error("Timeout")).
5. Con Promise.allSettled, procesa un array de promesas y devuelve un objeto `{ exitosas: [], fallidas: [] }` con valores y razones.
6. ¿Qué devuelve `Promise.resolve(1).then(x => x + 1).then(x => x * 2)`? (el valor final de la cadena)

---

## 8. Soluciones

<details>
<summary>1. Promesa que resuelve en 1s</summary>

```js
new Promise((resolve) => setTimeout(() => resolve("listo"), 1000))
  .then(console.log);
```
</details>

<details>
<summary>2. delay(ms)</summary>

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```
</details>

<details>
<summary>3. Promise.all con URLs</summary>

Si una falla, Promise.all rechaza con ese error y no obtienes el resto. Para tener todos: usar allSettled y luego filtrar.
```js
const datos = await Promise.all(urls.map(url => fetch(url).then(r => r.json())));
```
</details>

<details>
<summary>4. fetch con timeout (race)</summary>

```js
const conTimeout = Promise.race([
  fetch(url),
  new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), 3000))
]);
```
</details>

<details>
<summary>5. allSettled a exitosas/fallidas</summary>

```js
const resultados = await Promise.allSettled(promesas);
const exitosas = resultados.filter(r => r.status === "fulfilled").map(r => r.value);
const fallidas = resultados.filter(r => r.status === "rejected").map(r => r.reason);
return { exitosas, fallidas };
```
</details>

<details>
<summary>6. Valor final de la cadena</summary>

1 → then x+1 → 2 → then x*2 → **4**. La promesa final se cumple con 4.
</details>

---

**[⬅ Volver al índice](../README.md)**
