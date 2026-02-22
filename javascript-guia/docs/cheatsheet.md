# Cheat sheet: tablas rápidas de métodos

**[⬅ Volver al índice](../README.md)**

---

## Arrays

| Método | Muta | Devuelve | Uso típico |
|--------|------|----------|------------|
| **push(...items)** | Sí | length | Añadir al final |
| **pop()** | Sí | elemento | Quitar del final |
| **shift()** | Sí | elemento | Quitar del inicio |
| **unshift(...items)** | Sí | length | Añadir al inicio |
| **splice(ini, elim?, ...items)** | Sí | array eliminados | Insertar/borrar en posición |
| **sort(compare?)** | Sí | mismo array | Ordenar (comparador) |
| **reverse()** | Sí | mismo array | Invertir |
| **fill(val, ini?, fin?)** | Sí | mismo array | Rellenar |
| **copyWithin(dest, start?, end?)** | Sí | mismo array | Copiar dentro |
| **slice(ini?, fin?)** | No | nuevo array | Subarray / copia |
| **concat(...vals)** | No | nuevo array | Concatenar |
| **includes(val)** | No | boolean | ¿Existe? (===) |
| **indexOf(val, desde?)** | No | índice o -1 | Primera posición |
| **find(fn)** | No | elem o undefined | Primer elem que cumple |
| **findIndex(fn)** | No | índice o -1 | Índice que cumple |
| **some(fn)** | No | boolean | ¿Alguno cumple? |
| **every(fn)** | No | boolean | ¿Todos cumplen? |
| **map(fn)** | No | nuevo array | Transformar cada elem |
| **filter(fn)** | No | nuevo array | Filtrar por condición |
| **reduce(fn, inicial?)** | No | valor acumulado | Reducir a un valor |
| **flat(n?)** | No | nuevo array | Aplanar n niveles |
| **flatMap(fn)** | No | nuevo array | map + flat(1) |
| **join(separador?)** | No | string | Unir en string |
| **forEach(fn)** | No | undefined | Iterar (sin valor de retorno útil) |
| **at(i)** | No | elemento | Como [i]; at(-1)=último |

**Firma callbacks (arrays):**  
`map`/`filter`/`find`/`some`/`every`/`forEach`: `(elem, índice?, array?) => …`  
`reduce`: `(acumulador, elem, índice?, array?) => nuevoAcumulador`; 2º arg = valor inicial.  
`sort`: `(a, b) => number` (negativo a antes b; positivo b antes a; 0 igual).

*Ejemplos completos y casos de uso: ver [cap. 5 - Arrays](05-arrays.md).*

---

## Strings

| Método | Devuelve | Caso típico |
|--------|----------|-------------|
| **toLowerCase()** | string | Normalizar para comparar |
| **toUpperCase()** | string | Mayúsculas |
| **trim()** | string | Quitar espacios extremos |
| **slice(ini?, fin?)** | string | Substring (fin no incluido) |
| **replace(patrón, reemplazo)** | string | Primera sustitución |
| **replaceAll(patrón, reemplazo)** | string | Todas las sustituciones |
| **split(separador)** | array | Dividir en array |
| **includes(substr)** | boolean | ¿Contiene? |
| **startsWith(substr)** | boolean | Prefijo |
| **endsWith(substr)** | boolean | Sufijo |
| **indexOf(substr, desde?)** | number | Primera posición (-1 si no) |
| **padStart(long, relleno?)** | string | Rellenar al inicio |
| **padEnd(long, relleno?)** | string | Rellenar al final |
| **repeat(n)** | string | Repetir n veces |

*Los strings son inmutables: ningún método modifica el original.*

*Ejemplos completos: ver [cap. 3 - Strings](03-strings.md).*

---

## Object

| Método / sintaxis | Devuelve / efecto | Caso típico |
|-------------------|-------------------|-------------|
| **Object.keys(obj)** | array de claves | Iterar claves propias |
| **Object.values(obj)** | array de valores | Iterar valores |
| **Object.entries(obj)** | array [clave, valor] | Iterar pares, Map/fromEntries |
| **Object.fromEntries(entries)** | objeto | Array de pares → objeto |
| **Object.assign(dest, ...origen)** | dest (muta dest) | Copiar propiedades |
| **Spread { ...obj }** | nuevo objeto | Copia/actualización inmutable |
| **Object.hasOwn(obj, key)** | boolean | ¿Propiedad propia? |
| **"key" in obj** | boolean | Propia o heredada |

*Ejemplos completos: ver [cap. 6 - Objetos](06-objects.md).*

---

## Promises

| Método / patrón | Comportamiento | Caso típico |
|-----------------|----------------|-------------|
| **new Promise(executor)** | Crea promesa; executor(resolve, reject) | Encapsular callback async |
| **then(onFulfilled?, onRejected?)** | Nueva promesa | Encadenar éxito/error |
| **catch(onRejected)** | Nueva promesa | Solo manejo de error |
| **finally(onFinally)** | Nueva promesa (mismo estado) | Limpiar siempre |
| **Promise.resolve(val)** | Promesa cumplida con val | Valor ya disponible |
| **Promise.reject(err)** | Promesa rechazada | Error conocido |
| **Promise.all(iterable)** | Cumple con array si todas ok; rechaza si una falla | Varias peticiones necesarias |
| **Promise.allSettled(iterable)** | Siempre cumple; array { status, value?/reason? } | Saber resultado de todas |
| **Promise.race(iterable)** | Primera que termina (éxito o error) | Timeout |
| **Promise.any(iterable)** | Primera que cumple; rechaza si todas fallan | Fallback entre fuentes |

*Encadenamiento:* un `.catch()` al final captura cualquier rechazo previo en la cadena. Usar siempre `.catch()` o try/catch con await para evitar unhandled rejection.

*Ejemplos completos: ver [cap. 12 - Promesas](12-promises.md) y [cap. 13 - Async/await](13-async-await.md).*

---

## Referencia rápida: mutar vs no mutar (Arrays)

**Mutadores (evitar en estado inmutable):** push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin.

**No mutadores (seguros para nuevo estado):** slice, concat, map, filter, reduce, flat, flatMap, includes, indexOf, find, findIndex, some, every, join.

---

**[⬅ Volver al índice](../README.md)**
