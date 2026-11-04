# Popover Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Popover shows actions or content with more than one line in a floating layer anchored to a trigger.

- Use it for menus of actions anchored to a button or icon button, or for supplementary content tied to a trigger, including the controlled pattern used per row in lists and tables.
- Do not use it for a single line of supplementary text; use Tooltip.
- Related components: Tooltip, Modal (blocking content that is not anchored to a trigger).

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Trigger | Yes | The consumer-provided interactive element, or a render function, that positions the Popover. |
| Floating content | Yes | The floating layer that shows `content` while the Popover is open. |
| Arrow | No | A pointer from the floating content to the trigger, shown by default. |
| Overlay | No | An invisible layer behind the floating content that prevents accidental clicks on elements behind the Popover, rendered only when `renderOverlay` is `true` and the Popover is open. |

### Rules

- The floating content and the overlay exist only while the Popover is open (B-001).
- The floating content always goes in `content`, never as additional children of the trigger.
- The floating content is rendered as a floating layer over the page, not in the trigger's layout flow (B-008).

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| `children` | Element, or a function receiving `{ open, setVisibility }` and returning an element | Yes | — | The trigger that positions the Popover. |
| `content` | Element | Yes | — | The content of the floating layer. |
| `visible` | boolean | No | — | When provided, controls whether the Popover is open (B-002). |
| `onVisibility` | `(visible: boolean) => void` | No | — | Called when the Popover requests to open or close (B-002). |
| `arrow` | boolean | No | `true` | Shows the arrow (B-005). |
| `matchReferenceWidth` | boolean | No | `false` | Makes the floating content as wide as the trigger. |
| `position` | one of 12 placements: `top`, `bottom`, `left`, `right`, each optionally with `-start` or `-end` | No | `bottom` | Preferred placement relative to the trigger (B-004). |
| `enabledHover` | boolean | No | `false` | Opens the Popover when the pointer moves over the trigger (B-001). |
| `enabledClick` | boolean | No | `true` | Toggles the Popover when the trigger is clicked (B-001). |
| `enabledDismiss` | boolean | No | `true` | Closes the Popover on a press outside it (B-003). |
| `offset` | number | No | `10` | Distance between the floating content and the trigger. |
| `renderOverlay` | boolean | No | `false` | Renders the overlay while open (B-006). |
| `backgroundColor` | color token (`neutral-background`, `neutral-surfaceHighlight`, `primary-surfaceHighlight`, `primary-interactiveHover`, `success-surfaceHighlight`, `warning-surfaceHighlight`, `danger-surfaceHighlight`) | No | `neutral-background` | Background color of the floating content and arrow (B-007). |
| `padding` | `base` \| `none` \| `small` | No | `base` | Inner spacing of the floating content (B-007). |
| `width` | string or responsive object | No | `fit-content` | Width of the floating content area. |

### Events

| Event | Payload | Trigger |
|---|---|---|
| `onVisibility` | `true` | The Popover requests to open (B-002). |
| `onVisibility` | `false` | The Popover requests to close (B-002, B-003). |

### Actions

| Action | Input | Result |
|---|---|---|
| `setVisibility` (render-function trigger only) | boolean | Opens or closes an uncontrolled Popover (B-012). |

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
| With arrow (default) | Points the floating content at its trigger. | Default presentation. |
| Without arrow | Floating content without a pointer. | When the anchoring is already clear. |
| With overlay | Blocks accidental clicks on elements behind the open Popover. | When clicks behind the Popover would trigger unwanted actions, for example a clickable table row. |

### Rules

- `backgroundColor` and `padding` adjust appearance; they are not separate variants.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | Initial uncontrolled state, or `visible` is `false` | Floating content, arrow and overlay are not rendered. |
| Open | Activation (B-001) or `visible` is `true` | Floating content is shown next to the trigger, above page content (B-008). |

---

## 6. Behavioral Contract

### B-001 - Open and close from the trigger

