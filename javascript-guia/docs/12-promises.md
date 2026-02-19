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

**Por qué importan las promesas:** En JavaScript la E/S (red, timers, archivos) es asíncrona. Sin promesas, se usaban callbacks anidados ("callback hell") y era fácil perder errores. Las promesas permiten encadenar operaciones, propagar rechazos con un solo `.catch()` y combinar varias tareas con `Promise.all` / `allSettled` / `race`. Casi todas las APIs modernas del navegador (fetch, etc.) devuelven promesas.

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

**Encadenar dos peticiones (la segunda usa el resultado de la primera):**
```js
fetch("/api/usuario/me")
  .then(r => r.json())
  .then(usuario => fetch(`/api/pedidos?userId=${usuario.id}`))
  .then(r => r.json())
  .then(pedidos => console.log(pedidos))
  .catch(err => console.error(err));
```
Aquí el segundo `then` recibe el objeto usuario y devuelve una nueva promesa (el fetch); esa promesa se "aplana" y el siguiente `then` recibe el resultado de ese fetch (antes de .json()). Para pasar el JSON al siguiente paso, conviene devolver `fetch(...).then(r => r.json())` para que el siguiente then reciba ya el objeto.

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

### Ejercicios con PokeAPI (datos reales)

Usa la **[PokeAPI](https://pokeapi.co/)** (sin autenticación). Base: `https://pokeapi.co/api/v2/`. Ejemplos: `GET .../pokemon?limit=10` devuelve lista `{ results: [{ name, url }, ...] }`; `GET .../pokemon/1/` o `.../pokemon/pikachu` devuelve el Pokémon completo (nombre, tipos, stats, sprites, etc.).

7. Con **then/catch**: haz fetch a `https://pokeapi.co/api/v2/pokemon/1/`, parsea JSON y por consola muestra el nombre y el array de tipos del Pokémon. Usa un solo `.catch()` al final.
8. Con **Promise.all**: obtén en paralelo los datos de los Pokémon con id 1, 4 y 7 (tres URLs). Devuelve un array con los tres objetos (nombre, por ejemplo). Si una falla, toda la promesa falla.
9. Con **Promise.allSettled**: haz fetch a `.../pokemon/1/`, `.../pokemon/9999/` (este puede fallar) y `.../pokemon/pikachu`. Separa resultados exitosos y fallidos; para los exitosos muestra el nombre.
10. **Encadenamiento**: primero fetch a `.../pokemon?limit=5`; del JSON toma la primera URL de `results` y haz un segundo fetch a esa URL. Con el resultado muestra el nombre y el `base_experience` del primer Pokémon de la lista.
11. **Promise.race + timeout**: crea una función `getPokemonConTimeout(id, ms)` que haga fetch a `.../pokemon/{id}/` y rechace con `Error("Timeout")` si tarda más de `ms` ms. Usa `Promise.race`.
12. Con **Promise.resolve**: escribe una función `getPokemonOCache(id)` que si recibe `id === 0` devuelva `Promise.resolve({ name: "placeholder" })` sin hacer fetch; en otro caso haga fetch a `.../pokemon/{id}/` y devuelva el JSON.

### Más ejercicios de promesas (genéricos y PokeAPI)

13. **finally**: crea una promesa que se resuelva con `"ok"` tras 500 ms, encadena `.then(v => console.log(v))`, `.catch(...)` y `.finally(() => console.log("listo"))`. Comprueba que `finally` se ejecuta siempre.
14. **Encadenamiento de valores**: `Promise.resolve(10).then(x => x * 2).then(x => x - 3)`. ¿Con qué valor se cumple la promesa final? Hazlo sin await.
15. **Promesa que rechaza**: crea una promesa que rechace tras 1 s con `new Error("fallo")`. Captúrala con `.catch(e => console.log(e.message))` y devuelve en el catch el string `"recuperado"`. ¿Con qué se cumple la promesa resultante?
16. **Promise.any**: dado un array de 3 URLs, dos de ellas rotas y una válida (por ejemplo PokeAPI), usa `Promise.any` para quedarte con la primera que responda. Si todas fallan, captura el AggregateError.
17. **Convertir callback a promesa**: escribe una función `delayCallback(ms, callback)` que reciba un callback `(err, resultado)` al estilo Node; si pasan `ms` ms sin error, llama a `callback(null, "listo")`. Envuelve esa función en una que devuelva una Promise (sin usar async/await).
18. **PokeAPI – lista de nombres**: con then/catch, haz fetch a `.../pokemon?limit=20`, parsea JSON y devuelve solo un array de nombres (strings) desde `results[].name`.
19. **PokeAPI – el más pesado**: obtén en paralelo los Pokémon con id 1, 2, 3, 4, 5. Con then (sin await), encuentra el que tiene mayor `weight` y muestra su nombre y peso.
20. **PokeAPI – primera especie**: fetch a `.../pokemon?limit=1`, toma la URL del primer resultado, fetch a esa URL, y del Pokémon obtén `species.url`; haz un tercer fetch a esa URL y muestra el `name` de la especie.

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

<details>
<summary>7. PokeAPI: nombre y tipos con then/catch</summary>

```js
fetch("https://pokeapi.co/api/v2/pokemon/1/")
  .then(r => r.json())
  .then(data => {
    console.log("Nombre:", data.name);
    console.log("Tipos:", data.types.map(t => t.type.name));
  })
  .catch(err => console.error(err));
```
</details>

<details>
<summary>8. PokeAPI: Promise.all ids 1, 4, 7</summary>

```js
const ids = [1, 4, 7];
Promise.all(
  ids.map(id =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(r => r.json())
  )
).then(pokemons => pokemons.map(p => ({ name: p.name })));
// o .then(pokemons => pokemons.forEach(p => console.log(p.name)));
```
</details>

<details>
<summary>9. PokeAPI: allSettled con uno que puede fallar</summary>

```js
const urls = [
  "https://pokeapi.co/api/v2/pokemon/1/",
  "https://pokeapi.co/api/v2/pokemon/9999/",
  "https://pokeapi.co/api/v2/pokemon/pikachu"
];
Promise.allSettled(urls.map(url => fetch(url).then(r => r.json()))).then(
  results => {
    const exitosas = results
      .filter(r => r.status === "fulfilled")
      .map(r => r.value);
    const fallidas = results.filter(r => r.status === "rejected").map(r => r.reason);
    exitosas.forEach(p => console.log(p.name));
  }
);
```
</details>

<details>
<summary>10. PokeAPI: encadenar lista → primer Pokémon</summary>

```js
fetch("https://pokeapi.co/api/v2/pokemon?limit=5")
  .then(r => r.json())
  .then(data => data.results[0].url)
  .then(url => fetch(url).then(r => r.json()))
  .then(pokemon => {
    console.log(pokemon.name, pokemon.base_experience);
  })
  .catch(err => console.error(err));
```
</details>

<details>
<summary>11. PokeAPI: getPokemonConTimeout(id, ms)</summary>

```js
function getPokemonConTimeout(id, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
  const fetchP = fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(r =>
    r.json()
  );
  return Promise.race([fetchP, timeout]);
}
```
</details>

<details>
<summary>12. PokeAPI: getPokemonOCache(id)</summary>

```js
function getPokemonOCache(id) {
  if (id === 0) return Promise.resolve({ name: "placeholder" });
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(r => r.json());
}
```
</details>

<details>
<summary>13. finally</summary>

```js
new Promise((resolve) => setTimeout(() => resolve("ok"), 500))
  .then((v) => console.log(v))
  .catch(() => {})
  .finally(() => console.log("listo"));
```
</details>

<details>
<summary>14. Encadenamiento: valor final</summary>

10 → 20 → 17. La promesa final se cumple con **17**.
</details>

<details>
<summary>15. Promesa que rechaza y catch devuelve</summary>

La promesa resultante se **cumple** con el valor devuelto por el catch: `"recuperado"`. Si no re-lanzas en el catch, la cadena sigue como cumplida.
```js
new Promise((_, reject) => setTimeout(() => reject(new Error("fallo")), 1000))
  .catch((e) => {
    console.log(e.message);
    return "recuperado";
  })
  .then(console.log); // "recuperado"
```
</details>

<details>
<summary>16. Promise.any con URLs</summary>

```js
const urls = ["https://url-rota1", "https://url-rota2", "https://pokeapi.co/api/v2/pokemon/1/"];
Promise.any(urls.map((url) => fetch(url).then((r) => r.json())))
  .then((data) => console.log(data))
  .catch((e) => console.log(e.name, e.errors)); // AggregateError si todas fallan
```
</details>

<details>
<summary>17. Callback a promesa</summary>

```js
function delayCallback(ms, callback) {
  setTimeout(() => callback(null, "listo"), ms);
}
function delayPromise(ms) {
  return new Promise((resolve, reject) => {
    delayCallback(ms, (err, resultado) => {
      if (err) reject(err);
      else resolve(resultado);
    });
  });
}
```
</details>

<details>
<summary>18. PokeAPI: lista de nombres</summary>

```js
fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
  .then((r) => r.json())
  .then((data) => data.results.map((p) => p.name))
  .then(console.log)
  .catch(console.error);
```
</details>

<details>
<summary>19. PokeAPI: el más pesado de 1–5</summary>

```js
Promise.all([1, 2, 3, 4, 5].map((id) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((r) => r.json())
))
  .then((pokemons) => {
    const max = pokemons.reduce((a, b) => (a.weight > b.weight ? a : b));
    console.log(max.name, max.weight);
  })
  .catch(console.error);
```
</details>

<details>
<summary>20. PokeAPI: primera especie (triple encadenamiento)</summary>

```js
fetch("https://pokeapi.co/api/v2/pokemon?limit=1")
  .then((r) => r.json())
  .then((data) => data.results[0].url)
  .then((url) => fetch(url).then((r) => r.json()))
  .then((pokemon) => fetch(pokemon.species.url).then((r) => r.json()))
  .then((species) => console.log(species.name))
  .catch(console.error);
```
</details>

---

**[⬅ Volver al índice](../README.md)**
