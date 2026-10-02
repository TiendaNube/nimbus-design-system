# Sidebar Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Sidebar presents a panel that slides in from the left or right edge over a dimmed overlay and asks the consumer to close it through a removal callback.

- User need: secondary content or tasks that should not replace the current page.
- Use it for side-attached panels. Centered, blocking dialogs are Modal's role.
- Related components: Modal; Tooltip and Popover (floating components displayed above a Sidebar); BottomSheet in TiendaNube/nimbus-patterns.
- Scope of this contract: the behaviors listed below. Escape handling, focus management, the scrolling behavior controlled by `needRemoveScroll` and the transition animation are not part of this contract.

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Overlay | Yes | Dimmed layer behind the panel. |
| Panel | Yes | Surface attached to the chosen edge that contains the children. |
| Header (`Sidebar.Header`) | No | Header area; accepts `title`. |
| Body (`Sidebar.Body`) | No | Main content area. |
| Footer (`Sidebar.Footer`) | No | Actions area. |

### Rules

- Overlay and panel exist only while the sidebar is open.

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| children | React node | Yes | — | Content of the sidebar. |
| open | boolean | No | — | Whether the sidebar is displayed. |
| onRemove | function () | No | — | Called when the component requests to be closed. |
| position | "right" or "left" | No | right | Edge from which the sidebar appears. |
| padding | "base", "small", "none" | No | — | Inner space of the panel. |
| maxWidth | string or responsive object | No | — | Maximum width of the panel. |
| zIndex | string or responsive object | No | — | Stack order of the panel. |
| needRemoveScroll | boolean | No | — | Whether the sidebar's children are wrapped in scroll-locking behavior. |
| closeOnOutsidePress | boolean or function (event) returning boolean | No | true | Whether a press outside dismisses the sidebar; a function returns true to allow it. |
| ignoreAttributeName | string | No | data-nimbus-outside-press-ignore | Attribute name that marks regions whose presses never dismiss the sidebar. |
| root | HTML element or null | No | — | When non-null, the sidebar is displayed inside that element (B-304). |
| className and other standard div attributes | HTML attributes | No | — | Applied to the panel element. |

### Events

| Event | Payload | Trigger |
|---|---|---|
| onRemove | none | An allowed outside press (B-303). |

### Actions

Not applicable — Sidebar exposes no explicit actions.

### API Rules

- No default for `open` or `needRemoveScroll` is part of this contract.
- The theme in which the sidebar is presented and its relation to other layers are not inputs; they follow B-305 to B-307.
- No input was added, removed or renamed by this contract.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| position right / left | Edge from which the panel appears. | Choose the edge that matches the layout direction of the content. |
| Default presentation / scoped (`root`) | Full-page overlay, or overlay inside a consumer container. | Use `root` to confine the sidebar to a region. |
| padding base / small / none | Inner space. | As the content requires. |

### Rules

- Default position is right.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | `open` is not true. | Nothing of the sidebar is displayed. |
| Open | `open` is true. | Overlay and panel with the children are displayed, the panel in its visible state. |

---

## 6. Behavioral Contract

### B-301 - Display by `open`

When `open` is true the Sidebar MUST display its overlay and its panel with the children, the panel in its visible state; when `open` is false it MUST display nothing.

### B-302 - Position

When `position` is "left" the panel MUST appear from the left edge, and from the right edge when it is "right" or omitted.

### B-303 - Outside press

When the sidebar is open, a mouse press outside the panel MUST call `onRemove` if `closeOnOutsidePress` is true (default) or is a function returning true, and the pressed element is not inside an element carrying the `ignoreAttributeName` attribute. It MUST NOT call `onRemove` when `closeOnOutsidePress` is false or returns false, or when the pressed element is inside an element carrying that attribute.

### B-304 - Scoped presentation

When `root` is a non-null element, the Sidebar MUST display its overlay and panel inside that element. When `root` is null or omitted, the default presentation applies.

### B-305 - Layers

In the default presentation without a `zIndex` input, the Sidebar MUST be displayed above the page and below floating components (Tooltip, Popover, toast), so that a Tooltip or Popover without a `zIndex` input opened from an element inside the open sidebar is displayed above the sidebar's overlay and panel.

### B-306 - Theme of origin

When a Sidebar in the default presentation is rendered inside a ThemeProvider, its overlay and panel MUST be presented with the theme of the nearest enclosing ThemeProvider of that Sidebar in the component tree. Without any ThemeProvider the default theme applies.

