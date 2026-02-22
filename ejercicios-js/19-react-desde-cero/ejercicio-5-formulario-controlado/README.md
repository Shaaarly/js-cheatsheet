# Ejercicio 5 — Formulario controlado

**Tema 19 - React desde cero.** Enunciados en [javascript-guia/docs/19-react-desde-cero.md](../../../javascript-guia/docs/19-react-desde-cero.md).

## Enunciado

**Formulario controlado:** dos inputs (nombre, email) en estado; `onSubmit` que muestre por consola o en un `<p>` los valores. Usa `value={estado}` y `onChange` para cada input; `onSubmit` en el `<form>` con `e.preventDefault()`.

**En la guía:** [cap. 19](../../../javascript-guia/docs/19-react-desde-cero.md#5-eventos-y-formularios) — Eventos y formularios (ejemplo completo de formulario controlado).

## Crear el proyecto Vite aquí

```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

Implementa el formulario en `src/App.jsx`.

## Linter (obligatorio)

En el examen no puede haber ningún error de linter. Instala ESLint y pasa el linter sin errores:

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npx eslint --init
```

Elige: JavaScript, React, navegador. Añade `"lint": "eslint src/"` en `package.json`. Ejecuta `npm run lint` y corrige todos los errores.
