# 22. TypeScript desde JavaScript: fundamentos

**[⬅ Volver al índice](../README.md)**

**Qué problema resuelve:** anotar el código para que el editor avise de un nombre mal escrito o de un `null` antes de ejecutar el programa.

**Qué necesitas saber antes:** la ruta desde cero hasta objetos, funciones y arrays. TypeScript no sustituye esas lecciones: un archivo `.js` correcto puede renombrarse a `.ts`.

---

## Mini-índice del capítulo

1. [Qué cambia y qué no](#1-qué-cambia-y-qué-no)
2. [Anotaciones e inferencia](#2-anotaciones-e-inferencia)
3. [Arrays y objetos](#3-arrays-y-objetos)
4. [type e interface](#4-type-e-interface)
5. [Uniones, literales y estrechamiento](#5-uniones-literales-y-estrechamiento)
6. [unknown, any, void y never](#6-unknown-any-void-y-never)
7. [Checklist rápido](#7-checklist-rápido)
8. [Mini-ejercicios](#8-mini-ejercicios)
9. [Soluciones](#9-soluciones)

---

## 1. Qué cambia y qué no

TypeScript es JavaScript más un sistema de tipos. Esos tipos **desaparecen al ejecutar**. No hacen que un `if` se comporte distinto ni convierten un string en número en tiempo de ejecución.

```ts
const total: number = 10;
console.log(total);
```

El programa que corre es, en la práctica:

```js
const total = 10;
console.log(total);
```

Quien comprueba los tipos es `tsc` (o el editor). Si escribes `const total: number = "10"`, el archivo no compila. Node, si lo ejecutas igual, no mira esa anotación.

Playwright trae TypeScript listo: los tests pueden ser `.ts` sin montar un compilador a mano. El capítulo 24 usa eso.

---

## 2. Anotaciones e inferencia

Anotar es decir el tipo detrás de `:`.

```ts
let nombre: string = "Ana";
let edad: number = 30;
let activo: boolean = true;
```

Si el valor ya está a la vista, TypeScript **infiere** el tipo. Anotar otra vez no aporta:

```ts
const ciudad = "Madrid"; // string
```

Anota cuando el valor llega de fuera (un parámetro, un `JSON.parse`, una respuesta) y el editor no puede verlo.

---

## 3. Arrays y objetos

```ts
const ids: number[] = [1, 2, 3];
const nombres: Array<string> = ["Ana", "Luis"];

const pedido: { id: string; total: number } = {
  id: "a1",
  total: 20
};
```

`number[]` y `Array<number>` son el mismo tipo. Un objeto anónimo crece mal cuando lo repites: para eso están `type` e `interface`.

---

## 4. type e interface

Los dos nombran una forma. Para un objeto de datos, cualquiera de los dos sirve.

```ts
type Pedido = {
  id: string;
  total: number;
  estado: "pendiente" | "pagado";
};

interface Cliente {
  nombre: string;
  email: string;
}
```

`type` también nombra uniones y alias que no son objetos (`type Id = string | number`). `interface` se puede ampliar después con otra declaración del mismo nombre. En esta guía: `type` para uniones y datos, `interface` cuando el capítulo 23 modele una clase.

---

## 5. Uniones, literales y estrechamiento

Una **unión** (`A | B`) significa "uno de estos". Un **literal** es un valor concreto usado como tipo: `"pendiente"`, no cualquier `string`.

```ts
type Estado = "pendiente" | "pagado";

function etiqueta(estado: Estado): string {
  if (estado === "pendiente") return "En curso";
  return "Cobrado";
}
```

Dentro del `if`, TypeScript **estrecha**: ya sabe que no es `"pagado"`. Otras formas de estrechar:

```ts
function longitud(valor: string | string[]): number {
  if (typeof valor === "string") return valor.length;
  return valor.length;
}

function nombreDe(dato: { nombre: string } | { titulo: string }): string {
  if ("nombre" in dato) return dato.nombre;
  return dato.titulo;
}
```

`typeof` sirve para primitivos. `in` sirve cuando cada rama del objeto tiene una clave distinta.

---

## 6. unknown, any, void y never

| Tipo | Cuándo |
|------|--------|
| `unknown` | Hay un valor y todavía no sabes qué es. Obligás a comprobarlo antes de usarlo |
| `any` | Apagas la comprobación. El editor deja de ayudar |
| `void` | La función no devuelve nada útil (`console.log`) |
| `never` | Ese camino no puede ocurrir (una función que siempre lanza) |

```ts
function leer(dato: unknown): string {
  if (typeof dato === "string") return dato;
  return "";
}
```

`JSON.parse` devuelve `any` en muchos entornos. Trátalo como `unknown` y comprueba la forma antes de leer `.id` o `.total`.

```ts
function esPedido(valor: unknown): valor is { id: string; total: number } {
  return (
    typeof valor === "object" &&
    valor !== null &&
    "id" in valor &&
    "total" in valor
  );
}
```

`valor is ...` es un predicado: si la función devuelve `true`, en el `if` el valor ya tiene esa forma.

---

## 7. Checklist rápido

- [ ] Los tipos no se ejecutan. El programa que corre es JavaScript.
- [ ] Anoto parámetros y valores que vienen de fuera. Dejo que el editor infiera el resto.
- [ ] `type` para uniones y formas de datos.
- [ ] Después de `typeof` o `in`, el tipo se estrecha dentro de la rama.
- [ ] Prefiero `unknown` a `any` cuando el dato es opaco.

---

## 8. Mini-ejercicios

1. Anota una función `doble(n)` que reciba un número y devuelva el doble. Quita la anotación del `return` y comprueba que el editor sigue sabiendo que es `number`.
2. Define `type Estado = "ok" | "error"` y una función que devuelva `"bien"` o `"mal"` según el valor.
3. Escribe `longitud` para `string | string[]` con `typeof`.
4. `leerNombre(dato: unknown)` devuelve el string `dato` si es un string, y `""` en cualquier otro caso.
5. Coge este JavaScript y pásalo a TypeScript hasta que las anotaciones cuadren:

```js
function resumen(pedido) {
  return pedido.id + ":" + pedido.total;
}
resumen({ id: "a1", total: 12 });
```

---

## 9. Soluciones

<details>
<summary>1. doble</summary>

```ts
function doble(n: number): number {
  return n * 2;
}
```

Si borras `: number` del return, la inferencia sigue siendo `number` porque `n * 2` lo es.
</details>

<details>
<summary>2. Estado</summary>

```ts
type Estado = "ok" | "error";

function texto(estado: Estado): string {
  if (estado === "ok") return "bien";
  return "mal";
}
```
</details>

<details>
<summary>3. longitud</summary>

```ts
function longitud(valor: string | string[]): number {
  if (typeof valor === "string") return valor.length;
  return valor.length;
}
```
</details>

<details>
<summary>4. leerNombre</summary>

```ts
function leerNombre(dato: unknown): string {
  if (typeof dato === "string") return dato;
  return "";
}
```
</details>

<details>
<summary>5. resumen tipado</summary>

```ts
type Pedido = { id: string; total: number };

function resumen(pedido: Pedido): string {
  return pedido.id + ":" + pedido.total;
}

resumen({ id: "a1", total: 12 });
```
</details>

---

**Siguiente:** [23 - Funciones, clases y genéricos](23-typescript-funciones-clases.md)

**[⬅ Volver al índice](../README.md)**
