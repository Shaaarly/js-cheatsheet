# 8. Scope, hoisting y this

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Scope léxico y block scope](#1-scope-léxico-y-block-scope)
2. [Hoisting](#2-hoisting)
3. [this: global, función, método, arrow, event handlers](#3-this-global-función-método-arrow-event-handlers)
4. [bind, call, apply](#4-bind-call-apply)
5. [Errores típicos y trampas de examen](#5-errores-típicos-y-trampas-de-examen)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. Scope léxico y block scope

- **Scope léxico**: el ámbito donde se escribe la función determina qué variables puede ver (no dónde se llama).
- **Function scope**: `var` y las declaraciones de función tienen scope de función.
- **Block scope**: `let` y `const` viven solo dentro del bloque `{ }` (if, for, while, función, bloque solo).

```js
function outer() {
  const a = 1;
  let b = 2;
  if (true) {
    const c = 3;
    var d = 4; // d es de la función, no del if
  }
  console.log(d); // 4
  // console.log(c); // Error: c no existe aquí
}
```

---

## 2. Hoisting

- Las **declaraciones** de variables y funciones se “elevan” al inicio de su scope; la asignación (o inicialización) se queda en su línea.
- **var**: hoisting con valor `undefined` hasta la asignación.
- **let / const**: hoisting en “Temporal Dead Zone” (TDZ): no se puede acceder hasta la línea de declaración; si accedes antes → ReferenceError.
- **Function declaration**: se hoistea la función completa (se puede llamar antes de la línea).

```js
console.log(x); // undefined (var hoisted)
var x = 5;

// console.log(y); // ReferenceError (TDZ)
let y = 5;

foo(); // OK
function foo() { return 1; }

// bar(); // Error si bar es const/let con function expression
const bar = function () { return 2; };
```

---

## 3. this: global, función, método, arrow, event handlers

- **Global (no strict)**: `this` → objeto global (window en navegador). En strict → undefined.
- **Función llamada “suelta”**: `this` es undefined (strict) o global (no strict). Muy habitual en callbacks.
- **Método (objeto.fn())**: `this` es el objeto sobre el que se llama.
- **Arrow**: no tiene su propio `this`; usa el del ámbito léxico donde se definió.
- **Event handler (addEventListener)**: el elemento que dispara el evento suele ser el target; el callback puede recibir el evento y usar `event.currentTarget` como “elemento al que está asociado el listener”. Si el handler es una función normal, `this` en muchos entornos es el elemento; con arrow, `this` viene del exterior.

```js
const obj = {
  nombre: "Pedido",
  mostrar() {
    console.log(this.nombre); // this = obj
    const inner = () => console.log(this.nombre); // this = obj (léxico)
    inner();
  }
};
obj.mostrar();

// Pérdida de this
const fn = obj.mostrar;
fn(); // this undefined o global
```

**Caso real — callback que necesita this:**
```js
class PedidoList {
  constructor() {
    this.items = [];
    // Opción 1: arrow (this = instancia)
    document.querySelector("#add").addEventListener("click", () => this.add());
    // Opción 2: bind
    document.querySelector("#add").addEventListener("click", this.add.bind(this));
  }
  add() {
    this.items.push({});
  }
}
```

---

## 4. bind, call, apply

- **fn.call(thisArg, arg1, arg2, ...)**: llama fn con this = thisArg y argumentos listados. No muta fn.
- **fn.apply(thisArg, [arg1, arg2, ...])**: igual que call pero los argumentos van en un array.
- **fn.bind(thisArg, arg1?, ...)**: devuelve una **nueva función** con this (y opcionalmente argumentos) fijados; no llama a la función.

```js
function saludar(prefijo) {
  return prefijo + " " + this.nombre;
}
const user = { nombre: "Ana" };
saludar.call(user, "Hola");   // "Hola Ana"
saludar.apply(user, ["Hola"]); // "Hola Ana"
const bound = saludar.bind(user, "Hola");
bound(); // "Hola Ana"
```

**Uso típico**: fijar `this` en callbacks (bind) o llamar una función con un this concreto (call/apply). apply útil cuando los argumentos vienen en array.

---

## 5. Errores típicos y trampas de examen

- Confundir **scope** con **donde se llama** la función: el scope es léxico (donde se define).
- Acceder a `let`/`const` antes de la línea de declaración (TDZ) → ReferenceError.
- Creer que **arrow** tiene this propio: no; toma el del exterior.
- Pasar método como callback sin bind (o sin arrow): `this` se pierde. Ej. `setTimeout(obj.metodo, 100)` → this no es obj.
- **bind** no muta la función original; devuelve una nueva.

---

## 6. Checklist rápido

- [ ] Scope: function scope (var) vs block scope (let/const).
- [ ] Hoisting: var → undefined; let/const → TDZ; function declaration → función completa.
- [ ] this en método = objeto; en función “suelta” = undefined/global; en arrow = léxico.
- [ ] call/apply llaman con this y args; bind devuelve función con this (y args opcionales) fijados.

---

## 7. Mini-ejercicios

1. Sin ejecutar: ¿qué imprime? `function f() { console.log(a); var a = 1; } f();`
2. ¿Y esto? `function f() { console.log(b); let b = 1; } f();`
3. Dado un objeto `{ valor: 42, getValor() { return this.valor; } }`, asigna `getValor` a una variable y llámala. ¿Qué devuelve? ¿Cómo lo arreglas con bind?
4. Escribe una función que reciba un array y use `Math.max` con apply o spread para devolver el máximo (sin usar rest en la firma de tu función, pero sí apply o spread en la llamada).
5. En un handler de evento, ¿por qué a veces se usa arrow y otras .bind(this)? Explica en una frase.
6. Indica el valor de `this` en cada contexto: (a) dentro de una función llamada como obj.metodo(), (b) dentro de una arrow definida dentro de esa misma función.

---

## 8. Soluciones

<details>
<summary>1. var a hoisting</summary>

Imprime `undefined`. La declaración de `a` se hoistea; la asignación `a = 1` queda en su sitio, así que en el console.log aún no se ha asignado.
</details>

<details>
<summary>2. let b TDZ</summary>

ReferenceError: no se puede acceder a `b` antes de su declaración (TDZ).
</details>

<details>
<summary>3. getValor y bind</summary>

Devuelve undefined (o error en strict) porque se llama “suelta”. Arreglo: llamar `getValor.bind(obj)()` o guardar `const fn = obj.getValor.bind(obj); fn();`
</details>

<details>
<summary>4. Máximo con apply/spread</summary>

```js
function maxArray(arr) {
  return Math.max.apply(null, arr);
}
// o: return Math.max(...arr);
```
</details>

<details>
<summary>5. Arrow vs bind en handlers</summary>

Se usa arrow cuando quieres que `this` sea el del ámbito donde se define (p. ej. la instancia de una clase). Se usa bind cuando tienes ya un método que necesita su `this` (obj) y lo pasas como callback.
</details>

<details>
<summary>6. Valor de this (a) y (b)</summary>

(a) `this` = obj. (b) Dentro de la arrow, `this` es el mismo que en el ámbito donde se definió la arrow; si esa función era método de obj, suele ser obj también (léxico).
</details>

---

**[⬅ Volver al índice](../README.md)**
