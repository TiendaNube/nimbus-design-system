# Tooltip Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Tooltip shows a short explanatory text next to an anchor element when the pointer hovers that anchor, without taking space in the page layout.

- User need: additional, non-intrusive information about an element.
- Use it for brief plain-text help attached to an anchor. The `content` input is a string.
- Related components: Popover shows arbitrary content and supports click and dismissal; Modal and Sidebar are the layers a Tooltip is displayed above.
- Scope of this contract: the behaviors listed below. Dismissal timing, keyboard and focus triggers, and assistive-technology semantics of Tooltip are not part of this contract.

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Anchor | Yes | The consumer-provided `children`, wrapped so that hover is detected over them. |
| Content | While open | Floating surface that shows the `content` text. |
| Arrow | No | Pointer on the content edge that faces the anchor; present only when `arrow` is true. |

### Rules

- The content is not part of the anchor and is displayed only while the tooltip is open.

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| children | React node | Yes | — | Anchor over which hover opens the tooltip. |
| content | string | Yes | — | Text shown in the tooltip. |
| arrow | boolean | No | false | Whether the arrow is displayed. |
| position | "top" \| "bottom" \| "left" \| "right" | No | bottom | Preferred side of the anchor on which the content appears. |
| maxWidth | string or responsive object (xs, md, lg, xl, xxl) | No | — | Maximum width of the content. |
| className | string | No | — | Additional class names added to the content element. |
| other standard div attributes | HTML attributes | No | — | Applied to the content element (for example `data-testid`). |

### Events

Not applicable — Tooltip exposes no callbacks.

### Actions

Not applicable — Tooltip exposes no explicit actions.

### API Rules

- The theme in which the content is presented and the layer on which it is displayed are not inputs; they follow B-004 to B-007.
- No input was added, removed or renamed by this contract.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| position top / bottom / left / right | Prefers the side of the anchor for the content. | Choose the side that leaves the anchor's surroundings visible. |
| arrow on / off | Shows or hides the arrow. | Use the arrow to make the relation to the anchor explicit. |

### Rules

- Default is position bottom without arrow.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | Initial; the pointer is not hovering the anchor. | Content is not displayed. |
| Open | The pointer hovers the anchor. | Content is displayed with the configured text, position and arrow. |

Other states are not part of this contract.

---

## 6. Behavioral Contract

### B-001 - Opening on hover

When the pointer hovers the anchor, the Tooltip MUST display its content.

### B-002 - Placement and arrow

When the content is displayed, the Tooltip MUST place it on the side given by `position` (default bottom) and MUST show the arrow, on the content edge that faces the anchor, only when `arrow` is true. When there is not enough room on the preferred side, the content MAY be moved to another side or shifted so that it remains within the viewport.

### B-003 - Content customization

When `className`, `maxWidth` or other standard div attributes are provided, the Tooltip MUST apply them to the content element, and `maxWidth` MUST limit the content width.

### B-004 - Layer order

When a Tooltip is opened from an element inside an open Modal in its base layer (`zIndex` omitted or "base") or inside an open Sidebar without a `zIndex` input, both in the default presentation (without `root`), its content MUST be displayed above that Modal's or Sidebar's overlay and container. Inside a Modal with `zIndex="top"`, the Modal's top-layer order applies instead.

### B-005 - Theme of origin

When a Tooltip is rendered inside a ThemeProvider, its content MUST be presented with the theme of the nearest enclosing ThemeProvider of that Tooltip in the component tree.

### B-006 - Independence from other providers and floating elements

B-004 and B-005 MUST hold regardless of how many other ThemeProviders, Tooltips, Popovers, Modals or Sidebars exist on the page, and regardless of the order in which they were rendered or opened. A floating element rendered in another ThemeProvider MUST NOT change the theme or the layer of this tooltip's content.

### B-007 - No ThemeProvider

When a Tooltip is not inside any ThemeProvider, its content MUST be presented with the default theme and B-004 MUST hold.

---

## 7. Interaction Contract

### Pointer

