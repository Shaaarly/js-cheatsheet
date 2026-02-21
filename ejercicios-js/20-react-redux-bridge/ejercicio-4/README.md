# Ejercicio 4 — Reducer y mutación

**Tema 20 - React + Redux.** Enunciados en [javascript-guia/docs/20-react-redux-bridge.md](../../../javascript-guia/docs/20-react-redux-bridge.md), sección Mini-ejercicios.

## Enunciado

¿Por qué en un reducer no debes hacer `state.loading = true`?

Solución en la guía (sección Soluciones): porque mutas el estado; el reducer debe devolver un nuevo objeto.

## Crear proyecto (opcional)

Para practicar Redux en este directorio:

```bash
npm create vite@latest . -- --template react
npm install
npm install @reduxjs/toolkit react-redux
npm run dev
```
