# 9. Módulos: import/export, named vs default, organización

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Export: named y default](#1-export-named-y-default)
2. [Import: named, default, namespace, dinámico](#2-import-named-default-namespace-dinámico)
3. [Organización por carpetas](#3-organización-por-carpetas)
4. [Errores típicos y trampas de examen](#4-errores-típicos-y-trampas-de-examen)
5. [Checklist rápido](#5-checklist-rápido)
6. [Mini-ejercicios](#6-mini-ejercicios)
7. [Soluciones](#7-soluciones)

---

## 1. Export: named y default

**Named export**: varios nombres exportados; el import debe usar el mismo nombre (o alias).
```js
// api.js
export const API_URL = "https://api.example.com";
export function getPedidos() { return fetch(`${API_URL}/pedidos`).then(r => r.json()); }
export function getPedido(id) { return fetch(`${API_URL}/pedidos/${id}`).then(r => r.json()); }
```

**Default export**: un solo valor “principal” del módulo; el import puede usar cualquier nombre.
```js
// Pedido.js
export default class Pedido {
  constructor(id, total) {
    this.id = id;
    this.total = total;
  }
}
```

**Combinar**: un módulo puede tener un default y varios named.
```js
export default function initApp() {}
export const version = "1.0";
```

**Export inline** (en la declaración) vs **export al final**:
```js
export const a = 1;
export { b, c };
export { algo as otroNombre };
```

---

## 2. Import: named, default, namespace, dinámico

**Named**: nombres entre llaves; deben coincidir con los exportados.
```js
import { getPedidos, getPedido, API_URL } from "./api.js";
import { getPedido as fetchPedido } from "./api.js";
```

**Default**: nombre libre.
```js
import Pedido from "./Pedido.js";
import CualquierNombre from "./Pedido.js";
```

**Ambos** en una línea:
```js
import Pedido, { version } from "./Pedido.js";
```

**Namespace** (objeto con todos los named):
```js
import * as api from "./api.js";
api.getPedidos();
api.API_URL;
```

**Solo efectos secundarios** (ejecutar el módulo, sin bindings):
```js
import "./polyfills.js";
```

**Dinámico** (import()): devuelve una promesa que resuelve al módulo. Útil para code-splitting o rutas.
```js
const mod = await import("./api.js");
mod.getPedidos();
```

---

## 3. Organización por carpetas

Estructura típica para una app (ej. antes de React):

```
src/
  api/
    client.js      # fetch base, headers
    pedidos.js     # getPedidos, getPedido, createPedido
  utils/
    format.js      # formatoMoneda, formatoFecha
  components/     # si hay componentes reutilizables
  index.js         # punto de entrada, reexporta o inicializa
```

**Barrel (index.js que reexporta):**
```js
// api/index.js
export { getPedidos, getPedido, createPedido } from "./pedidos.js";
export { API_URL } from "./client.js";
```

Uso:
```js
import { getPedidos, createPedido } from "./api/index.js";
// o desde carpeta: import { getPedidos } from "./api";
```

En navegador con ES modules: usar `<script type="module" src="main.js">` y extensiones `.js` en imports.

---

## 4. Errores típicos y trampas de examen

- **Named import** con nombre que no existe en el módulo → error en tiempo de carga.
- Confundir **default** con **named**: `import X from "./m"` importa el default; `import { X } from "./m"` importa el named `X`.
- En algunos entornos hace falta la **extensión** en la ruta (`.js`).
- **import** se hoistea y se evalúa estáticamente; no se puede poner import dentro de un if. Para carga condicional usar `import()`.
- Exportar algo que no existe: `export { noExiste }` → error.

---

## 5. Checklist rápido

- [ ] Named export/import: varios nombres; el nombre en import debe coincidir (o usar as).
- [ ] Default export: uno por módulo; nombre libre en import.
- [ ] import * as alias para traer todo como objeto.
- [ ] import() dinámico devuelve promesa.
- [ ] No poner import condicional con if; usar import() para carga dinámica.

---

## 6. Mini-ejercicios

1. En un archivo `math.js`, exporta como named `suma` y `resta` (dos funciones). En otro archivo, impórtalas y úsalas.
2. Crea un módulo con un **default export** (una función `config()`) y un **named** `defaults`. Escribe la línea de import que traiga ambos.
3. ¿Qué diferencia hay entre `import X from "./m"` e `import { X } from "./m"`?
4. Escribe un import que traiga todo lo exportado de `./api.js` bajo el nombre `api`.
5. Carga el módulo `./lazy.js` solo cuando una variable `cargarLazy` sea true (usa import dinámico).
6. Diseña un barrel `utils/index.js` que reexporte `formatoMoneda` y `formatoFecha` desde `./format.js`.

---

## 7. Soluciones

<details>
<summary>1. math.js named export e import</summary>

```js
// math.js
export function suma(a, b) { return a + b; }
export function resta(a, b) { return a - b; }

// otro.js
import { suma, resta } from "./math.js";
suma(1, 2); resta(5, 3);
```
</details>

<details>
<summary>2. default + named, línea de import</summary>

```js
import config, { defaults } from "./modulo.js";
```
</details>

<details>
<summary>3. Diferencia import X vs { X }</summary>

`import X from "./m"` importa el **default** del módulo y lo asigna a X. `import { X } from "./m"` importa el **named export** llamado X.
</details>

<details>
<summary>4. Import namespace</summary>

```js
import * as api from "./api.js";
```
</details>

<details>
<summary>5. Carga condicional con import()</summary>

```js
if (cargarLazy) {
  const lazy = await import("./lazy.js");
  // usar lazy...
}
```
</details>

<details>
<summary>6. Barrel utils/index.js</summary>

```js
export { formatoMoneda, formatoFecha } from "./format.js";
```
</details>

---

**[⬅ Volver al índice](../README.md)**
