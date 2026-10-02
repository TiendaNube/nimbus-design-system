# Tooltip Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

The Tooltip shows a short, non-interactive text message next to an anchor element when the pointer rests on that anchor. It adds information about the anchor without occupying layout space.

- Use it for brief explanatory text tied to an element.
- Do not use it for actions, interactive content or rich content; the content is a plain text string. A Popover is the component for contextual content that can contain actions.
- The Tooltip is a floating element: it is presented above page content and is placed in the theme scope of the place where it is used (B-004, B-005).

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Anchor | Yes | The consumer-provided element(s) that the tooltip describes. The anchor is wrapped in a container whose width fits its content. |
| Tooltip content | Yes (while displayed) | The floating text panel. It exists only while the tooltip is displayed. |
| Arrow | No | A pointer on the content, facing the anchor. Present only when requested. |

### Rules

- The tooltip content is not part of the anchor's layout flow; it is presented in a floating layer.
- Before the tooltip is displayed, no tooltip content is present.

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| children | renderable content | Yes | — | The anchor the tooltip describes. |
| content | string | Yes | — | The text shown in the tooltip. |
| arrow | boolean | No | false | Shows an arrow on the tooltip content when true. |
| position | "top" / "bottom" / "left" / "right" | No | "bottom" | Preferred side of the anchor on which the content is placed. |
| maxWidth | string or responsive object keyed by breakpoint (xs, md, lg, xl, xxl) | No | — | Maximum width of the tooltip content. |
| className | string | No | — | Additional class names applied to the tooltip content. |
| Other standard element attributes | element attributes | No | — | Applied to the tooltip content element. |

### Events

Not applicable — the component exposes no callbacks.

### Actions

Not applicable — the component exposes no explicit actions.

### API Rules

- The tooltip is not controlled by the consumer: it is displayed by pointer hover only.
- The `content` input is text only; interactive content is not supported.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| position top / bottom / left / right | Chooses the preferred side of the anchor | Match the free space around the anchor |
| with arrow / without arrow | Shows or hides the arrow | Make the relationship with the anchor explicit |

### Rules

- Position and arrow combine freely.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | Initial state, or the pointer is not over the anchor | No tooltip content is present. |
| Open | The pointer rests on the anchor | The tooltip content is displayed (B-001). |

Hover, focus, disabled, error, loading and empty states: Not applicable — the component defines no such states.

---

## 6. Behavioral Contract

### B-001 - Display on pointer hover

When the pointer rests on the anchor, the component MUST display the tooltip content containing the `content` text. While the anchor is not hovered, the component MUST NOT display tooltip content.

### B-002 - Placement and arrow

When displayed, the component MUST place the tooltip content on the side of the anchor given by `position` (default "bottom") using viewport-fixed positioning. When `arrow` is true the component MUST render an arrow on the content oriented toward the anchor for the chosen side; when `arrow` is false or omitted it MUST NOT render an arrow.

### B-003 - Content, width and attributes

When displayed, the component MUST show the `content` text, MUST apply `maxWidth` as the maximum width of the content, MUST apply `className` to the content, and MUST apply other element attributes to the content element.

### B-004 - Layering

When displayed, the tooltip content MUST be presented at the floating layer of the Nimbus layering scale: above content at the base modal layer and the sidebar layer (a Modal with `zIndex` "base" and a Sidebar), and below a Modal presented at its "top" layer on its default portaled path. This ordering applies among Nimbus layers presented by the application at its layout root; it is not a guarantee against ordering imposed by stacking contexts that the consuming application creates around a theme provider element.

### B-005 - Placement in the theme scope of the origin

When the tooltip content is displayed:

- If a theme provider encloses the anchor, the content MUST be rendered inside the element of the nearest enclosing theme provider and MUST NOT be rendered inside the element of any other theme provider (a provider nested inside the enclosing one, a sibling provider, or a provider that was mounted earlier in the document). The content therefore uses the theme of the place where the tooltip is used. This holds regardless of the order in which providers or other floating elements were mounted or displayed.
- If no theme provider encloses the anchor, the content MUST still be displayed (B-001) and no theme scope is carried.

