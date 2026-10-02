# Modal Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Modal shows content in a dialog layer above the page, for tasks or information that require the user's attention before returning to the page.

- Use it for focused content that interrupts the page, composed with Modal.Header, Modal.Body and Modal.Footer.
- Use the `root` input when the Modal must be scoped to a specific container instead of covering the page.
- Do not use it for supplementary information anchored to a trigger; use Tooltip or Popover.

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Overlay | Yes | The backdrop behind the Modal container while it is open. |
| Container | Yes | The dialog surface that holds `children`. |
| Header, Body, Footer | No | Composition parts provided as Modal.Header, Modal.Body and Modal.Footer. |
| Dismiss button | No | The built-in close (X) button, rendered when `onDismiss` is provided and `renderDismissButton` is not `false`. |

### Rules

- Overlay and container exist only while `open` is `true` (B-001).
- The dismiss button exists only when `onDismiss` is provided and `renderDismissButton` is not `false` (B-002).

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| `children` | Element | Yes | — | The content of the Modal. |
| `open` | boolean | Yes | — | Whether the Modal is open (B-001). |
| `onDismiss` | `(open: boolean) => void` | No | — | Called when the Modal requests to be closed (B-002, B-003, B-004). |
| `portalId` | string | No | — | Id given to the portal element on the default portaled path (B-008). |
| `root` | Element or `null` | No | — | Container in which the Modal is rendered instead of the default portaled path (B-007). |
| `closeOnOutsidePress` | boolean or `(event) => boolean` | No | `true` | Whether a press outside the container closes the Modal; a function receives the event and returns `true` to allow closing (B-004). |
| `ignoreAttributeName` | string | No | `data-nimbus-outside-press-ignore` | Outside presses on elements with this attribute do not close the Modal (B-004). |
| `padding` | `base` \| `none` \| `small` | No | `base` | Inner spacing of the container. |
| `maxWidth` | string or responsive object | No | `{ xs: "100%", md: "500px" }` | Maximum width of the container. |
| `renderDismissButton` | boolean | No | `true` | Whether the built-in dismiss button renders; only effective when `onDismiss` is provided (B-002). |
| `zIndex` | `base` \| `top` | No | `base` | Stacking layer of the Modal (B-005). |

### Events

| Event | Payload | Trigger |
|---|---|---|
| `onDismiss` | `false` | The dismiss button is activated, Escape is pressed, or an allowed outside press occurs (B-002, B-003, B-004). |

### Actions

Not applicable — Modal exposes no imperative actions.

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
| Default portaled (`root` not provided) | Covers the page as a layer above page content. | Default use. |
| Scoped (`root` provided) | Renders inside the given container. | When the Modal must stay within a specific area. |
| `zIndex` `base` (default) | Standard modal layer. | Default use. |
| `zIndex` `top` | Layer above all floating components. | Reserved for Modal when it must appear above tooltips, toasts and popovers; only on the default portaled path. |

### Rules

- `zIndex` `top` has no effect when `root` is provided (B-005).

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | `open` is `false` | Nothing is rendered (B-001). |
| Open | `open` is `true` | Overlay and container are shown with `children` (B-001), in the layer defined by B-005. |

---

## 6. Behavioral Contract

### B-001 - Open state

When `open` is `true`, the component MUST render the overlay and the container with `children`. When `open` is `false`, it MUST NOT render them.

### B-002 - Dismiss button

When `onDismiss` is provided and `renderDismissButton` is not `false`, the component MUST render a dismiss (X) button, and activating it MUST call `onDismiss(false)`.
When `renderDismissButton` is `false`, or `onDismiss` is not provided, the dismiss button MUST NOT be rendered.

### B-003 - Escape

When the Modal is open and `onDismiss` is provided, pressing Escape MUST call `onDismiss(false)`, whether or not the dismiss button is rendered.
When `onDismiss` is not provided, pressing Escape MUST NOT close the Modal.

### B-004 - Outside press

When the Modal is open and `onDismiss` is provided, a press outside the container MUST call `onDismiss(false)` unless `closeOnOutsidePress` is `false`, `closeOnOutsidePress` is a function that returns `false` for that event, or the press targets an element with the `ignoreAttributeName` attribute.

### B-005 - Layer order

