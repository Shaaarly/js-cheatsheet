# 6. Objetos: CRUD, Object.keys/values/entries, spread, assign, prototipos, clases

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [CRUD de propiedades](#1-crud-de-propiedades)
2. [Object.keys, values, entries](#2-objectkeys-values-entries)
3. [Spread y Object.assign](#3-spread-y-objectassign)
4. [Prototipos (intro)](#4-prototipos-intro)
5. [Clases, getters y setters](#5-clases-getters-y-setters)
6. [Errores típicos y trampas de examen](#6-errores-típicos-y-trampas-de-examen)
7. [Checklist rápido](#7-checklist-rápido)
8. [Mini-ejercicios](#8-mini-ejercicios)
9. [Soluciones](#9-soluciones)

---

## 1. CRUD de propiedades

- **Crear / actualizar**: `obj.prop = valor` o `obj["prop"]` (útil con clave dinámica).
- **Leer**: `obj.prop`, `obj["prop"]`. Si no existe → `undefined`.
- **Eliminar**: `delete obj.prop`. No elimina propiedades de prototipo.
- **Comprobar**: `"prop" in obj` (propia o heredada), `Object.hasOwn(obj, "prop")` (solo propia, recomendado).

```js
const pedido = { id: 1, estado: "pendiente" };
pedido.total = 99;
pedido["fecha"] = new Date().toISOString();
const clave = "estado";
console.log(pedido[clave]); // "pendiente"
delete pedido.fecha;
Object.hasOwn(pedido, "id");   // true
"toString" in pedido;          // true (heredada)
Object.hasOwn(pedido, "toString"); // false
```

---

## 2. Object.keys, values, entries, fromEntries, hasOwn

Todos **no mutan** el objeto; devuelven arrays (o un objeto en fromEntries). Solo cuentan propiedades **propias enumerables** (no las heredadas del prototipo).

### Parámetros y uso (para no dudar)

| Método | Parámetros | Devuelve | Uso en examen |
|--------|------------|----------|----------------|
| `Object.keys(obj)` | `obj`: el objeto. | **Array de strings** (las claves). | Iterar claves, comprobar cuántas hay (`keys(obj).length`). |
| `Object.values(obj)` | `obj`: el objeto. | **Array** con los valores de cada propiedad. | Iterar valores sin tocar las claves. |
| `Object.entries(obj)` | `obj`: el objeto. | **Array de [clave, valor]** (cada par es un array de 2 elementos). | Iterar pares, pasar a Map, transformar con map y luego fromEntries. |
| `Object.fromEntries(iterable)` | `iterable`: array (u otro iterable) de pares `[clave, valor]`. | **Objeto** cuyas propiedades son esos pares. | Reconstruir objeto desde entries; muy útil con .map() para transformar claves/valores. |
| `Object.hasOwn(obj, prop)` | `obj`: objeto. `prop`: string o símbolo (nombre de la propiedad). | **boolean**: true solo si esa propiedad es **propia** (no heredada). | Sustituye a `obj.hasOwnProperty(prop)`; más seguro. No confundir con `prop in obj` (incluye heredadas). |

```js
const config = { host: "localhost", port: 3000 };
Object.keys(config);     // ["host", "port"] — solo los nombres
Object.values(config);   // ["localhost", 3000] — solo los valores
Object.entries(config);  // [["host", "localhost"], ["port", 3000]] — pares [clave, valor]

// fromEntries: array de pares → objeto (inverso de entries)
Object.fromEntries([["a", 1], ["b", 2]]);  // { a: 1, b: 2 }

// hasOwn: ¿es propiedad propia (no heredada)?
const o = { id: 1 };
Object.hasOwn(o, "id");       // true
Object.hasOwn(o, "toString"); // false — toString viene del prototipo
"toString" in o;              // true — in sí incluye heredadas
```

**Caso real — normalizar claves de respuesta API:**
```js
const apiPedido = { order_id: 1, order_status: "pending" };
const pedido = Object.fromEntries(
  Object.entries(apiPedido).map(([k, v]) => [
    k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
    v
  ])
);
// { orderId: 1, orderStatus: "pending" }
```

---

## 3. Spread y Object.assign

- **Spread** `{ ...obj }`: crea un **nuevo** objeto copiando las propiedades de `obj`. No muta nada. Si escribes `{ ...a, ...b }`, las propiedades de `b` sobrescriben las de `a` (el último gana).
- **Object.assign(dest, origen1?, origen2?, ...)**: **Muta** `dest`. Copia todas las propiedades propias de origen1, origen2, … en `dest`. Devuelve **dest**. Útil para “mezclar” varios objetos en uno.

Ambos son **copia superficial**: si una propiedad es un objeto o array, se copia la **referencia** (no se clona por dentro).

| Sintaxis | ¿Muta? | Uso |
|----------|--------|-----|
| `{ ...obj }` | No | Copia de obj; o combinar varios: `{ ...defaults, ...config }`. |
| `Object.assign(dest, ...origen)` | Sí (muta dest) | Añadir/sobrescribir propiedades en dest desde uno o más objetos. |

```js
const base = { a: 1, b: 2 };
const copia = { ...base };              // nuevo objeto { a: 1, b: 2 }
const actualizado = { ...base, b: 3 };   // { a: 1, b: 3 } — b sobrescrito
Object.assign(base, { b: 5 });          // base queda { a: 1, b: 5 }; devuelve base
```

**Caso real — actualizar estado sin mutar (estilo Redux):**
```js
const nuevoPedido = { ...pedido, estado: "pagado", fechaPago: new Date().toISOString() };
```

**Copia profunda** (estándar): `structuredClone(obj)`.

---

## 4. Prototipos (intro)

- Cada objeto tiene un **prototipo** (otro objeto o null). La herencia es por cadena de prototipos.
- `obj.__proto__` (legacy) o `Object.getPrototypeOf(obj)`.
- Las propiedades se buscan en el objeto y luego en la cadena de prototipos.
- Los métodos comunes (toString, hasOwnProperty) viven en Object.prototype.

```js
const o = {};
Object.getPrototypeOf(o) === Object.prototype; // true
o.toString === Object.prototype.toString;      // true
```

En exámenes suele aparecer: “¿de dónde viene esta propiedad?” (propia vs prototipo). Usar `Object.hasOwn`.

---

## 5. Clases, getters y setters

**class** es sintaxis para funciones constructoras y prototipos. **No** muta nada por sí sola; define estructura.

```js
class Pedido {
  constructor(id, total) {
    this.id = id;
    this.total = total;
  }
  get totalConIva() {
    return this.total * 1.21;
  }
  set estado(val) {
    if (["pendiente", "pagado", "enviado"].includes(val)) {
      this._estado = val;
    }
  }
  get estado() {
    return this._estado ?? "pendiente";
  }
}
const p = new Pedido(1, 100);
p.totalConIva;  // 121
p.estado = "pagado";
```

**Getters/setters**: permiten lógica al leer/escribir una propiedad. No mutan por defecto; depende de lo que hagas dentro.

---

## 6. Errores típicos y trampas de examen

- **Spread y assign** son copia superficial; objetos anidados se comparten.
- **Object.assign** muta el primer argumento.
- Confundir `in` con `Object.hasOwn`: `in` incluye prototipo.
- **delete** no borra propiedades no configurables (muchas del prototipo).
- En clases, las propiedades de instancia se definen en constructor o como campos de clase; los métodos en el prototipo.

---

## 7. Checklist rápido

- [ ] CRUD: punto, corchetes, delete, in, Object.hasOwn.
- [ ] Object.keys/values/entries y Object.fromEntries.
- [ ] Spread para copiar/actualizar sin mutar; assign muta el destino.
- [ ] Saber que la copia es superficial.
- [ ] Noción de prototipo y que class es azúcar sintáctica sobre prototipos.
- [ ] Getters/setters para propiedad “calculada” o validada.

---

## 8. Mini-ejercicios

1. Dado un objeto `pedido`, crea un nuevo objeto con las mismas claves pero con los valores que sean strings en mayúsculas (sin mutar el original).
2. Implementa `tieneTodasLasClaves(obj, claves)` que devuelva true si obj tiene todas las claves del array `claves`.
3. Dado `obj`, devuelve un nuevo objeto sin la propiedad `id` (sin mutar obj).
4. Combina dos objetos `defaults` y `config` en uno solo donde `config` tenga prioridad; sin mutar ninguno.
5. Usando Object.entries, filtra las propiedades cuyo valor sea un número mayor que 10 y devuelve un objeto con solo esas propiedades.
6. Define una clase `LineaPedido` con `productoId`, `cantidad`, `precio` y un getter `subtotal` que devuelva cantidad * precio.

---

## 9. Soluciones

<details>
<summary>1. Valores string en mayúsculas</summary>

```js
const result = Object.fromEntries(
  Object.entries(pedido).map(([k, v]) => [
    k,
    typeof v === "string" ? v.toUpperCase() : v
  ])
);
```
</details>

<details>
<summary>2. tieneTodasLasClaves</summary>

```js
function tieneTodasLasClaves(obj, claves) {
  return claves.every(c => Object.hasOwn(obj, c));
}
```
</details>

<details>
<summary>3. Objeto sin propiedad id</summary>

```js
const { id, ...resto } = obj;
const sinId = resto;
```
</details>

<details>
<summary>4. defaults + config (config prioridad)</summary>

```js
const final = { ...defaults, ...config };
```
</details>

<details>
<summary>5. Solo propiedades con valor numérico > 10</summary>

```js
const filtrado = Object.fromEntries(
  Object.entries(obj).filter(([, v]) => typeof v === "number" && v > 10)
);
```
</details>

<details>
<summary>6. Clase LineaPedido</summary>

```js
class LineaPedido {
  constructor(productoId, cantidad, precio) {
    this.productoId = productoId;
    this.cantidad = cantidad;
    this.precio = precio;
  }
  get subtotal() {
    return this.cantidad * this.precio;
  }
}
```
</details>

---

**[⬅ Volver al índice](../README.md)**
