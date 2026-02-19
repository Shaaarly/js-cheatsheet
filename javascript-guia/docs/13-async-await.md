# 13. Async/Await: secuencial vs paralelo, manejo de errores

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [async y await](#1-async-y-await)
2. [Secuencial vs paralelo](#2-secuencial-vs-paralelo)
3. [Manejo de errores](#3-manejo-de-errores)
4. [Patrones y casos reales](#4-patrones-y-casos-reales)
5. [Errores típicos y trampas de examen](#5-errores-típicos-y-trampas-de-examen)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. async y await

- **async**: una función declarada con `async` siempre devuelve una **Promise**. Si devuelves un valor, equivale a `Promise.resolve(valor)`; si lanzas, a `Promise.reject(...)`.
- **await**: solo dentro de una función async. Espera a que la promesa se resuelva y devuelve su valor; si la promesa se rechaza, lanza la excepción (se puede capturar con try/catch).

```js
async function getPedido(id) {
  const res = await fetch(`/api/pedidos/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
// getPedido(1) devuelve una Promise que se cumple con el JSON
```

**No muta** la promesa original; await solo “espera” y desenvuelve el valor.

**Cuándo usar async/await frente a then/catch:** async/await hace que el flujo asíncrono se lea como código secuencial; más fácil de seguir y depurar. Úsalo cuando tengas varias operaciones encadenadas o necesites try/catch. Combínalo con `Promise.all` para paralelismo.

---

## 2. Secuencial vs paralelo

**Secuencial**: cada await espera al anterior. Útil cuando una llamada depende del resultado de la otra.
```js
const usuario = await fetchUsuario();
const pedidos = await fetchPedidosDeUsuario(usuario.id);
```

**Paralelo**: lanzar todas las promesas y luego await (o Promise.all). Más rápido cuando son independientes.
```js
const [pedidos, productos, usuario] = await Promise.all([
  fetchPedidos(),
  fetchProductos(),
  fetchUsuario()
]);
```

**Error**: hacer await en bucle cuando las peticiones son independientes (lento):
```js
for (const id of ids) {
  items.push(await fetchItem(id)); // secuencial; mejor Promise.all(map)
}
```
**Mejor**:
```js
const items = await Promise.all(ids.map(id => fetchItem(id)));
```

**Resumen:** Secuencial = varios `await` seguidos (cuando B depende de A). Paralelo = crear todas las promesas y luego un solo `await Promise.all(...)` (cuando las peticiones son independientes). Hacer `await` dentro de un bucle para peticiones independientes es innecesariamente lento.

---

## 3. Manejo de errores

- **try/catch** alrededor del await: captura rechazos de la promesa como excepciones.
```js
async function cargar() {
  try {
    const data = await fetch(url).then(r => r.json());
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
```
- **catch en la promesa devuelta**: quien llama a la función async puede usar `.catch()` en la promesa que devuelve la función.
```js
cargar().catch(e => mostrarError(e));
```
- Si **no** pones try/catch dentro del async y una promesa se rechaza, la función async devuelve una **promesa rechazada**; el llamador puede capturar ese rechazo con `.catch()` en esa promesa.

---

## 4. Patrones y casos reales

**Loading y error en UI:**
```js
async function cargarPedidos() {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch("/api/pedidos");
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    setPedidos(data);
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
}
```

**Varias peticiones en paralelo y filtrar fallos:**
```js
const resultados = await Promise.allSettled(
  ids.map(id => fetch(`/api/items/${id}`).then(r => r.json()))
);
const items = resultados
  .filter(r => r.status === "fulfilled")
  .map(r => r.value);
```

**Secuencial cuando hay dependencia:**
```js
const orden = await crearOrden(carrito);
const pago = await procesarPago(orden.id, tarjeta);
await enviarConfirmacion(pago.email);
```

**Paralelo + secuencial combinados:** primero obtienes varios recursos en paralelo; luego, con esos datos, haces una segunda ronda (secuencial o paralelo según el caso).
```js
const [usuario, config] = await Promise.all([fetchUsuario(), fetchConfig()]);
const pedidos = await fetchPedidos(usuario.id); // depende de usuario
```

---

## 5. Errores típicos y trampas de examen

- **await** solo en funciones **async**; si lo usas en código de nivel superior (sin async), en algunos entornos hace falta top-level await (módulos).
- Olvidar **try/catch** o .catch: un rechazo no manejado será unhandled rejection.
- Hacer await en bucle cuando podrías usar **Promise.all**: pierdes paralelismo.
- **async** no hace que el código sea “multihilo”; solo pausa la función y deja que el event loop ejecute otras tareas hasta que la promesa se resuelva.
- Devolver algo en un catch sin re-lanzar: la promesa de la función async se cumple (no se rechaza), el llamador no ve error.

---

## 6. Checklist rápido

- [ ] async devuelve siempre una Promise; await desenvuelve el valor (o lanza si rechazo).
- [ ] Secuencial: varios await seguidos. Paralelo: Promise.all(array de promesas).
- [ ] Errores: try/catch alrededor de await, o .catch en la promesa devuelta.
- [ ] Evitar await en bucle para peticiones independientes; usar Promise.all(map).

---

## 7. Mini-ejercicios

1. Convierte esta función a async/await: `function get() { return fetch("/api/data").then(r => r.json()); }`
2. Escribe una función async que llame a `/api/pedidos` y a `/api/productos` **en paralelo** y devuelva `{ pedidos, productos }`.
3. Dentro de una función async, ¿cómo capturas el error si `await fetch(...)` falla (red o 404)?
4. Implementa `retry(fn, n)`: ejecuta la función async `fn` hasta que tenga éxito o hayas intentado `n` veces (en caso de error, reintentar).
5. ¿Qué devuelve una función async que hace `return 42`? ¿Y si hace `throw new Error("x")`?
6. Dado un array de IDs, escribe una función async que obtenga cada recurso por ID en paralelo y devuelva un array de resultados (solo los que se resuelvan; si uno falla, no romper todo).

### Ejercicios con PokeAPI (async/await + datos reales)

Base: `https://pokeapi.co/api/v2/`. Sin autenticación. Ver [cap. 12](12-promises.md) para endpoints.

7. **getPokemon(nameOrId)**: función async que recibe nombre o id, hace fetch a `.../pokemon/{nameOrId}/`, comprueba `res.ok`, parsea JSON y devuelve el objeto. Si no ok, lanza `Error(status)`.
8. **Primeros N en paralelo**: async que recibe `n` (ej. 5), hace fetch a `.../pokemon?limit=n`, extrae las URLs de `results` y con `Promise.all` hace fetch a cada URL; devuelve array de objetos Pokémon (solo nombre y peso, por ejemplo).
9. **Secuencial con dependencia**: obtén la lista con `.../pokemon?limit=3`; luego, con la **primera** URL de `results`, haz un segundo fetch y con ese Pokémon obtén su `species.url`; haz un tercer fetch a esa URL de species. Muestra el nombre del Pokémon y el nombre de la especie (campo `name` en species).
10. **try/catch en UI**: escribe una función async `cargarPokemon(id)` que ponga `loading = true`, haga fetch a `.../pokemon/{id}/`, en éxito guarde los datos y en catch guarde el mensaje de error en una variable `error`, y en `finally` ponga `loading = false`. (Puedes simular con variables locales.)
11. **retry con PokeAPI**: usa tu `retry(fn, n)` para intentar hasta 3 veces `fetch("https://pokeapi.co/api/v2/pokemon/1/").then(r => r.json())`. Si una petición falla por red, reintenta.
12. **Paralelo + filtro**: async que recibe un array de ids `[1, 2, 99999, 4]` (uno puede fallar). Usa `Promise.allSettled` y devuelve solo los Pokémon que se cargaron bien (array de objetos con al menos `name`).

---

## 8. Soluciones

<details>
<summary>1. get con async/await</summary>

```js
async function get() {
  const r = await fetch("/api/data");
  return r.json();
}
```
</details>

<details>
<summary>2. Pedidos y productos en paralelo</summary>

```js
async function cargar() {
  const [pedidos, productos] = await Promise.all([
    fetch("/api/pedidos").then(r => r.json()),
    fetch("/api/productos").then(r => r.json())
  ]);
  return { pedidos, productos };
}
```
</details>

<details>
<summary>3. Capturar error de await fetch</summary>

```js
try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status);
  const data = await res.json();
} catch (e) {
  console.error(e);
}
```
</details>

<details>
<summary>4. retry(fn, n)</summary>

```js
async function retry(fn, n) {
  for (let i = 0; i < n; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === n - 1) throw e;
    }
  }
}
```
</details>

<details>
<summary>5. return 42 y throw</summary>

`return 42` → la promesa devuelta se cumple con 42. `throw new Error("x")` → la promesa se rechaza con ese Error.
</details>

<details>
<summary>6. Paralelo por IDs, solo exitosos</summary>

```js
async function getByIds(ids) {
  const resultados = await Promise.allSettled(
    ids.map(id => fetch(`/api/items/${id}`).then(r => r.json()))
  );
  return resultados
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);
}
```
</details>

<details>
<summary>7. PokeAPI: getPokemon(nameOrId)</summary>

```js
async function getPokemon(nameOrId) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}/`);
  if (!res.ok) throw new Error(res.status);
  return res.json();
}
```
</details>

<details>
<summary>8. PokeAPI: primeros N en paralelo</summary>

```js
async function getPrimerosN(n) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${n}`);
  const data = await res.json();
  const urls = data.results.map(p => p.url);
  const pokemons = await Promise.all(urls.map(url => fetch(url).then(r => r.json())));
  return pokemons.map(p => ({ name: p.name, weight: p.weight }));
}
```
</details>

<details>
<summary>9. PokeAPI: secuencial lista → primer Pokémon → species</summary>

```js
async function primerPokemonYSpecies() {
  const listRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=3");
  const list = await listRes.json();
  const firstUrl = list.results[0].url;
  const pokemonRes = await fetch(firstUrl);
  const pokemon = await pokemonRes.json();
  const speciesRes = await fetch(pokemon.species.url);
  const species = await speciesRes.json();
  console.log(pokemon.name, species.name);
}
```
</details>

<details>
<summary>10. PokeAPI: cargarPokemon(id) con loading/error/finally</summary>

```js
async function cargarPokemon(id) {
  let loading = true;
  let data = null;
  let error = null;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    if (!res.ok) throw new Error(res.status);
    data = await res.json();
  } catch (e) {
    error = e.message;
  } finally {
    loading = false;
  }
  return { loading, data, error };
}
```
</details>

<details>
<summary>11. PokeAPI: retry con fetch</summary>

```js
async function retry(fn, n) {
  for (let i = 0; i < n; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === n - 1) throw e;
    }
  }
}
// Uso:
const p = await retry(
  () => fetch("https://pokeapi.co/api/v2/pokemon/1/").then(r => r.json()),
  3
);
```
</details>

<details>
<summary>12. PokeAPI: ids con allSettled, solo exitosos</summary>

```js
async function getPokemonsSettled(ids) {
  const results = await Promise.allSettled(
    ids.map(id =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(r => r.json())
    )
  );
  return results
    .filter(r => r.status === "fulfilled")
    .map(r => ({ name: r.value.name }));
}
```
</details>

---

**[⬅ Volver al índice](../README.md)**