---

## 7. Interaction Contract

### Pointer

- Resting the pointer on the anchor displays the tooltip (B-001).

### Keyboard

No keyboard behavior is part of this contract; the tooltip is displayed by pointer hover (B-001).

### Touch

No touch-specific behavior is part of this contract.

### Focus

No focus behavior is part of this contract; displaying the tooltip by keyboard focus is not guaranteed.

---

## 8. Content Contract

### Labels

- `content` is a plain text string.

### Supporting Content

Not applicable — the tooltip has no supporting content.

### Icons

Not applicable.

### Long Content

- `maxWidth` limits the width of the content; longer text wraps within that width. When `maxWidth` is omitted the content width is not bounded by the component.

### Localization

- The component adds no text of its own; translated `content` is displayed as provided. Right-to-left behavior is not part of this contract.

---

## 9. Layout and Responsive Behavior

### Sizing

- The anchor container fits the width of the anchor. The tooltip content fits its text up to `maxWidth`.

### Alignment

- The content is aligned to the side chosen by `position`, relative to the anchor.

### Overflow

- Not applicable beyond B-002; the content is placed with viewport-fixed positioning.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| `maxWidth` given as a breakpoint object | The maximum width follows the active breakpoint. |

---

## 10. Composition Contract

### Supported Composition

- Any renderable element as the anchor, including elements inside a Modal, a Sidebar, a Popover or an application area wrapped by a theme provider.
- Use inside zero, one or several theme providers, nested or side by side.

### Unsupported Composition

- Interactive content inside the tooltip is not supported.

### Nesting Rules

- A tooltip inside a theme provider nested in another theme provider is placed according to B-005.

### Multiple Instances

- Several tooltips may exist on one page; each displays its own content next to its own anchor, and each is placed according to B-005 independently of the others.

---

## 11. Accessibility Contract

### Semantics

The existing evidence establishes no role, accessible-name or announcement behavior for the tooltip. This contract makes no guarantee about them.

### Accessible Name

Not defined by this contract.

### Keyboard Access

Displaying the tooltip by keyboard is not part of this contract (section 7).

### Focus

No focus behavior is defined (section 7).

### Screen Reader Behavior

Not defined by this contract.

### Visual Accessibility

Contrast, reduced motion, zoom and text-resizing behavior are not part of this contract; the content uses the theme in effect (B-005).

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| Long content | Wraps within `maxWidth` (section 8). |
| Missing optional inputs | Defaults apply: no arrow, bottom side, no explicit maximum width. |
| Anchor inside a Modal | Content is displayed in the theme scope of the Modal's origin and above the Modal when it uses the base layer (B-004, B-005). |
| Nested theme providers | Content is placed inside the nearest enclosing provider element, not another provider's (B-005). |
| Another provider already hosts displayed or earlier-mounted floating content | The tooltip is still placed inside its own nearest enclosing provider element (B-005). |
| No theme provider | Content is displayed without a theme scope (B-005). |
| Keyboard or touch use | No tooltip is guaranteed (section 7). |

---

## 13. Acceptance Criteria

### AC-001 - Display on hover

**Given**
A Tooltip with `content` "Text" and an anchor, with the pointer not over the anchor.

**When**
The pointer rests on the anchor.

**Then**
No tooltip content is present before the hover, and after the hover the tooltip content containing "Text" is displayed (B-001). The same holds when no theme provider encloses the anchor (B-005).

---

### AC-002 - Placement and arrow

**Given**
A Tooltip with `arrow` true and `position` set to each of "top", "bottom", "left" and "right" in turn, and a Tooltip with `arrow` omitted.

**When**
Each tooltip is displayed by hovering its anchor.