### B-307 - Independence from other providers and floating elements

B-305 and B-306 MUST hold regardless of how many other ThemeProviders, Tooltips, Popovers, Modals or Sidebars exist on the page, and regardless of the order in which they were rendered or opened. A floating element rendered in another ThemeProvider MUST NOT change the theme of this sidebar or the layer on which a Tooltip or Popover opened from it is displayed.

### B-308 - Recognizable floating content

In the default presentation, the overlay and panel of an open Sidebar MUST be contained by an element that carries the attribute `data-floating-ui-portal`, so that first-party consumers can recognize presses and touches inside them as belonging to floating content.

### B-309 - Use from inside a BottomSheet

When a Sidebar in the default presentation is opened from content inside an open BottomSheet of TiendaNube/nimbus-patterns rendered under a ThemeProvider, the sidebar MUST be displayed above the sheet, a press inside the sidebar MUST NOT dismiss the sheet, and a touch gesture inside the sidebar MUST NOT be cancelled by the sheet's scroll lock.

---

## 7. Interaction Contract

### Pointer

- A mouse press outside the panel requests removal under the conditions of B-303.

### Keyboard

No key binding is defined by this contract for Sidebar.

### Touch

- A touch gesture inside a sidebar opened from a BottomSheet is not cancelled (B-309).

### Focus

Focus entry, trapping and restoration are not part of this contract.

---

## 8. Content Contract

### Labels

- `Sidebar.Header` accepts a `title`.

### Supporting Content

- `children` accepts any React node; `Sidebar.Header`, `Sidebar.Body` and `Sidebar.Footer` are the supported structure.

### Icons

Not applicable.

### Long Content

- `maxWidth` limits the panel width; other overflow behavior is not part of this contract.

### Localization

Not applicable.

---

## 9. Layout and Responsive Behavior

### Sizing

- `maxWidth` accepts a string or a responsive object.

### Alignment

- The panel is attached to the edge given by `position` (B-302).

### Overflow

Not applicable — no overflow guarantee is part of this contract.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| `maxWidth` given per breakpoint | Applied per breakpoint. |
| `root` provided | Overlay and panel are positioned inside that element (B-304). |

---

## 10. Composition Contract

### Supported Composition

- `Sidebar.Header`, `Sidebar.Body`, `Sidebar.Footer` as children.
- Tooltip and Popover inside the sidebar content (B-305, B-307).
- A Sidebar opened from a BottomSheet (B-309).

### Unsupported Composition

Not applicable — no unsupported composition is evidenced.

### Nesting Rules

- Nested ThemeProviders: each Sidebar follows its nearest ThemeProvider (B-306).

### Multiple Instances

- Several Sidebars, Modals and ThemeProviders on the page do not change each other's theme or layer (B-307).

---

## 11. Accessibility Contract

### Semantics

Not applicable — no role or description linkage is part of this contract.

### Accessible Name

Not applicable.

### Keyboard Access

No keyboard behavior is part of this contract (section 7).

### Focus

Focus behavior is not part of this contract.

### Screen Reader Behavior

Not applicable.

### Visual Accessibility

- The panel is presented with the colors of the theme given by B-306; no other contrast guarantee is part of this contract.

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| `open` false | Nothing displayed (B-301). |
| `closeOnOutsidePress` function returns false | No removal on outside press (B-303). |
| Press on an element carrying `ignoreAttributeName` | No removal (B-303). |
| `root` null | Default presentation (B-304). |
| Tooltip opened from inside an open sidebar while a themed side menu elsewhere also has a Tooltip | The sidebar's tooltip is displayed above the sidebar; the sidebar keeps its own ThemeProvider's theme (B-305 to B-307). |
| Sidebar with an explicit `zIndex` input | The given stack order applies; B-305 is stated for a sidebar without `zIndex`. |
| Sidebar inside a nested ThemeProvider | Presented with the nested provider's theme (B-306). |
| Sidebar without ThemeProvider | Default theme (B-306). |

---

## 13. Acceptance Criteria

### AC-301 - Display by `open` (B-301)

**Given** a Sidebar with content "My content"
**When** `open` is true, then false
**Then** while open the overlay and the panel in its visible state are displayed with the content; when closed nothing of the sidebar remains.

---

### AC-302 - Position (B-302)

**Given** Sidebars with `position` "left", "right" and without `position`
**When** they are open
**Then** the first appears from the left edge and the other two from the right edge.

---

### AC-303 - Outside press (B-303)