- Hovering the anchor opens the tooltip (B-001).
- Dismissal timing and the behavior while the pointer travels between anchor and content are not part of this contract.

### Keyboard

No key binding is defined by this contract for Tooltip.

### Touch

Not applicable — no touch behavior is evidenced.

### Focus

Tooltip does not define focus entry, movement or restoration in this contract.

---

## 8. Content Contract

### Labels

- `content` is a plain string.

### Supporting Content

Not applicable — Tooltip content is text only.

### Icons

Not applicable — Tooltip renders no icon of its own; the anchor may be an icon.

### Long Content

- `maxWidth` limits the width of the content (B-003).
- Behavior of text beyond the maximum width (wrapping versus truncation) is not part of this contract.

### Localization

Not applicable — no locale-specific behavior is evidenced.

---

## 9. Layout and Responsive Behavior

### Sizing

- `maxWidth` accepts a string or a responsive object (xs, md, lg, xl, xxl).

### Alignment

- The content is aligned to the anchor on the side given by `position` (B-002).

### Overflow

- When the preferred side lacks room, the content stays within the viewport by moving or shifting (B-002).

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| Small viewport that cannot fit the content on the preferred side | Content moves to another side or shifts to remain visible (B-002). |
| `maxWidth` given per breakpoint | The maximum width applies per breakpoint. |

---

## 10. Composition Contract

### Supported Composition

- Any React node as anchor.
- A Tooltip inside the content of a Modal or a Sidebar, and inside any ThemeProvider (B-004 to B-007).

### Unsupported Composition

Not applicable — no unsupported composition is evidenced.

### Nesting Rules

- Nested ThemeProviders: each Tooltip follows its nearest ThemeProvider (B-005).

### Multiple Instances

- Tooltips are independent of each other. The existence, order of rendering or order of opening of other floating elements does not alter a tooltip's theme or layer (B-006).

---

## 11. Accessibility Contract

### Semantics

Not applicable — no role or description linkage is part of this contract.

### Accessible Name

Not applicable.

### Keyboard Access

No keyboard behavior is part of this contract (section 7).

### Focus

No focus behavior is part of this contract (section 7).

### Screen Reader Behavior

Not applicable — no announcement behavior is part of this contract.

### Visual Accessibility

- The content is presented with the colors of the theme given by B-005 and B-007; no other contrast guarantee is part of this contract.

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| Missing optional inputs | Position bottom, no arrow, no maximum width. |
| Tooltip opened inside an open Modal whose page also contains a themed side menu with its own Tooltip | The Modal's tooltip is displayed above the Modal in the theme of the Modal's own ThemeProvider (B-004, B-005, B-006). |
| Tooltip inside an open Modal with `zIndex="top"` | The Modal's top layer is above every floating component (B-004 applies to the base layer only). |
| Tooltip inside a nested ThemeProvider | Presented with the nested provider's theme (B-005). |
| Tooltip with no ThemeProvider | Default theme (B-007). |
| Several tooltips rendered or opened in different orders | Each keeps its own theme and layer (B-006). |

---

## 13. Acceptance Criteria

### AC-001 - Opening on hover (B-001)

**Given** a Tooltip with `content` "Help" and an anchor
**When** the pointer hovers the anchor
**Then** the text "Help" is displayed in the content element.

---

### AC-002 - Position (B-002)

**Given** Tooltips with `position` top, bottom, left, right and without `position`, each with `arrow` true
**When** each is hovered
**Then** the content opens on the requested side (bottom when omitted) and its arrow is placed on the content edge facing the anchor.

---

### AC-003 - Arrow (B-002)

**Given** a Tooltip without `arrow`, and another with `arrow` true
**When** each is hovered
**Then** the first shows no arrow and the second shows an arrow.

---

### AC-004 - Content customization (B-003)

**Given** a Tooltip with `className` "custom-class", `maxWidth` "400px" and a `data-testid` attribute
**When** it is hovered
**Then** the content element carries "custom-class", the `data-testid` attribute and a maximum width of 400px.

---

### AC-005 - Above an open Modal (B-004)

