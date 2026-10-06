# Modal Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Modal presents focused content in a dialog over a dimmed overlay and asks the consumer to close it through a dismissal callback.

- User need: a task or message that requires attention before returning to the page.
- Use it for blocking, focused content. Side-attached panels are Sidebar's role.
- Related components: Sidebar; Tooltip and Popover (floating components displayed above a base-layer Modal); BottomSheet in TiendaNube/nimbus-patterns.
- Scope of this contract: the behaviors listed below. Focus management, scroll locking and the interaction of Escape with other open components are not part of this contract.

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Overlay | Yes | Dimmed layer behind the dialog. |
| Dialog | Yes | Surface that contains the children. |
| Header (`Modal.Header`) | No | Title area; accepts `title`, `tag`, `children`, `padding`. |
| Body (`Modal.Body`) | No | Main content area; accepts `padding`. |
| Footer (`Modal.Footer`) | No | Actions area; accepts `padding`. |
| Dismiss button | No | Close button in the dialog corner; present only under B-202. |

### Rules

- Overlay, dialog and dismiss button exist only while the modal is open.

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| children | React node | Yes | — | Content of the modal. |
| open | boolean | Yes | — | Whether the modal is open. |
| onDismiss | function (open: boolean, event, reason) | No | — | Called when the component requests to be closed. |
| portalId | string | No | — | Identifier embedded in the portal element of the default presentation. |
| closeOnOutsidePress | boolean or function (event) returning boolean | No | true | Whether a press outside dismisses the modal; a function returns true to allow it. |
| ignoreAttributeName | string | No | data-nimbus-outside-press-ignore | Attribute name that marks regions whose presses never dismiss the modal. |
| padding | "base", "none", "small" | No | base | Inner space of the dialog. |
| renderDismissButton | boolean | No | true | Whether the close button is displayed; only effective when `onDismiss` is provided. |
| zIndex | "base" or "top" | No | base | Stacking layer (B-205). |
| maxWidth | string or responsive object | No | { xs: "100%", md: "500px" } | Maximum width of the dialog. |
| root | HTML element or null | No | — | When non-null, the modal is displayed inside that element (B-206). |
| className and other standard div attributes | HTML attributes | No | — | Applied to the dialog element. |

### Events

| Event | Payload | Trigger |
|---|---|---|
| onDismiss | `false` for a dismiss button click; `false`, the originating event and the reason (for an outside press, "outside-press") for an allowed outside press; Escape also calls it | Dismiss button click, Escape, or an allowed outside press (B-202 to B-204). |

### Actions

Not applicable — Modal exposes no explicit actions.

### API Rules

- The theme in which the modal is presented and its relation to other layers are not inputs; they follow B-205 to B-209.
- No input was added, removed or renamed by this contract.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| zIndex base | Standard layer. | Default. |
| zIndex top | Layer above every floating component. | Only for a Modal that must cover tooltips, toasts, popovers and sidebars. |
| Default presentation / scoped (`root`) | Full-page overlay, or an overlay inside a consumer container. | Use `root` to confine the modal to a region. |
| With / without dismiss button | Close button visibility. | Hide it when other dismissal is provided. |
| Dismissible / not dismissible | Presence of `onDismiss`. | Omit `onDismiss` for a modal the user cannot close. |

### Rules

- Padding values: base, small, none.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | `open` false. | Nothing of the modal is displayed. |
| Open | `open` true. | Overlay and dialog with the children are displayed. |

---

## 6. Behavioral Contract

### B-201 - Display by `open`

When `open` is true the Modal MUST display its children inside the dialog; when `open` is false it MUST display nothing.

### B-202 - Dismiss button

When `onDismiss` is provided and `renderDismissButton` is not false, the Modal MUST display a dismiss button, and clicking it MUST call `onDismiss(false)`. When `onDismiss` is absent or `renderDismissButton` is false, no dismiss button is displayed.

### B-203 - Escape

When the modal is open and `onDismiss` is provided, pressing Escape MUST call `onDismiss`, also when the dismiss button is hidden. When `onDismiss` is absent, Escape MUST NOT close the modal.

### B-204 - Outside press

When the modal is open and `onDismiss` is provided, a mouse press outside the dialog MUST call `onDismiss(false, event, "outside-press")` if `closeOnOutsidePress` is true (default) or is a function returning true, and the pressed element is not inside an element carrying the `ignoreAttributeName` attribute. It MUST NOT call `onDismiss` when `closeOnOutsidePress` is false or returns false, or when the pressed element is inside an element carrying that attribute.

### B-205 - Layers

