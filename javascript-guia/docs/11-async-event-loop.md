# 11. Asincronía y Event Loop

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Síncrono vs asíncrono](#1-síncrono-vs-asíncrono)
2. [Call stack](#2-call-stack)
3. [Cola de tareas: microtasks y macrotasks](#3-cola-de-tareas-microtasks-y-macrotasks)
4. [Orden de ejecución típico](#4-orden-de-ejecución-típico)
5. [Errores típicos y trampas de examen](#5-errores-típicos-y-trampas-de-examen)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. Síncrono vs asíncrono

- **Síncrono**: las instrucciones se ejecutan una tras otra; la siguiente espera a que termine la actual. Bloquea hasta terminar.
- **Asíncrono**: se programa trabajo para “después” (callbacks, promesas); el flujo no se bloquea. La respuesta llega cuando el evento o la I/O termina.

Ejemplos de operaciones asíncronas: `setTimeout`, `fetch`, lectura de archivos, eventos del DOM. El código que depende del resultado va en callbacks o en `.then()` / `await`.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// Salida: A, C, B (B es asíncrono)
```

---

## 2. Call stack

- **Call stack** (pila de llamadas): donde se ejecuta el código. Cada llamada a función empuja un frame; al retornar, se desapila.
- El intérprete solo ejecuta lo que está en la cima del stack. Si una función tarda mucho (ej. bucle infinito), bloquea el resto (incluida la UI en navegador).
- Las tareas asíncronas no se ejecutan en el stack hasta que el stack esté vacío y les toque según las colas.

---

## 3. Cola de tareas: microtasks y macrotasks

- **Macrotasks** (cola de “tareas”): setTimeout, setInterval, I/O, UI render (en navegador). Se ejecuta una macrotask; luego se vacía la cola de microtasks.
- **Microtasks**: callbacks de **promesas** (then/catch/finally), queueMicrotask, en algunos entornos MutationObserver. Tienen prioridad: se ejecutan todas las microtasks pendientes antes de pasar a la siguiente macrotask.

Orden típico en un “tick”:
1. Ejecutar una macrotask (o la inicial).
2. Ejecutar **todas** las microtasks pendientes (incluidas las que se encolan desde dentro de estas).
3. Si hay render (navegador), pintar.
4. Siguiente macrotask.

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// 1, 4, 3, 2  (microtask 3 antes que macrotask 2)
```

---

## 4. Orden de ejecución típico

- Todo el código síncrono (incluido el del cuerpo de una función que se está ejecutando) termina primero.
- Luego se procesan las microtasks (then, catch, finally de promesas ya resueltas).
- Después, la siguiente macrotask (p. ej. un setTimeout).

En exámenes suelen pedir “orden de los console.log”. Regla práctica: síncrono → microtasks → macrotasks.

```js
async function f() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}
console.log("C");
f();
console.log("D");
// C, A, D, B  (await encola el “B” como microtask)
```

---

## 5. Errores típicos y trampas de examen

- Creer que `setTimeout(fn, 0)` ejecuta fn “al instante”; se ejecuta después del código síncrono y de las microtasks.
- Confundir orden: las promesas (microtasks) se ejecutan antes que los timeouts (macrotasks) programados en el mismo “tick”.
- await pausa la función pero no bloquea el motor: el resto del programa sigue; la continuación de la función async se encola como microtask cuando la promesa se resuelve.
- Un error no capturado en una promesa (rejection no manejada) puede verse “después” en consola según el entorno.

---

## 6. Checklist rápido

- [ ] Síncrono se ejecuta primero; lo asíncrono se programa y corre después.
- [ ] Call stack: una ejecución a la vez; código que bloquea = stack lleno.
- [ ] Microtasks (promesas, queueMicrotask) antes que macrotasks (setTimeout, setInterval).
- [ ] Orden típico: sync → microtasks → macrotask → (render) → siguiente macrotask.
- [ ] await no bloquea el hilo; encola la continuación como microtask.

---

## 7. Mini-ejercicios

1. Indica el orden de salida: `console.log("a"); setTimeout(() => console.log("b"), 0); Promise.resolve().then(() => console.log("c")); console.log("d");`
2. Mismo ejercicio: `console.log(1); Promise.resolve().then(() => console.log(2)); setTimeout(() => console.log(3), 0); console.log(4);`
3. ¿Qué imprime? `async function g() { console.log("X"); await 1; console.log("Y"); } g(); console.log("Z");`
4. Explica en una frase por qué “B” sale después de “A” y “C” en: `console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C");`
5. ¿Qué es una microtask? Nombra dos fuentes de microtasks en el navegador.
6. Si dentro de un .then() encolas otro .then(), ¿cuándo se ejecuta ese segundo then: en el mismo “tick” de microtasks o en el siguiente?

---

## 8. Soluciones

<details>
<summary>1. Orden a, d, c, b</summary>

a, d (síncrono), c (microtask), b (macrotask).
</details>

<details>
<summary>2. Orden 1, 4, 2, 3</summary>

1, 4 (síncrono), 2 (microtask), 3 (macrotask).
</details>

<details>
<summary>3. X, Z, Y</summary>

g() empieza, imprime X; await 1 encola la continuación (imprimir Y) como microtask; se imprime Z; luego se ejecuta la microtask y se imprime Y.
</details>

<details>
<summary>4. Por qué B después de A y C</summary>

setTimeout programa un callback como macrotask; el código síncrono (A y C) se ejecuta primero; cuando el stack está vacío, se ejecutan las microtasks y luego la macrotask que imprime B.
</details>

<details>
<summary>5. Microtask y dos fuentes</summary>

Una microtask es una tarea que se ejecuta después del código síncrono actual y antes de la siguiente macrotask. Fuentes: callbacks de Promises (then/catch/finally) y queueMicrotask(). En navegador también MutationObserver.
</details>

<details>
<summary>6. Segundo then en el mismo tick</summary>

Se ejecuta en el mismo “tick” de microtasks: cuando se vacía la cola de microtasks, se ejecutan todas las encoladas, incluyendo los then anidados que se hayan encolado al resolver la primera promesa.
</details>

---

**[⬅ Volver al índice](../README.md)**
