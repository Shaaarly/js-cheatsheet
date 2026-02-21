# Ejercicio 6 — Contador con límites

**Tema 19 - React desde cero.** Enunciados en [javascript-guia/docs/19-react-desde-cero.md](../../../javascript-guia/docs/19-react-desde-cero.md).

## Enunciado

**Contador con límites:** como el contador pero el valor no puede pasar de 0 ni de 10. Deshabilitar botones o no sumar/restar cuando ya estés en el límite. `useState` para el número; en los `onClick` comprobar antes de actualizar.

## Crear el proyecto Vite aquí

```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

Implementa el contador con límites 0 y 10 en `src/App.jsx`.

## Linter (obligatorio)

En el examen no puede haber ningún error de linter. Instala ESLint y pasa el linter sin errores:

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npx eslint --init
```

Elige: JavaScript, React, navegador. Añade `"lint": "eslint src/"` en `package.json`. Ejecuta `npm run lint` y corrige todos los errores.
