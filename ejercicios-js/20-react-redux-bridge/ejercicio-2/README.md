# Ejercicio 2 — Reducer counter

**Tema 20 - React + Redux.** Enunciados en [javascript-guia/docs/20-react-redux-bridge.md](../../../javascript-guia/docs/20-react-redux-bridge.md), sección Mini-ejercicios.

## Enunciado

Escribe un reducer que maneje las acciones `"counter/increment"` y `"counter/decrement"`. Estado inicial: `{ value: 0 }`.

Solución en la guía (sección Soluciones).

## Crear proyecto (opcional)

Para practicar con una app React+Redux en este directorio:

```bash
npm create vite@latest . -- --template react
npm install
npm install @reduxjs/toolkit react-redux
npm run dev
```

Implementa el reducer en el store y un componente que use `useSelector` y `dispatch` para el contador.
