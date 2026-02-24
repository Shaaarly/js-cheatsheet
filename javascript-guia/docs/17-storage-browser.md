# 17. Storage y navegador: localStorage, sessionStorage, cookies (mínimo), JSON

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [localStorage y sessionStorage](#1-localstorage-y-sessionstorage)
2. [JSON.stringify y JSON.parse](#2-jsonstringify-y-jsonparse)
3. [Cookies (mínimo)](#3-cookies-mínimo)
4. [Casos reales](#4-casos-reales)
5. [De JS básico a React: uso de storage](#5-de-js-básico-a-react-uso-de-storage)
6. [Errores típicos y trampas de examen](#6-errores-típicos-y-trampas-de-examen)
7. [Checklist rápido](#7-checklist-rápido)
8. [Mini-ejercicios](#8-mini-ejercicios)
9. [Soluciones](#9-soluciones)

---

## 1. localStorage y sessionStorage

- **localStorage**: persistente; no caduca; mismo origen. Claves y valores **strings**. No muta el servidor; solo el almacenamiento local del navegador.
- **sessionStorage**: mismo API; se borra al cerrar la pestaña.
- **Métodos**: `getItem(key)`, `setItem(key, value)`, `removeItem(key)`, `clear()`, `key(index)`, `length`. Todos **mutan** el almacenamiento (excepto getItem/key/length que solo leen).

```js
localStorage.setItem("token", "abc123");
const token = localStorage.getItem("token");
localStorage.removeItem("token");
localStorage.clear();

sessionStorage.setItem("carrito", JSON.stringify(items));
const carrito = JSON.parse(sessionStorage.getItem("carrito") ?? "[]");
```

**Evento storage**: se dispara en **otras** pestañas/ventanas cuando cambia localStorage (no en la pestaña que hace el cambio). Útil para sincronizar estado entre pestañas.

```js
window.addEventListener("storage", (e) => {
  console.log(e.key, e.oldValue, e.newValue);
});
```

---

## 2. JSON.stringify y JSON.parse

- **JSON.stringify(valor, replacer?, space?)**: convierte valor a string JSON. No serializa funciones, undefined, símbolos; las propiedades con valor undefined en objetos se omiten. **No muta** el valor original.
- **JSON.parse(string)**: convierte string a valor JS. Lanza si el string no es JSON válido.

```js
const obj = { a: 1, b: [2, 3], c: { d: 4 } };
const str = JSON.stringify(obj);
const copy = JSON.parse(str);

const conIndent = JSON.stringify(obj, null, 2);
```

**Casos reales**: guardar objeto/array en localStorage (stringify al guardar, parse al leer); enviar body en fetch (stringify); leer respuesta res.json() (parse lo hace fetch).

**Limitaciones**: fechas se convierten a string ISO; no se preservan funciones ni undefined. Para datos complejos o fechas como Date, hay que post-procesar tras parse.

---

## 3. Cookies (mínimo)

- Cookies: pares nombre=valor; se envían al servidor en cada petición (header Cookie). Tienen caducidad, path, domain, secure, sameSite.
- En JS (document.cookie): leer devuelve todas las cookies en un string; escribir añade una cookie (no sobrescribe todas). Formato: `nombre=valor; max-age=3600; path=/`.

```js
document.cookie = "session=abc; max-age=3600; path=/; SameSite=Lax";
const cookies = document.cookie; // "session=abc; otra=xyz"
```

Para parsear: split por "; " y luego por "=". Para exámenes suele bastar saber que se leen/escriben como string y que se envían al servidor.

---

## 4. Casos reales

**Guardar preferencias:**
```js
const tema = localStorage.getItem("tema") ?? "light";
document.documentElement.setAttribute("data-tema", tema);
function setTema(t) {
  localStorage.setItem("tema", t);
  document.documentElement.setAttribute("data-tema", t);
}
```

**Carrito en sessionStorage:**
```js
function getCarrito() {
  return JSON.parse(sessionStorage.getItem("carrito") ?? "[]");
}
function guardarCarrito(items) {
  sessionStorage.setItem("carrito", JSON.stringify(items));
}
```

**Token y logout:**
```js
localStorage.setItem("token", token);
// en logout:
localStorage.removeItem("token");
```

---

## 5. De JS básico a React: uso de storage

La **API es la misma**: `localStorage.getItem`, `setItem`, `removeItem`, `JSON.stringify`/`JSON.parse`. En React lo que cambia es **dónde y cuándo** llamarla para no romper el ciclo de render ni causar problemas si más adelante usas SSR.

**Cuándo leer:**

- **Estado inicial:** al crear el estado con `useState`, puedes leer en el inicializador (función) para no hacerlo en cada render:  
  `useState(() => JSON.parse(localStorage.getItem("key") ?? "[]"))`
- **Redux:** en el `initialState` del slice, llamar a una función que lea de localStorage (ej. `loadFavorites()` en el [ejemplo 20a](20a-ejemplo-mini-app-redux.md)).
- **useEffect:** si necesitas leer al montar y reaccionar a algo más (ej. pestaña), leer dentro de `useEffect`.

**Cuándo escribir:**

- En **event handlers** (onClick, onSubmit) cuando el usuario guarda preferencias o favoritos.
- En **Redux:** dentro del reducer que actualiza ese dato (ej. al añadir favorito: actualizar estado y hacer `localStorage.setItem(...)`).
- Opcionalmente en **useEffect** que dependa del estado a persistir: `useEffect(() => { localStorage.setItem("key", JSON.stringify(state)); }, [state]);`

**Resumen para consultar:**

| Objetivo | Dónde en React |
|----------|----------------|
| Valor inicial de estado | `useState(() => JSON.parse(localStorage.getItem("key") ?? "[]"))` o `initialState` del slice leyendo de localStorage. |
| Guardar al cambiar algo | En el handler (setState + setItem) o en el reducer (state + setItem). |
| Sincronizar estado con storage | useEffect que escuche el estado y haga setItem, o escribir en el mismo sitio donde actualizas estado (reducer/handler). |
| Persistir solo parte del estado (ej. favoritos) | Redux: leer en initialState; escribir en los reducers que modifican favoritos. Alternativa: [redux-persist](https://github.com/rt2zz/redux-persist). |

No conviene leer `localStorage` directamente en el cuerpo del componente durante el render (puede dar hidratación incorrecta si algún día usas SSR). Mejor en inicializador de useState, en initialState del slice o en useEffect. Para más contexto de estado global: [cap. 20](20-react-redux-bridge.md) y [20a - Ejemplo completo](20a-ejemplo-mini-app-redux.md).

---

## 6. Errores típicos y trampas de examen

- **Solo strings**: si guardas un objeto sin stringify, se guarda como "[object Object]". Siempre stringify para objetos/arrays.
- **null al leer**: getItem devuelve null si no existe; al parsear usar `JSON.parse(localStorage.getItem("key") ?? "null")` o comprobar null antes.
- **storage** no se dispara en la misma pestaña que escribe.
- **Cookies**: document.cookie es un string; escribir no borra las demás cookies, añade o actualiza una.

---

## 7. Checklist rápido

- [ ] localStorage persistente; sessionStorage por pestaña; ambos string clave/valor.
- [ ] getItem, setItem, removeItem, clear; guardar objetos con JSON.stringify.
- [ ] Al leer: JSON.parse(... ?? "null") o comprobar null antes de parsear.
- [ ] Evento storage para cambios en otras pestañas.
- [ ] Cookies: document.cookie para leer/escribir; formato nombre=valor; atributos.

---

## 8. Mini-ejercicios

1. Guarda en localStorage la clave "ultimaVisita" con la fecha actual en ISO. Luego léela y muestrala por consola.
2. Implementa get/set para un objeto "config" en localStorage (get devuelve objeto o {}, set guarda el objeto con stringify).
3. Borra una clave "temp" de sessionStorage si existe.
4. ¿Qué pasa si haces JSON.parse de un string que no es JSON válido? ¿Y si pasas null?
5. Escribe una función que lea document.cookie y devuelva un objeto { nombreCookie: valor }.
6. Suscríbete al evento "storage" y cuando cambie la clave "carrito", actualiza un contador en pantalla con el número de ítems del carrito (parseando el newValue).

---

## 9. Soluciones

<details>
<summary>1. ultimaVisita en localStorage</summary>

```js
localStorage.setItem("ultimaVisita", new Date().toISOString());
console.log(localStorage.getItem("ultimaVisita"));
```
</details>

<details>
<summary>2. get/set config en localStorage</summary>

```js
function getConfig() {
  try {
    return JSON.parse(localStorage.getItem("config") ?? "{}");
  } catch {
    return {};
  }
}
function setConfig(obj) {
  localStorage.setItem("config", JSON.stringify(obj));
}
```
</details>

<details>
<summary>3. Borrar temp de sessionStorage</summary>

```js
sessionStorage.removeItem("temp");
```
</details>

<details>
<summary>4. JSON.parse inválido y null</summary>

String no válido → SyntaxError. JSON.parse(null) → no es string; en la práctica puede dar error o comportamiento dependiente del entorno; lo seguro es pasar string. "null" parsea a null.
</details>

<details>
<summary>5. Cookies a objeto</summary>

```js
function getCookies() {
  return Object.fromEntries(
    document.cookie.split("; ").filter(Boolean).map(s => {
      const [k, ...v] = s.split("=");
      return [k, v.join("=").trim()];
    })
  );
}
```
</details>

<details>
<summary>6. storage y contador carrito</summary>

```js
window.addEventListener("storage", (e) => {
  if (e.key === "carrito") {
    const items = JSON.parse(e.newValue ?? "[]");
    document.querySelector("#contador").textContent = items.length;
  }
});
```
</details>

---

**[⬅ Volver al índice](../README.md)**