On the default portaled path, a Modal with `zIndex` `base` MUST appear above page content and below Tooltip, Toast and Popover floating content. A Modal with `zIndex` `top` MUST appear above all floating components. When `root` is provided, `zIndex` `top` MUST have no effect.

### B-006 - Theme and layer of the enclosing ThemeProvider

On the default portaled path, when the Modal is inside a ThemeProvider, the overlay and container MUST present that ThemeProvider's theme, and MUST NOT take the theme of, or be layered within, a ThemeProvider that does not contain the Modal, including when such a ThemeProvider elsewhere on the page contains an open or previously opened Modal.

### B-007 - Scoped root

When `root` is provided, the component MUST render the overlay and the container inside that container. When `root` is `null`, it MUST behave as when `root` is not provided.

### B-008 - Portal identifier

On the default portaled path, when `portalId` is provided, the Modal MUST be rendered inside a portal element with that id.

---

## 7. Interaction Contract

### Pointer

- Activating the dismiss button calls `onDismiss(false)` (B-002).
- A press outside the container calls `onDismiss(false)` under the conditions in B-004.

### Keyboard

- Escape: listened at the document level while the Modal is open and `onDismiss` is provided; calls `onDismiss(false)` (B-003). This contract does not define whether the event's propagation is stopped or its default action prevented, and defines no outcome for other components that handle Escape while the Modal is open.
- The dismiss button is reachable as a button control when it is rendered (B-002).

### Touch

- No touch-specific behavior is part of this contract.

### Focus

- No focus movement or restoration is part of this contract.

---

## 8. Content Contract

### Labels

- The dismiss button is the only control the Modal adds; its icon is the X close icon (B-002).

### Supporting Content

- Content is composed with Modal.Header, Modal.Body and Modal.Footer.

### Icons

- The dismiss button shows the close (X) icon.

### Long Content

- The container width is limited by `maxWidth`.

### Localization

- Not applicable — the Modal adds no visible text of its own.

---

## 9. Layout and Responsive Behavior

### Sizing

- The container is at most 100% of the viewport width on small screens and 500px from the medium breakpoint, unless `maxWidth` is provided.

### Alignment

- Not applicable — no alignment guarantee beyond B-001 and B-007 is part of this contract.

### Overflow

- Not applicable — no overflow guarantee is part of this contract.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| `maxWidth` default | 100% up to the medium breakpoint, 500px from it. |
| `maxWidth` given as a responsive object | The maximum width follows the breakpoint values provided. |

---

## 10. Composition Contract

### Supported Composition

- Modal.Header, Modal.Body and Modal.Footer inside the Modal.
- Tooltip and Popover inside a Modal on its `base` layer appear above the Modal (B-005).
- A Modal inside an application with more than one ThemeProvider (B-006).
- Regions marked with the `ignoreAttributeName` attribute, such as a chat, do not close the Modal on outside press (B-004).

### Unsupported Composition

- `zIndex` `top` together with `root` (B-005).

### Nesting Rules

- Layer order and theme are defined by B-005 and B-006 regardless of where on the page other ThemeProviders or floating components are mounted.

### Multiple Instances

- Each Modal follows B-005 and B-006 for its own position in the page, independently of other instances.

---

## 11. Accessibility Contract

### Semantics

- This contract defines no ARIA role beyond the dismiss button being a button (B-002).

### Accessible Name

- Not applicable — no accessible name guarantee is part of this contract.

### Keyboard Access

- Escape is defined by B-003.

### Focus

- No focus guarantee is part of this contract (§7).

### Screen Reader Behavior

- No screen-reader announcement is part of this contract.

### Visual Accessibility

- The Modal uses its ThemeProvider's theme (B-006).

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| `onDismiss` not provided | No dismiss button; Escape and outside presses do not close the Modal (B-002, B-003, B-004). |
| `renderDismissButton` `false` with `onDismiss` | No dismiss button; Escape still calls `onDismiss(false)` (B-002, B-003). |
| `root` is `null` | Same as the default portaled path (B-007). |
| `zIndex` `top` with `root` | `top` has no effect (B-005). |
| Another ThemeProvider elsewhere on the page contains an open Modal | The Modal keeps the theme and layer order of its own ThemeProvider (B-005, B-006). |

---

## 13. Acceptance Criteria

