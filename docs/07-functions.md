# 7. Funciones: declarations, expressions, arrow, closures, HOF

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Declarations vs expressions vs arrow](#1-declarations-vs-expressions-vs-arrow)
2. [Parámetros por defecto, rest y spread](#2-parámetros-por-defecto-rest-y-spread)
3. [Closures](#3-closures)
4. [Currying (mínimo) y higher-order functions](#4-currying-mínimo-y-higher-order-functions)
5. [Errores típicos y trampas de examen](#5-errores-típicos-y-trampas-de-examen)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. Declarations vs expressions vs arrow

**Function declaration**: tiene hoisting; se puede llamar antes de la definición.
```js
function totalPedido(pedido) {
  return pedido.lineas.reduce((s, l) => s + l.cantidad * l.precio, 0);
}
```

**Function expression**: la función es un valor asignado a una variable. No hay hoisting de la variable (let/const).
```js
const totalPedido = function(pedido) {
  return pedido.lineas.reduce((s, l) => s + l.cantidad * l.precio, 0);
};
```

**Arrow function**: no tiene su propio `this` (usa el del ámbito léxico), ni `arguments`, ni se puede usar como constructor. Sintaxis corta para return: `() => valor`.
```js
const totalPedido = (pedido) =>
  pedido.lineas.reduce((s, l) => s + l.cantidad * l.precio, 0);

const porEstado = (estado) => (pedido) => pedido.estado === estado;
```

**Cuándo usar qué**: arrow en callbacks y cuando quieres conservar `this` del exterior; declaration cuando quieres hoisting o función nombrada para recursión.

---

## 2. Parámetros por defecto, rest y spread

**Default params**: se evalúan cuando se llama (solo si el argumento es `undefined`).
```js
function crearPedido(cliente, lineas = []) {
  return { cliente, lineas, fecha: new Date().toISOString() };
}
```

**Rest** (`...rest`): agrupa el “resto” de argumentos en un array.
```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6
```

**Spread en llamada**: expande un iterable como argumentos.
```js
const nums = [1, 2, 3];
sum(...nums); // 6
```

**Caso real — wrapper con argumentos fijos y variables:**
```js
function log(fmt, ...args) {
  console.log(`[${new Date().toISOString()}]`, fmt, ...args);
}
```

---

## 3. Closures

Una **closure** es una función que “recuerda” las variables del ámbito donde se creó, aunque ese ámbito ya haya terminado de ejecutarse.

```js
function contador(inicial) {
  let count = inicial;
  return function () {
    count++;
    return count;
  };
}
const inc = contador(0);
inc(); // 1
inc(); // 2
```

**Caso real — factory de filtros:**
```js
function porCampo(campo, valor) {
  return (item) => item[campo] === valor;
}
const pendientes = pedidos.filter(porCampo("estado", "pendiente"));
```

**Caso real — handler con datos:**
```js
function crearHandler(pedidoId) {
  return function () {
    console.log("Pedido seleccionado:", pedidoId);
  };
}
boton.onclick = crearHandler(pedido.id);
```

En exámenes: identificar qué valor “ve” la función interna (el de la closure, no el valor actual del variable en el scope externo si ya cambió, p. ej. en un bucle).

---

## 4. Currying (mínimo) y higher-order functions

**Currying**: función que recibe argumentos de uno en uno y devuelve otra función hasta completar.
```js
const sumar = (a) => (b) => a + b;
sumar(2)(3); // 5
```

**Higher-Order Function (HOF)**: función que recibe una o más funciones como argumento o devuelve una función. Ejemplos: map, filter, reduce; o wrappers como “once”, “debounce”.
```js
function once(fn) {
  let called = false;
  return function (...args) {
    if (!called) {
      called = true;
      return fn.apply(this, args);
    }
  };
}
```

---

## 5. Errores típicos y trampas de examen

- **Arrow** no tiene su propio `this`: en métodos de objeto o clases suele usarse función normal si necesitas `this`.
- **Closure en bucle**: si creas callbacks en un for con `var i`, todos “ven” el mismo `i` (el final). Solución: `let` o pasar `i` como argumento/parámetro.
- **Default params** solo con `undefined`; valores falsy como `0` o `""` no activan el default.
- **Rest** debe ser el último parámetro.

---

## 6. Checklist rápido

- [ ] Diferenciar declaration (hoisting), expression y arrow (sin this propio).
- [ ] Default params, rest (...args), spread en llamada.
- [ ] Closure: función que usa variables de un ámbito exterior que ya terminó.
- [ ] HOF: función que recibe o devuelve funciones; currying como patrón de “un argumento por llamada”.

---

## 7. Mini-ejercicios

1. Escribe una función arrow que reciba un array de pedidos y devuelva el primer pedido con estado `"pendiente"`, o undefined.
2. Crea una función `multiplicador(factor)` que devuelva una función; esa función debe recibir un número y devolver factor * número (closure).
3. Implementa `mayorQue(limite)` que devuelva una función (elem) => elem > limite. Úsala para filtrar un array de números.
4. Función que reciba un número variable de argumentos y devuelva el máximo (usando rest y Math.max).
5. Escribe una HOF `mapWith(fn)` que reciba una función y devuelva una función que, dado un array, devuelva arr.map(fn).
6. ¿Qué imprime este código? Razona con closures.
```js
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

---

## 8. Soluciones

<details>
<summary>1. Primer pedido pendiente (arrow)</summary>

```js
const primerPendiente = (pedidos) => pedidos.find(p => p.estado === "pendiente");
```
</details>

<details>
<summary>2. multiplicador (closure)</summary>

```js
function multiplicador(factor) {
  return (n) => factor * n;
}
const doble = multiplicador(2);
doble(5); // 10
```
</details>

<details>
<summary>3. mayorQue y filter</summary>

```js
const mayorQue = (limite) => (elem) => elem > limite;
[1, 5, 10, 3].filter(mayorQue(4)); // [5, 10]
```
</details>

<details>
<summary>4. Máximo de N argumentos (rest)</summary>

```js
const max = (...nums) => Math.max(...nums);
max(1, 5, 2, 9); // 9
```
</details>

<details>
<summary>5. mapWith (HOF)</summary>

```js
const mapWith = (fn) => (arr) => arr.map(fn);
const porDos = mapWith(x => x * 2);
porDos([1, 2, 3]); // [2, 4, 6]
```
</details>

<details>
<summary>6. setTimeout con var i</summary>

Imprime 4, 4, 4. `var i` es una sola variable compartida; cuando se ejecutan los callbacks (100 ms después), el bucle ya terminó e i vale 4. Con `let i` se imprimiría 1, 2, 3.
</details>

---

**[⬅ Volver al índice](../README.md)**
