# 4. Numbers, Math, Intl y fechas (Date)

**[⬅ Volver al índice](../README.md)**

---

## Mini-índice del capítulo

1. [Numbers y límites](#1-numbers-y-límites)
2. [Parseo y comprobaciones](#2-parseo-y-comprobaciones)
3. [Math](#3-math)
4. [Intl (formato e idioma)](#4-intl-formato-e-idioma)
5. [Date](#5-date)
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

- **Date** trabaja en **milisegundos** desde el epoch (1 enero 1970 UTC).
- Los **meses son 0-indexados**: 0 = enero, 11 = diciembre (muy habitual en exámenes).

### Creación: parámetros

| Constructor | Parámetros | Ejemplo |
|-------------|------------|---------|
| `new Date()` | Ninguno | Fecha/hora actual. |
| `new Date(ms)` | Milisegundos desde 01/01/1970 UTC | `new Date(0)` = epoch. |
| `new Date(año, mes, día?, h?, m?, s?, ms?)` | **mes es 0-11**. Resto opcional. | `new Date(2025, 0, 1)` = 1 enero 2025. |
| `new Date(stringISO)` | String ISO 8601 | `new Date("2025-02-18T12:00:00.000Z")`. |

### Métodos get/set (los set mutan el Date)

| Método | Devuelve / efecto |
|--------|-------------------|
| `getFullYear()`, `getMonth()`, `getDate()` | Año (4 dígitos), mes (0-11), día del mes (1-31). |
| `getHours()`, `getMinutes()`, `getSeconds()` | Hora, minutos, segundos (locale). |
| `getTime()` | **Milisegundos** desde epoch (número); útil para restar fechas. |
| `toISOString()` | String en UTC, ej. `"2025-02-18T10:00:00.000Z"`. |
| `getDay()` | Día de la semana 0-6 (0 = domingo). |
| `setDate(n)`, `setMonth(n)`, … | Modifican el Date; no devuelven una nueva fecha. |

```js
const ahora = new Date();
const manana = new Date(ahora);
manana.setDate(manana.getDate() + 1);

const iso = ahora.toISOString(); // "2025-02-18T..."
const desdeApi = new Date("2025-02-18T12:00:00Z");
```

**Caso real — diferencia en días:**
```js
function diasEntre(d1, d2) {
  const ms = Math.abs(d2 - d1);
  return Math.floor(ms / (24 * 60 * 60 * 1000));
}
```

**Caso real — formatear para API:**
```js
const payload = {
  fecha: new Date().toISOString(),
  fechaSolo: new Date().toISOString().slice(0, 10) // "2025-02-18"
};
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