### AC-001 - Open state

**Given**
a Modal with `children` "My content"

**When**
`open` is `true`, and later `false`

**Then**
"My content" is shown while `open` is `true` and nothing is rendered while it is `false` (B-001).

---

### AC-002 - Dismiss button

**Given**
an open Modal with `onDismiss`

**When**
the user activates the dismiss button

**Then**
`onDismiss(false)` is called (B-002).

---

### AC-003 - Dismiss button presence

**Given**
an open Modal with `onDismiss` and `renderDismissButton` not set, one with `renderDismissButton` `false`, and one without `onDismiss`

**When**
each Modal is rendered

**Then**
only the first renders the dismiss button (B-002).

---

### AC-004 - Escape

**Given**
an open Modal with `onDismiss` and `renderDismissButton` `false`, and an open Modal without `onDismiss`

**When**
the user presses Escape on each

**Then**
the first calls `onDismiss`, and the second stays open (B-003).

---

### AC-005 - Outside press

**Given**
an open Modal with `onDismiss`, and an element with the `data-nimbus-outside-press-ignore` attribute outside it

**When**
the user presses outside with `closeOnOutsidePress` returning `true`, presses outside with it returning `false`, and presses the ignored element

**Then**
only the first press calls `onDismiss(false)` (B-004).

---

### AC-006 - Layer order

**Given**
an open Modal on the default portaled path with `zIndex` not set, and another with `zIndex` `top`

**When**
a Tooltip or Popover inside each Modal is shown

**Then**
the `base` Modal is painted above page content and below the floating content, and the `top` Modal is painted above all floating components (B-005).

---

### AC-007 - Not captured by another ThemeProvider

**Given**
an application wrapped in a ThemeProvider with the `base` theme, containing a side area wrapped in its own ThemeProvider with the `dark` theme that holds an open Modal on the default portaled path

**When**
a Modal on the default portaled path is opened outside the side area while that Modal remains open

**Then**
the Modal presents the `base` theme, is not layered within the side area's ThemeProvider, and is painted above page content (B-005, B-006).

---

### AC-008 - Scoped root

**Given**
a container element passed as `root`, and another Modal with `root` `null`

**When**
both Modals are open

**Then**
the first renders its overlay and content inside the container, and the second renders its content as on the default portaled path (B-007).

---

### AC-009 - Portal identifier

**Given**
an open Modal on the default portaled path with `portalId` "my-portal"

**When**
the Modal is rendered

**Then**
its container is a descendant of an element whose id is "my-portal" (B-008).

---

### AC-010 - Padding

**Given**
open Modals with `padding` not set, `none`, `base` and `small`

**When**
each Modal is rendered

**Then**
the container uses `base` spacing by default and otherwise the requested spacing (§3 Public API).

---

### AC-011 - Theme within a single ThemeProvider

**Given**
a Modal on the default portaled path inside a ThemeProvider with the `dark` theme

**When**
the Modal is open

**Then**
the overlay and container present the `dark` theme (B-006).

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
| AC-001 | B-001 | Supported | established | `open` ("Whether the modal is open or not"): https://nimbus.nuvemshop.com.br/es-AR/documentation/composite-components/modal#props; `packages/react/src/composite/Modal/src/modal.spec.tsx` ("should correctly render the submitted content") at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-002 | B-002 | Supported | reconstructed | `packages/react/src/composite/Modal/src/modal.spec.tsx` ("should correctly call the onDismiss function when closing the modal") and `packages/react/src/composite/Modal/README.md` (close via the X button) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-003 | B-002 | Supported | established | `renderDismissButton` ("Only takes effect when `onDismiss` is provided"): modal#props; `packages/react/src/composite/Modal/src/modal.spec.tsx` (renderDismissButton suite) |
| AC-004 | B-003 | Supported | reconstructed | `packages/react/src/composite/Modal/src/modal.spec.tsx` ("still dismisses via Escape when the button is hidden"; "should not close the modal if the close function is not provided") and `packages/react/src/composite/Modal/README.md` (ESC) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-005 | B-004 | Supported | established | `closeOnOutsidePress` and `ignoreAttributeName`: modal#props; `packages/react/src/composite/Modal/src/modal.spec.tsx` (closeOnOutsidePress function suite) |
| AC-006 | B-005 | Supported | established | `zIndex` ("base": above the page, below floating components like tooltip/toast/popover; "top": above all other floating components, reserved for Modal, no effect with `root`): https://nimbus.nuvemshop.com.br/es-AR/documentation/composite-components/modal#props; https://nimbus.nuvemshop.com.br/es-AR/documentation/tokens/zIndex |
| AC-007 | B-005, B-006 | Supported | established | Layer order as for AC-006. Theme: https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas |
| AC-008 | B-007 | Supported | established | Con root example ("This modal renders inside the provided root"): https://nimbus.nuvemshop.com.br/es-AR/documentation/composite-components/modal#example-con-root; `packages/react/src/composite/Modal/src/modal.spec.tsx` (root suite) |
| AC-009 | B-008 | Supported | established | `portalId` ("Id to be embedded in the portal element"): modal#props |
| AC-010 | §3 Public API | Supported | reconstructed | `packages/react/src/composite/Modal/src/modal.spec.tsx` (padding suite) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-011 | B-006 | Supported | established | https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas |

