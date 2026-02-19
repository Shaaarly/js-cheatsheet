# 15. DOM: querySelector, createElement, classList, dataset, renderizado y performance

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Acceso a nodos](#1-acceso-a-nodos)
2. [Crear y modificar elementos](#2-crear-y-modificar-elementos)
3. [classList y dataset](#3-classlist-y-dataset)
4. [Renderizado y templates](#4-renderizado-y-templates)
5. [Performance básico](#5-performance-básico)
6. [Errores típicos y trampas de examen](#6-errores-típicos-y-trampas-de-examen)
7. [Checklist rápido](#7-checklist-rápido)
8. [Mini-ejercicios](#8-mini-ejercicios)
9. [Soluciones](#9-soluciones)

---

## 1. Acceso a nodos

- **document.querySelector(selector)**: primer elemento que coincida (CSS). Devuelve `Element` o `null`. O(1) por índice en el árbol; en la práctica depende del selector.
- **document.querySelectorAll(selector)**: NodeList de todos los que coincidan. No es array; para iterar o usar métodos de array: `[...nodos]` o `Array.from(nodos)`.
- **document.getElementById(id)**: por id. Devuelve Element o null.
- **element.querySelector / querySelectorAll**: buscan **dentro** del elemento.

```js
const contenedor = document.querySelector("#pedidos");
const items = contenedor.querySelectorAll(".linea-pedido");
const primerBoton = document.querySelector("button.primary");
```

---

## 2. Crear y modificar elementos

- **document.createElement(tagName)**: crea un elemento (aún no en el DOM). No muta el documento hasta que lo insertes.
- **element.textContent**: texto plano (escapado; evita XSS si usas texto de usuario).
- **element.innerHTML**: HTML como string (peligroso con datos de usuario; usar solo con contenido controlado o sanitizar).
- **element.appendChild(nodo)**: añade un hijo al final. **Muta** el DOM.
- **element.removeChild(nodo)** / **nodo.remove()**: quitan el nodo del árbol.
- **element.replaceChild(nuevo, viejo)**: sustituye un hijo.
- **element.insertBefore(nuevo, ref)**: inserta nuevo antes de ref.
- **element.prepend(...nodos)** / **element.append(...nodos)**: insertan al inicio/final de los hijos. **Mutan** el DOM.

```js
const li = document.createElement("li");
li.textContent = pedido.referencia;
li.className = "pedido-item";
contenedor.append(li);
```

**Caso real — lista de pedidos:**
```js
function renderPedidos(pedidos, contenedor) {
  contenedor.innerHTML = "";
  for (const p of pedidos) {
    const div = document.createElement("div");
    div.className = "pedido";
    div.dataset.id = p.id;
    div.innerHTML = `<strong>${escapeHtml(p.referencia)}</strong> - ${p.total}€`;
    contenedor.append(div);
  }
}
```

---

## 3. classList y dataset

- **element.classList**: objeto con métodos que **mutan** las clases del elemento.
  - **add(...clases)**, **remove(...clases)**, **toggle(clase, force?)**, **contains(clase)**, **replace(old, new)**.
- **element.dataset**: acceso a atributos `data-*`. `data-id` → `dataset.id`; `data-pedido-id` → `dataset.pedidoId`. Lectura/escritura; **muta** el atributo en el DOM.

```js
boton.classList.add("active");
boton.classList.remove("disabled");
boton.classList.toggle("loading");
if (fila.classList.contains("seleccionada")) { ... }

div.dataset.id = pedido.id;
const id = div.dataset.id;
```

---

## 4. Renderizado y templates

- **Fragment**: agrupar nodos en memoria y añadirlos de una vez; reduce reflows.
```js
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const el = document.createElement("div");
  el.textContent = item.nombre;
  fragment.append(el);
});
contenedor.append(fragment);
```
- **Plantilla en HTML**: `<template>` en el markup; clonar con `template.content.cloneNode(true)` y rellenar.
```js
const template = document.querySelector("#linea-pedido");
const clone = template.content.cloneNode(true);
clone.querySelector(".nombre").textContent = linea.nombre;
clone.querySelector(".precio").textContent = linea.precio;
list.append(clone);
```

---

## 5. Performance básico

- **Reflows**: cambios de geometría (tamaño, posición) fuerzan recálculo. Agrupar lecturas y escrituras; evitar leer offsetHeight etc. en bucle justo después de escribir.
- **Batch de inserciones**: usar **DocumentFragment** o construir un string y un solo `innerHTML` (con contenido seguro) en lugar de muchos appendChild.
- **Delegación de eventos**: un solo listener en el contenedor en lugar de uno por elemento (ver capítulo Eventos).
- **Evitar layout thrashing**: no alternar muchas lecturas y escrituras en el DOM en el mismo frame.

---

## 6. Errores típicos y trampas de examen

- **querySelector** devuelve null si no encuentra; comprobar antes de usar propiedades.
- **querySelectorAll** devuelve NodeList estática en muchos navegadores; si mutas el DOM (eliminas nodos), la lista no se actualiza sola.
- **innerHTML** con datos de usuario = riesgo XSS; preferir textContent o sanitizar.
- **classList** muta el elemento; **dataset** muta el atributo data-*.
- **createElement** no inserta en el documento; hay que append/prepend/insertBefore.

---

## 7. Checklist rápido

- [ ] querySelector / querySelectorAll; buscar dentro de un elemento.
- [ ] createElement, textContent, append/prepend; innerHTML con precaución.
- [ ] classList.add/remove/toggle/contains; dataset para data-*.
- [ ] Fragment y template para generar mucho DOM de una vez.
- [ ] Evitar muchos reflows; agrupar cambios y usar delegación.

---

## 8. Mini-ejercicios

1. Selecciona el primer elemento con clase `pedido` dentro de `#lista-pedidos` y muestra su textContent.
2. Crea un elemento `<button>` con texto "Añadir", clase `btn btn-primary`, y añádelo al final de `#acciones`.
3. Añade la clase `cargando` a `#formulario` y quítala cuando termine una operación async (simula con setTimeout).
4. Asigna el id de un pedido a un div como `data-pedido-id` y luego léelo desde JavaScript.
5. Dado un array de strings `["A", "B", "C"]`, crea un `<ul>` con un `<li>` por cada string usando createElement y append (sin innerHTML).
6. Usa un DocumentFragment para añadir 3 divs vacíos con clase `card` a un contenedor en una sola operación.

---

## 9. Soluciones

<details>
<summary>1. querySelector dentro de #lista-pedidos</summary>

```js
const lista = document.querySelector("#lista-pedidos");
const primerPedido = lista?.querySelector(".pedido");
console.log(primerPedido?.textContent);
```
</details>

<details>
<summary>2. Botón Añadir</summary>

```js
const btn = document.createElement("button");
btn.textContent = "Añadir";
btn.className = "btn btn-primary";
document.querySelector("#acciones").append(btn);
```
</details>

<details>
<summary>3. classList cargando y quitar</summary>

```js
const form = document.querySelector("#formulario");
form.classList.add("cargando");
setTimeout(() => form.classList.remove("cargando"), 2000);
```
</details>

<details>
<summary>4. data-pedido-id</summary>

```js
div.dataset.pedidoId = pedido.id;
const id = div.dataset.pedidoId;
```
</details>

<details>
<summary>5. ul con li por string</summary>

```js
const ul = document.createElement("ul");
items.forEach(text => {
  const li = document.createElement("li");
  li.textContent = text;
  ul.append(li);
});
contenedor.append(ul);
```
</details>

<details>
<summary>6. Fragment con 3 divs</summary>

```js
const fragment = document.createDocumentFragment();
for (let i = 0; i < 3; i++) {
  const div = document.createElement("div");
  div.className = "card";
  fragment.append(div);
}
contenedor.append(fragment);
```
</details>

---

**[⬅ Volver al índice](../README.md)**