**Given** an open Sidebar with `onRemove` and, in turn, `closeOnOutsidePress` as a function returning true, a function returning false, and `false`; and a press on an element carrying the `ignoreAttributeName` attribute
**When** a mouse press is made outside the panel
**Then** `onRemove` is called only for the function returning true on a non-ignored element; it is not called in the other cases.

---

### AC-304 - Scoped presentation (B-304)

**Given** a Sidebar with `root` set to a container element, and one with `root` null
**When** they are open
**Then** the first's overlay and panel are inside the container and the second uses the default presentation.

---

### AC-305 - Floating components above the sidebar (B-305)

**Given** an open Sidebar (default presentation, no `zIndex`) whose content contains a Tooltip and a Popover without `zIndex`, on a page where another area is layered below the Sidebar
**When** the Tooltip is hovered and the Popover is opened
**Then** both contents are visible and painted above the sidebar's overlay and panel.

---

### AC-306 - Theme of origin (B-306)

**Given** a "base" ThemeProvider that contains a "next-dark" ThemeProvider with an open Sidebar, and an open Sidebar directly in the "base" provider
**When** the panels are inspected
**Then** the nested Sidebar is presented with the "next-dark" theme colors and the other with the "base" theme colors.

---

### AC-307 - Independence from mount order (B-305, B-306, B-307)

**Given** a "base" root ThemeProvider with a Sidebar (no `zIndex`), and a "next-dark" ThemeProvider wrapping a side menu that renders a Tooltip, layered below the Sidebar
**When** the menu's Tooltip is rendered or opened before the Sidebar opens, rendered after it in the tree, or in a different order, and the Sidebar is opened with a Tooltip in its content
**Then** in every arrangement the sidebar is presented with the "base" theme colors and its Tooltip is displayed above the sidebar.

---

### AC-308 - No ThemeProvider (B-306)

**Given** an open Sidebar without any ThemeProvider
**When** it is inspected
**Then** it is presented with the default theme colors.

---

### AC-309 - Recognizable floating content (B-308)

**Given** an open Sidebar in the default presentation, under a ThemeProvider and without one
**When** the overlay and panel are queried for their closest ancestor with the attribute `data-floating-ui-portal`
**Then** such an ancestor exists for both.

---

### AC-310 - Use from inside a BottomSheet (B-309)

**Given** an open BottomSheet inside a ThemeProvider with a Sidebar that opens from its body
**When** the Sidebar opens, a press is made inside it, and a touch move is made inside it
**Then** the sidebar is displayed above the sheet, the sheet's `onRemove` is not called, and the touch move is not default-prevented.

---

### Acceptance Criteria Rules

- Every behavior above is covered by at least one criterion.
- Criteria describe consumer-observable outcomes.

---

## 14. Origin of Guarantees

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-301 | B-301 | Supported | reconstructed | nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e `packages/react/src/composite/Sidebar/src/sidebar.spec.tsx` ("THEN should correctly render if open is true", "THEN should not render if open is false") |
| AC-302 | B-302 | Supported | reconstructed | `sidebar.types.ts` `position` ("Side from which the sidebar will appear", default right); Side Modal documentation https://nimbus.nuvemshop.com.br/es-AR/documentation/patterns/side-modal#props |
| AC-303 | B-303 | Supported | reconstructed | `sidebar.spec.tsx` ("WHEN closeOnOutsidePress is a function"); `sidebar.types.ts` `closeOnOutsidePress`, `ignoreAttributeName`; story "withIgnoreAttribute" |
| AC-304 | B-304 | Supported | reconstructed | `sidebar.spec.tsx` ("WHEN root is provided"); `sidebar.types.ts` `root`; story "withRoot" |
| AC-305 | B-305 | Supported | reconstructed | Nimbus zIndex tokens https://nimbus.nuvemshop.com.br/es-AR/documentation/tokens/zIndex (modals and sidebars at 600 and 700, floating components at 800); Sidebar layer values in `packages/core/styles/src/packages/composite/sidebar/nimbus-sidebar.css.ts` at dcea961a3abb65e847e0131e54e4b5136363538e; Modal `zIndex` documentation (base layer below floating components) |
| AC-306 | B-306 | Supported | reconstructed | Themes documentation https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas; `packages/core/styles/src/components/ThemeProvider/ThemeProvider.tsx` at dcea961a3abb65e847e0131e54e4b5136363538e; TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `BottomSheet.tsx` (Modal, Sidebar and Popover treated as belonging to the nearest provider) |
| AC-307 | B-305, B-306, B-307 | Supported | reconstructed | Same sources as AC-305 and AC-306; the documented layer order carries no qualifier about the order in which elements are rendered or opened |
| AC-308 | B-306 | Supported | reconstructed | Themes documentation (default theme without ThemeProvider); `sidebar.spec.tsx` renders Sidebar without a provider |
| AC-309 | B-308 | Supported | reconstructed | TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `BottomSheet/src/bottomSheet.constants.ts`, `hooks/useDismissHandlers.ts`, `hooks/useScrollLock.ts` (presses and touches inside `[data-floating-ui-portal]` are treated as floating content; Sidebar is named among the overlays) |
| AC-310 | B-309 | Supported | reconstructed | TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `BottomSheet/src/hooks/useDismissHandlers.ts` and `hooks/useScrollLock.ts` (they name Popover, Modal and Sidebar as overlays rendered beside the sheet) and `bottomSheet.spec.tsx` (the equivalent Popover and Modal scenarios) |