In the default presentation with `zIndex` omitted or "base", the Modal MUST display its overlay and dialog above the page and below floating components (Tooltip, Popover, toast), so that a Tooltip or Popover without a `zIndex` input opened from an element inside the open modal is displayed above the modal's overlay and dialog. With `zIndex="top"` the modal MUST be displayed above every floating component and above a Sidebar. `zIndex` has no effect when `root` is provided.

### B-206 - Scoped presentation

When `root` is a non-null element, the Modal MUST display its overlay and dialog inside that element. When `root` is null or omitted, the default presentation applies.

### B-207 - Portal identifier

When `portalId` is provided in the default presentation, the element that contains the modal's overlay and dialog MUST carry that identifier.

### B-208 - Theme of origin

When a Modal in the default presentation is rendered inside a ThemeProvider, its overlay and dialog MUST be presented with the theme of the nearest enclosing ThemeProvider of that Modal in the component tree. Without any ThemeProvider the default theme applies.

### B-209 - Independence from other providers and floating elements

B-205 and B-208 MUST hold regardless of how many other ThemeProviders, Tooltips, Popovers, Modals or Sidebars exist on the page, and regardless of the order in which they were rendered or opened. A floating element rendered in another ThemeProvider MUST NOT change the theme of this modal or the layer on which a Tooltip or Popover opened from it is displayed.

### B-210 - Dialog role

When open in the default presentation, the dialog MUST be exposed with the role `dialog`.

### B-211 - Recognizable floating content

In the default presentation, the overlay and dialog of an open Modal MUST be contained by an element that carries the attribute `data-floating-ui-portal`, so that first-party consumers can recognize presses and touches inside them as belonging to floating content.

### B-212 - Use from inside a BottomSheet

When a Modal in the default presentation is opened from content inside an open BottomSheet of TiendaNube/nimbus-patterns rendered under a ThemeProvider, the modal MUST be displayed above the sheet, dismissing the modal (dismiss button or its backdrop) MUST NOT dismiss the sheet, and a touch gesture inside the modal MUST NOT be cancelled by the sheet's scroll lock.

---

## 7. Interaction Contract

### Pointer

- Clicking the dismiss button requests closing (B-202).
- A mouse press outside the dialog requests closing under the conditions of B-204.

### Keyboard

| Key | Listening scope | Active when | Effect |
|---|---|---|---|
| Escape | The document (the keydown is handled when dispatched on the document body) | The modal is open and `onDismiss` is provided | Calls `onDismiss` (B-203). |

Propagation and default-action effects of Escape, and the outcome when Escape is pressed while a Popover, Sidebar or BottomSheet is open together with the modal, are not part of this contract.

### Touch

- A touch gesture inside the modal opened from a BottomSheet is not cancelled (B-212).

### Focus

Focus entry, trapping and restoration are not part of this contract.

---

## 8. Content Contract

### Labels

- `Modal.Header` accepts `title` (string) and `tag` (React node).

### Supporting Content

- `children` accepts any React node; `Modal.Header`, `Modal.Body` and `Modal.Footer` are the supported structure.

### Icons

Not applicable — the dismiss button's icon is not parameterizable.

### Long Content

- `maxWidth` limits the dialog width; other overflow behavior is not part of this contract.

### Localization

Not applicable.

---

## 9. Layout and Responsive Behavior

### Sizing

- Default `maxWidth` is the full width on the smallest breakpoint and 500px from the `md` breakpoint.

### Alignment

Not applicable — no alignment guarantee beyond the overlay covering its container is part of this contract.

### Overflow

Not applicable.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| `maxWidth` given per breakpoint | Applied per breakpoint. |
| `root` provided | Overlay and dialog fill that element (B-206). |

---

## 10. Composition Contract

### Supported Composition

- `Modal.Header`, `Modal.Body`, `Modal.Footer` as children.
- Tooltip and Popover inside the modal content (B-205, B-209).
- A Modal opened from a BottomSheet (B-212).

### Unsupported Composition

Not applicable — no unsupported composition is evidenced.

### Nesting Rules

- Nested ThemeProviders: each Modal follows its nearest ThemeProvider (B-208).

### Multiple Instances

- Several Modals, Sidebars and ThemeProviders on the page do not change each other's theme or layer (B-209).

---

## 11. Accessibility Contract

### Semantics

- The open dialog is exposed with the role `dialog` (B-210).

### Accessible Name

Not applicable — no accessible-name guarantee is part of this contract.

### Keyboard Access

- Escape dismisses a dismissible modal (B-203).

### Focus

Focus behavior is not part of this contract.