**Then**
The content is positioned with viewport-fixed positioning on the requested side and the arrow is oriented toward the anchor for that side; the tooltip with `arrow` omitted shows no arrow (B-002).

---

### AC-003 - Content, width and attributes

**Given**
A Tooltip with `maxWidth` "400px", `className` "custom-class" and an extra element attribute.

**When**
The tooltip is displayed.

**Then**
The content element carries the class name and the attribute and its maximum width is 400px (B-003; §3 Public API).

---

### AC-004 - Layer order

**Given**
A Modal with `zIndex` "base" is open and a Tooltip whose anchor is inside the Modal, and the nearest enclosing theme provider element is not inside a stacking context created by the consuming application.

**When**
The tooltip is displayed.

**Then**
The tooltip content is presented above the Modal overlay and the Modal container; a Modal with `zIndex` "top" on its default portaled path is presented above the tooltip content (B-004).

---

### AC-005 - Placement in the theme scope of the origin

**Given**
An application area wrapped by a theme provider with the "dark" theme, containing a Tooltip, and a second Tooltip outside any theme provider.

**When**
Each tooltip is displayed.

**Then**
The first tooltip's content is inside the element of that provider and uses its theme; the second tooltip's content is displayed without a theme scope (B-005).

---

### AC-006 - Nested and sibling theme providers

**Given**
An outer theme provider P (theme "base") containing a region wrapped by a nested theme provider Q (theme "dark") that holds a Tooltip already displayed or mounted earlier, and a Tooltip whose anchor lies in P outside Q. Repeat with Q placed after, and then beside, the second anchor in document order.

**When**
Each tooltip is displayed, in either order.

**Then**
The tooltip whose anchor lies in P outside Q is inside the element of P and not inside the element of Q; the tooltip whose anchor lies in Q is inside the element of Q (B-005).

---

### AC-007 - Tooltip inside a Modal with a themed side area

**Given**
An outer theme provider P containing a nested theme provider Q that holds a Tooltip (for example a themed side menu), and later a Modal with `zIndex` "base" opened in P with a Tooltip inside it.

**When**
The tooltip inside the Modal is displayed.

**Then**
Its content is inside the element of P (not Q), uses the theme of P, and is presented above the Modal overlay and container (B-004, B-005).

---

## 14. Origin of Guarantees

Revision R = TiendaNube/nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e. Repository paths below are relative to R. Published pages are the Nimbus documentation at nimbus.nuvemshop.com.br (es-AR).

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001 | Supported | reconstructed | packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx (display on hover, rendered without a theme provider); packages/react/src/atomic/Tooltip/src/tooltip.stories.tsx (hover anchor stories) |
| AC-002 | B-002 | Supported | reconstructed | tooltip.spec.tsx position tests (fixed positioning and arrow orientation for top, bottom, left, right; no arrow when omitted); tooltip.stories.tsx top/bottom/left/right stories |
| AC-003 | B-003, §3 Public API | Supported | reconstructed | tooltip.spec.tsx (className, maxWidth and attribute pass-through test); packages/react/src/atomic/Tooltip/src/tooltip.docs.json and tooltip.types.ts (inputs and defaults); packages/react/src/atomic/Tooltip/CHANGELOG.md 2.7.0 (className forwarding) |
| AC-004 | B-004 | Supported | established | Published Modal props page (zIndex "base": above the page, below floating components such as tooltip, toast and popover; "top": above all other floating components, reserved for Modal, default portaled path only), also in packages/react/src/composite/Modal/src/modal.types.ts; published zIndex tokens page (600 and 700 for modals and sidebars, 800 for floating components such as toasts, tooltips and popovers, 1000 and 1100 for the Modal top layer); packages/core/styles/src/packages/atomic/tooltip/nimbus-tooltip.css.ts (content layer 800); packages/react/src/composite/Modal/src/modal.stories.tsx (modalOverSidebar story text) |
| AC-005 | B-005 | Supported | reconstructed | .storybook/theme/theme.tsx (every story is wrapped in a theme provider that toggles "dark" and "base"); packages/core/styles/src/components/ThemeProvider/contexts/ThemeProviderContext/themeProviderContext.types.ts (the provider exposes its element for portaled content); packages/react/src/atomic/Tooltip/src/Tooltip.tsx (floating content is mounted in the provider element obtained from the theme context); published themes page (ThemeProvider applies and switches themes; the light theme applies without a provider); tooltip.spec.tsx (display without a provider). Evidence is indirect: no test or page states the portaled-theme behavior in terms of nested providers. |
| AC-006 | B-005 | Supported | reconstructed | Same sources as AC-005, applied to the nearest enclosing provider obtained from the theme context. |
| AC-007 | B-004, B-005 | Supported | reconstructed | Combination of the AC-004 and AC-005 sources. |

