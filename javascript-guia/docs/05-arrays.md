# 5. Arrays: métodos mutadores, no mutadores, iteración y pipelines

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Mutadores vs no mutadores](#1-mutadores-vs-no-mutadores)
2. [Mutadores: push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin](#2-mutadores-push-pop-shift-unshift-splice-sort-reverse-fill-copywithin)
3. [No mutadores: slice, concat, includes, indexOf, find, findIndex, some, every](#3-no-mutadores-slice-concat-includes-indexof-find-findindex-some-every)
4. [map, filter, reduce, flat, flatMap, join](#4-map-filter-reduce-flat-flatmap-join)
5. [Iteración: for/of, forEach, entries/keys/values](#5-iteración-forof-foreach-entrieskeysvalues)
6. [Búsqueda y composición](#6-búsqueda-y-composición)
7. [Patrones de examen y pipelines](#7-patrones-de-examen-y-pipelines)
8. [Errores típicos y trampas de examen](#8-errores-típicos-y-trampas-de-examen)
9. [Checklist rápido](#9-checklist-rápido)
10. [Mini-ejercicios](#10-mini-ejercicios)
11. [Soluciones](#11-soluciones)

---

## 1. Mutadores vs no mutadores

- **Mutador**: modifica el array original. Cuidado al usar en React/Redux (inmutabilidad).
- **No mutador**: devuelve un nuevo valor (otro array o primitivo) y no cambia el original.

En las tablas se indica **Muta** sí/no y **Devuelve** qué retorna cada método.

---

### Firma de los callbacks (qué recibe tu arrow function)

Cuando un método pide una **función** (arrow o no), esta es la **firma** que usa JavaScript. Saberlo evita dudas en el examen.

| Método | Firma del callback | Qué debes devolver (return) |
|--------|--------------------|-----------------------------|
| **map(fn)** | `(elemento, índice?, array?) => valor` | El **nuevo valor** para ese elemento (se construye un array con todos los retornos). |
| **filter(fn)** | `(elemento, índice?, array?) => boolean` | `true` para **mantener** el elemento, `false` para excluirlo. |
| **find(fn)** / **findIndex(fn)** | `(elemento, índice?, array?) => boolean` | `true` cuando es el elemento que buscas; find devuelve ese elemento, findIndex su índice. |
| **some(fn)** / **every(fn)** | `(elemento, índice?, array?) => boolean` | some: ¿alguno cumple? every: ¿todos cumplen? |
| **forEach(fn)** | `(elemento, índice?, array?) => void` | No importa el return; se usa por **efectos** (console.log, etc.). No devuelve array. |
| **reduce(fn, valorInicial?)** | `(acumulador, elemento, índice?, array?) => nuevoAcumulador` | El **nuevo acumulador** para la siguiente iteración. En la 1ª llamada, acumulador = valorInicial (o el 1º elemento si no hay inicial). |
| **sort(compare?)** | `(a, b) => number` | **Número**: &lt; 0 si a va antes que b, &gt; 0 si b va antes que a, 0 si iguales. Ej. ascendente: `(a, b) => a - b`. |

**Ejemplos de uso correcto del callback:**

```js
// map: recibe cada elemento; devuelves el valor transformado
[1, 2, 3].map((x) => x * 2);           // [2, 4, 6]
[1, 2, 3].map((x, i) => x + i);        // [1, 3, 5] — uso del índice

// filter: devuelves true/false; se quedan los que dan true
[1, 2, 3, 4].filter((x) => x > 2);     // [3, 4]
[1, 2, 3].filter((_, i) => i !== 1);    // [1, 3] — quitar el de índice 1 ( _ = elemento no usado)

// find: devuelves true en el primero que cumpla; obtienes ese elemento
[{ id: 1 }, { id: 2 }].find((obj) => obj.id === 2);  // { id: 2 }

// reduce: (acc, elemento) => nuevoAcc; el 2º argumento de reduce es el valor inicial de acc
[1, 2, 3].reduce((acc, n) => acc + n, 0);  // 6
// 1ª: acc=0, n=1 → return 1; 2ª: acc=1, n=2 → return 3; 3ª: acc=3, n=3 → return 6

// sort: (a, b) => número. a - b = ascendente, b - a = descendente
[30, 10, 20].sort((a, b) => a - b);    // [10, 20, 30]
```

---

## 2. Mutadores: push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin

| Método | Muta | Devuelve | Complejidad | Uso típico |
|--------|------|----------|-------------|------------|
| `push(...items)` | Sí | nueva length | O(1) amort. | Añadir al final |
| `pop()` | Sí | elemento quitado | O(1) | Quitar del final |
| `shift()` | Sí | elemento quitado | O(n) | Quitar del inicio |
| `unshift(...items)` | Sí | nueva length | O(n) | Añadir al inicio |
| `splice(ini, elim?, ...items)` | Sí | array de eliminados | O(n) | Insertar/borrar en posición |
| `sort(compare?)` | Sí | mismo array (ref) | O(n log n) | Ordenar (comparador) |
| `reverse()` | Sí | mismo array (ref) | O(n) | Invertir orden |
| `fill(val, ini?, fin?)` | Sí | mismo array (ref) | O(n) | Rellenar con valor |
| `copyWithin(dest, start?, end?)` | Sí | mismo array (ref) | O(n) | Copiar dentro del array |

**push / pop:**
```js
const carrito = [];
carrito.push({ id: 1, nombre: "Item" }); // 1
carrito.push({ id: 2 });                 // 2
const ultimo = carrito.pop();            // { id: 2 }, carrito tiene 1 elemento
```

**splice(índiceInicio, cuántosEliminar?, ...itemsAInsertar?)** — **Muta**. Parámetros:
- **índiceInicio**: desde qué posición actuar.
- **cuántosEliminar**: cuántos elementos borrar (0 si solo quieres insertar).
- **itemsAInsertar**: opcional; elementos a insertar en esa posición (desplazan el resto).
- **Devuelve**: array con los elementos **eliminados** (no el array modificado).

```js
const arr = [1, 2, 3, 4];
arr.splice(1, 2);        // desde índice 1, eliminar 2 → arr = [1, 4]; devuelve [2, 3]
arr.splice(1, 0, 10);    // en índice 1, eliminar 0, insertar 10 → [1, 10, 4]
arr.splice(0, 1, 20);    // en 0, eliminar 1, insertar 20 → reemplaza primer elemento por 20
```

**slice(ini?, fin?)** — **No muta**. Copia o subarray:
- **ini**: índice inicio (incluido). Si es negativo, cuenta desde el final.
- **fin**: opcional; índice final **no incluido**. Negativo = desde el final.
- **Devuelve**: nuevo array. `arr.slice()` = copia superficial; `arr.slice(1)` = sin el primero.

**sort:** por defecto ordena como strings. Para números hay que pasar comparador:
```js
const nums = [10, 2, 21];
nums.sort();                    // [10, 2, 21] — orden lexicográfico
nums.sort((a, b) => a - b);     // [2, 10, 21] — ascendente
nums.sort((a, b) => b - a);     // descendente

const pedidos = [{ total: 50 }, { total: 20 }, { total: 100 }];
pedidos.sort((a, b) => a.total - b.total);
```

**reverse / fill:**
```js
const a = [1, 2, 3];
a.reverse();   // [3, 2, 1]
a.fill(0);     // [0, 0, 0]
```

---

## 3. No mutadores: slice, concat, includes, indexOf, find, findIndex, some, every

| Método | Muta | Devuelve | Complejidad | Uso típico |
|--------|------|----------|-------------|------------|
| `slice(ini?, fin?)` | No | nuevo array | O(n) | Copia o subarray (fin no incluido) |
| `concat(...vals)` | No | nuevo array | O(n) | Concatenar arrays |
| `includes(val)` | No | boolean | O(n) | ¿Existe valor? (===) |
| `indexOf(val, desde?)` | No | índice o -1 | O(n) | Primera posición |
| `lastIndexOf(val, desde?)` | No | índice o -1 | O(n) | Última posición |
| `find(fn)` | No | primer elem o undefined | O(n) | Buscar con condición (callback devuelve boolean) |
| `findIndex(fn)` | No | índice o -1 | O(n) | Índice del primero que cumple (callback boolean) |
| `some(fn)` | No | boolean | O(n) | ¿Alguno cumple? (callback boolean) |
| `every(fn)` | No | boolean | O(n) | ¿Todos cumplen? (callback boolean) |
| `at(i)` | No | elemento o undefined | O(1) | Como [i], pero **at(-1)** = último, **at(-2)** = penúltimo |

```js
const lineas = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 0 }];
const copia = lineas.slice();           // copia superficial
const desdeUno = lineas.slice(1);       // sin el primero
const ids = [1, 2, 3];
ids.includes(2);                        // true
ids.indexOf(2);                         // 1
const conCantidad = lineas.find(l => l.cantidad > 0);  // primer elemento que cumple
const algunoCero = lineas.some(l => l.cantidad === 0); // true
const todosPositivos = lineas.every(l => l.cantidad > 0); // false
```

**Caso real — filtrar pedidos por estado y buscar el primero pendiente:**
```js
const pendiente = pedidos.find(p => p.estado === "pendiente");
const hayEnviados = pedidos.some(p => p.estado === "enviado");
```

---

## 4. map, filter, reduce, flat, flatMap, join

| Método | Muta | Devuelve | Complejidad | Uso típico |
|--------|------|----------|-------------|------------|
| `map(fn)` | No | nuevo array | O(n) | Transformar cada elemento |
| `filter(fn)` | No | nuevo array | O(n) | Filtrar por condición |
| `reduce(fn, inicial?)` | No | un valor (acumulado) | O(n) | Reducir a un valor |
| `flat(n?)` | No | nuevo array | O(n) | Aplanar n niveles (default 1) |
| `flatMap(fn)` | No | nuevo array | O(n) | map + flat(1) |
| `join(separador?)` | No | string | O(n) | Unir en string (default ",") |

**map:** un elemento → un elemento (misma longitud).
```js
const precios = [10, 20, 30];
const conIva = precios.map(p => p * 1.21);
const nombres = pedidos.map(p => p.cliente.nombre);
```

**filter:** mantiene solo los que cumplen (longitud ≤ original).
```js
const pendientes = pedidos.filter(p => p.estado === "pendiente");
const conTotal = lineas.filter(l => l.total > 0);
```

**reduce(fn, valorInicial?)** — **No muta**. Reduce el array a **un solo valor**.
- **Callback**: `(acumulador, elemento, índice?, array?) => nuevoAcumulador`. Lo que devuelves pasa a ser el acumulador en la siguiente iteración.
- **valorInicial**: opcional. Si **no** lo pones: el acumulador empieza siendo el **primer elemento** y la primera llamada a fn recibe el 2º elemento (puede dar error con array vacío). Para sumas y objetos, pon siempre valor inicial (0 o {}).

```js
// Suma: inicial 0; en cada paso acc + elemento
const total = lineas.reduce((acc, l) => acc + l.cantidad * l.precio, 0);

// Agrupar por estado: inicial {}; en cada paso añadimos 1 al contador de ese estado
const porEstado = pedidos.reduce((acc, p) => {
  acc[p.estado] = (acc[p.estado] ?? 0) + 1;
  return acc;   // importante: devolver el mismo acc (o el objeto actualizado)
}, {});
```

**flat / flatMap:**
```js
[[1, 2], [3, 4]].flat();           // [1, 2, 3, 4]
["a", "bc"].flatMap(s => s.split("")); // ["a", "b", "c"]
```

**join:**
```js
[1, 2, 3].join();    // "1,2,3"
[1, 2, 3].join("-"); // "1-2-3"
```

**Caso real — pipeline: total de pedidos pendientes:**
```js
const totalPendientes = pedidos
  .filter(p => p.estado === "pendiente")
  .reduce((sum, p) => sum + p.total, 0);
```

**Caso real — normalizar respuesta API (array de items a mapa por id):**
```js
const porId = items.map(i => [i.id, i]).reduce((acc, [id, item]) => {
  acc[id] = item;
  return acc;
}, {});
```

---

## 5. Iteración: for/of, forEach, entries/keys/values

- **for...of**: recorre **valores**; no da índice (para índice usa `for` clásico o `entries()`).
- **forEach(fn)**: llama a `fn(elemento, índice, array)` por cada elemento. **No devuelve nada** (undefined); no se puede encadenar como map/filter. Uso: efectos (log, modificar algo externo).
- **entries() / keys() / values()**: devuelven **iteradores**. Para array: `[...arr.entries()]` → `[[0, a], [1, b], ...]`; `arr.keys()` índices; `arr.values()` igual que for...of.

```js
for (const item of pedidos) {
  console.log(item.id);   // item = cada pedido
}
pedidos.forEach((p, i) => console.log(i, p.estado));  // (elemento, índice)

const ultimo = [10, 20, 30].at(-1);   // 30 — at(-1) = último elemento
[...lineas.entries()];   // [[0, lineas[0]], [1, lineas[1]], ...]
```

---

## 6. Búsqueda y composición

- **indexOf / lastIndexOf**: valor exacto (===).
- **find / findIndex**: condición arbitraria.
- **includes**: existencia por ===.

Para “único” o “todos únicos” se suele usar Set o reduce. Para agrupar: reduce a objeto o Map.

```js
const ids = lineas.map(l => l.productoId);
const unicos = [...new Set(ids)];
const agrupado = lineas.reduce((acc, l) => {
  const id = l.categoriaId;
  if (!acc[id]) acc[id] = [];
  acc[id].push(l);
  return acc;
}, {});
```

---

## 7. Patrones de examen y pipelines

- Filtrar → map → reduce (filtrar por estado, extraer campo, sumar).
- Ordenar copia sin mutar: `[...arr].sort((a,b) => ...)`.
- Copia superficial: `arr.slice()` o `[...arr]`. Copia profunda: structuredClone (o librería).
- Eliminar elemento en índice sin mutar: `arr.filter((_, i) => i !== index)` o slice + concat.

```js
const ordenado = [...pedidos].sort((a, b) => b.total - a.total);
const sinPrimero = arr.slice(1);
const sinIndice = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];
```

---

## 8. Errores típicos y trampas de examen

- **sort** sin comparador ordena como strings: [10, 2, 1].
- **splice** muta; **slice** no. No confundir nombres.
- **reduce** sin valor inicial: con array vacío lanza; con un elemento usa ese como acumulador.
- **forEach** no devuelve el array; no se puede encadenar como map/filter.
- **filter** mantiene referencia a objetos: si mutas los objetos, se refleja en el array filtrado (pero el array en sí es nuevo).
- **includes** usa ===: no encuentra objetos iguales “por contenido”.

---

## 9. Checklist rápido

- [ ] Saber de memoria cuáles mutan: push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin.
- [ ] slice, concat, map, filter, reduce no mutan.
- [ ] sort() sin comparador = orden string; números: (a,b) => a - b.
- [ ] reduce(acc, elem, index?, array?) y valor inicial.
- [ ] find/findIndex vs indexOf/includes (condición vs valor exacto).
- [ ] Ordenar sin mutar: [...arr].sort(...).

---

## 10. Mini-ejercicios

1. Dado un array de pedidos con `total`, calcula el total global con reduce.
2. Filtra los pedidos con estado `"cancelado"` y devuelve un nuevo array (sin mutar el original).
3. Ordena por `total` descendente **sin mutar** el array original.
4. Dado un array de lineas `[{ productoId, cantidad }]`, agrupa por `productoId` y suma cantidades (objeto `{ productoId: totalCantidad }`).
5. Convierte un array de objetos `[{ id, nombre }]` en un objeto `{ id: nombre }` usando reduce.
6. Dado un array de arrays `[[1,2],[3,4],[5]]`, aplana a un solo nivel y luego suma todos los números.

---

## 11. Soluciones

<details>
<summary>1. Total global</summary>

```js
const total = pedidos.reduce((acc, p) => acc + p.total, 0);
```
</details>

<details>
<summary>2. Filtrar cancelados (no mutar)</summary>

```js
const cancelados = pedidos.filter(p => p.estado === "cancelado");
```
</details>

<details>
<summary>3. Ordenar por total desc sin mutar</summary>

```js
const porTotalDesc = [...pedidos].sort((a, b) => b.total - a.total);
```
</details>

<details>
<summary>4. Agrupar por productoId y sumar cantidades</summary>

```js
const porProducto = lineas.reduce((acc, l) => {
  acc[l.productoId] = (acc[l.productoId] ?? 0) + l.cantidad;
  return acc;
}, {});
```
</details>

<details>
<summary>5. Array a objeto { id: nombre }</summary>

```js
const mapa = items.reduce((acc, { id, nombre }) => {
  acc[id] = nombre;
  return acc;
}, {});
```
</details>

<details>
<summary>6. Aplanar y sumar</summary>

```js
const anidado = [[1,2],[3,4],[5]];
const suma = anidado.flat().reduce((a, n) => a + n, 0);
```
</details>

---

**[⬅ Volver al índice](../README.md)**