When `enabledClick` is `true` (default), clicking the trigger of a closed Popover MUST request opening and clicking the trigger of an open Popover MUST request closing.
When `enabledHover` is `true`, moving the pointer over the trigger MUST request opening.
When `enabledClick` is `false`, clicking the trigger MUST NOT open the Popover; when `enabledHover` is `false` (default), hovering the trigger MUST NOT open it.

### B-002 - Controlled visibility

When `visible` is provided, the Popover MUST be open exactly when `visible` is `true`, and every open or close request MUST call `onVisibility` with the requested value.
When `visible` is not provided, the Popover MUST manage its own open state and still call `onVisibility`, when provided, with each requested value.

### B-003 - Dismiss on outside press

When `enabledDismiss` is `true` (default) and the Popover is open, a press outside the floating content and the trigger MUST request closing.

### B-004 - Placement

When the Popover is open, the component MUST place the floating content at the placement requested by `position`, or below the trigger when `position` is not provided, separated by `offset`, and MUST keep it positioned relative to the viewport.

### B-005 - Arrow

When the Popover is open and `arrow` is not `false`, the component MUST show an arrow pointing to the trigger. When `arrow` is `false`, it MUST NOT show the arrow.

### B-006 - Overlay

When `renderOverlay` is `true` and the Popover is open, the component MUST render an invisible overlay that prevents clicks on elements behind the Popover. When the Popover is closed, the overlay MUST NOT be rendered, so elements behind it are clickable.

### B-007 - Appearance

The floating content MUST use the `backgroundColor` token, `neutral-background` by default, and the `padding` value, `base` by default.

### B-008 - Floating layer order

When the Popover is open, the floating content MUST appear above page content and above a Modal or Sidebar that uses its standard layer, including a Popover whose trigger is inside that Modal or Sidebar. Only a Modal on its `top` layer appears above the Popover.

### B-009 - Theme of the enclosing ThemeProvider

When the Popover's trigger is inside a ThemeProvider, the floating content MUST present that ThemeProvider's theme.
It MUST NOT take the theme of, or be layered within, a ThemeProvider that does not contain the trigger, including when such a ThemeProvider elsewhere on the page already contains an open or previously opened Popover.

### B-010 - Portal identifier

When the Popover is open, the floating content MUST be rendered inside a portal element whose id is `nimbus-popover-floating`.


### B-011 - Width

The floating content MUST fit its content by default, MUST use `width` when provided, and MUST be as wide as the trigger when `matchReferenceWidth` is `true`.

### B-012 - Render-function trigger

When `children` is a function, the component MUST call it with the current `open` state and a `setVisibility` action that opens or closes an uncontrolled Popover, and render its result as the trigger.

---

## 7. Interaction Contract

### Pointer

- Clicking the trigger toggles the Popover when `enabledClick` is `true` (B-001).
- Hovering the trigger opens the Popover when `enabledHover` is `true` (B-001).
- Pressing outside closes the Popover when `enabledDismiss` is `true` (B-003).

### Keyboard

- No keyboard binding is part of this contract.

### Touch

- No touch-specific behavior is part of this contract.

### Focus

- No focus movement is part of this contract.

---

## 8. Content Contract

### Labels

- Not applicable — the Popover adds no text of its own; `content` is provided by the consumer.

### Supporting Content

- `content` may contain any elements, including actions.

### Icons

- Not applicable — the Popover adds no icons. An icon button trigger provides its own accessible name.

### Long Content

- `width` sets the floating content area width; `matchReferenceWidth` makes it as wide as the trigger (B-011).

### Localization

- Not applicable — the Popover adds no text of its own.

---

## 9. Layout and Responsive Behavior

### Sizing

- The floating content width is `fit-content` by default, `width` when provided, or the trigger's width when `matchReferenceWidth` is `true` (B-011).

### Alignment

- The floating content is aligned to the trigger as requested by `position` (B-004).

### Overflow

- The floating content is a floating layer and does not change the layout of the trigger or its container (B-008).

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| `width` given as a responsive object | The width applied follows the breakpoint values provided. |

---

## 10. Composition Contract

### Supported Composition

