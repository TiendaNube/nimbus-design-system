# Validación técnica: Norte UI Nimbus Plan vs. estado del repositorio

> Análisis generado el 15 de abril de 2026.
> Contrasta las 25 semanas del plan contra `@nimbus-ds/tokens`, `@nimbus-ds/styles`, `@nimbus-ds/react` (29 atómicos + 14 composites) y las relaciones de dependencia entre paquetes.

---

## 1. Análisis de impacto por capa

### Tokens (`packages/core/tokens`)

El sistema de tokens tiene **dos niveles**: `ref.json` (primitivos) y `sys.json` (semánticos). Los tokens de `shape` referencian `spacing` con aliases `{spacing.*}`:

| Categoría en el plan (W1) | Estado en repo | Riesgo de colisión |
|---|---|---|
| Color | `color/ref.json` + `color/sys.json` | Alto — los nombres de path actuales (ej. `color.light.primary.surface`) se mapean directamente a CSS variables en `contract.css.ts`. Renombrar rutas rompe el contrato global. |
| Shadow | `shadow/ref.json` + `shadow/sys.json` | Medio — dark theme tiene valores propios de shadow, requiere actualización paralela. |
| Shape | `shape/sys.json` | **Crítico** — referencia `{spacing.*}` como alias. Si spacing cambia (no está en el plan), los shape tokens quedan desincronizados. |
| Typography | `typography/ref.json` + `typography/sys.json` | Alto — `Text` y `Title` atomics consumen tipografía directamente. Ninguno de los dos está en el plan. |
| Motion | `motion/sys.json` | Medio — hay un `globalStyle` en `globals.css.ts` para `prefers-reduced-motion` que actúa sobre todos los componentes. |

> **Espaciado no está en el plan**: `spacing/ref.json` alimenta `shape`, `box`, y la mayoría de los sprinkles. Si se modifica la escala de espaciado como parte del rediseño visual (aunque no esté explícito), es un cambio de nivel 0.

---

### Styles (`packages/core/styles`)

El archivo `contract.css.ts` es el **punto de falla único** más crítico del sistema. Define el nombre de cada CSS variable del sistema (`nimbus-colors-primary-surface`, etc.). Si cualquier token cambia su **path JSON** (no solo el valor), este contrato y los **45 archivos `nimbus-*.css.ts`** quedan inválidos simultáneamente.

Cadena de propagación:

```
token JSON path
  → contract.css.ts
    → globals.css.ts
      → nimbus-theme-dark/next/nextDark.css.ts
        → properties/css.ts
          → cada nimbus-[component].css.ts (×45)
```

`properties/css.ts` es el archivo que mapea tokens a valores permitidos en sprinkles y lo consumen prácticamente todos los componentes. No está mencionado en el plan como tarea explícita.

Los **tres archivos de tema alternativo** (`dark`, `next`, `next-dark`) deben actualizarse en paralelo a cualquier cambio de tokens. Tampoco aparecen en el plan.

---

### Componentes y patrones

#### Dependencias internas de atómicos que el plan modifica

| Componente | Importa de otros atómicos | ¿Está su dependencia en el plan antes? |
|---|---|---|
| `MultiSelect` (W2) | `Chip` | **No** — `Chip` está en W3. Inversión de orden. |
| `Toast` (W4) | `Spinner`, `Icon`, `Text` | `Spinner` **no está en el plan en ninguna semana**. |
| `Checkbox` (W3) | `Icon`, `Text` | `Text` no está en el plan. |
| `Chip` (W3) | `Icon`, `Text` | `Text` no está en el plan. |
| `Toggle` (W3) | `Text`, `Box` | `Text` y `Box` no están en el plan. |
| `Badge` (W3) | `Text` | `Text` no está en el plan. |
| `FileUploader` (W4) | `Icon`, `Text` | Parcialmente cubierto. |

#### Dependencias de composites sobre atómicos del plan

| Composite | Depende de atómico del plan | Semana del composite | Semana del atómico | Estado |
|---|---|---|---|---|
| `Pagination` (W12) | `Button` | W12 | W1 | ✅ Orden correcto |
| `TimePicker` (W13) | `Input` | W13 | W2 | ✅ Orden correcto |
| `TimePicker` (W13) | `ScrollPane` | W13 | W13 | ⚠️ Misma semana |
| `SplitButton` (W8) | `Popover` | W8 | W4 | ✅ Orden correcto |
| `Stepper` (W12) | `Card` (composite) | W12 | W10 | ✅ Orden correcto |

