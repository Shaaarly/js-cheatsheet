# 24. Puente a Playwright

**[⬅ Volver al índice](../README.md)**

**Qué problema resuelve:** leer y escribir un test de Playwright con el JavaScript y el TypeScript de las rutas 3 y 4, y no confundir sus timeouts con `setTimeout`.

**Qué necesitas saber antes:** [async/await](13-async-await.md), [temporizadores](07b-temporizadores.md), desestructuración, clases, y los capítulos [22](22-typescript-fundamentos.md) y [23](23-typescript-funciones-clases.md).

Esto no es un curso de Playwright. La instalación, los navegadores y la configuración están en la [documentación oficial](https://playwright.dev/docs/intro). Aquí se traduce el lenguaje del test.

---

## Mini-índice del capítulo

1. [Un test](#1-un-test)
2. [Locator, no querySelector](#2-locator-no-queryselector)
3. [await y expect](#3-await-y-expect)
4. [Timeouts de Playwright](#4-timeouts-de-playwright)
5. [Page object mínimo](#5-page-object-mínimo)
6. [Checklist rápido](#6-checklist-rápido)
7. [Mini-ejercicios](#7-mini-ejercicios)
8. [Soluciones](#8-soluciones)

---

## 1. Un test

Playwright Test entrega una `page` nueva a cada test. No lanzas el navegador a mano. La función es `async` porque casi toda la API devuelve una promesa. `{ page }` es la desestructuración del capítulo de objetos: del argumento te quedas con la propiedad `page`.

```ts
import { test, expect } from "@playwright/test";

test("la portada tiene título", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await expect(page).toHaveTitle(/Playwright/);
});
```

Cómo se crea el proyecto (`npm init playwright@latest`), cómo se elige TypeScript y cómo se lanzan los tests (`npx playwright test`) está en [Installation](https://playwright.dev/docs/intro). Cómo se escribe el test, en [Writing tests](https://playwright.dev/docs/writing-tests).

`/Playwright/` es la regex del [capítulo 8b](08b-map-set-regex.md): el título encaja si contiene ese texto.

---

## 2. Locator, no querySelector

Un **locator** es una receta para encontrar un elemento en el momento de usarlo, no el elemento ya capturado. Por eso se puede reutilizar después de que la página cambie.

```ts
const enlace = page.getByRole("link", { name: "Get started" });
await enlace.click();
```

Orden recomendado por Playwright ([Locators](https://playwright.dev/docs/locators)): `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`, `getByTestId`. `locator("css")` es el último recurso.

`querySelector` (capítulo 15) guarda un nodo del DOM en ese instante. En un test se queda viejo en cuanto la página se vuelve a pintar. La ruta Playwright no necesita el capítulo de DOM para hacer clic.

---

## 3. await y expect

Las acciones (`goto`, `click`, `fill`) se esperan con `await`. Playwright ya espera a que el elemento se pueda usar; no hace falta un `setTimeout` antes del clic.

`expect` sobre un locator o sobre la página **reintenta** hasta que la condición se cumple o vence su plazo. También lleva `await`:

```ts
await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
```

Las comparaciones de valores que ya tienes en memoria no reintentan y no llevan `await`:

```ts
expect(2 + 2).toBe(4);
```

Usar `const texto = await locator.textContent()` y luego un `expect(texto).toBe("...")` pierde el reintento. La aserción de Playwright (`toHaveText`, `toBeVisible`, `toHaveURL`) es la que vuelve a mirar la página. Lista de aserciones: [Assertions](https://playwright.dev/docs/test-assertions).

---

## 4. Timeouts de Playwright

Son límites de tiempo del runner, no timers de JavaScript. Tabla según [Timeouts](https://playwright.dev/docs/test-timeouts):

| Límite | Por defecto | Para qué sirve | Cómo cambiarlo en un test |
|--------|-------------|----------------|---------------------------|
| Test | 30 s | Todo el test, incluidos los `await` | `test.setTimeout(120_000)` |
| Expect | 5 s | Cada aserción que reintenta | `toBeVisible({ timeout: 10_000 })` |
| Acción | sin límite | Cada `click`, `fill`, etc. | `locator.click({ timeout: 10_000 })` |
| Navegación | sin límite | `goto` y similares | `page.goto(url, { timeout: 30_000 })` |

El de la acción y el de la navegación se pueden fijar para todos los tests en la config (`actionTimeout`, `navigationTimeout`) o con `page.setDefaultTimeout(ms)` y `page.setDefaultNavigationTimeout(ms)`.

`test.setTimeout(30_000)` no programa una función. Si el test sigue en marcha al cumplirse el plazo, **falla**. `setTimeout(fn, 30_000)` sí programaría `fn`. Son palabras parecidas y APIs distintas. El capítulo [07b](07b-temporizadores.md) es el de la función programada.

`expect.poll` y `expect(...).toPass()` son otra espera con plazo propio, documentada en [Assertions](https://playwright.dev/docs/test-assertions). Sirven cuando compruebas algo que no es un locator (una respuesta HTTP, por ejemplo).

---

## 5. Page object mínimo

Una clase agrupa locators y acciones de una pantalla. Los métodos que tocan la página son `async` y devuelven `Promise<void>`. Tipos `Page` y `Locator`: se importan como tipo porque vienen de la librería.

```ts
import { expect, type Locator, type Page } from "@playwright/test";

export class InicioPage {
  readonly empezar: Locator;

  constructor(private readonly page: Page) {
    this.empezar = page.getByRole("link", { name: "Get started" });
  }

  async abrir(): Promise<void> {
    await this.page.goto("https://playwright.dev");
  }

  async irADocs(): Promise<void> {
    await this.empezar.click();
    await expect(this.page).toHaveURL(/intro/);
  }
}
```

El test construye la clase con la `page` del fixture:

```ts
import { test } from "@playwright/test";
import { InicioPage } from "./inicio-page";

test("abre la documentación", async ({ page }) => {
  const inicio = new InicioPage(page);
  await inicio.abrir();
  await inicio.irADocs();
});
```

Para no repetir `new InicioPage(page)` en cada test, Playwright deja registrar la clase como fixture. El genérico del capítulo 23 es este:

```ts
import { test as base } from "@playwright/test";
import { InicioPage } from "./inicio-page";

type Fixtures = { inicio: InicioPage };

export const test = base.extend<Fixtures>({
  inicio: async ({ page }, use) => {
    await use(new InicioPage(page));
  }
});

test("abre la documentación", async ({ inicio }) => {
  await inicio.abrir();
  await inicio.irADocs();
});
```

`use` separa la preparación (antes) de la limpieza (después). El patrón completo está en [Page object models](https://playwright.dev/docs/pom) y [Fixtures](https://playwright.dev/docs/test-fixtures).

---

## 6. Checklist rápido

- [ ] El test es `async ({ page }) => { ... }` y las acciones llevan `await`.
- [ ] Localizo con `getByRole` / `getByLabel` / `getByText`, no con `querySelector`.
- [ ] `await expect(locator)` reintenta. `expect(valorYaLeido)` no.
- [ ] El timeout del test (30 s) y el de `expect` (5 s) no son `setTimeout`.
- [ ] Un page object es una clase con `Page`, locators `readonly` y métodos `Promise<void>`.

---

## 7. Mini-ejercicios

1. Escribe un test que abra `https://playwright.dev` y compruebe que la URL encaja con `/playwright/`.
2. En ese test, localiza el enlace "Get started" por rol y haz clic. Comprueba que la URL encaja con `/intro/`.
3. ¿Cuál de estas líneas reintenta? `await expect(locator).toBeVisible()` o `expect(await locator.isVisible()).toBe(true)`.
4. El clic tarda más de lo habitual. Añade un timeout de 10 segundos **solo a ese clic**, sin cambiar el del test entero.
5. Pasa el clic y la comprobación de URL a un método `async irADocs(): Promise<void>` de una clase que reciba `page` en el constructor.

---

## 8. Soluciones

<details>
<summary>1. Título de URL</summary>

```ts
import { test, expect } from "@playwright/test";

test("url de portada", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await expect(page).toHaveURL(/playwright/);
});
```
</details>

<details>
<summary>2. Get started</summary>

```ts
import { test, expect } from "@playwright/test";

test("get started", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(page).toHaveURL(/intro/);
});
```
</details>

<details>
<summary>3. Cuál reintenta</summary>

`await expect(locator).toBeVisible()` reintenta hasta el timeout de expect.

`expect(await locator.isVisible()).toBe(true)` lee una sola vez y compara el booleano. Si en ese instante era `false`, el test falla sin volver a mirar.
</details>

<details>
<summary>4. Timeout del clic</summary>

```ts
await page.getByRole("link", { name: "Get started" }).click({ timeout: 10_000 });
```

Eso no cambia los 30 s del test ni los 5 s de `expect`.
</details>

<details>
<summary>5. Método en la clase</summary>

```ts
import { expect, type Page } from "@playwright/test";

export class InicioPage {
  constructor(private readonly page: Page) {}

  async irADocs(): Promise<void> {
    await this.page.getByRole("link", { name: "Get started" }).click();
    await expect(this.page).toHaveURL(/intro/);
  }
}
```
</details>

---

**[⬅ Volver al índice](../README.md)**
