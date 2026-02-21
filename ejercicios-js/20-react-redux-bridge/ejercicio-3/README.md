# Ejercicio 3 — Thunk crearPedido

**Tema 20 - React + Redux.** Enunciados en [javascript-guia/docs/20-react-redux-bridge.md](../../../javascript-guia/docs/20-react-redux-bridge.md), sección Mini-ejercicios.

## Enunciado

Implementa un thunk `crearPedido(pedido)` que dispare `"pedidos/creating"`, luego POST a `"/api/pedidos"`, y dispare `"pedidos/created"` con la respuesta o `"pedidos/error"` si falla.

Solución en la guía (sección Soluciones).

## Crear proyecto (opcional)

Para practicar con una app React+Redux en este directorio:

```bash
npm create vite@latest . -- --template react
npm install
npm install @reduxjs/toolkit react-redux
npm run dev
```

Puedes implementar el thunk y un slice con `extraReducers` para los casos pending/fulfilled/rejected.
