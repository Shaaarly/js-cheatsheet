# Ejercicios adicionales

**[⬅ Volver al índice](../README.md)**

Colección de ejercicios extra por tema. Las soluciones están en **[solutions.md](solutions.md)**.

---

## Fundamentos y tipos

1. Escribe una función que reciba un número y devuelva "positivo", "negativo" o "cero" usando solo ternarios.
2. Dado un array de valores mixtos, devuelve un objeto con claves "numbers", "strings", "others" y valores arrays con los elementos de cada tipo.
3. Sin usar .filter(), implementa una función que reciba un array y un valor y devuelva un nuevo array sin ese valor (todas las ocurrencias).

---

## Arrays y objetos

4. Dado un array de pedidos `[{ id, total, estado }]`, devuelve el pedido con mayor total que esté en estado "pendiente", o null si no hay.
5. Implementa una función que reciba un objeto y un array de claves y devuelva un nuevo objeto solo con esas claves (si existen).
6. Aplana un array de profundidad arbitraria a un solo nivel (sin usar .flat()): ej. [1, [2, [3, 4]]] → [1, 2, 3, 4].

---

## Funciones y asincronía

7. Crea una función `pipe(...fns)` que reciba varias funciones y devuelva una función que aplique la primera al argumento, luego la segunda al resultado, etc.
8. Implementa `debounce(fn, ms)`: devuelve una función que, al llamarse, espere ms ms sin nuevas llamadas antes de ejecutar fn.
9. Escribe una función async que haga GET a una URL y reintente hasta 3 veces si falla (con 1s entre intentos), devolviendo el JSON o lanzando el último error.

---

## DOM y eventos

10. Dado un contenedor y un array de strings, renderiza una lista `<ul>/<li>` usando createElement; añade un listener por delegación que al hacer click en un li muestre su índice.
11. Crea un formulario (en HTML o por JS) con nombre y email; al enviar, prevén el default, valida que ambos tengan valor y muestra un mensaje de éxito o error en un div.

---

## Integración

12. Simula una API local con un array de pedidos en memoria. Implementa: (a) función que devuelva todos; (b) función que devuelva uno por id (promesa); (c) función que “actualice” un pedido (mutar el array local) y devuelva el pedido actualizado. Usa promesas con delay opcional para simular red.
13. Combina: fetch a una API pública (ej. JSONPlaceholder /posts), mostrar loading, renderizar títulos en una lista en el DOM, y manejar error con mensaje en pantalla.

---

**[⬅ Volver al índice](../README.md)**  
**Soluciones:** [solutions.md](solutions.md)
