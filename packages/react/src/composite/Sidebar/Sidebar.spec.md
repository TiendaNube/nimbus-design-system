# Sidebar Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Sidebar shows a floating container that appears from a side of the screen, over a full-screen translucent background, for content related to the page.

- Use it for supplementary content or tasks that open from the side, composed with Sidebar.Header, Sidebar.Body and Sidebar.Footer.
- Use the `root` input when the Sidebar must be scoped to a specific container instead of covering the page.
- Do not use it for supplementary information anchored to a trigger; use Tooltip or Popover.

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Overlay | Yes | The full-screen translucent background behind the Sidebar while it is open. |
| Container | Yes | The side panel that holds `children`. |
| Header, Body, Footer | No | Composition parts provided as Sidebar.Header, Sidebar.Body and Sidebar.Footer. |

### Rules

- Overlay and container exist only while `open` is `true` (B-001).

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| `children` | Element | Yes | — | The content of the Sidebar. |
| `open` | boolean | No | `false` | Whether the Sidebar is shown (B-001). |
| `onRemove` | `() => void` | No | — | Called when the Sidebar requests to be closed (B-003). |
| `position` | `right` \| `left` | No | `right` | Side from which the Sidebar appears (B-002). |
| `maxWidth` | string or responsive object | No | `375px` | Maximum width of the container. |
| `padding` | padding token | No | `base` | Inner spacing of the container. |
| `needRemoveScroll` | boolean | No | `false` | Whether scroll removal wraps the Sidebar's children (B-006). |
| `closeOnOutsidePress` | boolean or `(event) => boolean` | No | `true` | Whether a press outside the container closes the Sidebar; a function receives the event and returns `true` to allow closing (B-003). |
| `ignoreAttributeName` | string | No | `data-nimbus-outside-press-ignore` | Outside presses on elements with this attribute do not close the Sidebar (B-003). |
| `root` | Element or `null` | No | — | Container in which the Sidebar is rendered instead of the default portaled path (B-005). |
| `zIndex` | z-index token or responsive object | No | — | Stack order of the Sidebar; when provided, the layer guarantee of B-004 does not apply. |

### Events

| Event | Payload | Trigger |
|---|---|---|
| `onRemove` | none | An allowed outside press occurs (B-003). |

### Actions

Not applicable — Sidebar exposes no imperative actions.

### API Rules

- Each input MUST have one clear responsibility.
- Inputs MUST represent supported use cases.
- Equivalent behaviors SHOULD NOT be exposed through competing inputs.
- Internal implementation details MUST NOT be part of the public API.
- Default values MUST be explicitly documented when applicable.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| `position` `right` (default) | Appears from the right side. | Default use. |
| `position` `left` | Appears from the left side. | When the content relates to the left side of the page. |
| Default portaled (`root` not provided) | Covers the page as a layer above page content. | Default use. |
| Scoped (`root` provided) | Renders inside the given container. | When the Sidebar must stay within a specific area. |

### Rules

- The layer guarantee of B-004 applies to the default portaled path when `zIndex` is not provided.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | `open` is `false` or not provided | Nothing is rendered (B-001). |
| Open | `open` is `true` | Overlay and container are shown with `children` (B-001), in the layer defined by B-004. |

---

## 6. Behavioral Contract

### B-001 - Open state

When `open` is `true`, the component MUST render the overlay and the container with `children`. When `open` is `false` or not provided, it MUST NOT render them.

### B-002 - Position

The container MUST appear on the side given by `position`, which is the right side when `position` is not provided.

### B-003 - Outside press

When the Sidebar is open, a press outside the container MUST call `onRemove` unless `closeOnOutsidePress` is `false`, `closeOnOutsidePress` is a function that returns `false` for that event, or the press targets an element with the `ignoreAttributeName` attribute.

### B-004 - Layer order

On the default portaled path, when `zIndex` is not provided, the Sidebar MUST appear above page content and below Tooltip, Toast and Popover floating content.

### B-005 - Scoped root

When `root` is provided, the component MUST render the overlay and the container inside that container. When `root` is `null`, it MUST behave as when `root` is not provided.

### B-006 - Scroll removal

When `needRemoveScroll` is `true`, scroll removal MUST wrap the Sidebar's children.

### B-007 - Theme and layer of the enclosing ThemeProvider

On the default portaled path, when the Sidebar is inside a ThemeProvider, the overlay and container MUST present that ThemeProvider's theme, and MUST NOT take the theme of, or be layered within, a ThemeProvider that does not contain the Sidebar, including when such a ThemeProvider elsewhere on the page contains an open or previously opened Sidebar.

---

## 7. Interaction Contract

### Pointer

- A press outside the container calls `onRemove` under the conditions in B-003.

