# 3. Strings: métodos y casos reales

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Creación y literales](#1-creación-y-literales)
2. [Métodos que no mutan (strings son inmutables)](#2-métodos-que-no-mutan-strings-son-inmutables)
3. [Búsqueda y comprobaciones](#3-búsqueda-y-comprobaciones)
4. [Casos reales](#4-casos-reales)
5. [Errores típicos y trampas de examen](#5-errores-típicos-y-trampas-de-examen)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. Creación y literales

Strings en JS son **inmutables**: cualquier “cambio” devuelve un nuevo string.

```js
const simple = 'Hola';
const doble = "Mundo";
const template = `Pedido #${pedido.id} - ${pedido.total}€`;
const multilinea = `Línea 1
Línea 2`;
```

---

## 2. Métodos que no mutan (strings son inmutables)

Todos los métodos de string **devuelven** un nuevo valor; **nunca** modifican el original. Complejidad indicada cuando es relevante.

| Método | Devuelve | Uso típico |
|--------|----------|------------|
| `toLowerCase()` | string | Normalizar para comparar |
| `toUpperCase()` | string | Mayúsculas, siglas |
| `trim()` | string | Quitar espacios extremos |
| `trimStart()` / `trimEnd()` | string | Quitar solo inicio/fin |
| `slice(inicio, fin?)` | string | Substring por índices (fin no incluido) |
| `substring(inicio, fin?)` | string | Similar a slice (trata negativos como 0) |
| `replace(patrón, reemplazo)` | string | Primera sustitución |
| `replaceAll(patrón, reemplazo)` | string | Todas las sustituciones |
| `repeat(n)` | string | Repetir string n veces |
| `padStart(long, relleno?)` | string | Rellenar al inicio (ej. ceros) |
| `padEnd(long, relleno?)` | string | Rellenar al final |
| `split(separador)` | array | Dividir en array de strings |

```js
const email = "  USUARIO@EXAMPLE.COM  ";
const normalizado = email.trim().toLowerCase(); // "usuario@example.com"

const ref = "PED-2024-001";
const num = ref.slice(-3);      // "001"
const prefijo = ref.slice(0, 3); // "PED"

const precio = "12.5";
const conDecimales = precio.padEnd(5, "0"); // "12.50"
const codigo = String(id).padStart(6, "0"); // "000042"

const csv = "Ana,García,ana@mail.com";
const columnas = csv.split(","); // ["Ana", "García", "ana@mail.com"]
```

---

## 3. Búsqueda y comprobaciones

| Método | Devuelve | Complejidad | Uso típico |
|--------|----------|-------------|------------|
| `includes(substr)` | boolean | O(n) | ¿Contiene? |
| `startsWith(substr)` | boolean | O(k) | Prefijo |
| `endsWith(substr)` | boolean | O(k) | Sufijo |
| `indexOf(substr, desde?)` | number (-1 si no) | O(n) | Posición primera |
| `lastIndexOf(substr, desde?)` | number (-1 si no) | O(n) | Posición última |
| `charAt(i)` / `[i]` | string (1 carácter) | O(1) | Carácter en posición |

```js
const estado = "pendiente_de_pago";
estado.includes("pendiente"); // true
estado.startsWith("pend");    // true
estado.endsWith("pago");      // true

const path = "/api/pedidos/123";
const id = path.slice(path.lastIndexOf("/") + 1); // "123"

const dni = "12345678A";
const letra = dni.charAt(dni.length - 1); // "A"
```

---

## 4. Casos reales

**Normalizar datos de formulario:**
```js
function normalizarNombre(input) {
  return input.trim().toLowerCase().replace(/\s+/g, " ");
}
normalizarNombre("  Juan   Pérez  "); // "juan pérez"
```

**Extraer dominio de email:**
```js
const email = "usuario@dominio.com";
const dominio = email.slice(email.indexOf("@") + 1); // "dominio.com"
```

**Formatear moneda (sin Intl):**
```js
function formatoMoneda(num) {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
```

**Parsear query string simple:**
```js
const query = "?estado=pendiente&pagina=2";
const params = Object.fromEntries(
  query.slice(1).split("&").map(p => p.split("="))
);
// { estado: "pendiente", pagina: "2" }
```

---

## 5. Errores típicos y trampas de examen

- Creer que los métodos mutan el string (nunca: siempre devuelven nuevo string).
- Confundir `slice` con `splice` (splice es de arrays y muta).
- `indexOf`/`lastIndexOf` devuelven `-1` si no encuentran; comprobar `< 0` o `=== -1`.
- `replace` solo cambia la primera coincidencia; para todas usar `replaceAll` o regex con flag `g`.
- `substring(i, j)` con índices negativos los trata como 0; `slice` admite negativos (desde el final).

---

## 6. Checklist rápido

- [ ] Recordar que los strings son inmutables.
- [ ] Saber `trim`, `toLowerCase`, `toUpperCase`, `slice`, `split`, `replace`/`replaceAll`.
- [ ] Usar `includes`/`startsWith`/`endsWith` para comprobaciones; `indexOf` cuando necesites la posición.
- [ ] Diferenciar `slice` (índices negativos) de `substring`.
- [ ] Saber que `replace` sin regex global solo sustituye la primera ocurrencia.

---

## 7. Mini-ejercicios

1. Dado un string de email, escribe una expresión que devuelva la parte antes de la `@` (local part).
2. Implementa `capitalizar(str)` que devuelva el string con la primera letra en mayúscula y el resto en minúscula.
3. Dado `"item1,item2,item3"`, devuelve un array de strings sin espacios (trim de cada elemento).
4. Comprueba si un string `codigo` termina en `"-DEV"` (case-insensitive).
5. Sustituye todas las ocurrencias de `"N/A"` por `"—"` en un string.
6. Dado un número `n`, genera un string de `n` caracteres rellenando con ceros a la izquierda hasta longitud 5 (ej. 42 → `"00042"`).

---

## 8. Soluciones

<details>
<summary>1. Parte antes de @</summary>

```js
const email = "user@domain.com";
const local = email.slice(0, email.indexOf("@")); // "user"
```
</details>

<details>
<summary>2. capitalizar</summary>

```js
function capitalizar(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
```
</details>

<details>
<summary>3. Split y trim</summary>

```js
"item1, item2, item3".split(",").map(s => s.trim())
```
</details>

<details>
<summary>4. Termina en -DEV (case-insensitive)</summary>

```js
codigo.toUpperCase().endsWith("-DEV")
```
</details>

<details>
<summary>5. Sustituir todas las N/A</summary>

```js
texto.replaceAll("N/A", "—")
// o: texto.replace(/N\/A/g, "—")
```
</details>

<details>
<summary>6. Rellenar con ceros hasta 5</summary>

```js
String(n).padStart(5, "0")
```
</details>

---

**[⬅ Volver al índice](../README.md)**