- A Popover may be used inside a Modal or a Sidebar; its floating content appears above them as defined by B-008.
- A Popover may be used inside a ThemeProvider, including an application with more than one ThemeProvider (B-009).

### Unsupported Composition

- Placing the floating content as additional children of the trigger instead of `content`.

### Nesting Rules

- Layer order and theme are defined by B-008 and B-009 regardless of where on the page other ThemeProviders, Popovers or Tooltips are mounted.

### Multiple Instances

- Several Popovers can exist on the same page, for example one controlled Popover per table row; each one follows B-008 and B-009 for its own trigger, independently of other instances.

---

## 11. Accessibility Contract

### Semantics

- This contract defines no ARIA role for the floating content.

### Accessible Name

- The trigger provides its own accessible name; an icon button trigger needs an `aria-label`.

### Keyboard Access

- No keyboard behavior is part of this contract (§7).

### Focus

- No focus behavior is part of this contract (§7).

### Screen Reader Behavior

- No screen-reader announcement is part of this contract.

### Visual Accessibility

- The floating content uses the theme's color tokens (B-007, B-009).

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| `visible` is `true` at first render | The Popover is open immediately (B-002). |
| Trigger clicked while controlled and open | `onVisibility(false)` is called; the Popover stays open until `visible` becomes `false` (B-001, B-002). |
| `renderOverlay` with the Popover closed | No overlay is rendered (B-006). |
| Trigger inside a Modal on its standard layer | The floating content appears above the Modal (B-008). |
| Another ThemeProvider elsewhere on the page already contains a Popover | The Popover keeps the theme and layer order of its own trigger's ThemeProvider (B-008, B-009). |
| Multiple instances | Each Popover follows B-008 and B-009 for its own trigger. |

---

## 13. Acceptance Criteria

### AC-001 - Open on click

**Given**
a closed Popover with `enabledClick` not set to `false`

**When**
the user clicks the trigger

**Then**
the floating content is rendered (B-001).

---

### AC-002 - Open on hover

**Given**
a closed Popover with `enabledHover` set to `true`

**When**
the user moves the pointer over the trigger

**Then**
the floating content is rendered (B-001).

---

### AC-003 - Disabled triggers

**Given**
a closed Popover with `enabledClick` set to `false`, and another with `enabledHover` not set

**When**
the user clicks the first trigger and hovers the second trigger

**Then**
neither Popover renders its floating content (B-001).

---

### AC-004 - Controlled visibility

**Given**
a Popover with `visible` set to `true` and an `onVisibility` callback, and another with `visible` set to `false` and an `onVisibility` callback

**When**
the user clicks each trigger

**Then**
the first was rendered open and calls `onVisibility(false)`; the second was rendered closed and calls `onVisibility(true)` (B-001, B-002).

---

### AC-005 - Dismiss on outside press

**Given**
an open Popover with `enabledDismiss` not set to `false` and an `onVisibility` callback

**When**
the user presses outside the floating content and the trigger

**Then**
`onVisibility(false)` is called and an uncontrolled Popover closes (B-003).

---

### AC-006 - Placement

**Given**
a Popover with `position` set to `top`, `bottom`, `left` or `right`

**When**
the Popover is open

**Then**
the floating content is placed on the requested side of the trigger, separated by the default offset of 10, and positioned relative to the viewport (B-004).

---

### AC-007 - Arrow

**Given**
a Popover with `arrow` not set, and another with `arrow` set to `false`

**When**
each Popover is open

**Then**
the first shows an arrow and the second shows no arrow (B-005).

---

### AC-008 - Overlay

**Given**
a Popover with `renderOverlay` set to `true`

**When**
the Popover is open, and later closed

**Then**
an overlay is rendered while it is open, and is not rendered when it is closed (B-006).

---

### AC-009 - Appearance

**Given**
an open Popover with `backgroundColor` and `padding` not set, and others with each supported `backgroundColor` token and each `padding` value

**When**
each Popover is open

**Then**
the floating content uses `neutral-background` and `base` padding by default, and otherwise the requested token and padding (B-007).

---

### AC-010 - Above a standard Modal

