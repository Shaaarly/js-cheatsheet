# Ejercicio 2 — Saludo con props

**Tema 19 - React desde cero.** Enunciados en [javascript-guia/docs/19-react-desde-cero.md](../../../javascript-guia/docs/19-react-desde-cero.md).

## Enunciado

Componente que recibe la prop `nombre` y muestra "Hola, {nombre}". Uso: `<Saludo nombre="Ana" />`. Implementa en `Saludo.jsx` y úsalo desde `App.jsx`.

## Crear el proyecto Vite aquí

```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

Implementa el componente en `src/Saludo.jsx` y renderízalo desde `src/App.jsx`.

## Linter (obligatorio)

En el examen no puede haber ningún error de linter. Instala ESLint y pasa el linter sin errores:

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npx eslint --init
```

Elige: JavaScript, React, navegador. Añade `"lint": "eslint src/"` en `package.json`. Ejecuta `npm run lint` y corrige todos los errores.