---

## 15. Compatibility and Migration

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | None. No input added, removed or renamed. | Section 3 |
| Behavior and defaults | In page arrangements where another ThemeProvider's floating container previously held this sidebar or hid a Tooltip or Popover opened from it, the sidebar keeps its own theme and floating components are displayed above it. | B-305 to B-307 |
| Layout and content | None. | Sections 8 and 9 |
| Accessibility and interactions | None. Presses and touches inside the sidebar remain recognizable to first-party consumers. | B-308, B-309 |
| Supported composition | Unchanged. `useTheme` keeps returning the reference to the element that carries the theme and contains the provider's children, together with the current theme name. The scoped presentation (`root`) is unchanged. | Sections 3 and 10 |

- Backward compatibility: Yes.
- Migration required: No.
- Consumer migration steps, when required: Not applicable.

### Rules

- Consumers that open a Sidebar from a BottomSheet keep working without changes (B-308, B-309).

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-301 | B-301 | Render open and closed; assert overlay, panel state and content. | `packages/react/src/composite/Sidebar/src/sidebar.stories.tsx` (basic) | `packages/react/src/composite/Sidebar/src/sidebar.spec.tsx` ("THEN should correctly render if open is true", "THEN should not render if open is false") |
| AC-302 | B-302 | Render each position and assert the edge. | `sidebar.stories.tsx` (basic) | — |
| AC-303 | B-303 | Mouse press outside with each `closeOnOutsidePress` form and on an ignored region. | `sidebar.stories.tsx` (withIgnoreAttribute) | `sidebar.spec.tsx` ("WHEN closeOnOutsidePress is a function") |
| AC-304 | B-304 | Render with `root` element and with null; assert containment. | `sidebar.stories.tsx` (withRoot) | `sidebar.spec.tsx` ("WHEN root is provided") |
| AC-305 | B-305 | In a real browser render, open a Sidebar with a Tooltip and a Popover in its content; assert painted order and visibility. | — | — |
| AC-306 | B-306 | Nest a "next-dark" provider in a "base" one with a Sidebar in each; assert computed colors. | — | — |
| AC-307 | B-305, B-306, B-307 | Arrange the menu provider and the Sidebar in each order listed; assert computed colors and painted order of the sidebar's Tooltip. | — | Partial, DOM structure only: `sidebar.spec.tsx` ("THEN content mounts in its own provider after another provider's sidebar mounted first", "AND content mounts in its own provider when the providers are used in reverse order") assert the portal parent in both orders; computed colors and the tooltip's painted order need a browser and are not verified |
| AC-308 | B-306 | Render a Sidebar without provider; assert default colors. | — | Partial, DOM structure only: `sidebar.spec.tsx` ("AND content without a provider mounts in a body wrapper after a provider's sidebar mounted first") asserts the body wrapper; default colors need a browser and are not verified |
| AC-309 | B-308 | Open with and without a provider; query the closest `[data-floating-ui-portal]` ancestor. | — | `sidebar.spec.tsx` ("THEN content mounts in its own provider after another provider's sidebar mounted first", "AND content without a provider mounts in a body wrapper after a provider's sidebar mounted first") |
| AC-310 | B-309 | Run the BottomSheet scenario with the changed Sidebar against TiendaNube/nimbus-patterns BottomSheet tests. | — | — |

### Rules

- Every Acceptance Criterion appears in the mapping.
- A dash means no reference is supplied; it does not mean the check passed.