**Given**
an open Modal on its `base` layer with a Popover whose trigger is inside the Modal

**When**
the user opens the Popover

**Then**
the floating content is painted above the Modal and its overlay (B-008).

---

### AC-011 - Not captured by another ThemeProvider

**Given**
an application wrapped in a ThemeProvider with the `base` theme, containing a side area wrapped in its own ThemeProvider with the `dark` theme that holds a Popover that has been opened, and a Modal on its `base` layer opened later outside the side area with a Popover inside it

**When**
the user opens the Popover inside the Modal

**Then**
its floating content presents the `base` theme, is not layered within the side area's ThemeProvider, and is painted above the Modal (B-008, B-009).

---

### AC-012 - Theme within a single ThemeProvider

**Given**
a Popover whose trigger is inside a ThemeProvider with the `dark` theme

**When**
the Popover is open

**Then**
the floating content presents the `dark` theme (B-009).

---

### AC-013 - Portal identifier

**Given**
a Popover

**When**
the Popover is open

**Then**
its floating content is a descendant of an element whose id is `nimbus-popover-floating` (B-010).

---

### AC-014 - Width

**Given**
a Popover with no `width`, one with `width` "320px", and one with `matchReferenceWidth` set to `true` on a trigger 200px wide

**When**
each Popover is open

**Then**
the first fits its content, the second is 320px wide, and the third is 200px wide (B-011).

---

### AC-015 - Render-function trigger

**Given**
an uncontrolled Popover whose `children` is a function rendering a button that calls `setVisibility(true)`

**When**
the user activates that button

**Then**
the function receives `open` as `false` before activation, the Popover opens, and the function is called again with `open` as `true` (B-012).

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
| AC-001 | B-001 | Supported | reconstructed | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should display popover if anchor receives click event") at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e; Popover props (`enabledClick`, default true): https://nimbus.nuvemshop.com.br/es-AR/documentation/atomic-components/popover#props and #implementaci-n |
| AC-002 | B-001 | Supported | reconstructed | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should display popover if anchor receives hover event") at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-003 | B-001 | Supported | reconstructed | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should not display popover if anchor does not receive hover/click event") at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e; `enabledHover` default false: popover#implementaci-n |
| AC-004 | B-001, B-002 | Supported | reconstructed | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should render the popover open by default"; onVisibility tests with popover open and closed) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-005 | B-003 | Supported | established | `enabledDismiss` ("Adds listeners that dismiss (close) the floating element", default true) and the With overlay example: https://nimbus.nuvemshop.com.br/es-AR/documentation/atomic-components/popover#props and #example-with-overlay |
| AC-006 | B-004 | Supported | reconstructed | `packages/react/src/atomic/Popover/src/popover.spec.tsx` (top/right/bottom/left position tests, 10px translation, fixed position) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-007 | B-005 | Supported | reconstructed | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should not render popover arrow"; arrow present in position tests) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-008 | B-006 | Supported | established | `renderOverlay` ("renders an invisible overlay that prevents accidental clicks on elements behind the popover") and the With overlay example: https://nimbus.nuvemshop.com.br/es-AR/documentation/atomic-components/popover#props and #example-with-overlay; `packages/react/src/atomic/Popover/src/popover.spec.tsx` (overlay test) |
| AC-009 | B-007 | Supported | reconstructed | `packages/react/src/atomic/Popover/src/popover.spec.tsx` (backgroundColor and padding suites) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-010 | B-008 | Supported | established | Modal `zIndex` prop ("base": above the page, below floating components like tooltip/toast/popover): https://nimbus.nuvemshop.com.br/es-AR/documentation/composite-components/modal#props; zIndex tokens: https://nimbus.nuvemshop.com.br/es-AR/documentation/tokens/zIndex |
| AC-011 | B-008, B-009 | Supported | established | Layer order as for AC-010. Theme: https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas |
| AC-012 | B-009 | Supported | established | https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas |
| AC-013 | B-010 | Supported | established | App Shell dependencies (portaled popover overlay, id `nimbus-popover-floating`): https://nimbus.nuvemshop.com.br/es-AR/documentation/patterns/app-shell#dependencias |
| AC-014 | B-011 | Supported | established | `width` and `matchReferenceWidth` props, default `fit-content`: https://nimbus.nuvemshop.com.br/es-AR/documentation/atomic-components/popover#props and #implementaci-n |
| AC-015 | B-012 | Supported | established | `children` render-prop with `open` and `setVisibility`: https://nimbus.nuvemshop.com.br/es-AR/documentation/atomic-components/popover#props and #implementaci-n |