### Keyboard

- No keyboard behavior is part of this contract.

### Touch

- No touch-specific behavior is part of this contract.

### Focus

- No focus movement or restoration is part of this contract.

---

## 8. Content Contract

### Labels

- Not applicable — the Sidebar adds no labels of its own.

### Supporting Content

- Content is composed with Sidebar.Header, Sidebar.Body and Sidebar.Footer.

### Icons

- Not applicable — the Sidebar adds no icons of its own.

### Long Content

- The container width is limited by `maxWidth`.

### Localization

- Not applicable — the Sidebar adds no visible text of its own.

---

## 9. Layout and Responsive Behavior

### Sizing

- The container is at most 375px wide unless `maxWidth` is provided.

### Alignment

- The container is aligned to the side given by `position` (B-002).

### Overflow

- Not applicable — no overflow guarantee is part of this contract.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| `maxWidth` given as a responsive object | The maximum width follows the breakpoint values provided. |

---

## 10. Composition Contract

### Supported Composition

- Sidebar.Header, Sidebar.Body and Sidebar.Footer inside the Sidebar.
- Tooltip and Popover inside a Sidebar appear above it (B-004).
- A Sidebar inside an application with more than one ThemeProvider (B-007).
- Regions marked with the `ignoreAttributeName` attribute do not close the Sidebar on outside press (B-003).

### Unsupported Composition

- Not applicable — no composition is excluded by this contract.

### Nesting Rules

- Layer order and theme are defined by B-004 and B-007 regardless of where on the page other ThemeProviders or floating components are mounted.

### Multiple Instances

- Each Sidebar follows B-004 and B-007 for its own position in the page, independently of other instances.

---

## 11. Accessibility Contract

### Semantics

- No ARIA role guarantee is part of this contract.

### Accessible Name

- Not applicable — no accessible name guarantee is part of this contract.

### Keyboard Access

- No keyboard guarantee is part of this contract (§7).

### Focus

- No focus guarantee is part of this contract (§7).

### Screen Reader Behavior

- No screen-reader announcement is part of this contract.

### Visual Accessibility

- The Sidebar uses its ThemeProvider's theme (B-007).

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| `open` not provided | Nothing is rendered (B-001). |
| `onRemove` not provided | Outside presses do not invoke any callback (B-003). |
| `root` is `null` | Same as the default portaled path (B-005). |
| `zIndex` provided | The layer guarantee of B-004 does not apply. |
| Another ThemeProvider elsewhere on the page contains an open Sidebar | The Sidebar keeps the theme and layer order of its own ThemeProvider (B-004, B-007). |

---

## 13. Acceptance Criteria

### AC-001 - Open state

**Given**
a Sidebar with `children` "My content"

**When**
`open` is `true`, and later `false`

**Then**
the overlay and "My content" are shown while `open` is `true`, and nothing is rendered while it is `false` (B-001).

---

### AC-002 - Position

**Given**
an open Sidebar without `position`, and another with `position` `left`

**When**
both are rendered

**Then**
the first appears from the right side and the second from the left side (B-002).

---

### AC-003 - Outside press

**Given**
an open Sidebar with `onRemove`, and an element with the `data-nimbus-outside-press-ignore` attribute outside it

**When**
the user presses outside with `closeOnOutsidePress` returning `true`, presses outside with it returning `false`, and presses the ignored element

**Then**
only the first press calls `onRemove` (B-003).

---

### AC-004 - Layer order

**Given**
an open Sidebar on the default portaled path without `zIndex`, holding a Tooltip or Popover

**When**
the floating content is shown

**Then**
the Sidebar is painted above page content and the floating content is painted above the Sidebar (B-004).

---

### AC-005 - Scoped root

**Given**
a container element passed as `root`, and another Sidebar with `root` `null`

**When**
both Sidebars are open

**Then**
the first renders its overlay and content inside the container, and the second renders as on the default portaled path (B-005).

---

### AC-006 - Not captured by another ThemeProvider

**Given**
an application wrapped in a ThemeProvider with the `base` theme, containing a side area wrapped in its own ThemeProvider with the `dark` theme that holds an open Sidebar on the default portaled path

**When**
a Sidebar on the default portaled path is opened outside the side area while that Sidebar remains open

**Then**
the Sidebar presents the `base` theme, is not layered within the side area's ThemeProvider, and is painted above page content (B-004, B-007).

---

### AC-007 - Theme within a single ThemeProvider

**Given**
a Sidebar on the default portaled path inside a ThemeProvider with the `dark` theme

**When**
the Sidebar is open

**Then**
the overlay and container present the `dark` theme (B-007).

---

### AC-008 - Scroll removal

