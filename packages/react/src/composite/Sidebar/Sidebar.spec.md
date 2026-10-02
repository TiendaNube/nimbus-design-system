# Sidebar Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

The Sidebar presents a panel that slides in from the left or right edge of the viewport (or of a consumer-provided area) over a dimmed overlay, for secondary content, details or short flows that should not replace the current page.

- Use it for supplementary content or tasks that keep the user in context.
- Do not use it for a brief text-only tip (Tooltip), for contextual content anchored to a trigger (Popover), or for content that needs a centered dialog (Modal).
- The Sidebar is a floating element: it is presented above page content, below tooltips, toasts and popovers, and in the theme scope of the place where it is declared (B-005, B-006).

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Overlay | Yes (while open) | The dimmed layer behind the panel. |
| Container | Yes (while open) | The panel holding the `children`, attached to the left or right edge. |
| Header, Body, Footer regions | No | Optional content regions offered as Sidebar.Header (title or children), Sidebar.Body and Sidebar.Footer. Their documented inputs are title, children and padding; their behavior is not further defined by this contract. |

### Rules

- While the Sidebar is closed nothing is rendered.
- On the default path the Sidebar is portaled outside its declaration point (B-005, B-006); with a `root` it is rendered inside that element (B-004).

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| children | renderable content | Yes | — | The content of the Sidebar. |
| open | boolean | No | — | Whether the Sidebar is shown; when false nothing is rendered. Behavior when omitted is not part of this contract. |
| onRemove | function | No | — | Called when the Sidebar requests to be closed. |
| position | "right" or "left" | No | "right" | Edge from which the Sidebar appears. |
| maxWidth | string or breakpoint object | No | "375px" | Maximum width of the panel. |
| padding | "base", "none" or "small" | No | "base" | Space around the panel content area. |
| closeOnOutsidePress | boolean, or function receiving the press event and returning a boolean | No | true | Controls whether a press outside the Sidebar requests closing. |
| ignoreAttributeName | string | No | "data-nimbus-outside-press-ignore" | Name of an attribute; a press on an element carrying it (or inside one) does not request closing. |
| zIndex | layer token value or breakpoint object | No | — | Stack order of the panel, as documented in the package documentation. |
| root | element or null | No | — | When an element is provided, the Sidebar is rendered inside it (B-004); null or omitted selects the default path. |
| className | string | No | — | Additional class names applied to the container. |
| Other standard element attributes | element attributes | No | — | Applied to the container element. |

### Events

| Event | Payload | Trigger |
|---|---|---|
| onRemove | None guaranteed | An allowed outside press occurs while the Sidebar is open (B-002). |

### Actions

Not applicable.

### API Rules

- The Sidebar is controlled by the consumer through `open`; `onRemove` only reports the request to close.
- The scroll-locking input `needRemoveScroll` and the default of `open` are not part of this contract.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| position "right" / "left" | Edge of appearance | Match the layout |
| Default portaled path | Rendered in the theme scope of the declaration point | Default |
| Scoped path (`root`) | Rendered inside a consumer element, with an overlay limited to that element | A sidebar confined to an area |
| Padding "base" / "none" / "small" | Space around content | Match the content |

### Rules

- Variants combine freely.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | `open` false | Nothing is rendered. |
| Open | `open` true | Overlay and container are rendered and the container is visible with the `children`. |

Other states: Not applicable.

---

## 6. Behavioral Contract

### B-001 - Visibility and content

When `open` is false the component MUST render nothing. When `open` is true the component MUST render the overlay and a visible container holding the `children`.

### B-002 - Dismissal by outside press

When the Sidebar is open and `onRemove` is provided, a press outside the Sidebar MUST call `onRemove` when `closeOnOutsidePress` is true, or is a function that returns true for the event, and the press target is neither an element carrying the `ignoreAttributeName` attribute nor inside one. When `closeOnOutsidePress` is false, or the function returns false, or the press is on an ignored region, `onRemove` MUST NOT be called.

### B-003 - Position, width and padding

When open, the component MUST attach the container to the edge given by `position` (default "right"), MUST bound its width by `maxWidth` (default "375px"), MUST apply `padding` (default "base"), and MUST apply `className` and other element attributes to the container.

