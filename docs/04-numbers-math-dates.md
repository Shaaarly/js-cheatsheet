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

| Método / función | Devuelve | Uso |
|------------------|----------|-----|
| `Number(val)` | number o NaN | Coerción numérica |
| `parseInt(str, 10)` | number (entero) | String → entero (base 10) |
| `parseFloat(str)` | number | String → decimal |
| `Number.isNaN(x)` | boolean | ¿Es NaN? (no coerción) |
| `Number.isFinite(x)` | boolean | ¿Es número finito? (excluye NaN, Infinity) |
| `Number.isInteger(x)` | boolean | ¿Es entero? |

```js
Number("42");      // 42
Number("42.5");    // 42.5
Number("");        // 0
Number("  ");      // 0
Number("12px");    // NaN

parseInt("42", 10);   // 42
parseInt("42.9", 10); // 42
parseInt("ff", 16);   // 255
parseFloat("3.14");   // 3.14
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

Todos los métodos son estáticos; no mutan nada.

| Método | Devuelve | Uso |
|--------|----------|-----|
| `Math.floor(x)` | number | Redondeo hacia abajo |
| `Math.ceil(x)` | number | Redondeo hacia arriba |
| `Math.round(x)` | number | Redondeo al entero más próximo |
| `Math.trunc(x)` | number | Quitar decimales (truncar) |
| `Math.max(...vals)` | number | Máximo |
| `Math.min(...vals)` | number | Mínimo |
| `Math.abs(x)` | number | Valor absoluto |
| `Math.random()` | number | [0, 1) |
| `Math.pow(b, e)` | number | b^e (o usar `**`) |
| `Math.sqrt(x)` | number | Raíz cuadrada |

```js
Math.floor(2.9);   // 2
Math.ceil(2.1);    // 3
Math.round(2.5);   // 3 (redondeo bancario)
Math.trunc(-2.9);  // -2

const precios = [10, 25, 8, 99];
Math.max(...precios); // 99
Math.min(...precios); // 8

// Entero aleatorio entre min y max (incluidos)
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

**Número con N decimales:** `Number((x).toFixed(2))` o redondear: `Math.round(x * 100) / 100`.

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

- **Date** trabaja en milisegundos desde el epoch (1 enero 1970 UTC).
- Los meses son **0-indexados** (0 = enero, 11 = diciembre).

| Creación | Ejemplo |
|----------|---------|
| `new Date()` | Ahora |
| `new Date(ms)` | Desde epoch |
| `new Date(year, month, day?, h?, m?, s?, ms?)` | Fecha local |
| `new Date(string ISO)` | `"2025-02-18T10:00:00.000Z"` |

| Métodos (get/set) | Uso |
|-------------------|-----|
| `getFullYear()`, `getMonth()`, `getDate()` | Año, mes (0-11), día |
| `getHours()`, `getMinutes()`, `getSeconds()` | Hora local |
| `getTime()` | Milisegundos desde epoch |
| `toISOString()` | String ISO 8601 (UTC) |
| `getDay()` | Día de la semana (0 = domingo) |

**No muta en el sentido de “cambiar tipo”**: los setter sí modifican el objeto Date internamente.

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