**Given**
an open Sidebar with `needRemoveScroll` `true`

**When**
the Sidebar is rendered

**Then**
scroll removal wraps the Sidebar's children (B-006).

### Acceptance Criteria Rules

- Every normative behavior MUST be covered by at least one Acceptance Criterion.
- Each Acceptance Criterion MUST reference the behavior IDs (such as `B-001`) or exact contract sections it verifies.
- Acceptance Criteria MUST be testable.
- Acceptance Criteria MUST describe user- or consumer-observable outcomes.
- Acceptance Criteria MUST NOT refer to implementation details.
- Acceptance Criteria SHOULD cover core behavior, states, interactions, accessibility and relevant edge cases.

---

## 14. Origin of Guarantees

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001 | Supported | established | `open` ("Determines if the sidebar is shown or not"): https://nimbus.nuvemshop.com.br/es-AR/documentation/composite-components/sidebar#props; `packages/react/src/composite/Sidebar/src/sidebar.spec.tsx` ("should correctly render if open is true"; "should not render if open is false") at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-002 | B-002 | Supported | established | `position` ("Side from which the sidebar will appear"): sidebar#props; default `right` in `packages/react/src/composite/Sidebar/src/sidebar.types.ts` at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-003 | B-003 | Supported | established | `closeOnOutsidePress` ("Defaults to true for backward compatibility") and `ignoreAttributeName`: sidebar#props; `packages/react/src/composite/Sidebar/src/sidebar.spec.tsx` (closeOnOutsidePress function suite) |
| AC-004 | B-004 | Supported | established | Sidebar layer below Tooltip, Toast and Popover: https://nimbus.nuvemshop.com.br/es-AR/documentation/tokens/zIndex |
| AC-005 | B-005 | Supported | reconstructed | `root` JSDoc in `packages/react/src/composite/Sidebar/src/sidebar.types.ts` and `packages/react/src/composite/Sidebar/src/sidebar.spec.tsx` (root suite) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-006 | B-004, B-007 | Supported | established | Layer order as for AC-004. Theme: https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas |
| AC-007 | B-007 | Supported | established | https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas |
| AC-008 | B-006 | Supported | established | `needRemoveScroll` ("Determines if RemoveScroll wraps sidebar's children component"): sidebar#props |

---

## 15. Compatibility and Migration

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | No change. | §3 |
| Behavior and defaults | No change to defaults. On the default portaled path, theme and layer follow the Sidebar's own ThemeProvider when other ThemeProviders exist. | B-004, B-007 |
| Layout and content | No change. | §8, §9 |
| Accessibility and interactions | No change. | §7, §11 |
| Supported composition | The `root` path keeps its behavior. | B-005 |

- Backward compatibility: Inputs, defaults and the `root` path are unchanged.
- Migration required: No

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Render with `open` true and then false; overlay and content are present only while open. | `packages/react/src/composite/Sidebar/src/sidebar.stories.tsx` | `packages/react/src/composite/Sidebar/src/sidebar.spec.tsx` ("should correctly render if open is true"; "should not render if open is false") |
| AC-002 | B-002 | Render with default and `left` position; check the side of each container. | `packages/react/src/composite/Sidebar/src/sidebar.stories.tsx` | — |
| AC-003 | B-003 | Press outside with an allowing function, a rejecting function, and on an ignored element; only the first calls `onRemove`. | — | `packages/react/src/composite/Sidebar/src/sidebar.spec.tsx` (closeOnOutsidePress function suite) |
| AC-004 | B-004 | In a browser, open a Sidebar holding a Tooltip or Popover and show it; check the painted order. | — | — |
| AC-005 | B-005 | Open a Sidebar with a container `root` and one with `root` null; check where each is rendered. | — | `packages/react/src/composite/Sidebar/src/sidebar.spec.tsx` (root suite) |
| AC-006 | B-004, B-007 | Render a `base` ThemeProvider with a `dark` ThemeProvider side area holding an open default-path Sidebar, then open a second default-path Sidebar outside it; check that it is not a descendant of the side area's ThemeProvider, presents the `base` theme, and is painted above page content. | — | `packages/react/src/composite/Sidebar/src/sidebar.themeScope.spec.tsx` (nested ThemeProvider containment suite; DOM ancestry only) |
| AC-007 | B-007 | Open a default-path Sidebar inside a `dark` ThemeProvider; check that overlay and container present the `dark` theme. | — | `packages/react/src/composite/Sidebar/src/sidebar.themeScope.spec.tsx` (nested ThemeProvider containment suite; DOM ancestry only) |
| AC-008 | B-006 | Open a Sidebar with `needRemoveScroll` true; check that scroll removal wraps the children. | — | — |