**Given** an open Modal (default presentation, `zIndex` omitted) whose content contains a Tooltip, on a page where another area of the page is layered below the Modal
**When** the Tooltip in the Modal is hovered
**Then** the tooltip content is visible and painted above the Modal's overlay and container.

---

### AC-006 - Above an open Sidebar (B-004)

**Given** an open Sidebar (default presentation, no `zIndex`) whose content contains a Tooltip
**When** the Tooltip in the Sidebar is hovered
**Then** the tooltip content is visible and painted above the Sidebar's overlay and container.

---

### AC-007 - Theme of origin (B-005)

**Given** a page with a ThemeProvider theme "base" that contains a ThemeProvider theme "next-dark", each containing a Tooltip
**When** each tooltip is hovered
**Then** the tooltip in the nested provider is presented with the "next-dark" theme colors and the other with the "base" theme colors.

---

### AC-008 - Independence from mount order (B-004, B-005, B-006)

**Given** a root ThemeProvider (theme "base") containing an open Modal (`zIndex` omitted) whose content has a Tooltip, and a second ThemeProvider (theme "next-dark") that wraps a side menu containing its own Tooltip and that is layered below the Modal
**When** the scenario is arranged with the menu's Tooltip rendered or opened before the Modal opens, rendered after it in the tree, or rendered in a different order than the Modal's, and the Modal's Tooltip is then hovered
**Then** in every arrangement the Modal's tooltip is displayed above the Modal in the "base" theme colors, and the menu's tooltip, when hovered with no Modal open, is presented in the "next-dark" theme colors.

---

### AC-009 - No ThemeProvider (B-007)

**Given** a Tooltip rendered without any ThemeProvider, including one inside an open Modal (`zIndex` omitted)
**When** it is hovered
**Then** its content is presented with the default theme colors, and inside the Modal it is displayed above the Modal.

---

### Acceptance Criteria Rules

- Every behavior above is covered by at least one criterion.
- Criteria describe consumer-observable outcomes.

---