### Screen Reader Behavior

Not applicable beyond B-210.

### Visual Accessibility

- The dialog is presented with the colors of the theme given by B-208; no other contrast guarantee is part of this contract.

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| `open` false | Nothing displayed (B-201). |
| No `onDismiss` | No dismiss button; Escape and outside press do not close (B-202 to B-204). |
| `renderDismissButton` false | No button; Escape and outside press still dismiss (B-203, B-204). |
| `closeOnOutsidePress` function returns false | No dismissal on outside press (B-204). |
| Press on an element carrying `ignoreAttributeName` | No dismissal (B-204). |
| `root` null | Default presentation (B-206). |
| `zIndex` "top" with `root` | The layer choice has no effect (B-205). |
| Tooltip or Popover opened from inside a Modal with `zIndex` "top" | The Modal's top layer is above every floating component; the order of B-205 for floating components above the modal applies to the base layer only. |
| Tooltip opened from inside an open modal while a themed side menu elsewhere also has a Tooltip | The modal's tooltip is displayed above the modal; the modal keeps its own ThemeProvider's theme (B-205, B-208, B-209). |
| Modal inside a nested ThemeProvider | Presented with the nested provider's theme (B-208). |
| Modal without ThemeProvider | Default theme (B-208). |

---

## 13. Acceptance Criteria

### AC-201 - Display by `open` (B-201)

**Given** a Modal with content "My content"
**When** `open` is true, then false
**Then** the content is displayed while open and nothing of the modal remains when closed.

---

### AC-202 - Dismiss button (B-202)

**Given** a Modal with `onDismiss`, one with `renderDismissButton` false, and one without `onDismiss`
**When** each is open and the dismiss button of the first is clicked
**Then** the first calls `onDismiss(false)`; the other two display no dismiss button.

---

### AC-203 - Escape (B-203)

**Given** an open Modal with `onDismiss` and `renderDismissButton` false, and an open Modal without `onDismiss`
**When** Escape is pressed
**Then** the first calls `onDismiss` and the second stays open.

---

### AC-204 - Outside press (B-204)

**Given** an open Modal with `onDismiss` and, in turn, `closeOnOutsidePress` as a function returning true, a function returning false, and `false`; and a press on an element carrying the `ignoreAttributeName` attribute
**When** a mouse press is made outside the dialog
**Then** `onDismiss(false, event, "outside-press")` is called only for the function returning true on a non-ignored element; it is not called in the other cases.

---

### AC-205 - Layer variants (B-205)

**Given** a Modal without `zIndex`, one with `zIndex="top"`, and one with `zIndex="top"` and `root`
**When** they are open
**Then** the first uses the base layer and the second the top layer, above floating components and a Sidebar; the third is not affected by `zIndex`.

---

### AC-206 - Floating components above the modal (B-205)

**Given** an open Modal (default presentation, `zIndex` omitted) whose content contains a Tooltip and a Popover without `zIndex`, on a page where another area is layered below the Modal
**When** the Tooltip is hovered and the Popover is opened
**Then** both contents are visible and painted above the modal's overlay and dialog.

---

### AC-207 - Scoped presentation (B-206)

**Given** a Modal with `root` set to a container element, and one with `root` null
**When** they are open
**Then** the first's overlay and dialog are inside the container, and the second uses the default presentation.

---

### AC-208 - Portal identifier (B-207)

**Given** an open Modal in the default presentation with `portalId` "my-portal"
**When** the page is queried for the element with that identifier
**Then** the element exists and contains the modal's overlay and dialog.

---

### AC-209 - Theme of origin (B-208)

**Given** a "base" ThemeProvider that contains a "next-dark" ThemeProvider with an open Modal, and an open Modal directly in the "base" provider
**When** the dialogs are inspected
**Then** the nested Modal is presented with the "next-dark" theme colors and the other with the "base" theme colors.

---

### AC-210 - Independence from mount order (B-205, B-208, B-209)

**Given** a "base" root ThemeProvider with a Modal (`zIndex` omitted), and a "next-dark" ThemeProvider wrapping a side menu that renders a Tooltip, layered below the Modal
**When** the menu's Tooltip is rendered or opened before the Modal opens, rendered after it in the tree, or in a different order, and the Modal is opened with a Tooltip in its content
**Then** in every arrangement the modal is presented with the "base" theme colors and its Tooltip is displayed above the modal.

---

### AC-211 - No ThemeProvider (B-208)

**Given** an open Modal without any ThemeProvider
**When** it is inspected
**Then** it is presented with the default theme colors.

---

