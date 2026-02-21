# Ejercicio 5 — Selector suma totales

**Tema 20 - React + Redux.** Enunciados en [javascript-guia/docs/20-react-redux-bridge.md](../../../javascript-guia/docs/20-react-redux-bridge.md), sección Mini-ejercicios.

## Enunciado

Dado un estado con `state.pedidos.list` (array de objetos con `total`), escribe un selector puro que devuelva la suma de totales.

Datos de partida en `enunciado.js`. Solución en la guía (sección Soluciones).

## Crear proyecto (opcional)

Para practicar con una app React+Redux en este directorio:

```bash
npm create vite@latest . -- --template react
npm install
npm install @reduxjs/toolkit react-redux
npm run dev
```

Usa el selector con `useSelector` en un componente.

## Linter (obligatorio)

En el examen no puede haber ningún error de linter. Si creas el proyecto aquí, instala ESLint y pasa el linter sin errores:

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npx eslint --init
```

Elige: JavaScript, React, navegador. Añade `"lint": "eslint src/"` en `package.json`. Ejecuta `npm run lint` y corrige todos los errores.