### B-004 - Scoped path

When `root` is an element, the component MUST render the overlay and the container inside that element, regardless of any theme provider (the placement rule of B-006 does not apply), with the overlay limited to the area of `root`. When `root` is null or omitted it MUST use the default path.

### B-005 - Layering

On the default path, when `zIndex` is not provided, the Sidebar MUST be presented at the sidebar layer of the Nimbus layering scale (overlay and container): above page content, and below floating components such as tooltips, toasts and popovers, and below a Modal presented at its "top" layer. Floating components displayed from inside a Sidebar MUST therefore be presented above it. This ordering applies among Nimbus layers presented by the application at its layout root; it is not a guarantee against ordering imposed by stacking contexts that the consuming application creates around a theme provider element. The relative order of a Sidebar and a Modal at its "base" layer is not part of this contract.

### B-006 - Placement in the theme scope of the origin

On the default path, when the Sidebar is open:

- If a theme provider encloses the place where the Sidebar is declared, the overlay and container MUST be rendered inside the element of the nearest enclosing theme provider and MUST NOT be rendered inside the element of any other theme provider (a provider nested inside the enclosing one, a sibling provider, or a provider that was mounted earlier in the document). The Sidebar therefore uses the theme of its origin. This holds regardless of the order in which providers or other floating elements were mounted or displayed.
- If no theme provider encloses it, the Sidebar MUST still be displayed (B-001) and no theme scope is carried.

---

## 7. Interaction Contract

### Pointer

- Pressing the primary pointer button outside the Sidebar requests closing when allowed by `closeOnOutsidePress` and `ignoreAttributeName` (B-002); the press is evaluated when the button goes down.

### Keyboard

No key binding is individually contracted. Dismissal gestures other than the outside press of B-002 (for example the Escape key), their listening scope and their propagation are not part of this contract; a combined outcome when a Sidebar is open together with another floating element that handles the same key is not part of this contract.

### Touch

No touch-specific behavior is part of this contract.

### Focus

No focus movement, trapping or restoration is part of this contract.

---

## 8. Content Contract

### Labels

- The header title is provided by the consumer (Sidebar.Header `title`); the component adds no text of its own.

### Supporting Content

- Sidebar.Header, Sidebar.Body and Sidebar.Footer hold header, body and footer content.

### Icons

Not applicable.

### Long Content

- Content taller than the container is not governed by this contract.

### Localization

Not applicable — content is provided by the consumer.

---

## 9. Layout and Responsive Behavior

### Sizing

- The panel is bounded by `maxWidth` (default "375px").

### Alignment

- The panel is attached to the left or right edge according to `position`.

### Overflow

- Not specified beyond B-003.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| `maxWidth` given as a breakpoint object | The maximum width follows the active breakpoint. |

---

## 10. Composition Contract

### Supported Composition

- Any content as `children`, including Tooltips and Popovers inside the Sidebar, and the Sidebar.Header, Sidebar.Body and Sidebar.Footer regions.
- Declaration inside zero, one or several theme providers, nested or side by side.
- A Sidebar alongside a Modal.

### Unsupported Composition

- Not applicable beyond the exclusions stated in section 7.

### Nesting Rules

- A Sidebar declared inside a theme provider nested in another provider is placed according to B-006.

### Multiple Instances

- Several Sidebars may be declared; each is rendered according to B-004 or B-006 independently. Which one handles an outside press when several are open is not part of this contract.

---

## 11. Accessibility Contract

### Semantics

The existing evidence (tests, stories and published pages) establishes no role, accessible-name or description behavior for the Sidebar container. This contract makes no guarantee about them.

### Accessible Name

Not defined by this contract.

### Keyboard Access

Not individually contracted (section 7).

### Focus

No focus behavior is defined (section 7).

### Screen Reader Behavior

Not defined by this contract.

### Visual Accessibility

