# 8b. Map, Set y regex mínima

**[⬅ Volver al índice](../README.md)**

**Qué problema resuelve:** guardar pares clave-valor sin usar un objeto, quedarte con valores únicos, y reconocer un patrón dentro de un texto (por ejemplo una URL que termina en `intro`).

**Qué necesitas saber antes:** [objetos](06-objects.md), [arrays](05-arrays.md) y [strings](03-strings.md). Es material de la ruta de dominio. En la ruta Playwright basta la sección de regex para leer `toHaveURL(/intro/)`.

---

## Mini-índice del capítulo

1. [Map](#1-map)
2. [Set](#2-set)
3. [Regex mínima](#3-regex-mínima)
4. [Checklist rápido](#4-checklist-rápido)
5. [Mini-ejercicios](#5-mini-ejercicios)
6. [Soluciones](#6-soluciones)

---

## 1. Map

Un objeto usa claves de tipo string (o symbol). Un `Map` acepta cualquier valor como clave y recuerda el orden de inserción.

```js
const pedidos = new Map();
pedidos.set("a1", { total: 10 });
pedidos.set("b2", { total: 40 });

pedidos.get("a1");      // { total: 10 }
pedidos.has("b2");      // true
pedidos.size;           // 2
pedidos.delete("a1");

for (const [id, pedido] of pedidos) {
  console.log(id, pedido.total);
}
```

| Método | Qué hace |
|--------|----------|
| `set(clave, valor)` | Guarda o sustituye. Devuelve el mismo Map |
| `get(clave)` | Devuelve el valor o `undefined` |
| `has(clave)` | `true` si la clave existe |
| `delete(clave)` | Quita la entrada |
| `size` | Número de entradas |

Usa un objeto cuando las claves son nombres fijos (`usuario.nombre`). Usa `Map` cuando las claves llegan de datos (ids, objetos) o necesitas `.size` fiable.

---

## 2. Set

Un `Set` guarda valores **únicos**. Da igual cuántas veces añadas el mismo valor: queda una sola vez. La comparación es la misma que `===`.

```js
const ids = [1, 2, 2, 3, 1];
const unicos = new Set(ids);
unicos.has(2);          // true
unicos.add(4);
unicos.delete(1);
[...unicos];            // [2, 3, 4] — el orden es el de la primera aparición
```

Quitar duplicados de un array:

```js
const limpio = [...new Set(ids)];
```

`Set` no sustituye a `filter` cuando la condición es más rica que "ya lo he visto".

---

## 3. Regex mínima

Una expresión regular es un patrón escrito entre barras: `/intro/`. `test` dice si el texto encaja. `match` devuelve lo encontrado.

```js
/intro/.test("https://playwright.dev/docs/intro"); // true
"abc-123".match(/\d+/);                             // ["123"]
```

Atajos útiles:

| Patrón | Significa |
|--------|-----------|
| `\d` | un dígito |
| `\w` | letra, dígito o `_` |
| `.` | cualquier carácter menos salto de línea |
| `+` | uno o más |
| `*` | cero o más |
| `^` / `$` | inicio / fin del texto |

Flags frecuentes, detrás de la segunda barra: `i` ignora mayúsculas, `g` busca todas las coincidencias.

```js
"Ana ana".match(/ana/gi);           // ["Ana", "ana"]
"a-b-c".replace(/-/g, "_");         // "a_b_c"
```

Sin `g`, `replace` de un regex solo cambia la primera coincidencia, igual que un string. El capítulo 3 lo usa en `split` y `replace`.

En un test de Playwright, `await expect(page).toHaveURL(/intro/)` significa "la URL encaja con este patrón", no "la URL es exactamente el texto `/intro/`".

---

## 4. Checklist rápido

- [ ] `Map` para claves que no son nombres fijos; `get` / `set` / `has` / `size`.
- [ ] `Set` para únicos; `[...new Set(arr)]` quita duplicados.
- [ ] `/patrón/.test(texto)` responde sí o no.
- [ ] La flag `g` sustituye o encuentra todas las veces.
- [ ] `toHaveURL(/intro/)` compara contra el patrón, no contra las barras.

---

## 5. Mini-ejercicios

1. Crea un `Map` de tres productos (`id` → precio) y lee el precio de uno.
2. Dado `[1, 1, 2, 3, 2]`, devuelve un array sin duplicados conservando el orden.
3. Escribe una función `tieneDigitos(texto)` que devuelva `true` si hay al menos un dígito.
4. Sustituye todas las comas de `"a,b,c"` por punto y coma usando un regex.
5. ¿`/intro/.test("https://ejemplo.com/docs/intro")` es `true` o `false`? ¿Y `toHaveURL("/intro/")` qué compararía, el patrón o el texto exacto de las barras?

---

## 6. Soluciones

<details>
<summary>1. Map de precios</summary>

```js
const precios = new Map();
precios.set("cafe", 1.5);
precios.set("te", 1.2);
precios.set("zumo", 2);
precios.get("te"); // 1.2
```
</details>

<details>
<summary>2. Únicos</summary>

```js
const limpio = [...new Set([1, 1, 2, 3, 2])];
// [1, 2, 3]
```
</details>

<details>
<summary>3. tieneDigitos</summary>

```js
function tieneDigitos(texto) {
  return /\d/.test(texto);
}
tieneDigitos("pedido 12"); // true
tieneDigitos("pedido");    // false
```
</details>

<details>
<summary>4. Comas</summary>

```js
"a,b,c".replace(/,/g, ";"); // "a;b;c"
```
</details>

<details>
<summary>5. test y toHaveURL</summary>

`/intro/.test("https://ejemplo.com/docs/intro")` es `true` porque el texto contiene `intro`.

`toHaveURL(/intro/)` usa el patrón. `toHaveURL("/intro/")` pediría que la URL fuera exactamente el texto `/intro/`, barras incluidas. En la ruta Playwright se usa el patrón.
</details>

---

**[⬅ Volver al índice](../README.md)**
