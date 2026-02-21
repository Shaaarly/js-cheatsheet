# Ejercicio 6 — Normalización

**Tema 20 - React + Redux.** Enunciados en [javascript-guia/docs/20-react-redux-bridge.md](../../../javascript-guia/docs/20-react-redux-bridge.md), sección Mini-ejercicios.

## Enunciado

Normaliza un array `[{ id: 1, name: "A" }, { id: 2, name: "B" }]` a la forma `{ byId: {}, ids: [] }`.

Datos de partida en `enunciado.js`. Solución en la guía (sección Soluciones).

## Crear proyecto (opcional)

Para practicar con una app React+Redux en este directorio:

```bash
npm create vite@latest . -- --template react
npm install
npm install @reduxjs/toolkit react-redux
npm run dev
```

Puedes guardar datos normalizados en un slice y usar selectores para leer por id.
