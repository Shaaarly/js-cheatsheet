# Ejercicio 4 — Lista desde PokeAPI

**Tema 19 - React desde cero.** Enunciado en [javascript-guia/docs/19-react-desde-cero.md](../../../javascript-guia/docs/19-react-desde-cero.md) (ejercicio 4 y sección "Mini apps"). Solución en [solutions.md](../../../javascript-guia/docs/solutions.md) (Tema 19).

**Errores frecuentes:** botón que no dispara el fetch (invocar la función en onClick: `onClick={() => pedirPokemons(n)}`); lista vacía por `setList[data.results]` en vez de `setList(data.results)`; map sin devolver JSX; key con setState (bucle infinito); loading que no se quita (usar `.finally(() => setLoading(false))`); hooks fuera del componente. Detalle en el cap. 19 de la guía, apartado "Lista PokeAPI" y consejos.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
