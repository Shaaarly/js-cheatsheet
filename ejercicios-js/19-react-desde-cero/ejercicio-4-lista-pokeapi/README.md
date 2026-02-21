# Ejercicio 4 — Lista desde PokeAPI

**Tema 19 - React desde cero.** Enunciados en [javascript-guia/docs/19-react-desde-cero.md](../../../javascript-guia/docs/19-react-desde-cero.md).

## Enunciado

Lista desde **PokeAPI:** `useEffect` que hace fetch al endpoint; estado para lista y loading; mostrar nombres (y opcionalmente imagen con la URL del sprite que devuelve la API).

**API:** `https://pokeapi.co/api/v2/pokemon?limit=10` → `data.results` (cada uno tiene `name`, `url`; la url lleva al detalle con sprites).

## Crear el proyecto Vite aquí

```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

Implementa el fetch en `useEffect` y el estado (lista, loading) en tu componente.