## 14. Origin of Guarantees

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001 | Supported | reconstructed | nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e `packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx` ("THEN should display tooltip if anchor receives hover event"); Tooltip documentation example https://nimbus.nuvemshop.com.br/es-AR/documentation/atomic-components/tooltip#example-default |
| AC-002 | B-002 | Supported | reconstructed | `tooltip.spec.tsx` position tests (top, bottom, left, right with arrow styles); `tooltip.types.ts` `position` default bottom; `CHANGELOG.md` 2.5.0 (overflow fix on small screens), all at dcea961a3abb65e847e0131e54e4b5136363538e under `packages/react/src/atomic/Tooltip` |
| AC-003 | B-002 | Supported | reconstructed | `tooltip.spec.tsx` ("should not display arrow if \"arrow\" is not passed" and arrow assertions in position tests); `tooltip.types.ts` `arrow` default false |
| AC-004 | B-003 | Supported | reconstructed | `tooltip.spec.tsx` ("should set correctly the className and width using the sprinkle"); `CHANGELOG.md` 2.5.0 (maxWidth) and 2.7.0 (className forwarding) |
| AC-005 | B-004 | Supported | established | Nimbus zIndex tokens https://nimbus.nuvemshop.com.br/es-AR/documentation/tokens/zIndex (floating components such as toasts, tooltips and popovers at 800; modals and sidebars at 600 and 700); Modal `zIndex` documentation https://nimbus.nuvemshop.com.br/es-AR/documentation/composite-components/modal#props (base layer is below floating components such as tooltip, toast and popover) |
| AC-006 | B-004 | Supported | reconstructed | zIndex tokens documentation (sidebars commonly at 600 and 700, floating components at 800); Sidebar layer values in `packages/core/styles/src/packages/composite/sidebar/nimbus-sidebar.css.ts` at dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-007 | B-005 | Supported | reconstructed | Themes documentation https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas (ThemeProvider applies the selected theme to the application's components); `useTheme` exposes the provider element to components (`packages/core/styles/src/components/ThemeProvider/ThemeProvider.tsx` at dcea961a3abb65e847e0131e54e4b5136363538e); first-party consumer code and tests in TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `packages/react/src/components/BottomSheet/src/BottomSheet.tsx` and `bottomSheet.spec.tsx` treat floating content as belonging to the nearest provider |
| AC-008 | B-004, B-005, B-006 | Supported | established | Same sources as AC-005 and AC-007; the documented layer order carries no qualifier about the order in which elements are rendered or opened |
| AC-009 | B-007 | Supported | reconstructed | Themes documentation (without ThemeProvider the default theme applies); BottomSheet fallback without ThemeProvider in TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `BottomSheet.tsx`; Tooltip at dcea961a3abb65e847e0131e54e4b5136363538e renders without a provider in `tooltip.spec.tsx` |

---

## 15. Compatibility and Migration

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | None. No input added, removed or renamed. | Section 3 |
| Behavior and defaults | In page arrangements where another ThemeProvider's floating container previously held this tooltip's content, the tooltip is displayed above the Modal or Sidebar and in its own theme, as B-004 to B-006 state. | B-004, B-005, B-006 |
| Layout and content | None. | Sections 8 and 9 |
| Accessibility and interactions | None. | Sections 7 and 11 |
| Supported composition | Unchanged. Consumers that read the provider element through `useTheme` keep receiving the same value: a reference to the element that carries the theme and contains the provider's children, together with the current theme name. | Section 10 |

- Backward compatibility: Yes.
- Migration required: No.
- Consumer migration steps, when required: Not applicable.

### Rules

- Floating content of Popover, Modal and Sidebar that first-party consumers rely on is covered in those components' contracts; Tooltip adds no obligation of that kind.

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Hover the anchor and assert the content text is displayed. | `packages/react/src/atomic/Tooltip/src/tooltip.stories.tsx` (basic) | `packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx` ("THEN should display tooltip if anchor receives hover event") |
| AC-002 | B-002 | Hover each position variant and assert side and arrow placement. | `tooltip.stories.tsx` (top, bottom, right, left) | `tooltip.spec.tsx` (position tests) |
| AC-003 | B-002 | Hover with and without `arrow` and assert arrow presence. | — | `tooltip.spec.tsx` ("should not display arrow if \"arrow\" is not passed", position tests) |
| AC-004 | B-003 | Provide className, maxWidth and data attribute and assert them on the content element. | — | `tooltip.spec.tsx` ("should set correctly the className and width using the sprinkle") |
| AC-005 | B-004 | In a real browser render, open a Modal with a Tooltip in its content under a ThemeProvider and hover the tooltip; assert painted order and visibility at the tooltip's position. | — | Partial, DOM structure only: `packages/react/src/composite/Modal/src/modal.spec.tsx` ("AND a tooltip inside the modal mounts in the modal's provider after another provider's tooltip mounted first") asserts the portal parent; painted order and visibility need a browser and are not verified |
| AC-006 | B-004 | Same as AC-005 with a Sidebar. | — | — |
| AC-007 | B-005 | Nest a "next-dark" ThemeProvider in a "base" one, hover each Tooltip, assert computed colors. | — | — |
| AC-008 | B-004, B-005, B-006 | Arrange the menu provider and the Modal in each order listed, hover the Modal's tooltip and the menu's tooltip, assert painted order and computed colors. | — | Partial, DOM structure only: `tooltip.spec.tsx` ("THEN content mounts in its own provider after another provider's tooltip mounted first", "AND content mounts in its own provider when the providers are used in reverse order") assert the portal parent in both orders; painted order and computed colors need a browser and are not verified |
| AC-009 | B-007 | Render a Tooltip without a ThemeProvider, with and without a Modal, hover, assert default colors and painted order. | — | Partial, DOM structure only: `tooltip.spec.tsx` ("AND content without a provider mounts in a body wrapper after a provider's tooltip mounted first") asserts the body wrapper; default colors and painted order need a browser and are not verified |

### Rules

- Every Acceptance Criterion appears in the mapping.
- A dash means no reference is supplied; it does not mean the check passed.