Contrast, reduced motion, zoom and text-resizing behavior are not part of this contract.

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| `onRemove` omitted | An outside press has no callback to call; the consumer's `open` state is unchanged by the component. |
| `closeOnOutsidePress` function returns false | `onRemove` is not called (B-002). |
| Press inside a region carrying the ignore attribute | `onRemove` is not called (B-002). |
| `root` null | Default path (B-004). |
| Tooltip or Popover displayed from inside a Sidebar | Presented above the Sidebar, in the theme scope of the Sidebar's origin (B-005, B-006). |
| Another provider already hosts displayed or earlier-mounted floating content, then the Sidebar opens | The Sidebar is placed inside its own nearest enclosing provider element (B-006). |
| No theme provider | Displayed without a theme scope (B-006). |
| `open` omitted | Not part of this contract. |

---

## 13. Acceptance Criteria

### AC-001 - Visibility and content

**Given**
A Sidebar with `open` true and content "My content", and a Sidebar with `open` false.

**When**
Each is rendered.

**Then**
The open Sidebar renders its overlay and a visible container with "My content"; the closed Sidebar renders no overlay (B-001).

---

### AC-002 - Position, width and padding

**Given**
Open Sidebars with `position` "left" and "right", with `maxWidth` given, with each `padding` value, and with none of these given.

**When**
They are rendered.

**Then**
Each container is attached to the requested edge, bounded by the requested maximum width and carries the requested padding; the defaults are "right", "375px" and "base" (B-003).

---

### AC-003 - Outside press options

**Given**
An open Sidebar with `onRemove` and `closeOnOutsidePress` as a function returning false, one as a function returning true, one with an element carrying the ignore attribute, and one with `closeOnOutsidePress` false.

**When**
A press occurs outside the Sidebar, and on the element carrying the ignore attribute.

**Then**
`onRemove` is not called when the function returns false, when `closeOnOutsidePress` is false, or when the press is on the ignored region; it is called when the function returns true and the press is not on an ignored region (B-002).

---

### AC-004 - Scoped path

**Given**
An open Sidebar with `root` set to an element, and an open Sidebar with `root` null.

**When**
They are rendered.

**Then**
The first renders its overlay and content inside the root element; the second is displayed on the default path (B-004).

---

### AC-005 - Layer order

**Given**
A Sidebar is open with `zIndex` not provided, with a Tooltip and a Popover whose triggers are inside it, and the nearest enclosing theme provider element is not inside a stacking context created by the consuming application.

**When**
The tooltip and popover are displayed.

**Then**
The Sidebar overlay and container are presented above page content and below the displayed tooltip and popover, and below a Modal with `zIndex` "top" on its default path (B-005).

---

### AC-006 - Placement in the theme scope of the origin

**Given**
An application area wrapped by a theme provider with the "dark" theme containing an open Sidebar on the default path, and an open Sidebar outside any theme provider.

**When**
The Sidebars are open.

**Then**
The first Sidebar's overlay and container are inside the element of that provider and use its theme; the second is displayed without a theme scope (B-006).

---

### AC-007 - Nested and sibling theme providers

**Given**
An outer theme provider P (theme "base") containing a region wrapped by a nested theme provider Q (theme "dark") that holds a displayed or earlier-mounted floating element such as a Tooltip, a Popover or a Modal, and a Sidebar declared in P outside Q that is opened afterwards. Repeat with Q placed after, and then beside, the Sidebar's declaration point in document order.

**When**
The Sidebar is opened.

**Then**
The Sidebar's overlay and container are inside the element of P and not inside the element of Q (B-006).

---

## 14. Origin of Guarantees