---

## 15. Compatibility and Migration

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | No change. | §3 |
| Behavior and defaults | No change to defaults. Layer order and theme follow the trigger's own ThemeProvider when other ThemeProviders exist. | B-008, B-009 |
| Layout and content | No change. | §8, §9 |
| Accessibility and interactions | No change. | §7, §11 |
| Supported composition | The `nimbus-popover-floating` portal identifier that App Shell relies on is preserved. | B-010, §10 |

- Backward compatibility: Inputs, defaults, the portal identifier and supported compositions are unchanged.
- Migration required: No

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Click the trigger of a closed Popover; the floating content appears. | `packages/react/src/atomic/Popover/src/popover.stories.tsx` | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should display popover if anchor receives click event") |
| AC-002 | B-001 | Hover the trigger with `enabledHover`; the floating content appears. | — | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should display popover if anchor receives hover event") |
| AC-003 | B-001 | Click with `enabledClick` false and hover with `enabledHover` unset; nothing opens. | — | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should not display popover if anchor does not receive hover event" / "click event") |
| AC-004 | B-001, B-002 | Render controlled open and closed Popovers and click each trigger; check the initial state and the `onVisibility` value. | — | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should render the popover open by default"; onVisibility tests) |
| AC-005 | B-003 | Open a Popover and press outside it; `onVisibility(false)` is called and the uncontrolled Popover closes. | — | — |
| AC-006 | B-004 | Open Popovers with each side `position`; check side, offset and viewport-relative positioning. | `packages/react/src/atomic/Popover/src/popover.stories.tsx` | `packages/react/src/atomic/Popover/src/popover.spec.tsx` (position tests) |
| AC-007 | B-005 | Open with `arrow` unset and with `arrow` false; the arrow is present only in the first case. | — | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should not render popover arrow") |
| AC-008 | B-006 | Open a Popover with `renderOverlay`, then close it; the overlay exists only while it is open. | — | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("should render popover with transparent overlay when renderOverlay prop is true") |
| AC-009 | B-007 | Open Popovers with default and each supported `backgroundColor` and `padding`; check the applied token and padding. | — | `packages/react/src/atomic/Popover/src/popover.spec.tsx` (backgroundColor and padding suites) |
| AC-010 | B-008 | In a browser, open a `base` Modal containing a Popover, open it, and check that the floating content is painted above the Modal and its overlay. | — | — |
| AC-011 | B-008, B-009 | Render a `base` ThemeProvider with a `dark` ThemeProvider side area holding an opened Popover, then open a `base` Modal with a Popover; open it and check that the floating content is not a descendant of the side area's ThemeProvider, presents the `base` theme, and is painted above the Modal. | — | `packages/react/src/atomic/Popover/src/popover.themeScope.spec.tsx` (nested ThemeProvider containment suite; DOM ancestry only) |
| AC-012 | B-009 | Open a Popover inside a `dark` ThemeProvider; check that its floating content presents the `dark` theme. | — | `packages/react/src/atomic/Popover/src/popover.themeScope.spec.tsx` (nested ThemeProvider containment suite; DOM ancestry only) |
| AC-013 | B-010 | Open a Popover and check that its floating content is inside an element with id `nimbus-popover-floating`. | — | — |
| AC-014 | B-011 | Open Popovers with default width, `width` "320px" and `matchReferenceWidth` on a 200px trigger; measure each floating content width. | — | — |
| AC-015 | B-012 | Render a function trigger that calls `setVisibility(true)`; activate it and check the `open` values received and the open state. | — | — |
