# 16. Eventos: bubbling/capture, delegation, forms (submit, preventDefault, input/change)

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Registro de listeners](#1-registro-de-listeners)
2. [Bubbling y capture](#2-bubbling-y-capture)
3. [Delegación de eventos](#3-delegación-de-eventos)
4. [Forms: submit, preventDefault, input/change](#4-forms-submit-preventdefault-inputchange)
5. [Objeto evento y métodos útiles](#5-objeto-evento-y-métodos-útiles)
6. [De JS básico a React: cómo cambian los eventos](#6-de-js-básico-a-react-cómo-cambian-los-eventos)
7. [Errores típicos y trampas de examen](#7-errores-típicos-y-trampas-de-examen)
8. [Checklist rápido](#8-checklist-rápido)
9. [Mini-ejercicios](#9-mini-ejercicios)
10. [Soluciones](#10-soluciones)

---

## 1. Registro de listeners

- **element.addEventListener(tipo, listener, options?)**: añade un listener. No reemplaza otros; se pueden acumular. options: `{ capture: true }`, `{ once: true }`, `{ passive: true }`.
- **element.removeEventListener(tipo, listener)**: quita el listener (debe ser la misma referencia de función).
- **element.onclick = fn**: asigna un solo handler; sustituye el anterior. No recomendado si quieres varios listeners.

```js
boton.addEventListener("click", (e) => {
  console.log("click", e.target);
});
boton.addEventListener("click", handler, { once: true });
```

---

## 2. Bubbling y capture

- **Fase de captura**: del documento hacia el target (de fuera a dentro). Con `capture: true` el listener se ejecuta en esta fase.
- **Fase de target**: el elemento que disparó el evento.
- **Fase de bubbling**: del target hacia el documento (de dentro a fuera). Por defecto addEventListener usa esta fase.

**event.stopPropagation()**: deja de propagar el evento (no llega a más ancestros o hijos según la fase). No evita otros listeners del mismo elemento.
**event.stopImmediatePropagation()**: además evita que se ejecuten otros listeners del mismo elemento.
**event.preventDefault()**: cancela el comportamiento por defecto (ej. envío de form, seguir enlace). No detiene la propagación.

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  enviarConAjax();
});
```

---

## 3. Delegación de eventos

En lugar de poner un listener en cada hijo, se pone **uno en el contenedor** y se comprueba si el target (o un ancestro) es el elemento que nos interesa. Útil para listas dinámicas.

```js
lista.addEventListener("click", (e) => {
  const fila = e.target.closest(".fila-pedido");
  if (!fila) return;
  const id = fila.dataset.id;
  abrirDetalle(id);
});
```

**event.target**: elemento en el que ocurrió el evento (puede ser un hijo, p. ej. un span dentro del botón).
**event.currentTarget**: elemento al que está asociado el listener (el contenedor en delegación).
**element.closest(selector)**: sube por el DOM hasta encontrar un ancestro que coincida con el selector.

---

## 4. Forms: submit, preventDefault, input/change

- **submit**: se dispara al enviar el formulario (botón submit o Enter). **preventDefault()** evita el envío real y permite validar o enviar por AJAX.
- **input**: se dispara en cada cambio de valor (tecla, paste, etc.) en input/textarea. Bueno para validación en tiempo real o búsqueda.
- **change**: se dispara cuando el valor cambia y el elemento pierde el foco (input/select) o al elegir opción (select/checkbox/radio). Más “confirmado” que input.

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const datos = Object.fromEntries(formData);
  if (!validar(datos)) return;
  fetch("/api/pedidos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  }).then(r => r.json()).then(() => form.reset());
});

campo.addEventListener("input", (e) => {
  const valor = e.target.value.trim();
  mostrarError(valor.length < 3 ? "Mínimo 3 caracteres" : "");
});
```

**FormData**: `new FormData(form)` recoge todos los campos del form por name; `.get(name)`, `.getAll(name)`, `Object.fromEntries(formData)`.

---

## 5. Objeto evento y métodos útiles

- **e.target** / **e.currentTarget**
- **e.preventDefault()** / **e.stopPropagation()**
- **e.type**: tipo de evento ("click", "submit", etc.)
- **e.key**: tecla (para keydown/keyup); **e.keyCode** (deprecado)
- En formularios: **e.target.value**, **e.target.checked** (checkbox/radio), **e.target.name**

---

## 6. De JS básico a React: cómo cambian los eventos

En **JS en el DOM** registras listeners con `addEventListener` o con la propiedad `onclick`; en **React** usas **props** con nombres en **camelCase** y pasas una **función** (no una invocación). Esta tabla sirve de referencia para consultar la equivalencia.

| JS (DOM) | React (JSX) | Notas |
|----------|-------------|--------|
| `element.addEventListener("click", fn)` o `element.onclick = fn` | `onClick={fn}` | Nombre del evento en camelCase con prefijo `on`. |
| `addEventListener("change", fn)` | `onChange={fn}` | Inputs, select, textarea. |
| `addEventListener("submit", fn)` | `onSubmit={fn}` | En el `<form>`. Sigue haciendo `e.preventDefault()` dentro del handler. |
| `addEventListener("input", fn)` | `onInput={fn}` o `onChange={fn}` | En React se usa mucho `onChange` para inputs de texto. |
| `addEventListener("keydown", fn)` | `onKeyDown={fn}` | Teclado. |
| `addEventListener("contextmenu", fn)` | `onContextMenu={fn}` | Clic derecho. |

**Reglas importantes en React:**

- **Pasar función, no llamada:** `onClick={handleClick}` (correcto). `onClick={handleClick()}` ejecutaría la función en cada render y pasaría el valor de retorno.
- **Con argumentos:** `onClick={() => handleDelete(id)}` o `onClick={handleDelete.bind(null, id)}`. Así el clic dispara la llamada con el id.
- **Objeto evento:** el handler recibe el **evento sintético** de React (SyntheticEvent), con la misma interfaz útil: `e.target`, `e.preventDefault()`, `e.stopPropagation()`. Para formularios: `e.target.value`, `e.target.checked`.
- **preventDefault:** se sigue usando dentro del handler (p. ej. en `onSubmit` para no recargar la página).

```jsx
// React
<button onClick={handleClick}>Pulsar</button>
<form onSubmit={(e) => { e.preventDefault(); enviar(); }}>
  <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
</form>
```

Consulta también el [cheatsheet HTML y CSS en React](react-cheatsheet-html-css.md) para formularios y el [cap. 19](19-react-desde-cero.md) para eventos y estado.

---

## 7. Errores típicos y trampas de examen

- **preventDefault** no detiene la propagación; **stopPropagation** no evita el comportamiento por defecto.
- En delegación, **target** puede ser un hijo (ej. texto dentro de un div); usar **closest** para encontrar la fila/card.
- **change** en input de texto no se dispara en cada tecla, sino al perder foco; para “cada tecla” usar **input**.
- Quitar listener requiere la **misma referencia** de función; las arrow anónimas no se pueden quitar si no las guardas.

---

## 8. Checklist rápido

- [ ] addEventListener (tipo, listener, options); removeEventListener con misma referencia.
- [ ] Fases: capture → target → bubbling; preventDefault vs stopPropagation.
- [ ] Delegación: listener en contenedor; target/closest para identificar el elemento real.
- [ ] submit + preventDefault para enviar por AJAX; input vs change en formularios.
- [ ] FormData para leer todos los campos del form.

---

## 9. Mini-ejercicios

1. Registra un listener en un botón que al hacer click muestre el texto del botón (e.target.textContent).
2. En un formulario con id "pedido", evita el envío por defecto y en su lugar muestra por consola un objeto con name → value de cada campo (usa FormData).
3. Tienes una lista `<ul id="items">` con muchos `<li data-id="...">`. Usa delegación: un solo listener en #items que al hacer click en un li muestre su data-id.
4. Diferencia entre event.target y event.currentTarget en un listener puesto en un div que contiene un botón. ¿Qué es cada uno al hacer click en el botón?
5. En un input de búsqueda, escribe un listener que al escribir (input) muestre en un span "#caracteres" el número de caracteres del valor (sin espacios).
6. Añade un listener "change" a un select; al cambiar la opción seleccionada, muestra el value y el textContent de la opción elegida.

---

## 10. Soluciones

<details>
<summary>1. Click y texto del botón</summary>

```js
boton.addEventListener("click", (e) => console.log(e.target.textContent));
```
</details>

<details>
<summary>2. Form preventDefault y FormData</summary>

```js
document.querySelector("#pedido").addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  console.log(Object.fromEntries(fd));
});
```
</details>

<details>
<summary>3. Delegación en #items</summary>

```js
document.querySelector("#items").addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (li) console.log(li.dataset.id);
});
```
</details>

<details>
<summary>4. target vs currentTarget</summary>

Al hacer click en el botón: **target** es el botón (elemento donde ocurrió el click). **currentTarget** es el div (elemento al que está asociado el listener).
</details>

<details>
<summary>5. Contador de caracteres en búsqueda</summary>

```js
busqueda.addEventListener("input", (e) => {
  document.querySelector("#caracteres").textContent =
    e.target.value.replace(/\s/g, "").length;
});
```
</details>

<details>
<summary>6. Change en select</summary>

```js
select.addEventListener("change", (e) => {
  const opt = e.target.options[e.target.selectedIndex];
  console.log(opt.value, opt.textContent);
});
```
</details>

---

**[⬅ Volver al índice](../README.md)**
