# Ejercicios JS (fuera del repo)

Carpeta para practicar los ejercicios de la guía. **No está dentro del repositorio** `javascript-guia`, así que no se sube a GitHub.

## Datos iniciales

En **cada archivo de ejercicio** hay una sección **`--- Datos de partida ---`** con los arrays, objetos o variables que necesitas (pedidos, lineas, usuario, etc.). Así puedes trabajar de un ejercicio a otro sin cambiar de archivo. El archivo `datos-iniciales.md` queda como referencia por si quieres ver todos los bloques juntos.

## Estructura

- **01-basics** … **18-exam-mental-test**: 6 archivos por capítulo (`ejercicio-1.js` … `ejercicio-6.js`). Enunciados en `javascript-guia/docs/XX-nombre.md`, sección "Mini-ejercicios".
- **19-react-desde-cero**: **Ruta Pokedex:** `pokedex-app/` + [PLAN-POKEDEX.md](19-react-desde-cero/PLAN-POKEDEX.md). **Ejercicios sueltos:** cada uno en su directorio (`ejercicio-1-contador/`, `ejercicio-2-saludo-props/`, … `ejercicio-6-contador-limites/`); dentro de cada carpeta puedes crear el proyecto Vite. Ver `javascript-guia/docs/19-react-desde-cero.md`.
- **20-react-redux-bridge**: Cada ejercicio en su directorio (`ejercicio-1/` … `ejercicio-6/`); dentro puedes crear proyecto Vite+Redux. O migrar la Pokedex con la parte Redux de [PLAN-POKEDEX.md](19-react-desde-cero/PLAN-POKEDEX.md). Enunciados en `javascript-guia/docs/20-react-redux-bridge.md`, sección "Mini-ejercicios".
- **18-exam-mental-test**: 6 bloques (`bloque-1-variables-tipos-coercion.js` … `bloque-6-dom-eventos.js`). Cada archivo agrupa ~5 preguntas tipo examen.
- **extras**: 13 ejercicios de `javascript-guia/docs/exercises.md` (`ejercicio-01.js` … `ejercicio-13.js`).

## Cómo ejecutar

### Con Node (consola)

Desde la carpeta del archivo o desde la raíz:

```bash
node 01-basics/ejercicio-1.js
```

### DOM y eventos en el navegador

Los de **DOM** (15), **eventos** (16), **extras 10, 11, 13** y **bloque 6 del examen mental** necesitan un HTML que cargue el script y tenga los elementos que usa el ejercicio.

- **15-dom** y **16-events** tienen ya un `index.html` con una sección por ejercicio y los `id`/clases necesarios. Abre ese HTML en el navegador y en el propio archivo cambia el `<script src="ejercicio-X.js">` al ejercicio que estés haciendo.
- **Opción manual:** crea un `index.html` en la carpeta con los `id`/clases que pida el enunciado y `<script src="ejercicio-1.js"></script>`. Abre el HTML en el navegador (doble clic o arrastrar).
- **Con servidor local:** `npx serve .` o `npx serve 15-dom` y abre la URL en el navegador (útil si el ejercicio hace `fetch`).
- **VS Code / Cursor:** extensión “Live Server” → clic derecho en `index.html` → “Open with Live Server”.

Detalle y ejemplo de HTML mínimo en [javascript-guia/docs/solutions.md](../javascript-guia/docs/solutions.md) (sección “Cómo ejecutar y visualizar los ejercicios”).

### React (cap. 19)

```bash
npm create vite@latest mi-app -- --template react
cd mi-app && npm install && npm run dev
```

Abre la URL que indique Vite. Implementa los `.jsx` de esta carpeta en tu proyecto (p. ej. en `App.jsx` o en componentes en `src/`).

### React + Redux (cap. 20)

En el mismo proyecto React:

```bash
npm install @reduxjs/toolkit react-redux
npm run dev
```

### Comandos útiles

| Acción | Comando |
|--------|--------|
| Ejecutar .js | `node ruta/archivo.js` |
| Servidor estático | `npx serve .` |
| Crear React (Vite) | `npm create vite@latest mi-app -- --template react` |
| Instalar deps | `npm install` |
| Desarrollar React | `npm run dev` |

### Linter (ESLint, opcional)

En la raíz del proyecto:

```bash
npm init -y
npm install -D eslint
npx eslint --init
npx eslint .   # o npx eslint 15-dom
```

Más detalle en [solutions.md](../javascript-guia/docs/solutions.md).
