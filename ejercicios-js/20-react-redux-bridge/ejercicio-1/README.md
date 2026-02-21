# Ejercicio 1 — Inmutabilidad

**Tema 20 - React + Redux.** Enunciados en [javascript-guia/docs/20-react-redux-bridge.md](../../../javascript-guia/docs/20-react-redux-bridge.md), sección Mini-ejercicios.

## Enunciado

Dado un estado `{ items: [{ id: 1, qty: 2 }, { id: 2, qty: 1 }] }`, escribe la actualización **inmutable** para incrementar `qty` del item con id 2 en 1.

Datos de partida en `enunciado.js`. Solución en la guía (sección Soluciones).

## Crear proyecto (opcional)

Para practicar con una app React+Redux en este directorio:

```bash
npm create vite@latest . -- --template react
npm install
npm install @reduxjs/toolkit react-redux
npm run dev
```

Puedes implementar un reducer que use esta actualización inmutable.

## Linter (obligatorio)

En el examen no puede haber ningún error de linter. Si creas el proyecto Vite+Redux aquí, instala ESLint y pasa el linter sin errores:

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npx eslint --init
```

Elige: JavaScript, React, navegador. Añade `"lint": "eslint src/"` en `package.json`. Ejecuta `npm run lint` y corrige todos los errores.
