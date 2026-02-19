# 18. Testing mental para examen: ejercicios tipo examen por bloques

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Bloque 1: Variables, tipos y coerción](#1-bloque-1-variables-tipos-y-coerción)
2. [Bloque 2: Arrays y métodos](#2-bloque-2-arrays-y-métodos)
3. [Bloque 3: Objetos y funciones](#3-bloque-3-objetos-y-funciones)
4. [Bloque 4: Scope, this y closures](#4-bloque-4-scope-this-y-closures)
5. [Bloque 5: Asincronía y promesas](#5-bloque-5-asincronía-y-promesas)
6. [Bloque 6: DOM y eventos](#6-bloque-6-dom-y-eventos)
7. [Soluciones](#7-soluciones)

---

## 1. Bloque 1: Variables, tipos y coerción

**E1.** ¿Qué sale por consola?
```js
let a = 1;
const b = a;
a = 2;
console.log(b);
```

**E2.** Indica el valor (true/false) de: `[] == false`, `[] === false`, `"" == 0`.

**E3.** ¿Qué imprime?
```js
console.log(typeof null);
console.log(Array.isArray([]));
console.log(Number.isNaN(NaN));
```

**E4.** Sin ejecutar: ¿qué devuelve `["1", "2", "3"].map(Number)`?

**E5.** Dado `const o = { x: 1 }; const p = o; p.x = 2;` ¿Cuánto vale `o.x`? ¿Por qué?

---

## 2. Bloque 2: Arrays y métodos

**E6.** ¿El siguiente código muta el array original? ¿Qué devuelve?
```js
const arr = [3, 1, 2];
const r = arr.sort((a, b) => a - b);
```

**E7.** Escribe una expresión que, dado un array de pedidos con propiedad `total`, devuelva la suma de los totales usando reduce.

**E8.** Diferencia entre `arr.slice(1, 3)` y `arr.splice(1, 2)`: qué hace cada uno y si muta.

**E9.** ¿Qué imprime?
```js
const a = [1, 2, 3];
const b = a.map(x => x * 2);
console.log(a);
console.log(b);
```

**E10.** Dado `ids = [1, 2, 2, 3, 1]`, escribe una expresión que devuelva un array con ids únicos (sin repetir).

---

## 3. Bloque 3: Objetos y funciones

**E11.** Dado `const obj = { a: 1, b: 2 };`, escribe cómo crear un nuevo objeto igual pero sin la propiedad `b` (sin mutar obj).

**E12.** ¿Qué devuelve esta función si la llamas con `fn(2)(3)`?
```js
const fn = (a) => (b) => a + b;
```

**E13.** Indica el orden de salida:
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

**E14.** ¿Qué imprime?
```js
function f() {
  console.log(this?.nombre);
}
const o = { nombre: "Test", f };
const g = o.f;
g();
```

**E15.** Escribe la firma de una función que use rest para recibir un número variable de argumentos y devuelva su suma.

---

## 4. Bloque 4: Scope, this y closures

**E16.** ¿Qué imprime y por qué?
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

**E17.** ¿Y con `let i` en lugar de `var i`?

**E18.** Sin ejecutar: ¿qué devuelve `saludar.bind({ nombre: "Ana" })("Hola")` si saludar es `function saludar(msg) { return msg + " " + this.nombre; }`?

**E19.** ¿Qué valor tiene `this` dentro de una arrow function definida en el método de un objeto? (una frase)

**E20.** Explica qué es la TDZ y con qué declaraciones está relacionada.

---

## 5. Bloque 5: Asincronía y promesas

**E21.** ¿Qué devuelve `Promise.resolve(1).then(x => x + 1).then(x => x * 2)`? (el valor final de la cadena)

**E22.** Si haces `Promise.all([p1, p2, p3])` y p2 se rechaza, ¿qué pasa con la promesa devuelta por Promise.all?

**E23.** Convierte a async/await (manteniendo el mismo comportamiento):
```js
function get() {
  return fetch("/api/data").then(r => r.json()).catch(e => ({}));
}
```

**E24.** ¿Qué hace `Promise.race([fetch(url), timeoutPromise])`? (una frase)

**E25.** En una función async, ¿cómo capturas el error si `await algunaPromesa()` rechaza?

---

## 6. Bloque 6: DOM y eventos

**E26.** ¿Qué devuelve `document.querySelectorAll(".item")` si no hay elementos con esa clase?

**E27.** Diferencia entre `event.target` y `event.currentTarget` en un listener puesto en un contenedor cuando el usuario hace click en un hijo.

**E28.** ¿Para qué se usa `event.preventDefault()` en un formulario?

**E29.** ¿Qué hace `element.classList.toggle("active")`?

**E30.** Explica en una frase qué es la delegación de eventos y por qué es útil.

---

## 7. Soluciones

<details>
<summary>E1</summary>
1. b es copia del valor primitivo en el momento de la asignación.
</details>
<details>
<summary>E2</summary>
[] == false → true (coerción). [] === false → false. "" == 0 → true.
</details>
<details>
<summary>E3</summary>
"object", true, true.
</details>
<details>
<summary>E4</summary>
[1, 2, 3].
</details>
<details>
<summary>E5</summary>
o.x === 2. o y p son la misma referencia; mutar p.x modifica el objeto compartido.
</details>
<details>
<summary>E6</summary>
Sí muta. sort muta arr. r es la misma referencia que arr (ordenado).
</details>
<details>
<summary>E7</summary>
pedidos.reduce((acc, p) => acc + p.total, 0)
</details>
<details>
<summary>E8</summary>
slice: no muta; devuelve subarray [arr[1], arr[2]]. splice: muta; elimina 2 elementos desde índice 1 y devuelve los eliminados.
</details>
<details>
<summary>E9</summary>
[1, 2, 3] y [2, 4, 6]. map no muta.
</details>
<details>
<summary>E10</summary>
[...new Set(ids)]
</details>
<details>
<summary>E11</summary>
const { b, ...nuevo } = obj; nuevo es { a: 1 }.
</details>
<details>
<summary>E12</summary>
5.
</details>
<details>
<summary>E13</summary>
A, D, C, B.
</details>
<details>
<summary>E14</summary>
undefined (o error en strict). g se llama "suelta", this no es o.
</details>
<details>
<summary>E15</summary>
function sum(...nums) { return nums.reduce((a,b)=>a+b,0); }
</details>
<details>
<summary>E16</summary>
3, 3, 3. var i es una sola variable; cuando se ejecutan los timeouts, i ya vale 3.
</details>
<details>
<summary>E17</summary>
0, 1, 2. let crea una variable por iteración; cada callback captura su i.
</details>
<details>
<summary>E18</summary>
"Hola Ana".
</details>
<details>
<summary>E19</summary>
this es el del ámbito léxico donde se definió la arrow (no el objeto).
</details>
<details>
<summary>E20</summary>
Temporal Dead Zone: no se puede acceder a let/const antes de su línea de declaración; ReferenceError.
</details>
<details>
<summary>E21</summary>
Promesa que se cumple con 4.
</details>
<details>
<summary>E22</summary>
La promesa de Promise.all se rechaza con el error de p2.
</details>
<details>
<summary>E23</summary>
async function get() { try { const r = await fetch("/api/data"); return await r.json(); } catch { return {}; } }
</details>
<details>
<summary>E24</summary>
Devuelve una promesa que se cumple o rechaza cuando la primera de las dos (fetch o timeout) termina.
</details>
<details>
<summary>E25</summary>
try { await algunaPromesa(); } catch (e) { ... }
</details>
<details>
<summary>E26</summary>
NodeList vacía (length 0).
</details>
<details>
<summary>E27</summary>
target: elemento en el que se hizo click (el hijo). currentTarget: elemento al que está asociado el listener (el contenedor).
</details>
<details>
<summary>E28</summary>
Evita que el formulario se envíe por defecto (recarga); permite validar o enviar por AJAX.
</details>
<details>
<summary>E29</summary>
Añade la clase "active" si no está, o la quita si está.
</details>
<details>
<summary>E30</summary>
Un solo listener en un contenedor que maneja eventos de hijos (p. ej. por target/closest). Útil para listas dinámicas y menos listeners.
</details>

---

**[⬅ Volver al índice](../README.md)**
