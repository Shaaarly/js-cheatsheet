# Cheatsheet: HTML y CSS en React

**[⬅ Volver al índice](../README.md)** · Relacionado: [Cap. 19 - React](19-react-desde-cero.md)

Referencia rápida para usar elementos HTML y estilos en componentes React sin equivocarte.

---

## 1. HTML en React: atributos que cambian

| En HTML | En React | Ejemplo |
|--------|----------|---------|
| `class` | `className` | `<div className="card">` |
| `for` (en `<label>`) | `htmlFor` | `<label htmlFor="nombre">Nombre</label>` |
| Estilos inline | Objeto `style={{ }}` | Ver sección CSS más abajo |

El resto de atributos suelen ser iguales (`id`, `type`, `name`, `placeholder`, `disabled`, `required`, etc.).

---

## 2. Formularios

- **Enviar:** usa `onSubmit` en el `<form>` y **evita** el envío por defecto con `e.preventDefault()`.
- **Inputs controlados:** enlaza valor y cambio con estado: `value={valor}` y `onChange={(e) => setValor(e.target.value)}`.
- **Botón de envío:** `<button type="submit">` dentro del form; si es solo un botón de acción (no enviar form), usa `type="button"`.

```jsx
function Formulario() {
  const [nombre, setNombre] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nombre });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

---

## 3. Datalist (sugerencias / autocompletado)

El elemento **`<datalist>`** se usa con un `<input>` para ofrecer sugerencias mientras el usuario escribe. En React funciona igual que en HTML:

1. El `<input>` tiene el atributo **`list`** con el **id** del datalist.
2. Un **`<datalist id="...">`** con el mismo id contiene varias **`<option value="...">`** (solo el atributo `value`; el texto visible suele ser el mismo).

```jsx
function BuscadorPokemon({ opciones }) {
  const [valor, setValor] = useState("");
  return (
    <>
      <input
        list="lista-pokemon"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Escribe un nombre..."
      />
      <datalist id="lista-pokemon">
        {opciones.map((nombre) => (
          <option key={nombre} value={nombre} />
        ))}
      </datalist>
    </>
  );
}
```

- **Importante:** el `id` del `<datalist>` debe coincidir con el valor de `list` del `<input>` (por ejemplo `list="lista-pokemon"` e `id="lista-pokemon"`).
- Las opciones pueden venir de un estado o de props (p. ej. nombres de Pokémon desde la API).

---

## 4. Otros elementos HTML útiles en React

| Elemento | Uso en React |
|----------|----------------|
| **`<label>`** | Asociar al input con `htmlFor="idDelInput"`; el `<input>` debe tener `id="idDelInput"`. |
| **`<select>`** | Controlado: `value={valor}` y `onChange={(e) => setValor(e.target.value)}`. Las opciones con `<option value="...">`. |
| **`<textarea>`** | En React se controla con `value` y `onChange` (no con hijos); mismo patrón que input de texto. |
| **`<input type="number">** | `value={numero}` (puede ser number o string según quieras); `onChange` para actualizar estado. |
| **`<input type="checkbox">** | `checked={booleano}` y `onChange={(e) => setChecked(e.target.checked)}`. |
| **`<input type="radio">** | Mismo `name` en el grupo; `checked={valor === opcion}` y `onChange` que ponga ese valor en el estado. |

---

## 5. CSS en React: objeto `style`

En JSX los estilos se pasan con un **objeto JavaScript**. Las propiedades CSS se escriben en **camelCase** y los valores suelen ser **strings** (con unidades cuando haga falta).

### Sintaxis

- Doble llave: la exterior es JSX `{ }`, la interior es el objeto: `style={{ ... }}`.
- **Propiedad:** camelCase. Ejemplos: `backgroundColor`, `fontSize`, `marginTop`, `borderRadius`.
- **Valor:** string. Ejemplos: `"10px"`, `"50%"`, `"1rem"`, `"red"`, `"#fff"`, `"hsl(200, 50%, 50%)"`.

```jsx
<div
  style={{
    backgroundColor: "hsl(200, 60%, 50%)",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "1rem",
  }}
>
  Contenido
</div>
```

### Valores dinámicos (variables o expresiones)

Puedes usar variables o expresiones dentro del objeto; para colores calculados (p. ej. HSL) usa template literals:

```jsx
const hue = 200;
const lightness = 70;
<div
  style={{
    backgroundColor: `hsl(${hue}, 50%, ${lightness}%)`,
    width: `${ancho}px`,
  }}
/>
```

### Varias propiedades

Escribe todas las propiedades en el mismo objeto; no uses `=` (eso es HTML), en JS es **`:`** entre nombre y valor y **`,`** entre propiedades.

```jsx
// ✅ Correcto
style={{ marginTop: "10px", padding: "8px" }}

// ❌ Incorrecto (HTML)
style="margin-top: 10px"
```

### Unidades

Siempre incluir la unidad en el string: `"10px"`, `"1rem"`, `"50%"`, `"0.5em"`. Números sueltos sin comillas solo en propiedades que lo permitan (p. ej. `flex: 1`, `opacity: 0.5`).

---

## 6. CSS en React: `className`

Para usar clases de un archivo `.css` o de Bootstrap:

- Atributo **`className`** (no `class`).
- Valor: string. Para varias clases: `"btn btn-primary"` o con template string si alguna es dinámica.

```jsx
<div className="card shadow-sm">
<p className={error ? "text-danger" : "text-muted"}>
<div className={`card ${activo ? "border-primary" : ""}`}>
```

### Clases condicionales (varias a la vez)

Puedes construir el string con un array y `.filter(Boolean).join(" ")` para no concatenar clases vacías:

```jsx
className={["btn", activo && "btn-active", disabled && "disabled"].filter(Boolean).join(" ")}
```

---

## 7. Resumen rápido

| Qué quieres | Cómo |
|-------------|------|
| Clase CSS | `className="mi-clase"` o `className={variable}` |
| Varias clases / condicional | `className={\`base ${condicion ? "extra" : ""}\`}` |
| Estilo inline | `style={{ prop: "valor" }}` (camelCase, valor string) |
| Estilo dinámico | `style={{ color: \`hsl(${h}, 50%, ${l}%)\` }}` |
| Label asociado a input | `<label htmlFor="id">` y `<input id="id">` |
| Enviar formulario | `<form onSubmit={handleSubmit}>` y `e.preventDefault()` |
| Sugerencias en input | `<input list="id">` + `<datalist id="id">` con `<option value="...">` |

---

**[⬅ Volver al índice](../README.md)**