### AC-212 - Recognizable floating content (B-211)

**Given** an open Modal in the default presentation, under a ThemeProvider and without one
**When** the overlay and dialog are queried for their closest ancestor with the attribute `data-floating-ui-portal`
**Then** such an ancestor exists for both.

---

### AC-213 - Use from inside a BottomSheet (B-212)

**Given** an open BottomSheet inside a ThemeProvider with a Modal that opens from its body
**When** the Modal opens, its dismiss button is clicked, and a touch move is made inside the open Modal
**Then** the modal is displayed above the sheet, only the modal closes (the sheet's `onRemove` is not called), and the touch move is not default-prevented.

---

### AC-214 - Dialog role (B-210)

**Given** an open Modal in the default presentation
**When** the accessibility tree is inspected
**Then** the dialog is exposed with the role `dialog`.

---

### Acceptance Criteria Rules

- Every behavior above is covered by at least one criterion.
- Criteria describe consumer-observable outcomes.

---

## 14. Origin of Guarantees

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-201 | B-201 | Supported | reconstructed | nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e `packages/react/src/composite/Modal/src/modal.spec.tsx` ("THEN should correctly render the submitted content"); `modal.types.ts` `open` |
| AC-202 | B-202 | Supported | reconstructed | `modal.spec.tsx` ("AND should correctly call the onDismiss function when closing the modal", "WHEN renderDismissButton controls the close button"); story "noDismiss" and "noDismissButton" in `modal.stories.tsx` |
| AC-203 | B-203 | Supported | reconstructed | `modal.spec.tsx` ("AND still dismisses via Escape when the button is hidden", "THEN should not close the modal if the close function is not provided"); story "noDismissButton" (Escape and outside press still close) |
| AC-204 | B-204 | Supported | reconstructed | `modal.spec.tsx` ("WHEN closeOnOutsidePress is a function" cases); `modal.types.ts` `closeOnOutsidePress`, `ignoreAttributeName`; story "withIgnoreAttribute" |
| AC-205 | B-205 | Supported | established | Modal `zIndex` documentation https://nimbus.nuvemshop.com.br/es-AR/documentation/composite-components/modal#props (base: above the page, below tooltip, toast and popover; top: above all floating components, only on the default presentation); `modal.spec.tsx` ("WHEN zIndex selects a stacking layer"); story "modalOverSidebar" |
| AC-206 | B-205 | Supported | established | Modal `zIndex` documentation (base layer below floating components such as tooltip, toast and popover); Nimbus zIndex tokens https://nimbus.nuvemshop.com.br/es-AR/documentation/tokens/zIndex (floating components at 800, modals and sidebars at 600 and 700) |
| AC-207 | B-206 | Supported | reconstructed | `modal.spec.tsx` ("WHEN root is provided"); `modal.types.ts` `root`; story "withRoot" |
| AC-208 | B-207 | Supported | reconstructed | `modal.types.ts` `portalId` ("Id to be embedded in the portal element") and the Modal documentation page https://nimbus.nuvemshop.com.br/es-AR/documentation/composite-components/modal#props |
| AC-209 | B-208 | Supported | reconstructed | Themes documentation https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas; `ThemeProvider.tsx` in `packages/core/styles/src/components/ThemeProvider` at dcea961a3abb65e847e0131e54e4b5136363538e; TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `BottomSheet.tsx` (Modal, Sidebar and Popover treated as belonging to the nearest provider) |
| AC-210 | B-205, B-208, B-209 | Supported | established | Same sources as AC-206 and AC-209; the documented layer order carries no qualifier about the order in which elements are rendered or opened |
| AC-211 | B-208 | Supported | reconstructed | Themes documentation (default theme without ThemeProvider); `modal.spec.tsx` renders Modal without a provider |
| AC-212 | B-211 | Supported | reconstructed | TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `BottomSheet/src/bottomSheet.constants.ts`, `hooks/useDismissHandlers.ts`, `hooks/useScrollLock.ts` (presses and touches inside `[data-floating-ui-portal]` are treated as floating content) |
| AC-213 | B-212 | Supported | reconstructed | TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `BottomSheet/src/bottomSheet.spec.tsx` ("THEN a real Modal opened from inside the sheet should render above it, inside a real ThemeProvider", "THEN dismissing a Modal opened from inside the sheet should close only the modal, not the sheet", "THEN should NOT prevent a touchmove inside a Modal opened from the sheet") |
| AC-214 | B-210 | Supported | reconstructed | TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `BottomSheet/src/bottomSheet.spec.tsx` (queries `[role="dialog"]` for the Modal's dialog while the sheet is open) |

---

## 15. Compatibility and Migration

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | None. No input added, removed or renamed; `portalId` keeps its meaning (B-207). | Section 3 |
| Behavior and defaults | In page arrangements where another ThemeProvider's floating container previously held this modal or hid a Tooltip or Popover opened from it, the modal keeps its own theme and floating components are displayed above it. | B-205, B-208, B-209 |
| Layout and content | None. | Sections 8 and 9 |
| Accessibility and interactions | None. Presses and touches inside the modal remain recognizable to first-party consumers. | B-211, B-212 |
| Supported composition | Unchanged. `useTheme` keeps returning the reference to the element that carries the theme and contains the provider's children, together with the current theme name. The scoped presentation (`root`) is unchanged. | Sections 3 and 10 |

- Backward compatibility: Yes.
- Migration required: No.
- Consumer migration steps, when required: Not applicable.

### Rules

- Consumers that pass `portalId` keep receiving an element with that identifier (B-207).

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-201 | B-201 | Render open and closed; assert content presence. | `packages/react/src/composite/Modal/src/modal.stories.tsx` (basic) | `packages/react/src/composite/Modal/src/modal.spec.tsx` ("THEN should correctly render the submitted content") |
| AC-202 | B-202 | Render with and without `onDismiss` and `renderDismissButton`; click the button. | `modal.stories.tsx` (noDismiss, noDismissButton) | `modal.spec.tsx` ("AND should correctly call the onDismiss function when closing the modal", "WHEN renderDismissButton controls the close button") |
| AC-203 | B-203 | Press Escape with and without `onDismiss`. | `modal.stories.tsx` (noDismissButton) | `modal.spec.tsx` ("AND still dismisses via Escape when the button is hidden", "THEN should not close the modal if the close function is not provided") |
| AC-204 | B-204 | Mouse press outside with each `closeOnOutsidePress` form and on an ignored region. | `modal.stories.tsx` (withIgnoreAttribute) | `modal.spec.tsx` ("WHEN closeOnOutsidePress is a function") |
| AC-205 | B-205 | Render each `zIndex` option, with and without `root`; assert layer classes and painted order against floating components and a Sidebar. | `modal.stories.tsx` (modalOverSidebar) | `modal.spec.tsx` ("WHEN zIndex selects a stacking layer") |
| AC-206 | B-205 | In a real browser render, open a Modal with a Tooltip and a Popover in its content; assert painted order and visibility. | — | Partial, DOM structure only: `modal.spec.tsx` ("AND a tooltip inside the modal mounts in the modal's provider after another provider's tooltip mounted first") asserts the Tooltip portal parent; the Popover case, painted order and visibility need a browser and are not verified |
| AC-207 | B-206 | Render with `root` element and with null; assert containment. | `modal.stories.tsx` (withRoot) | `modal.spec.tsx` ("WHEN root is provided") |
| AC-208 | B-207 | Render with `portalId`; query the identifier. | — | `modal.spec.tsx` ("AND a custom portalId is created inside its own provider after another provider used it") |
| AC-209 | B-208 | Nest a "next-dark" provider in a "base" one with a Modal in each; assert computed colors. | — | — |
| AC-210 | B-205, B-208, B-209 | Arrange the menu provider and the Modal in each order listed; assert computed colors and painted order of the modal's Tooltip. | — | Partial, DOM structure only: `modal.spec.tsx` ("THEN content mounts in its own provider after another provider's modal mounted first", "AND content mounts in its own provider when the providers are used in reverse order") assert the portal parent in both orders; computed colors and the tooltip's painted order need a browser and are not verified |
| AC-211 | B-208 | Render a Modal without provider; assert default colors. | — | Partial, DOM structure only: `modal.spec.tsx` ("AND content without a provider mounts in a body wrapper after a provider's modal mounted first") asserts the body wrapper; default colors need a browser and are not verified |
| AC-212 | B-211 | Open with and without a provider; query the closest `[data-floating-ui-portal]` ancestor. | — | `modal.spec.tsx` ("THEN content mounts in its own provider after another provider's modal mounted first", "AND content without a provider mounts in a body wrapper after a provider's modal mounted first") |
| AC-213 | B-212 | Run the BottomSheet scenarios with the changed Modal against TiendaNube/nimbus-patterns BottomSheet tests. | — | — |
| AC-214 | B-210 | Open the Modal and query the `dialog` role. | — | — |

### Rules

- Every Acceptance Criterion appears in the mapping.
- A dash means no reference is supplied; it does not mean the check passed.
