# Ejercicio 1 — Contador

**Tema 19 - React desde cero.** Enunciados en [javascript-guia/docs/19-react-desde-cero.md](../../../javascript-guia/docs/19-react-desde-cero.md).

## Enunciado

Mini app **Contador:** un número y botones +1 y -1. Usa `useState`. Implementa en tu `App.jsx` (o componente `Contador.jsx`).

## Crear el proyecto Vite aquí

Desde esta carpeta (o desde la carpeta padre):

```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

Si el directorio no está vacío, Vite preguntará si continuar; acepta. Luego implementa el contador en `src/App.jsx`.

## Linter (obligatorio)

En el examen no puede haber ningún error de linter. **Instala ESLint** en el proyecto y **pasa el linter sin errores** antes de dar el ejercicio por terminado:

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npx eslint --init
```

Elige: JavaScript, React, navegador. Añade en `package.json`: `"lint": "eslint src/"`. Ejecuta `npm run lint` y corrige todos los errores hasta que termine en verde.
