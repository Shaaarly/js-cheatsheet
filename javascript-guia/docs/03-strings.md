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

Todos los métodos de string **devuelven** un nuevo valor; **nunca** modifican el original.

### Parámetros importantes (para no dudar en el examen)

| Método | Parámetros | Qué hace | Ejemplo |
|--------|------------|----------|---------|
| `slice(inicio, fin?)` | `inicio`: índice inicio (incluido). `fin`: opcional, índice final **no incluido**. Índices **negativos** = desde el final (-1 = último carácter). | Devuelve el substring. Si omites `fin`, llega al final. | `"abcde".slice(1, 4)` → `"bcd"`; `"abcde".slice(-2)` → `"de"` |
| `substring(inicio, fin?)` | Igual que slice pero **no admite negativos**: si pasas negativo, se trata como 0. | Similar a slice; menos útil que slice. | `"abcde".substring(1, 4)` → `"bcd"` |
| `replace(patrón, reemplazo)` | `patrón`: string o RegExp. `reemplazo`: string o **función** `(match, ...grupos) => string`. **Solo sustituye la primera** coincidencia (a menos que el patrón sea regex con flag `g`). | Devuelve nuevo string con la sustitución. | `"a-b-c".replace("-", "_")` → `"a_b-c"` |
| `replaceAll(patrón, reemplazo)` | Mismos tipos que replace. Sustituye **todas** las coincidencias. | Nuevo string con todas las sustituciones. | `"a-b-c".replaceAll("-", "_")` → `"a_b_c"` |
| `split(separador, límite?)` | `separador`: string o RegExp por donde cortar. `límite?`: opcional, máximo de trozos. | Devuelve **array** de strings. Si `separador` es `""`, divide carácter a carácter. | `"a,b,c".split(",")` → `["a","b","c"]`; `"hola".split("")` → `["h","o","l","a"]` |
| `padStart(long, relleno?)` | `long`: longitud total deseada. `relleno?`: string con el que rellenar (default `" "`). | Rellena por la **izquierda** hasta alcanzar `long`. | `"42".padStart(5, "0")` → `"00042"` |
| `padEnd(long, relleno?)` | Igual que padStart pero rellena por la **derecha**. | Rellena por la derecha. | `"12.5".padEnd(5, "0")` → `"12.50"` |
| `indexOf(substr, desde?)` | `substr`: qué buscar. `desde?`: índice desde el que empezar (default 0). | Devuelve el **índice** de la primera aparición, o **-1** si no está. | `"abcbc".indexOf("bc")` → `1`; `"abcbc".indexOf("bc", 2)` → `3` |
| `lastIndexOf(substr, desde?)` | Igual pero busca de atrás hacia delante. | Índice de la **última** aparición, o -1. | `"abcbc".lastIndexOf("bc")` → `3` |

### replace con función (caso útil)

Si pasas una **función** como segundo argumento, se llama por cada coincidencia y el valor que devuelve sustituye a esa coincidencia:

```js
// Firma: (match, g1?, g2?, ...) => string
// match = trozo encontrado; g1, g2 = grupos del regex si los hay
"pedido-1 y pedido-2".replace(/pedido-(\d)/g, (match, num) => `#${num}`);
// → "#1 y #2"
```

### Ejemplos comentados

```js
const email = "  USUARIO@EXAMPLE.COM  ";
const normalizado = email.trim().toLowerCase();
// trim() quita espacios al inicio y final; toLowerCase() a minúsculas → "usuario@example.com"

const ref = "PED-2024-001";
const num = ref.slice(-3);       // desde el penúltimo carácter: -3 = 3 desde el final → "001"
const prefijo = ref.slice(0, 3); // desde 0, hasta 3 (no incluido) → "PED"

const csv = "Ana,García,ana@mail.com";
const columnas = csv.split(","); // corta por "," → ["Ana", "García", "ana@mail.com"]
const sinEspacios = "a, b , c".split(",").map(s => s.trim()); // cada trozo sin espacios
```

---

## 3. Búsqueda y comprobaciones

| Método | Parámetros | Devuelve | Uso |
|--------|------------|----------|-----|
| `includes(substr, desde?)` | `substr`: qué buscar. `desde?`: índice desde el que empezar (default 0). | boolean | ¿Contiene el substring? |
| `startsWith(substr, desde?)` | `substr`: prefijo. `desde?`: índice desde el que mirar (default 0). | boolean | ¿Empieza por substr? |
| `endsWith(substr, long?)` | `substr`: sufijo. `long?`: longitud del string a considerar (default length). | boolean | ¿Termina por substr? |
| `charAt(i)` / `[i]` | `i`: índice (0-based). | string de 1 carácter (o "" si fuera de rango) | Carácter en esa posición. `s[i]` es equivalente. |

```js
const estado = "pendiente_de_pago";
estado.includes("pendiente");  // true — ¿contiene "pendiente"?
estado.startsWith("pend");     // true — ¿empieza por "pend"?
estado.endsWith("pago");       // true — ¿termina por "pago"?

const path = "/api/pedidos/123";
const ultimaBarra = path.lastIndexOf("/");  // 14
const id = path.slice(ultimaBarra + 1);     // "123" — desde después de la barra hasta el final

const dni = "12345678A";
const letra = dni.charAt(dni.length - 1);   // "A" — último carácter
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