#### Composites que usan Text/Title directamente

`Alert`, `Accordion`, `Card`, `Modal`, `Sidebar`, `Stepper` usan `Title` y/o `Text` en su implementación principal. Si los tokens de tipografía cambian en W1 y `Text`/`Title` no se actualizan explícitamente, estos composites heredarán los valores viejos hasta que cada uno sea refactorizado semanas después.

---

## 2. Riesgos detectados

### 🔴 Crítico

**R1 — MultiSelect depende de Chip: inversión de orden**

`MultiSelect` (W2) importa `@nimbus-ds/chip` en su implementación de producción para renderizar ítems seleccionados. `Chip` se redesigna en W3. Cualquier cambio de API (props) en Chip obligará a retocar MultiSelect recién entregado.

---

**R2 — El contrato de tokens no tiene tarea propia**

`contract.css.ts` traduce los paths JSON de tokens a nombres de CSS variables para los 45 archivos de estilo. No existe en el plan una tarea de "actualizar contrato de estilos". Si cambia la estructura de paths en los tokens (ej. colores semánticos renombrados), todos los archivos de estilo fallan en compilación al mismo tiempo.

---

**R3 — Componentes planificados que no existen en el repo**

Los siguientes ítems del plan no tienen implementación React en el repositorio actual:

| Componente | Semana | Situación |
|---|---|---|
| `FormField` | W5 | No existe — creación desde cero |
| `InputChat` | W5 | No existe — creación desde cero |
| `Menu` | W7 | No existe — creación desde cero |
| `MenuButton` | W7 | No existe — creación desde cero |

Son **creaciones desde cero**, no refactorizaciones. La estimación para S3/S4 probablemente subestima el esfuerzo real.

---

### 🟠 Alto

**R4 — `Text`, `Title`, `Spinner`, `Box` no están en el plan: propagación automática de valores, pero con condición**

Los componentes que no están en el plan **recibirán automáticamente** los cambios de *valor* de tokens a través del sistema de CSS variables de Vanilla Extract — no necesitan tareas de rediseño explícitas para eso.

Sin embargo, el riesgo persiste en dos casos concretos:

- **Si cambia la estructura de paths de un token** (ej. renombrar `color.light.primary.surface` → `color.light.brand.surface`), `contract.css.ts` debe actualizarse manualmente. Eso afecta a *todos* los componentes simultáneamente, incluyendo los que no están en el plan.
- **Si se agregan tokens nuevos** que aún no existen en `properties/css.ts` (capa de sprinkles), esos valores no estarán disponibles en ningún componente hasta que se registren ahí, independientemente de si el componente está o no en el plan.

Si el rediseño solo modifica *valores* (colores, tamaños, curvas de animación) sin renombrar paths ni agregar nuevas claves de token, este riesgo queda neutralizado.

---

**R6 — `Collapsible` existe pero no está en el plan**

El composite `Collapsible` existe en el repo y tiene su propio paquete con estilos. Si patrones o templates del plan S10–S12 lo usan, quedará desincronizado visualmente del resto del sistema.

---

**R7 — Los tres temas alternativos requieren actualización paralela**

`nimbus-theme-dark.css.ts`, `nimbus-theme-next.css.ts`, `nimbus-theme-nextDark.css.ts` definen overrides para cada token modificado. No aparecen como tareas en ningún sprint. Sin actualizarlos, los cambios de tokens solo se verán en el tema base (light).

---

### 🟡 Medio

**R8 — `spacing/ref.json` no está en el plan pero `shape` lo referencia**

`shape/sys.json` usa aliases `{spacing.*}`. Si el rediseño de Shape implica cambiar la escala de espaciado, se necesita una tarea explícita de tokens de spacing. Sin ella, los shape tokens quedarán apuntando a valores de spacing no actualizados.

---

**R9 — `properties/css.ts` en `@nimbus-ds/styles` no tiene tarea asignada**

Este archivo es la capa central que traduce tokens a valores permitidos en sprinkles para todos los componentes. Cualquier token nuevo (color, motion, shape, shadow) requiere una entrada aquí. Si no se actualiza, los nuevos valores de token no estarán disponibles para uso en los componentes.

---

**R10 — `TimePicker` y `ScrollPane` están en la misma semana (W13)**

`TimePicker` depende de `ScrollPane` en su implementación. Deben entregarse en estricto orden dentro de la misma semana: ScrollPane primero.

