# 0. Entorno y primer programa

**[⬅ Volver al índice](../README.md)**

**Qué problema resuelve:** poder ejecutar una línea de JavaScript y ver el resultado antes de estudiar el lenguaje.

**Qué necesitas saber antes:** nada. Este es el primer capítulo de la ruta desde cero.

---

## Mini-índice del capítulo

1. [Qué es JavaScript y dónde corre](#1-qué-es-javascript-y-dónde-corre)
2. [La consola del navegador](#2-la-consola-del-navegador)
3. [Un archivo .js con Node](#3-un-archivo-js-con-node)
4. [Un script dentro de HTML](#4-un-script-dentro-de-html)
5. [Errores al empezar](#5-errores-al-empezar)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. Qué es JavaScript y dónde corre

JavaScript es un lenguaje. El mismo texto puede ejecutarse en dos sitios distintos:

- **Navegador** (Chrome, Firefox, Edge): la página web, la consola de desarrollador, el DOM.
- **Node.js**: un programa en tu ordenador, sin página. Playwright y `npm` viven aquí.

Una frase que escribes se llama **sentencia**. Un trozo que produce un valor (`2 + 2`, `"hola"`) es una **expresión**. `console.log(...)` muestra ese valor para que puedas comprobarlo.

---

## 2. La consola del navegador

1. Abre cualquier página.
2. Pulsa F12 (o clic derecho → Inspeccionar).
3. Pestaña **Consola**.
4. Escribe y pulsa Enter:

```js
console.log("Hola");
2 + 2
```

`console.log` imprime y devuelve `undefined`. La expresión `2 + 2` muestra `4` porque la consola enseña el valor de lo que escribes.

---

## 3. Un archivo .js con Node

Node ejecuta archivos. Comprueba que está instalado:

```bash
node --version
```

Crea `hola.js`:

```js
console.log("Hola desde Node");
console.log(2 + 2);
```

En la carpeta de ese archivo:

```bash
node hola.js
```

Salida:

```text
Hola desde Node
4
```

Playwright se instala y se lanza con Node (`npm`, `npx`). Los tests no se pegan en la consola del navegador: viven en archivos `.js` o `.ts`.

---

## 4. Un script dentro de HTML

El navegador también puede cargar un archivo junto a una página. Crea `index.html` y `app.js` en la misma carpeta.

```html
<!DOCTYPE html>
<html lang="es">
  <body>
    <p>Mira la consola (F12).</p>
    <script src="app.js"></script>
  </body>
</html>
```

```js
console.log("Hola desde la página");
```

Abre `index.html` con el navegador. El mensaje aparece en la consola, no en la página. Pintar texto en la página es el capítulo de DOM.

El `script` va al final del `body` para que el HTML ya exista cuando el archivo se ejecute.

---

## 5. Errores al empezar

- **ReferenceError:** usaste un nombre que no existe. Revisa mayúsculas: `console` no es `Console`.
- **SyntaxError:** falta una comilla, un paréntesis o una llave. El programa ni empieza.
- Escribiste el código en un archivo y lo abriste con doble clic: un `.js` no se ejecuta solo. Hace falta `node archivo.js` o un HTML que lo cargue.
- `console.log` en Node sale en la terminal. En el navegador sale en F12.

---

## 6. Checklist rápido

- [ ] Sé abrir la consola del navegador y ejecutar una expresión.
- [ ] Sé crear un `.js` y lanzarlo con `node archivo.js`.
- [ ] Sé cargar ese archivo desde un HTML con `<script src="...">`.
- [ ] Distingo el mensaje de `console.log` del valor que devuelve una expresión en la consola.

---

## 7. Mini-ejercicios

1. En la consola del navegador, muestra tu nombre con `console.log` y calcula `10 * 3`.
2. Crea `saludo.js` que imprima dos líneas: un saludo y el resultado de `7 + 5`. Ejecútalo con Node.
3. Crea `index.html` que cargue `saludo.js` y comprueba el mensaje en F12.
4. Provoca un `ReferenceError` a propósito (un nombre que no existe) y lee el mensaje. Después corrígelo.

---

## 8. Soluciones

<details>
<summary>1. Consola</summary>

```js
console.log("Ana");
10 * 3
```

La consola muestra `Ana` y después `30`.
</details>

<details>
<summary>2. saludo.js</summary>

```js
console.log("Hola");
console.log(7 + 5);
```

```bash
node saludo.js
```
</details>

<details>
<summary>3. HTML</summary>

```html
<!DOCTYPE html>
<html lang="es">
  <body>
    <script src="saludo.js"></script>
  </body>
</html>
```

Abre el archivo en el navegador y mira F12. Verás las mismas dos líneas que en Node.
</details>

<details>
<summary>4. ReferenceError</summary>

```js
console.log(nombre);
```

El mensaje dice que `nombre` no está definido. Corrección:

```js
const nombre = "Ana";
console.log(nombre);
```

`const` se explica en el capítulo 1. Aquí basta ver que el nombre tiene que existir antes de usarlo.
</details>

---

**Siguiente en la ruta desde cero:** [01 - Fundamentos](01-basics.md)

**[⬅ Volver al índice](../README.md)**