Revision R = TiendaNube/nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e. Repository paths below are relative to R. Published pages are the Nimbus documentation at nimbus.nuvemshop.com.br (es-AR).

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001 | Supported | reconstructed | packages/react/src/composite/Sidebar/src/sidebar.spec.tsx (renders the submitted content; renders overlay and a visible container when open; renders nothing when closed); sidebar.stories.tsx (basic) |
| AC-002 | B-003 | Supported | reconstructed | packages/react/src/composite/Sidebar/src/sidebar.docs.json and sidebar.types.ts (position, maxWidth and padding with their defaults); sidebar.stories.tsx (withPadding) |
| AC-003 | B-002 | Supported | reconstructed | sidebar.spec.tsx (closeOnOutsidePress function returning false, ignored attribute region, function returning true); sidebar.stories.tsx (withIgnoreAttribute); sidebar.docs.json (closeOnOutsidePress and ignoreAttributeName) |
| AC-004 | B-004 | Supported | reconstructed | sidebar.spec.tsx (root renders inside the container; null root keeps the default behavior); sidebar.stories.tsx (withRoot) |
| AC-005 | B-005 | Supported | reconstructed | Published zIndex tokens page (600 overlays and 700 modals and sidebars, 800 floating components such as toasts, tooltips and popovers, 1000 and 1100 reserved for the Modal top layer); published Modal props page (floating components above the base modal layer; top layer above all other floating components); packages/core/styles/src/packages/composite/sidebar/nimbus-sidebar.css.ts (overlay layer 600, container layer 700); packages/react/src/composite/Modal/src/modal.stories.tsx (modalOverSidebar story text) |
| AC-006 | B-006 | Supported | reconstructed | .storybook/theme/theme.tsx (every story is wrapped in a theme provider that toggles "dark" and "base"); packages/core/styles/src/components/ThemeProvider/contexts/ThemeProviderContext/themeProviderContext.types.ts (the provider exposes its element for portaled content); packages/react/src/composite/Sidebar/src/Sidebar.tsx (default path is mounted in the provider element obtained from the theme context); sidebar.spec.tsx (default path renders without a provider). Evidence is indirect: no test or page states the portaled-theme behavior in terms of nested providers. |
| AC-007 | B-006 | Supported | reconstructed | Same sources as AC-006, applied to the nearest enclosing provider obtained from the theme context. |

### Rules

- Every Acceptance Criterion has at least one origin row.
- Keyboard, focus and role exclusions in sections 7 and 11 are scope exclusions drawn from the absence of such behavior in tests, stories and published pages. The default of `open` and the scroll-locking input are excluded because package documentation and tests do not agree on them.

---

## 15. Compatibility and Migration

There is no previously published component contract to migrate from.

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | None. | §3 |
| Behavior and defaults | Placement of the default-path Sidebar follows B-006 in applications that use several or nested theme providers; defaults are unchanged. | B-006, AC-007 |
| Layout and content | None. | §8, §9 |
| Accessibility and interactions | None. | §7, §11 |
| Supported composition | Use inside nested or sibling theme providers is covered by B-006. | §10 |

- Backward compatibility: Existing inputs, defaults, the `root` input and the documented layer scale are unchanged.
- Migration required: No
- Consumer migration steps, when required: Not applicable.

### Rules

- The `root` path is unchanged.

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Render open and closed Sidebars; check overlay, visible container and content. | packages/react/src/composite/Sidebar/src/sidebar.stories.tsx (basic) | packages/react/src/composite/Sidebar/src/sidebar.spec.tsx (open and closed tests) |
| AC-002 | B-003 | Render each position, maxWidth and padding and none; check edge, width bound and padding. | packages/react/src/composite/Sidebar/src/sidebar.stories.tsx (withPadding) | — |
| AC-003 | B-002 | Press outside and on an ignored region with each `closeOnOutsidePress` value; check whether `onRemove` is called. | packages/react/src/composite/Sidebar/src/sidebar.stories.tsx (withIgnoreAttribute) | packages/react/src/composite/Sidebar/src/sidebar.spec.tsx (closeOnOutsidePress function tests) |
| AC-004 | B-004 | Render with an element root and a null root; check where content appears. | packages/react/src/composite/Sidebar/src/sidebar.stories.tsx (withRoot) | packages/react/src/composite/Sidebar/src/sidebar.spec.tsx (root tests) |
| AC-005 | B-005 | In a browser, open a Sidebar with a displayed tooltip and popover inside it; check painted order, and against a top-layer Modal. | — | — |
| AC-006 | B-006 | Render Sidebars inside a "dark" provider and outside any provider; check ancestry and theme. | — | — |
| AC-007 | B-006 | Build the P / nested Q structure in each document order with floating content already displayed in Q; open the Sidebar and check its provider ancestor. | — | — |
