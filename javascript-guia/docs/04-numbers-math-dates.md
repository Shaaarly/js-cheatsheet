# 4. Numbers, Math, Intl y fechas (Date)

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Numbers y límites](#1-numbers-y-límites)
2. [Parseo y comprobaciones](#2-parseo-y-comprobaciones)
3. [Math](#3-math)
4. [Intl (formato e idioma)](#4-intl-formato-e-idioma)
5. [Date](#5-date) · [5.1 Creación](#51-creación) · [5.2 Partes (getters)](#52-partes-de-la-fecha-getters-hora-local) · [5.3 getTime / toISOString](#53-milisegundos-y-string-iso-utc) · [5.4 Formatear (locale)](#54-formatear-para-pantalla-locale) · [5.5 Setters](#55-setters-mutan-el-date) · [5.6 Timestamp API](#56-timestamp-desde-api-segundos--date) · [5.7 Invalid Date](#57-invalid-date-y-comprobación) · [5.8 Resumen output](#58-resumen-de-métodos-output-de-ejemplo) · [5.9 Casos reales](#59-casos-reales)
6. [Errores típicos y trampas de examen](#6-errores-típicos-y-trampas-de-examen)
7. [Checklist rápido](#7-checklist-rápido)
8. [Mini-ejercicios](#8-mini-ejercicios)
9. [Soluciones](#9-soluciones)

---

## 1. Numbers y límites

- Un solo tipo numérico: **number** (IEEE 754 doble precisión). Enteros y decimales.
- **NaN** (Not a Number): resultado de operaciones inválidas. `NaN !== NaN`; usar `Number.isNaN(x)`.
- **Infinity** / **-Infinity**: división por cero, overflow.
- **Precisión decimal**: los decimales en base 2 pueden dar errores de redondeo; para dinero usar enteros (céntimos) o librerías (decimal.js).

```js
0.1 + 0.2; // 0.30000000000000004
Number.isNaN(Number("abc")); // true
1 / 0;     // Infinity
```

---

## 2. Parseo y comprobaciones

| Método / función | Parámetros | Devuelve | Uso |
|------------------|------------|----------|-----|
| `Number(val)` | Cualquier valor (se convierte a number). | number o NaN | Coerción; `""` → 0, `"12px"` → NaN. |
| `parseInt(str, base?)` | `str`: string. `base`: opcional, base 2–36; **usa siempre 10** para decimal para evitar interpretación octal. | number (entero) o NaN | String → entero; para decimales usar parseFloat. |
| `parseFloat(str)` | `str`: string. | number o NaN | String → número con decimales; para en "3.14" o "10.5px". |
| `Number.isNaN(x)` | Un valor. | boolean | true **solo** si x es exactamente NaN (no hace coerción; `isNaN("hola")` sí coerción). |
| `Number.isFinite(x)` | Un valor. | boolean | true si es número y no NaN ni Infinity. |
| `Number.isInteger(x)` | Un valor. | boolean | true si es número entero. |

```js
Number("42");         // 42
Number("12px");       // NaN — no puede parsear

parseInt("42", 10);   // 42 — siempre indicar base 10 en examen
parseInt("42.9", 10); // 42 — trunca decimales
parseInt("ff", 16);   // 255 — hexadecimal
parseFloat("3.14");   // 3.14
parseFloat("10.5px");// 10.5 — lee hasta donde puede
```

**Caso real — validar y parsear input numérico:**
```js
function aNumeroSeguro(input) {
  const n = Number(input);
  return Number.isFinite(n) ? n : 0;
}
```

---

## 3. Math

Todos los métodos son **estáticos** (`Math.metodo(...)`); no mutan nada.

| Método | Parámetros | Devuelve | Uso |
|--------|------------|----------|-----|
| `Math.floor(x)` | Un número. | number | Redondeo **hacia abajo** (2.9 → 2). |
| `Math.ceil(x)` | Un número. | number | Redondeo **hacia arriba** (2.1 → 3). |
| `Math.round(x)` | Un número. | number | Al entero **más próximo** (2.5 → 3). |
| `Math.trunc(x)` | Un número. | number | **Quita** la parte decimal (-2.9 → -2). |
| `Math.max(a, b, ...)` | **Varios números** o un spread. | number | El **mayor**. Con array: `Math.max(...arr)`. |
| `Math.min(a, b, ...)` | Varios números o spread. | number | El **menor**. Con array: `Math.min(...arr)`. |
| `Math.random()` | Ninguno. | number en [0, 1) | Número aleatorio; para entero: floor(random * (max-min+1)) + min. |
| `Math.pow(b, e)` | base, exponente. | number | b^e; equivalente a `b ** e`. |

```js
Math.floor(2.9);   // 2 — hacia abajo
Math.ceil(2.1);    // 3 — hacia arriba
Math.trunc(-2.9);  // -2 — quita decimales

const precios = [10, 25, 8, 99];
Math.max(...precios);  // 99 — con array hay que usar spread
Math.min(1, 2, 3);     // 1

// Entero aleatorio entre min y max (incluidos)
Math.floor(Math.random() * (max - min + 1)) + min;
```

**Número con N decimales:** `Number((x).toFixed(2))` o `Math.round(x * 100) / 100`.

---

## 4. Intl (formato e idioma)

**Intl.NumberFormat** — moneda, decimales, miles:
```js
const fmt = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2
});
fmt.format(1234.5); // "1.234,50 €"
```

**Intl.DateTimeFormat** — fechas localizadas:
```js
const fmtDate = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "medium",
  timeStyle: "short"
});
fmtDate.format(new Date()); // "18 feb 2025, 12:30"
```

**Intl.Collator** — ordenación por idioma:
```js
["ña", "nano", "nube"].sort(new Intl.Collator("es").compare);
```

---

## 5. Date

- **Date** trabaja en **milisegundos** desde el epoch (1 enero 1970 00:00:00 UTC).
- Los **meses son 0-indexados**: **0 = enero**, **11 = diciembre** (muy habitual en exámenes).
- Todas las horas son en la **zona local** del navegador, salvo cuando se usa UTC (getUTC*, toISOString).

En los ejemplos se usa una fecha fija para que el output sea predecible: **26 de febrero de 2025, 15:30:45** (miércoles).

---

### 5.1. Creación

| Constructor | Parámetros | Ejemplo y output típico |
|-------------|------------|--------------------------|
| `new Date()` | Ninguno | Fecha/hora **actual** en el momento de ejecución. |
| `new Date(ms)` | Milisegundos desde 01/01/1970 UTC | `new Date(0)` → 1 ene 1970 00:00:00 UTC. |
| `new Date(año, mes, día?, h?, m?, s?, ms?)` | **mes 0–11**. Día 1–31. Resto opcional (0 si se omite). | Ver abajo. |
| `new Date(stringISO)` | String ISO 8601 | `new Date("2025-02-26T14:30:00.000Z")` → esa fecha en UTC. |

```js
// Fecha fija: 26 febrero 2025, 15:30:45 (hora local)
// Sintaxis: (año, mes, día, hora, minuto, segundo, milisegundo)
const d = new Date(2025, 1, 26, 15, 30, 45, 0);
// mes 1 = febrero (0=ene, 1=feb, ..., 11=dic)

new Date();                    // ahora
new Date(0);                   // 01/01/1970 00:00:00 UTC
new Date(2025, 0, 1);          // 1 enero 2025, 00:00:00
new Date("2025-02-26T12:00:00.000Z");  // 26 feb 2025 12:00 UTC (como string ISO)
```

---

### 5.2. Partes de la fecha (getters, hora local)

Devuelven **números**. El mes es **0–11**; el día del mes es **1–31**; el día de la semana es **0–6** (0 = domingo).

```js
const d = new Date(2025, 1, 26, 15, 30, 45, 123);

d.getFullYear();   // 2025  — año (4 dígitos)
d.getMonth();      // 1     — mes (0=febrero)
d.getDate();       // 26    — día del mes (1-31)
d.getDay();        // 3     — día de la semana (0=domingo → 3=miércoles)

d.getHours();      // 15
d.getMinutes();    // 30
d.getSeconds();    // 45
d.getMilliseconds(); // 123
```

**Resumen rápido:**

| Método | Rango / significado | Ejemplo output (26 feb 2025, miércoles) |
|--------|---------------------|----------------------------------------|
| `getFullYear()` | Año (número) | `2025` |
| `getMonth()` | 0 = enero … 11 = diciembre | `1` |
| `getDate()` | 1–31 (día del mes) | `26` |
| `getDay()` | 0 = domingo … 6 = sábado | `3` |
| `getHours()` | 0–23 | `15` |
| `getMinutes()` | 0–59 | `30` |
| `getSeconds()` | 0–59 | `45` |
| `getMilliseconds()` | 0–999 | `123` |

---

### 5.3. Milisegundos y string ISO (UTC)

**getTime()** devuelve los **milisegundos** desde el 01/01/1970 00:00:00 UTC. Sirve para **restar fechas** y obtener diferencias.

**toISOString()** devuelve un **string en UTC** con formato ISO 8601. Muy usado para enviar fechas a APIs o guardarlas.

```js
const d = new Date(2025, 1, 26, 15, 30, 45, 0);

d.getTime();
// 1740574245000  (número; depende de la zona horaria al crear d)

d.toISOString();
// "2025-02-26T14:30:45.000Z"  (si estás en UTC+1; en UTC es 14:30)
```

**Diferencia entre dos fechas (en días):**

```js
const d1 = new Date(2025, 0, 1);   // 1 enero 2025
const d2 = new Date(2025, 1, 26);  // 26 febrero 2025

const ms = d2 - d1;   // resta de Date usa getTime() por detrás
// 4838400000  (ms entre ambas)

const dias = Math.floor(ms / (24 * 60 * 60 * 1000));
// 56  (días entre el 1 ene y el 26 feb)
```

---

### 5.4. Formatear para pantalla (locale)

**toLocaleDateString(locale?, options?)**, **toLocaleTimeString(...)**, **toLocaleString(...)** devuelven strings según el idioma y la zona del navegador.

```js
const d = new Date(2025, 1, 26, 15, 30, 45);

d.toLocaleDateString("es-ES");
// "26/2/2025"  (formato corto en español)

d.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
// "miércoles, 26 de febrero de 2025"

d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
// "15:30"

d.toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" });
// "26/2/2025, 15:30"
```

**Opciones útiles para fecha:** `weekday`, `year`, `month`, `day`; o `dateStyle: "short" | "medium" | "long" | "full"`.  
**Para hora:** `hour`, `minute`, `second`; o `timeStyle: "short" | "medium" | "long" | "full"`.

---

### 5.5. Setters (mutan el Date)

Los métodos **setDate**, **setMonth**, **setFullYear**, **setHours**, etc. **modifican** el objeto Date y devuelven los **milisegundos** resultantes (no un nuevo Date). Si quieres mantener la fecha original, crea una copia antes.

```js
const d = new Date(2025, 1, 26, 15, 30, 0);

d.setDate(1);
// d ahora es 1 febrero 2025, 15:30:00

d.setMonth(0);   // 0 = enero
// d ahora es 1 enero 2025, 15:30:00

d.setDate(d.getDate() + 7);
// d ahora es 8 enero 2025 (sumar 7 días)
```

**Sumar un día sin mutar la fecha original:**

```js
const hoy = new Date(2025, 1, 26);
const manana = new Date(hoy);   // copia
manana.setDate(manana.getDate() + 1);
// hoy sigue siendo 26 feb; manana es 27 feb
```

---

### 5.6. Timestamp desde API (segundos → Date)

Muchas APIs (p. ej. OpenWeather) devuelven fechas en **segundos** desde el epoch, no milisegundos. Para convertirlas en Date, multiplica por 1000:

```js
const timestampSegundos = 1740574245;  // lo que devuelve la API
const d = new Date(timestampSegundos * 1000);

d.toLocaleString("es-ES");
// "26/2/2025, 15:30:45"  (según zona)
```

Para **mostrar** solo la fecha legible:

```js
new Date(timestampSegundos * 1000).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" });
```

---

### 5.7. Invalid Date y comprobación

Si el string o los parámetros no son válidos, se crea una fecha “inválida”. Al usar **getTime()** devuelve **NaN**. No compares fechas con `===` (compara referencias); usa **getTime()** o la resta.

```js
const invalida = new Date("esto no es una fecha");
invalida.getTime();   // NaN

// Comprobar si una fecha es válida:
function esFechaValida(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}
```

---

### 5.8. Resumen de métodos (output de ejemplo)

Con `const d = new Date(2025, 1, 26, 15, 30, 45, 0)` (26 feb 2025, 15:30:45):

| Método | Output |
|--------|--------|
| `d.getFullYear()` | `2025` |
| `d.getMonth()` | `1` (febrero) |
| `d.getDate()` | `26` |
| `d.getDay()` | `3` (miércoles) |
| `d.getHours()` | `15` |
| `d.getMinutes()` | `30` |
| `d.getSeconds()` | `45` |
| `d.getTime()` | número de ms (ej. `1740574245000`) |
| `d.toISOString()` | `"2025-02-26T14:30:45.000Z"` (UTC) |
| `d.toLocaleDateString("es-ES")` | `"26/2/2025"` |
| `d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })` | `"15:30"` |

---

### 5.9. Casos reales

**Diferencia en días entre dos fechas:**

```js
function diasEntre(d1, d2) {
  const ms = Math.abs(d2 - d1);
  return Math.floor(ms / (24 * 60 * 60 * 1000));
}
```

**Formatear fecha para enviar a una API (solo fecha YYYY-MM-DD):**

```js
const hoy = new Date();
hoy.toISOString().slice(0, 10);   // "2025-02-26"
```

**Primer día del mes de una fecha:**

```js
function primerDiaDelMes(d) {
  const r = new Date(d);
  r.setDate(1);
  return r;
}
```

---

## 6. Errores típicos y trampas de examen

- Meses 0-11: `new Date(2025, 0, 1)` es 1 de enero.
- `NaN` en Date: `new Date("invalid")` da Invalid Date; comprobar con `Number.isNaN(date.getTime())`.
- `parseInt` sin base: `parseInt("08")` en algunos entornos puede interpretarse en base 8; usar siempre `parseInt(s, 10)`.
- Comparar fechas: restar o usar `getTime()`; no comparar objetos Date con `===` por referencia.
- Precisión flotante: no usar `===` para igualdad de decimales; usar tolerancia o enteros.

---

## 7. Checklist rápido

- [ ] Saber que NaN !== NaN y usar Number.isNaN.
- [ ] Usar parseInt(str, 10) y parseFloat para strings.
- [ ] Conocer Math.floor, ceil, round, trunc, max, min, random.
- [ ] Formatear números y fechas con Intl cuando haga falta locale.
- [ ] Recordar que los meses en Date son 0-11 y que getTime() da ms desde epoch.

---

## 8. Mini-ejercicios

1. Dado un string que puede ser un número (ej. "19.99"), escribe una función que devuelva el número o 0 si no es válido.
2. Redondea un número a 2 decimales (sin usar toFixed en el resultado final como string).
3. Genera un entero aleatorio entre 1 y 6 (dado).
4. Dada una fecha `Date`, devuelve el primer día del mismo mes (mismo año y mes, día 1).
5. Formatea un número como moneda en euros en español (ej. 99.5 → "99,50 €") con Intl.
6. Calcula cuántos días han pasado desde el 1 de enero del año actual hasta hoy.

---

## 9. Soluciones

<details>
<summary>1. String a número seguro</summary>

```js
function aNumero(str) {
  const n = Number(str);
  return Number.isFinite(n) ? n : 0;
}
```
</details>

<details>
<summary>2. Redondear a 2 decimales</summary>

```js
const redondeado = Math.round(x * 100) / 100;
```
</details>

<details>
<summary>3. Dado 1-6</summary>

```js
Math.floor(Math.random() * 6) + 1
```
</details>

<details>
<summary>4. Primer día del mes</summary>

```js
function primerDiaDelMes(d) {
  const r = new Date(d);
  r.setDate(1);
  return r;
}
```
</details>

<details>
<summary>5. Moneda EUR es-ES</summary>

```js
new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(99.5)
```
</details>

<details>
<summary>6. Días desde 1 de enero</summary>

```js
const hoy = new Date();
const primeroEnero = new Date(hoy.getFullYear(), 0, 1);
const ms = hoy - primeroEnero;
Math.floor(ms / (24 * 60 * 60 * 1000));
```
</details>

---

**[⬅ Volver al índice](../README.md)**
