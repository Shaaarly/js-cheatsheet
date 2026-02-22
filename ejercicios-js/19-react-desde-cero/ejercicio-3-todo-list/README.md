# Ejercicio 3 — Todo list

**Tema 19 - React desde cero.** Enunciados en [javascript-guia/docs/19-react-desde-cero.md](../../../javascript-guia/docs/19-react-desde-cero.md).

## Enunciado

**Todo list:** estado con array de tareas; input + botón para añadir; lista con `key` por id; opción de marcar completada o borrar. Cada tarea: `{ id, texto, completada }`. Generar id con `Date.now()` o `crypto.randomUUID()` o un contador. Implementa en `App.jsx` o `TodoList.jsx`.

**En la guía:** [cap. 19](../../../javascript-guia/docs/19-react-desde-cero.md) — [Estado con useState](../../../javascript-guia/docs/19-react-desde-cero.md#4-estado-con-usestate), [Listas y keys](../../../javascript-guia/docs/19-react-desde-cero.md#7-listas-y-keys), [Mini apps - Todo list](../../../javascript-guia/docs/19-react-desde-cero.md#8-mini-apps-para-practicar).

## Crear el proyecto Vite aquí

```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

Implementa la lista de tareas en `src/App.jsx` o en un componente `src/TodoList.jsx`.

## Linter (obligatorio)

En el examen no puede haber ningún error de linter. Instala ESLint y pasa el linter sin errores:

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npx eslint --init
```

Elige: JavaScript, React, navegador. Añade `"lint": "eslint src/"` en `package.json`. Ejecuta `npm run lint` y corrige todos los errores.