---

## 15. Compatibility and Migration

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | No change. | §3 |
| Behavior and defaults | No change to defaults. On the default portaled path, theme and layer follow the Modal's own ThemeProvider when other ThemeProviders exist. | B-005, B-006 |
| Layout and content | No change. | §8, §9 |
| Accessibility and interactions | No change. | §7, §11 |
| Supported composition | The `root` path and `portalId` keep their behavior. | B-007, B-008 |

- Backward compatibility: Inputs, defaults, `portalId` and the `root` path are unchanged.
- Migration required: No

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Render with `open` true and then false; content is present only while open. | `packages/react/src/composite/Modal/src/modal.stories.tsx` | `packages/react/src/composite/Modal/src/modal.spec.tsx` ("should correctly render the submitted content") |
| AC-002 | B-002 | Activate the dismiss button; `onDismiss(false)` is called. | — | `packages/react/src/composite/Modal/src/modal.spec.tsx` ("should correctly call the onDismiss function when closing the modal") |
| AC-003 | B-002 | Render the three configurations; only the first has the dismiss button. | — | `packages/react/src/composite/Modal/src/modal.spec.tsx` (renderDismissButton suite; "should not close the modal if the close function is not provided") |
| AC-004 | B-003 | Press Escape with `onDismiss` and hidden button, and without `onDismiss`; check the callback and the open content. | — | `packages/react/src/composite/Modal/src/modal.spec.tsx` ("still dismisses via Escape when the button is hidden"; "should not close the modal if the close function is not provided") |
| AC-005 | B-004 | Press outside with an allowing function, a rejecting function, and on an ignored element; only the first calls `onDismiss(false)`. | — | `packages/react/src/composite/Modal/src/modal.spec.tsx` (closeOnOutsidePress function suite) |
| AC-006 | B-005 | In a browser, open `base` and `top` Modals with a Tooltip or Popover inside; check the painted order. | — | `packages/react/src/composite/Modal/src/modal.spec.tsx` (zIndex suite checks layer selection only) |
| AC-007 | B-005, B-006 | Render a `base` ThemeProvider with a `dark` ThemeProvider side area holding an open default-path Modal, then open a second default-path Modal outside it; check that the Modal is not a descendant of the side area's ThemeProvider, presents the `base` theme, and is painted above page content. | — | `packages/react/src/composite/Modal/src/modal.themeScope.spec.tsx` (nested ThemeProvider containment suite; DOM ancestry only) |
| AC-008 | B-007 | Open a Modal with a container `root` and one with `root` null; check where each content is rendered. | — | `packages/react/src/composite/Modal/src/modal.spec.tsx` (root suite) |
| AC-009 | B-008 | Open a default-path Modal with `portalId` "my-portal"; check that its container is inside the element with that id. | — | — |
| AC-010 | §3 Public API | Render with each `padding` value; check the spacing applied. | — | `packages/react/src/composite/Modal/src/modal.spec.tsx` (padding suite) |
| AC-011 | B-006 | Open a default-path Modal inside a `dark` ThemeProvider; check that overlay and container present the `dark` theme. | — | `packages/react/src/composite/Modal/src/modal.themeScope.spec.tsx` (nested ThemeProvider containment suite; DOM ancestry only) |
