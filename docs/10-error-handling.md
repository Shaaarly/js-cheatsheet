# 10. Manejo de errores: try/catch/finally, throw, custom errors

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [try / catch / finally](#1-try--catch--finally)
2. [throw](#2-throw)
3. [Errores personalizados](#3-errores-personalizados)
4. [Propagación y rethrow](#4-propagación-y-rethrow)
5. [Errores típicos y trampas de examen](#5-errores-típicos-y-trampas-de-examen)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. try / catch / finally

- **try**: bloque donde puede producirse un error.
- **catch**: captura el error (objeto lanzado). El parámetro es la instancia (ej. `Error`). Si no se lanza nada en try, catch no se ejecuta.
- **finally**: se ejecuta siempre (haya error o no); útil para limpiar recursos (cerrar conexiones, limpiar estado).

```js
try {
  const data = JSON.parse(input);
  procesar(data);
} catch (e) {
  console.error("Error parseando:", e.message);
} finally {
  limpiar();
}
```

Si no hay `catch`, el error se propaga; `finally` se ejecuta antes de propagar.

---

## 2. throw

Se puede lanzar cualquier valor; convención: usar objetos **Error** o subclases.

```js
if (!pedido.id) throw new Error("Pedido sin id");
if (respuesta.ok === false) throw new Error(`API error: ${respuesta.status}`);
```

**Error** tiene propiedades: `message`, `name`. En entornos modernos: `stack` (stack trace).

---

## 3. Errores personalizados

Subclasificar **Error** permite distinguir tipos y añadir datos. Útil para APIs o capas de servicio.

```js
class ErrorValidacion extends Error {
  constructor(message, campos) {
    super(message);
    this.name = "ErrorValidacion";
    this.campos = campos;
  }
}

if (!form.email) {
  throw new ErrorValidacion("Email requerido", ["email"]);
}
```

En **catch** se puede comprobar el tipo:
```js
try {
  validar(form);
} catch (e) {
  if (e instanceof ErrorValidacion) {
    mostrarErrores(e.campos);
  } else {
    throw e;
  }
}
```

---

## 4. Propagación y rethrow

Si en un `catch` quieres registrar el error pero que siga propagándose, vuelve a lanzar (**rethrow**):

```js
try {
  await guardarPedido(pedido);
} catch (e) {
  logError(e);
  throw e; // rethrow: el llamador también verá el error
}
```

No modificar `e` si quieres conservar el stack original. Si creas un nuevo Error, puedes hacer `throw new Error("Contexto", { cause: e })` para encadenar.

---

## 5. Errores típicos y trampas de examen

- **finally** se ejecuta siempre, incluso si hay return en try o catch.
- **catch** sin parámetro es válido en JS moderno: `catch { ... }`.
- Si lanzas un valor que no es Error, no tendrá `message` ni `stack` estándar; mejor siempre `new Error(...)` o subclases.
- No “tragarse” el error sin hacer nada en catch (al menos log); y si no se va a manejar, hacer rethrow.
- En async/await, los rechazos de promesas se capturan con try/catch alrededor del await.

---

## 6. Checklist rápido

- [ ] try/catch/finally: orden y que finally siempre se ejecuta.
- [ ] throw con new Error(message) o subclases.
- [ ] Crear clases que extiendan Error para errores de dominio (validación, API).
- [ ] instanceof para distinguir tipos en catch; rethrow con throw e para no tragar el error.

---

## 7. Mini-ejercicios

1. Escribe un try/catch que parsee JSON de una variable `str` y, si falla, asigne a `data` el objeto `{ error: true }`.
2. Crea una clase `ErrorAPI` que extienda Error y tenga una propiedad `status`. En un catch, comprueba si el error es ErrorAPI y muestra status.
3. ¿Qué imprime? `try { return 1; } finally { console.log("finally"); }` (y qué devuelve la función).
4. Implementa `parsearNumero(str)` que lance Error con mensaje "No es un número válido" si el resultado de Number(str) no es finito.
5. En un catch, después de loguear el error, haz que se propague de nuevo (rethrow).
6. Escribe un try/catch/finally donde en finally se asigne una variable `terminado = true` (útil para tests o flags).

---

## 8. Soluciones

<details>
<summary>1. Parse JSON con fallback</summary>

```js
let data;
try {
  data = JSON.parse(str);
} catch {
  data = { error: true };
}
```
</details>

<details>
<summary>2. ErrorAPI y catch por tipo</summary>

```js
class ErrorAPI extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ErrorAPI";
    this.status = status;
  }
}
try {
  // ...
} catch (e) {
  if (e instanceof ErrorAPI) {
    console.error("Status:", e.status);
  } else {
    throw e;
  }
}
```
</details>

<details>
<summary>3. return en try y finally</summary>

Imprime "finally" y la función devuelve 1. finally se ejecuta antes de que la función realmente devuelva.
</details>

<details>
<summary>4. parsearNumero con throw</summary>

```js
function parsearNumero(str) {
  const n = Number(str);
  if (!Number.isFinite(n)) throw new Error("No es un número válido");
  return n;
}
```
</details>

<details>
<summary>5. Rethrow</summary>

```js
catch (e) {
  console.error(e);
  throw e;
}
```
</details>

<details>
<summary>6. finally con flag</summary>

```js
let terminado = false;
try {
  // ...
} catch (e) {
  // ...
} finally {
  terminado = true;
}
```
</details>

---

**[⬅ Volver al índice](../README.md)**
