# 1. Fundamentos: sintaxis, variables, operadores y control de flujo

**[⬅ Volver al índice](../README.md)**

**Primera lectura (ruta desde cero):** secciones 1, 2 (`let` y `const`), 3 (aritméticos, comparación con `===`, lógicos y ternario) y 4 (`if` y bucles).

**Ruta de dominio:** `var`, hoisting y TDZ en la sección 2; `??` y `?.` en la sección 3.

---

## Mini-índice del capítulo

1. [Sintaxis básica](#1-sintaxis-básica)
2. [Variables: var, let y const](#2-variables-var-let-y-const)
3. [Operadores](#3-operadores)
4. [Control de flujo](#4-control-de-flujo)
5. [Errores típicos y trampas de examen](#5-errores-típicos-y-trampas-de-examen)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. Sintaxis básica

- **Sentencias** terminan en `;` (opcional con ASI, pero recomendable en código profesional).
- **Bloques** se delimitan con `{ }`.
- **Comentarios**: `//` una línea, `/* */` varias líneas.
- **Identificadores**: letras, `_`, `$`, dígitos (no al inicio). Case-sensitive.

```js
// Sentencias
const nombre = "PedidosApp";
let total = 0;

// Bloque
if (total > 0) {
  console.log("Hay pedidos");
}
```

---

## 2. Variables: var, let y const

En la primera lectura usa `let` y `const`. `const` cuando el nombre no va a apuntar a otro valor; `let` cuando sí (un contador, un total). Las dos viven solo dentro del `{ }` donde se declaran.

```js
function ejemploLet() {
  let x = 10;
  if (true) {
    let x = 20; // variable distinta
    console.log(x); // 20
  }
  console.log(x); // 10
}

const config = { apiUrl: "https://api.example.com" };
config.apiUrl = "https://other.com"; // el objeto se puede cambiar
// config = {}; // Error: no se puede reasignar el nombre
```

### Ruta de dominio: var, hoisting y TDZ

`var` es de código antiguo. Se ve en exámenes. No lo uses en código nuevo.

| Palabra | Scope | Reasignación | Redeclaración (mismo scope) | Hoisting |
|---------|--------|--------------|-----------------------------|----------|
| `var`   | función | Sí | Sí | Sí (valor `undefined`) |
| `let`   | bloque | Sí | No | Sí (TDZ hasta la línea) |
| `const` | bloque | No (referencia) | No | Sí (TDZ hasta la línea) |

```js
function ejemploVar() {
  console.log(x); // undefined (hoisting)
  var x = 10;
  if (true) {
    var x = 20; // misma variable
  }
  console.log(x); // 20
}
```

La TDZ (temporal dead zone) es el tramo en el que `let` o `const` ya existen en el bloque pero todavía no se pueden leer, hasta la línea en la que se declaran. El detalle está en el [capítulo 8](08-scope-hoisting-this.md).

---

## 3. Operadores

### Aritméticos
`+`, `-`, `*`, `/`, `%`, `**` (potencia).  
`++` / `--` (pre y post): mutan y devuelven valor según posición.

```js
let n = 5;
console.log(n++); // 5 (devuelve y luego suma)
console.log(n);   // 6
console.log(++n); // 7 (suma y luego devuelve)
```

### Asignación
`=`, `+=`, `-=`, `*=`, `/=`, `%=`, `**=`, etc.

### Comparación (resultado booleano)
- `==` (igualdad con coerción), `===` (igualdad estricta, sin coerción).
- `!=`, `!==`.
- `<`, `>`, `<=`, `>=`.  
**En exámenes y en la práctica: usar siempre `===` y `!==`.**

### Lógicos
- `&&` (AND): devuelve el primer valor *falsy* o el último si todos son truthy.
- `||` (OR): devuelve el primer valor *truthy* o el último si todos son falsy.
- `!` (NOT): negación booleana.

```js
const env = process.env.NODE_ENV || "development";
const name = user && user.name;
```

### Otros
- **Ternario**: `condición ? valorSiTrue : valorSiFalse`. El ternario entra en la primera lectura.
- **Nullish coalescing** (`??`), ruta de dominio: devuelve el operando derecho solo si el izquierdo es `null` o `undefined`.
- **Optional chaining** (`?.`), ruta de dominio: accede a propiedad o llama a función solo si el valor previo no es null/undefined.

```js
const precio = producto?.precio ?? 0;
const primerItem = pedido?.lineas?.[0];
```

---

## 4. Control de flujo

### if / else if / else

```js
if (pedido.estado === "pendiente") {
  mostrarBotonPagar();
} else if (pedido.estado === "enviado") {
  mostrarSeguimiento();
} else {
  mostrarResumen();
}
```

### switch
Comparación con `===`. Usar `break` para no caer al siguiente caso (fall-through).

```js
switch (pedido.estado) {
  case "pendiente":
    accion = "pagar";
    break;
  case "enviado":
    accion = "seguir";
    break;
  default:
    accion = "ver";
}
```

### for clásico
```js
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
```

### for...of (valores)
Itera sobre valores de iterables (array, string, etc.). No da índice.

```js
for (const item of pedido.lineas) {
  total += item.cantidad * item.precio;
}
```

### for...in (claves)
Itera sobre claves enumerables de un objeto. **No usar para arrays** si quieres orden garantizado; preferir `for...of` o métodos de array.

```js
for (const key in config) {
  console.log(key, config[key]);
}
```

### while / do...while
```js
while (cola.length > 0) {
  procesar(cola.shift());
}

do {
  entrada = prompt("Introduce un número");
} while (isNaN(Number(entrada)));
```

---

## 5. Errores típicos y trampas de examen

- **Confundir `var` con `let`**: con `var`, una variable declarada en un `if` o `for` sigue existiendo fuera del bloque; con `let` no.
- **Usar `==` en lugar de `===`**: `"0" == 0` es `true`; `"0" === 0` es `false`. En examen suelen preguntar por esto.
- **Reasignar `const`**: `const x = 1; x = 2;` lanza error.
- **TDZ (Temporal Dead Zone)**: acceder a `let`/`const` antes de su línea de declaración (aunque esté en el mismo bloque) lanza ReferenceError.
- **Switch sin `break`**: si no pones `break`, la ejecución continúa al siguiente `case`.
- **Comparar arrays/objetos con `===`**: compara referencias, no contenido. `[1,2] === [1,2]` es `false`.

---

## 6. Checklist rápido

- [ ] Saber la diferencia de scope y hoisting entre `var`, `let` y `const`.
- [ ] Usar `const` por defecto y `let` solo cuando haga falta reasignar.
- [ ] Preferir siempre `===` y `!==` frente a `==` y `!=`.
- [ ] Conocer el resultado de `&&` y `||` (primer falsy / primer truthy).
- [ ] Saber usar ternario, `??` y `?.` en expresiones.
- [ ] Diferenciar `for`, `for...of` y `for...in` y cuándo usar cada uno.
- [ ] Recordar que `switch` usa `===` y que hace falta `break` para evitar fall-through.
- [ ] No comparar arrays/objetos con `===` esperando comparación por valor.

---

## 7. Mini-ejercicios

1. **Variables**: Escribe un pequeño programa que use `const` para una configuración (objeto) y `let` para un contador que se incrementa en un bucle. Muestra por consola que no puedes reasignar la constante pero sí mutar una propiedad del objeto.

2. **Operadores**: Dado un objeto `usuario` que puede tener `nombre` y `email` opcionales, escribe una expresión que devuelva el nombre o `"Anónimo"` y el email o `"sin-email"` usando `?.` y `??`.

3. **Control de flujo**: Dado un array de pedidos con `estado` (`"pendiente"`, `"pagado"`, `"enviado"`), usa un `for...of` para contar cuántos hay de cada estado y guardar el resultado en un objeto `{ pendiente: n, pagado: n, enviado: n }`.

4. **Ternario y lógicos**: Sin usar `if`, escribe una expresión que asigne a `mensaje` un texto según `pedido.total`: si es 0 → `"Carrito vacío"`, si &lt; 50 → `"Añade más para envío gratis"`, si no → `"Envío gratis"`.

5. **Switch**: Implementa una función `obtenerEtiquetaEstado(estado)` que devuelva una etiqueta legible para `"P"`, `"E"`, `"C"` (pendiente, enviado, cancelado) y `"Desconocido"` para cualquier otro valor.

6. **Bucle**: Dado un array de números, usa un `for` clásico para calcular la suma de los elementos en posiciones pares (índices 0, 2, 4, ...).

---

## 8. Soluciones

<details>
<summary>1. Variables (const/let y mutación)</summary>

```js
const config = { maxReintentos: 3 };
let intentos = 0;

while (intentos < config.maxReintentos) {
  intentos++;
  console.log("Intento", intentos);
}
// config = {}; // Error si descomentas
config.maxReintentos = 5; // OK: mutar propiedad
```
</details>

<details>
<summary>2. Optional chaining y nullish coalescing</summary>

```js
const usuario = { nombre: "Ana" };
const nombre = usuario?.nombre ?? "Anónimo";
const email = usuario?.email ?? "sin-email";
console.log(nombre, email); // "Ana" "sin-email"
```
</details>

<details>
<summary>3. Contar estados con for...of</summary>

```js
const pedidos = [
  { id: 1, estado: "pendiente" },
  { id: 2, estado: "pagado" },
  { id: 3, estado: "pendiente" }
];
const conteo = { pendiente: 0, pagado: 0, enviado: 0 };

for (const p of pedidos) {
  if (conteo.hasOwnProperty(p.estado)) {
    conteo[p.estado]++;
  }
}
console.log(conteo); // { pendiente: 2, pagado: 1, enviado: 0 }
```
</details>

<details>
<summary>4. Mensaje según total (ternarios)</summary>

```js
const total = 30;
const mensaje =
  total === 0
    ? "Carrito vacío"
    : total < 50
    ? "Añade más para envío gratis"
    : "Envío gratis";
```
</details>

<details>
<summary>5. obtenerEtiquetaEstado con switch</summary>

```js
function obtenerEtiquetaEstado(estado) {
  switch (estado) {
    case "P":
      return "Pendiente";
    case "E":
      return "Enviado";
    case "C":
      return "Cancelado";
    default:
      return "Desconocido";
  }
}
```
</details>

<details>
<summary>6. Suma en índices pares</summary>

```js
const nums = [10, 20, 30, 40, 50];
let suma = 0;
for (let i = 0; i < nums.length; i += 2) {
  suma += nums[i];
}
console.log(suma); // 10 + 30 + 50 = 90
```
</details>

---

**Siguiente en la ruta desde cero:** [02 - Tipos](02-types-coercion.md)

**[⬅ Volver al índice](../README.md)**
