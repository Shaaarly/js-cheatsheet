# 2. Tipos y coerción: primitives vs reference, truthy/falsy, == vs ===

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Tipos primitivos y de referencia](#1-tipos-primitivos-y-de-referencia)
2. [Valor vs referencia](#2-valor-vs-referencia)
3. [Truthy y falsy](#3-truthy-y-falsy)
4. [Coerción y == vs ===](#4-coerción-y--vs-)
5. [typeof e instanceof](#5-typeof-e-instanceof)
6. [Errores típicos y trampas de examen](#6-errores-típicos-y-trampas-de-examen)
7. [Checklist rápido](#7-checklist-rápido)
8. [Mini-ejercicios](#8-mini-ejercicios)
9. [Soluciones](#9-soluciones)

---

## 1. Tipos primitivos y de referencia

**Primitivos** (se copian por valor): `string`, `number`, `boolean`, `undefined`, `null`, `symbol`, `bigint`.

**Referencia** (se copia la referencia, no el valor): `object` (incluye arrays, funciones, Date, RegExp).

```js
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 — primitivo, copia por valor

let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4] — misma referencia
```

---

## 2. Valor vs referencia

- **Asignación**: con primitivos se copia el valor; con objetos/arrays se copia la referencia.
- **Comparación**: `===` en primitivos compara valores; en objetos compara referencias (mismo objeto en memoria o no).

```js
const pedido1 = { id: 1, total: 99 };
const pedido2 = { id: 1, total: 99 };
console.log(pedido1 === pedido2); // false — referencias distintas

const ref = pedido1;
console.log(pedido1 === ref); // true — misma referencia
```

Para comparar contenido de objetos/arrays hay que comparar propiedades o usar librerías (lodash.isEqual) o implementar la comparación a mano.

---

## 3. Truthy y falsy

En contextos booleanos (if, &&, ||, ternario), estos valores se evalúan como **falsy**:

- `false`
- `0`, `-0`, `0n`
- `""` (string vacío)
- `null`
- `undefined`
- `NaN`

Todo lo demás es **truthy** (incluidos `[]`, `{}`, `"0"`, `"false"`).

```js
if ([]) console.log("array vacío es truthy"); // se ejecuta
if ("0") console.log("string '0' es truthy"); // se ejecuta
if (0) {} else console.log("0 es falsy"); // se ejecuta el else

// Caso real: valor por defecto solo si no hay datos
const nombre = usuario.nombre || "Invitado"; // "" sería reemplazado por "Invitado"
const nombreSeguro = usuario.nombre ?? "Invitado"; // solo null/undefined
```

---

## 4. Coerción y == vs ===

**`===` (estricto)**: sin coerción. Mismo tipo y mismo valor.

**`==` (abstracto)**: convierte tipos antes de comparar. Puede dar resultados sorprendentes en examen.

| Expresión | === | == |
|-----------|-----|-----|
| `"5" === 5` | false | true |
| `"" == 0` | false | true |
| `null == undefined` | false | true |
| `false == 0` | false | true |
| `"  " == 0` | false | true (string → number → 0) |

**Recomendación**: usar siempre `===` y `!==`. Si necesitas comparar con null/undefined a la vez: `valor == null` (solo es true para null y undefined).

```js
// Coerción en operaciones
"3" * 2;   // 6 — string a number
"3" + 2;   // "32" — number a string (+ concatena)
+"42";     // 42 — unary + convierte a number
```

---

## 5. typeof e instanceof

- **typeof** devuelve string: `"string"`, `"number"`, `"boolean"`, `"undefined"`, `"object"` (null y objetos), `"function"`, `"symbol"`, `"bigint"`.
- **typeof null === "object"** (bug histórico): comprobar null aparte.
- **instanceof**: comprueba si un objeto es instancia de una función constructora (o de una clase).

```js
typeof [1, 2];        // "object"
typeof null;          // "object"
typeof function () {}; // "function"

[1, 2] instanceof Array;   // true
({}) instanceof Object;    // true
```

Para arrays es más fiable `Array.isArray(arr)`.

---

## 6. Errores típicos y trampas de examen

- Creer que `[]` o `{}` son falsy (son truthy).
- Usar `==` y no prever coerción: `"0" == 0` → true.
- Comparar objetos/arrays con `===` esperando comparación por contenido (solo compara referencias).
- Mutar un objeto “compartido” por referencia y esperar que otra variable no cambie.
- Confundir `typeof null` con `"null"` (es `"object"`).
- Usar `||` para valores por defecto cuando `0` o `""` son válidos; en ese caso usar `??`.

---

## 7. Checklist rápido

- [ ] Distinguir primitivos (valor) de objetos/arrays (referencia).
- [ ] Saber qué valores son falsy y que `[]`, `{}`, `"0"` son truthy.
- [ ] Usar siempre `===` / `!==` salvo cuando se quiera `valor == null`.
- [ ] Recordar que `==` hace coerción y puede dar true en casos como `"5" == 5`.
- [ ] No comparar objetos/arrays con `===` para “igualdad de contenido”.
- [ ] Saber que `typeof null === "object"` y usar `Array.isArray` para arrays.

---

## 8. Mini-ejercicios

1. Sin ejecutar: ¿qué devuelve `[] == ![]`? Razona con coerción.
2. Escribe una expresión que devuelva `true` solo si `x` es `null` o `undefined`, usando `==` en una sola comparación.
3. Dado un array de valores mixtos `[1, "a", null, 0, {}, undefined, false]`, filtra solo los truthy (puedes usar un bucle o filter).
4. Indica si cada uno es truthy o falsy: `"false"`, `""`, `NaN`, `[]`, `{}`.
5. Dado `const a = { id: 1 }; const b = a; b.id = 2;`, ¿qué vale `a.id`? ¿Por qué?
6. Escribe una función `esObjetoVacio(obj)` que devuelva true solo para `{}` (objeto sin propiedades propias). Considera null/undefined.

---

## 9. Soluciones

<details>
<summary>1. [] == ![]</summary>

`![]` es `false` (array es truthy). Queda `[] == false`. Coerción: `[]` → string `""` → number `0`; `false` → `0`. `0 === 0` → **true**.
</details>

<details>
<summary>2. true solo si x es null o undefined</summary>

```js
x == null
```
</details>

<details>
<summary>3. Filtrar truthy</summary>

```js
const arr = [1, "a", null, 0, {}, undefined, false];
const truthy = arr.filter(Boolean); // [1, "a", {}]
```
</details>

<details>
<summary>4. Truthy/falsy</summary>

`"false"` truthy, `""` falsy, `NaN` falsy, `[]` truthy, `{}` truthy.
</details>

<details>
<summary>5. a.id después de b.id = 2</summary>

`a.id` es `2` porque `a` y `b` apuntan al mismo objeto (referencia).
</details>

<details>
<summary>6. esObjetoVacio</summary>

```js
function esObjetoVacio(obj) {
  if (obj == null || typeof obj !== "object") return false;
  return Object.keys(obj).length === 0;
}
```
</details>

---

**[⬅ Volver al índice](../README.md)**
