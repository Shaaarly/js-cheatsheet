# Pokedex — Proyecto único (Tema 19 + Tema 20)

Mini app tipo Pokedex construida paso a paso: **Tema 19** en React (lista, detalle, búsqueda con PokeAPI) y **Tema 20** migrando a Redux en el mismo proyecto.

## Cómo empezar

1. **Crear el proyecto Vite** (desde la carpeta padre `19-react-desde-cero/`):

   ```bash
   npm create vite@latest pokedex-app -- --template react
   cd pokedex-app
   npm install
   ```

2. **Añadir Bootstrap:**

   ```bash
   npm install react-bootstrap bootstrap
   ```

   En `src/main.jsx` añade antes de tu App:

   ```js
   import 'bootstrap/dist/css/bootstrap.min.css';
   ```

   (Opcional: en lugar de react-bootstrap, puedes enlazar solo el CSS de Bootstrap por CDN en `index.html` y usar las clases en el markup.)

3. **Seguir el plan:** Abre [../PLAN-POKEDEX.md](../PLAN-POKEDEX.md) y haz los pasos en orden. Los pasos 1–6 corresponden al **Tema 19 (React)**; los pasos 7–12 (sección "Tema 20 — Redux") se hacen en este mismo proyecto añadiendo Redux.

4. **Arrancar en desarrollo:**

   ```bash
   npm run dev
   ```

## Estructura

- Un solo proyecto en esta carpeta.
- Tema 19: componentes, estado (useState/useEffect), lista desde PokeAPI, PokemonCard, detalle, búsqueda, UI con Bootstrap.
- Tema 20: mismo código, añadiendo store, slices, thunks y selectores de Redux.

Enunciados detallados de cada paso: [PLAN-POKEDEX.md](../PLAN-POKEDEX.md).