---

**R11 — `Box` no está en el plan: válido solo si se agregan nuevos tokens**

`Box` usa rainbow-sprinkles con casi todas las categorías de tokens. Los cambios de *valor* en tokens existentes se propagarán automáticamente. El riesgo aplica únicamente si el rediseño introduce **nuevas claves de token** (ej. un nuevo nivel de shadow o una nueva escala de spacing) que deben registrarse manualmente en `properties/css.ts` para quedar disponibles como props de Box.

---

## 3. Evaluación de sentido del orden de ejecución

El plan **tiene correcto el principio** de colocar tokens antes que componentes, y los composites después de los atómicos de los que dependen. Sin embargo, hay cuatro problemas de secuencia concretos:

| Problema | Impacto |
|---|---|
| No hay una fase de "infraestructura de estilos" antes de los componentes | Los cambios de tokens no se propagan automáticamente; alguien debe actualizar `contract.css.ts`, `globals.css.ts` y `properties/css.ts` primero. |
| `Chip` después de `MultiSelect` | Fuerza un retrabajo de MultiSelect en W3. |
| `Spinner` ausente del plan | Bloquea la entrega consistente de Toast en W4. |
| `Text`/`Title` sin tarea | Crea deuda visual desde W1 que se arrastra hasta W10+. |

---

## 4. Sugerencia de orden de ejecución

### Fase 0 — Infraestructura de tokens y estilos *(pre-S1 o inicio de S1)*
> Sin esta fase, ningún cambio de token se propaga correctamente.

1. Actualizar `contract.css.ts` con nuevos paths/nombres de tokens (si cambian estructuralmente)
2. Actualizar `globals.css.ts` — mapeo tokens → `:root`
3. Actualizar `properties/css.ts` — nuevos valores en sprinkle maps
4. Actualizar los tres temas alternativos: `dark`, `next`, `next-dark`
5. Revisar `spacing/ref.json` si el rediseño requiere nueva escala

---

### Fase 1 — Tokens primitivos y atomics foundation *(S1/W1)*

6. Tokens: Color, Shadow, Shape, Typography, Motion (JSON source)
7. **`Text` y `Title`** — actualizar con nuevos tokens de tipografía *(agregar al plan)*
8. **`Icon`** atomic — validar con nuevos tokens de color
9. **`Box`** — validar rainbow-sprinkles contra nuevos tokens *(agregar al plan)*
10. `Button` + `IconButton`

---

### Fase 2 — Form inputs *(S1/W2)*

11. **`Spinner`** — *(mover aquí desde su posición ausente, requerido por Toast)*
12. `Input`, `Textarea`, `Select`
13. **`Chip`** — *(adelantar desde W3, requerido por MultiSelect)*
14. `MultiSelect` — *(después de Chip)*

---

### Fase 3 — Selection + Feedback restante *(S2/W3)*

15. `Badge`, `Checkbox`, `Radio`, `Tag`, `Toggle`

---

### Fase 4 — Feedback + Media + Overlay *(S2/W4)*

16. `FileUploader`, `Popover`, `ProgressBar`, `Thumbnail`, `Tooltip`
17. `Toast` — *(Spinner ya disponible)*

---

### Fase 5+ — Patrones y composites *(S3–S12)*

El orden del S3 en adelante es correcto en términos de dependencias composites→patrones→templates. Ajustes necesarios:

- Agregar tareas de **creación** (no solo rediseño) para `FormField`, `InputChat`, `Menu`, `MenuButton`
- Agregar `Collapsible` al plan (sugerido en S4 o S5)
- En W13: asegurar que `ScrollPane` se complete antes de `TimePicker` dentro de la misma semana

---

## Resumen ejecutivo

| Aspecto | Estado |
|---|---|
| Dirección general del plan | ✅ Correcta |
| Tokens antes que componentes | ✅ Correcto |
| Orden composites → patrones → templates | ✅ Correcto |
| Fase de infraestructura de estilos | ❌ Ausente |
| Inversión MultiSelect → Chip | ❌ Error de orden |
| Componentes sin existencia en repo | ❌ 4 componentes subestimados |
| Dependencias silenciosas (Text, Title, Spinner, Box) | ✅ Se propagan automáticamente vía CSS variables (riesgo solo si cambian paths o se agregan tokens nuevos) |
| Temas dark/next sin actualización | ⚠️ Sin tareas asignadas |