### Rules

- Every Acceptance Criterion has at least one origin row.
- Section 7 and section 11 limitations (no keyboard, touch, focus or role behavior) are scope exclusions drawn from the absence of such behavior in tests, stories and published pages.

---

## 15. Compatibility and Migration

There is no previously published component contract to migrate from.

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | None. | §3 |
| Behavior and defaults | Placement of displayed content follows B-005 in applications that use several or nested theme providers; defaults are unchanged. | B-005, AC-006, AC-007 |
| Layout and content | None. | §8, §9 |
| Accessibility and interactions | None. | §7, §11 |
| Supported composition | Use inside nested or sibling theme providers is covered by B-005. | §10 |

- Backward compatibility: Existing inputs, defaults and the documented layer scale are unchanged.
- Migration required: No
- Consumer migration steps, when required: Not applicable.

### Rules

- Container identifiers used internally by the component are not part of the Tooltip's public API.

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Hover the anchor, then check that the content with the given text is displayed, with and without an enclosing theme provider. | packages/react/src/atomic/Tooltip/src/tooltip.stories.tsx (basic) | packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx (display on hover) |
| AC-002 | B-002 | Hover anchors with each position and arrow setting; check side, fixed positioning and arrow orientation. | packages/react/src/atomic/Tooltip/src/tooltip.stories.tsx (top, bottom, left, right) | packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx (position and arrow tests) |
| AC-003 | B-003, §3 Public API | Display a tooltip with maxWidth, className and an extra attribute; check the content element. | — | packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx (className and width test) |
| AC-004 | B-004 | With a base-layer Modal open, display a tooltip from inside it in a browser; check painted order against the Modal overlay and container, and against a top-layer Modal. | packages/react/src/composite/Modal/src/modal.stories.tsx (withThemedSideArea) (manual browser scenario run during Construction; no automated painted-order test) | — |
| AC-005 | B-005 | Render a tooltip inside a "dark" theme provider and one outside any provider; check the ancestor of each displayed content element and the applied theme. | — | packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx ("WHEN displayed inside a dark provider or outside any provider"; ancestry only, computed theme colors checked only in the manual browser scenario of packages/react/src/composite/Modal/src/modal.stories.tsx (withThemedSideArea)) |
| AC-006 | B-005 | Build the P / nested Q structure in each document order; display each tooltip and check that its content element's nearest provider ancestor is the expected one. | — | packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx ("WHEN Q already displayed a tooltip and a tooltip mounts later in P", four document orders); packages/react/src/common/hooks/usePortalHost/usePortalHost.spec.tsx (nested and sibling providers) |
| AC-007 | B-004, B-005 | Mount a themed side area with a tooltip, open a base-layer Modal in the outer provider, display the Modal's tooltip; check ancestry, theme and painted order in a browser. | packages/react/src/composite/Modal/src/modal.stories.tsx (withThemedSideArea) (manual browser scenario run during Construction; no automated painted-order test) | packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx ("WHEN a base Modal in P has a Tooltip and a Popover and Q already displayed a Tooltip"; ancestry only) |
