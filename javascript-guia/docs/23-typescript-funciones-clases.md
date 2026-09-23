# 23. TypeScript: funciones, clases y genéricos

**[⬅ Volver al índice](../README.md)**

**Qué problema resuelve:** tipar funciones async, clases (un page object) y el hueco genérico de `test.extend<{ loginPage: LoginPage }>()`.

**Qué necesitas saber antes:** [22 - Fundamentos](22-typescript-fundamentos.md), funciones, `async`/`await` y la sección de clases del [capítulo 6](06-objects.md).

---

## Mini-índice del capítulo

1. [Parámetros, opcionales y retorno](#1-parámetros-opcionales-y-retorno)
2. [async y Promise](#2-async-y-promise)
3. [Clases, readonly y private](#3-clases-readonly-y-private)
4. [import type](#4-import-type)
5. [Genéricos justos](#5-genéricos-justos)
6. [Partial, Pick y Record](#6-partial-pick-y-record)
7. [strict](#7-strict)
8. [Checklist rápido](#8-checklist-rápido)
9. [Mini-ejercicios](#9-mini-ejercicios)
10. [Soluciones](#10-soluciones)

---

## 1. Parámetros, opcionales y retorno

```ts
function crearPedido(cliente: string, nota?: string): { cliente: string; nota: string } {
  return { cliente, nota: nota ?? "" };
}
```

`nota?` puede omitirse. Dentro de la función su tipo es `string | undefined`. `??` cubre ese `undefined`.

El tipo de una arrow function cabe en una variable:

```ts
type Transformar = (texto: string) => string;
const gritar: Transformar = (texto) => texto.toUpperCase();
```

---

## 2. async y Promise

Una función `async` devuelve siempre una promesa. El tipo de retorno es `Promise<lo que hay detrás del return>`.

```ts
async function cargarTotal(id: string): Promise<number> {
  const res = await fetch("/api/pedidos/" + id);
  const data: unknown = await res.json();
  if (typeof data === "object" && data !== null && "total" in data) {
    const total = (data as { total: unknown }).total;
    if (typeof total === "number") return total;
  }
  throw new Error("respuesta sin total");
}
```

`Promise<void>` es una async que no devuelve un valor (un clic, un `goto`). Quien llama hace `await` y no lee un resultado.

El `as` de arriba afirma una forma. Úsalo solo después de haber comprobado que el objeto existe. Afirmar sin comprobar apaga el aviso y el error llega al ejecutar.

---

## 3. Clases, readonly y private

La clase del capítulo 6, con tipos:

```ts
class LineaPedido {
  readonly productoId: string;
  private cantidad: number;

  constructor(productoId: string, cantidad: number) {
    this.productoId = productoId;
    this.cantidad = cantidad;
  }

  subtotal(precio: number): number {
    return this.cantidad * precio;
  }
}
```

`readonly` impide reasignar la propiedad (`linea.productoId = "otro"` no compila). `private` impide leer `cantidad` desde fuera de la clase. Las dos restricciones son del compilador: en el JavaScript resultante la propiedad sigue existiendo.

Atajo cuando el parámetro y la propiedad se llaman igual:

```ts
class LineaPedido {
  constructor(
    readonly productoId: string,
    private cantidad: number
  ) {}
}
```

Un page object de Playwright es esta misma forma: el constructor recibe la `page` y los métodos son `async`. El capítulo 24 lo escribe entero.

---

## 4. import type

Si solo importas un tipo, `import type` deja claro que ese nombre no existe en el JavaScript final.

```ts
import type { Pedido } from "./pedidos";

function idDe(pedido: Pedido): string {
  return pedido.id;
}
```

Puedes mezclar valor y tipo en un import:

```ts
import { crearPedido, type Pedido } from "./pedidos";
```

---

## 5. Genéricos justos

Un genérico es un hueco de tipo que rellena quien llama.

```ts
function primero<T>(items: T[]): T | undefined {
  return items[0];
}

const n = primero([1, 2, 3]);       // number | undefined
const s = primero(["a", "b"]);      // string | undefined
```

No hace falta inventar genéricos para cada función. Hace falta **leerlos** cuando una API los pide. Playwright registra fixtures así:

```ts
type MisFixtures = {
  loginPage: LoginPage;
};

const test = base.extend<MisFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});
```

`extend<MisFixtures>` dice: además de `page`, el test puede pedir `loginPage` y será un `LoginPage`. Si el genérico no está, el editor no conoce esa propiedad. `LoginPage` y `base` se completan en el capítulo 24; aquí importa la forma `<MisFixtures>`.

---

## 6. Partial, Pick y Record

Utilidades que fabrican un tipo a partir de otro:

```ts
type Pedido = { id: string; total: number; estado: string };

type PedidoParcial = Partial<Pedido>;           // todas las claves opcionales
type SoloId = Pick<Pedido, "id" | "total">;     // solo esas claves
type PorId = Record<string, Pedido>;            // un objeto cuyas claves son string y cuyos valores son Pedido
```

`Partial` sirve para una actualización: no hace falta enviar el pedido entero. `Record<string, number>` es un diccionario de números, más preciso que `{ [clave: string]: number }` escrito a mano, y equivalente.

---

## 7. strict

`"strict": true` en `tsconfig.json` enciende varias comprobaciones a la vez, entre ellas `strictNullChecks`: `string` y `string | null` no son lo mismo, y hay que tratar el `null`.

El `tsconfig` que genera Playwright ya lleva `strict`. Conviene dejarlo así. Apagarlo para que compile un `null` esconde el caso que después rompe el test.

---

## 8. Checklist rápido

- [ ] `async` devuelve `Promise<T>`. Si no hay valor, `Promise<void>`.
- [ ] `readonly` y `private` los mira el compilador.
- [ ] `import type` para nombres que solo existen como tipos.
- [ ] Un genérico `<T>` lo rellena quien usa la función. `extend<MisFixtures>` es ese hueco.
- [ ] `Partial`, `Pick` y `Record` evitan copiar la forma a mano.
- [ ] `strict` se queda encendido.

---

## 9. Mini-ejercicios

1. `saludar(nombre: string, tratamiento?: string)` devuelve `"Hola Ana"` o `"Hola Dra. Ana"` si hay tratamiento.
2. `async function pausa(ms: number): Promise<void>` espera con el `delay` del capítulo 7b.
3. Clase `Contador` con `private n` y métodos `inc(): void` y `valor(): number`.
4. `primero` genérico, como en la sección 5, probado con un array de números.
5. A partir de `type Usuario = { id: string; email: string; rol: string }`, declara un tipo que solo tenga `id` y `email`.

---

## 10. Soluciones

<details>
<summary>1. saludar</summary>

```ts
function saludar(nombre: string, tratamiento?: string): string {
  if (tratamiento) return `Hola ${tratamiento} ${nombre}`;
  return `Hola ${nombre}`;
}
```
</details>

<details>
<summary>2. pausa</summary>

```ts
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function pausa(ms: number): Promise<void> {
  await delay(ms);
}
```
</details>

<details>
<summary>3. Contador</summary>

```ts
class Contador {
  private n = 0;
  inc(): void {
    this.n += 1;
  }
  valor(): number {
    return this.n;
  }
}
```
</details>

<details>
<summary>4. primero</summary>

```ts
function primero<T>(items: T[]): T | undefined {
  return items[0];
}
const n = primero([4, 5]); // number | undefined
```
</details>

<details>
<summary>5. Pick</summary>

```ts
type Usuario = { id: string; email: string; rol: string };
type UsuarioPublico = Pick<Usuario, "id" | "email">;
```
</details>

---

**Siguiente:** [24 - Puente a Playwright](24-puente-playwright.md)

**[⬅ Volver al índice](../README.md)**
