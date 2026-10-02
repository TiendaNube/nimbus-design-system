# Popover Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

The Popover shows contextual content, including actions, in a floating panel anchored to a trigger element, on demand.

- Use it for contextual content or actions that the user opens from a trigger (for example an options menu anchored to an icon button).
- Do not use it for a brief text-only tip (use a Tooltip), for a task that needs full focus or a long form (use a Modal), or to choose a value inside a form (use a Select).
- The Popover is a floating element: it is presented above page content and is placed in the theme scope of the place where it is used (B-008, B-009).

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Trigger | Yes | The consumer-provided element(s) the popover is anchored to, wrapped in a container. Provided as `children`. |
| Popover content | Yes (while open) | The floating panel that shows the `content` input. It exists only while the popover is open. |
| Arrow | No | A pointer on the panel facing the trigger. Shown by default. |
| Overlay | No | A transparent layer that blocks clicks on elements behind the open popover. Present only when requested. |

### Rules

- The floating content is supplied through `content`, never as additional `children`; `children` is always the trigger.
- While the popover is closed, no popover content and no overlay are present.

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| children | renderable content, or a function receiving `{ open, setVisibility }` and returning renderable content | Yes | — | The trigger. |
| content | renderable content | Yes | — | The content of the floating panel. |
| visible | boolean | No | — | When provided, controls whether the popover is open. |
| onVisibility | function receiving a boolean | No | — | Called when the popover requests to open (true) or close (false). Used together with `visible`. |
| arrow | boolean | No | true | Shows the arrow when true. |
| matchReferenceWidth | boolean | No | false | Makes the panel as wide as the trigger. |
| position | "top", "right", "bottom", "left", each also with "-start" or "-end" suffix (12 values) | No | "bottom" | Preferred placement relative to the trigger. |
| enabledHover | boolean | No | false | Enables opening by pointer hover on the trigger. |
| enabledClick | boolean | No | true | Enables opening by click on the trigger. |
| enabledDismiss | boolean | No | true | Enables dismissal interactions that close the popover. |
| offset | number | No | 10 | Distance between the trigger and the panel. |
| renderOverlay | boolean | No | false | Renders the transparent overlay while open. |
| width | string or breakpoint object | No | "fit-content" | Width of the panel. |
| maxWidth, height | string or breakpoint object | No | — | Maximum width and height of the panel. |
| zIndex | layer token value or breakpoint object | No | — | Stack order of the panel. |
| backgroundColor | one of: neutral-background, neutral-surfaceHighlight, primary-surfaceHighlight, primary-interactiveHover, success-surfaceHighlight, danger-surfaceHighlight, warning-surfaceHighlight; or breakpoint object | No | "neutral-background" | Background of the panel. |
| padding | "base", "none" or "small"; or breakpoint object | No | "base" | Space around the panel content. |
| overflow | "auto", "hidden", "scroll" or "visible"; or breakpoint object | No | — | Overflow behavior of the panel. |
| className | string | No | — | Additional class names applied to the panel. |
| Other standard element attributes | element attributes | No | — | Applied to the panel element. |

### Events

| Event | Payload | Trigger |
|---|---|---|
| onVisibility | boolean (the requested open state) | The popover requests to open or close through an enabled interaction. |

### Actions

Not applicable.

### API Rules

- `visible` and `onVisibility` are used together to control the popover; without `visible` the popover manages its own open state.
- The `color` input listed in package documentation is not part of this contract.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| Uncontrolled / controlled | Component-managed or consumer-managed open state | Controlled when the consumer must coordinate several popovers (for example one open row at a time) |
| Click-triggered / hover-triggered | Opens by click (default) or by hover | Do not open actionable content by hover |
| Placement (12 positions) | Preferred side and alignment | Match free space and the trigger |
| With or without arrow, with or without overlay | Visual relationship and click blocking | Overlay when clicks behind must not reach the page |

### Rules

- Variants combine freely.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | Initial state, or closed by an interaction or by `visible` false | No panel and no overlay are present. |
| Open | An enabled interaction opens it, or `visible` true | The panel is displayed (and the overlay when requested). |

Other states: Not applicable.

---

## 6. Behavioral Contract

### B-001 - Opening by hover

When `visible` is not provided and `enabledHover` is true, the component MUST open when the pointer rests on the trigger. When `enabledHover` is false it MUST NOT open by hover.

### B-002 - Opening by click

When `visible` is not provided and `enabledClick` is true, the component MUST open when the trigger is clicked. When `enabledClick` is false it MUST NOT open by click.

### B-003 - Controlled state

When `visible` is provided, the open state MUST equal `visible`. An enabled interaction on the trigger MUST call `onVisibility` with the requested state: false when `visible` is true and the trigger is clicked, true when `visible` is false and the trigger is clicked.

### B-004 - Render-function children

When `children` is a function, the component MUST call it with the current `open` state and a `setVisibility` function, and render its result as the trigger.

### B-005 - Placement, arrow, offset and width

When open, the component MUST place the panel relative to the trigger on the side given by `position` (default "bottom") using viewport-fixed positioning, at a distance of `offset` (default 10). The component MUST render the arrow unless `arrow` is false. When `matchReferenceWidth` is true the panel width MUST equal the trigger width.

### B-006 - Appearance inputs

When open, the component MUST apply `backgroundColor` (default "neutral-background"), `padding` (default "base"), `width`, `maxWidth`, `height`, `zIndex`, `overflow`, `className` and other element attributes to the panel.

### B-007 - Overlay

When `renderOverlay` is true and the popover is open, the component MUST render a transparent overlay that prevents clicks from reaching elements behind the open popover. When `renderOverlay` is false the component MUST NOT render an overlay.

### B-008 - Layering

When open and `zIndex` is not provided, the panel MUST be presented at the floating layer of the Nimbus layering scale: above content at the base modal layer and the sidebar layer (a Modal with `zIndex` "base" and a Sidebar), and below a Modal presented at its "top" layer on its default portaled path. The overlay, when rendered, MUST be presented below the panel. This ordering applies among Nimbus layers presented by the application at its layout root; it is not a guarantee against ordering imposed by stacking contexts that the consuming application creates around a theme provider element.

### B-009 - Placement in the theme scope of the origin

When the popover is open:

- If a theme provider encloses the trigger, the panel (and the overlay, when rendered) MUST be rendered inside the element of the nearest enclosing theme provider and MUST NOT be rendered inside the element of any other theme provider (a provider nested inside the enclosing one, a sibling provider, or a provider that was mounted earlier in the document). The panel therefore uses the theme of the place where the popover is used. This holds regardless of the order in which providers or other floating elements were mounted or displayed.
- If no theme provider encloses the trigger, the popover MUST still open and display normally (B-001 to B-003) and no theme scope is carried.

### B-010 - Dismissal by outside press

When `enabledDismiss` is true and the popover is open, a press outside both the panel and the trigger MUST request closing by calling `onVisibility` with false and, when uncontrolled, MUST close the popover. When `enabledDismiss` is false, an outside press MUST NOT close the popover. Other dismissal gestures that the underlying floating behavior may provide are not individually contracted.

---

## 7. Interaction Contract

### Pointer

- Click on the trigger opens or requests opening when `enabledClick` is true (B-002, B-003).
- Hover on the trigger opens when `enabledHover` is true (B-001).
- A press outside the panel and trigger dismisses the open popover when `enabledDismiss` is true (B-010).
- With `renderOverlay` true, clicks outside the panel are received by the overlay and do not reach elements behind it (B-007).

### Keyboard

- No key binding is individually contracted. Dismissal gestures other than the outside press of B-010 (for example the Escape key), their listening scope and their propagation are provided by the underlying floating behavior and are not part of this contract; a combined outcome when a Popover is open together with another floating element that handles the same key is not part of this contract.

### Touch

No touch-specific behavior is part of this contract.

### Focus

No focus movement or restoration is part of this contract.

---

## 8. Content Contract

### Labels

Not applicable — the component adds no text of its own.

### Supporting Content

- `content` may contain any renderable content, including actions.

### Icons

Not applicable.

### Long Content

- `width`, `maxWidth`, `height` and `overflow` govern how long content is shown; defaults are "fit-content" width and no explicit maximum.

### Localization

Not applicable — content is provided by the consumer.

---

## 9. Layout and Responsive Behavior

### Sizing

- Panel width defaults to fit its content; `matchReferenceWidth` makes it as wide as the trigger.

### Alignment

- Placement and alignment follow `position` (B-005).

### Overflow

- `overflow` applies to the panel.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| A style input is given as a breakpoint object | The value follows the active breakpoint. |

---

## 10. Composition Contract

### Supported Composition

- Any trigger element, including elements inside a Modal, a Sidebar, a table row or an application area wrapped by a theme provider.
- Use inside zero, one or several theme providers, nested or side by side.

### Unsupported Composition

- The floating content is not supplied as additional `children`.

### Nesting Rules

- A popover inside a theme provider nested in another theme provider is placed according to B-009.

### Multiple Instances

- Several popovers can be open at the same time; there is no automatic coordination between popovers. A consumer that wants a single open popover (for example one per table row) controls each popover's `visible` state. Each open popover is placed according to B-009 independently of the others.

---

## 11. Accessibility Contract

### Semantics

The existing evidence establishes no role or accessible-name behavior for the popover panel. This contract makes no guarantee about them.

### Accessible Name

Not defined by this contract; an icon-only trigger needs an accessible label supplied by the consumer.

### Keyboard Access

Keyboard opening and keyboard dismissal are not individually contracted (section 7).

### Focus

No focus behavior is defined (section 7).

### Screen Reader Behavior

Not defined by this contract.

### Visual Accessibility

Contrast, reduced motion, zoom and text-resizing behavior are not part of this contract; the panel uses the theme in effect (B-009).

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| `visible` provided without `onVisibility` | The open state follows `visible`; no callback is called. |
| `enabledClick` and `enabledHover` both false and `visible` omitted | The popover does not open by those interactions (B-001, B-002). |
| Trigger inside a Modal | Panel is displayed in the theme scope of the Modal's origin and above the Modal when it uses the base layer (B-008, B-009). |
| Nested theme providers | Panel is placed inside the nearest enclosing provider element, not another provider's (B-009). |
| Another provider already hosts displayed or earlier-mounted floating content | The popover is still placed inside its own nearest enclosing provider element (B-009). |
| No theme provider | Panel is displayed without a theme scope (B-009). |
| Several popovers | Independent (section 10). |

---

## 13. Acceptance Criteria

### AC-001 - Opening by hover

**Given**
An uncontrolled Popover with `enabledHover` true, and another with `enabledHover` false.

**When**
The pointer rests on each trigger.

**Then**
The first popover opens and shows its content; the second does not open (B-001).

---

### AC-002 - Opening by click

**Given**
An uncontrolled Popover with `enabledClick` true, and another with `enabledClick` false.

**When**
Each trigger is clicked.

**Then**
The first popover opens; the second does not open (B-002).

---

### AC-003 - Controlled state

**Given**
A Popover with `visible` true and an `onVisibility` function, and another with `visible` false and an `onVisibility` function.

**When**
Each trigger is clicked.

**Then**
The first popover is displayed from the start and `onVisibility` is called with false; the second is not displayed and `onVisibility` is called with true (B-003).

---

### AC-004 - Render-function children

**Given**
A Popover whose `children` is a function.

**When**
The popover renders closed and then opens.

**Then**
The function receives `open` false then true, and a `setVisibility` function, and its result is rendered as the trigger (B-004).

---

### AC-005 - Placement, arrow and offset

**Given**
Popovers with `position` "top", "bottom", "left" and "right" in turn, a popover with `arrow` false, and a popover with `matchReferenceWidth` true.

**When**
Each popover is open.

**Then**
The panel uses viewport-fixed positioning on the requested side with the default offset of 10 and an arrow oriented toward the trigger; the popover with `arrow` false shows no arrow; the `matchReferenceWidth` panel is as wide as its trigger (B-005).

---

### AC-006 - Appearance inputs

**Given**
Open popovers with each `backgroundColor` token and each `padding` value, and with none given.

**When**
The panels are displayed.

**Then**
Each panel carries the requested background and padding; when none is given the defaults "neutral-background" and "base" apply (B-006).

---

### AC-007 - Overlay

**Given**
An open Popover with `renderOverlay` true, and an open Popover with `renderOverlay` false.

**When**
The popovers are displayed and the page area behind the first is clicked.

**Then**
The first renders a transparent overlay and the click does not reach the element behind; the second renders no overlay (B-007).

---

### AC-008 - Dismissal

**Given**
An open Popover with `enabledDismiss` true, and an open Popover with `enabledDismiss` false.

**When**
A press occurs outside the panel and the trigger.

**Then**
The first requests closing through `onVisibility` with false and, when uncontrolled, closes; the second stays open (B-010).

---

### AC-009 - Layer order

**Given**
A Modal with `zIndex` "base" is open and a Popover whose trigger is inside the Modal, with `renderOverlay` true and `zIndex` not provided, and the nearest enclosing theme provider element is not inside a stacking context created by the consuming application.

**When**
The popover is open.

**Then**
The popover panel is presented above the Modal overlay and container, the popover overlay is presented below the panel, and a Modal with `zIndex` "top" on its default portaled path is presented above the panel (B-008).

---

### AC-010 - Placement in the theme scope of the origin

**Given**
An application area wrapped by a theme provider with the "dark" theme containing a Popover, and a second Popover outside any theme provider.

**When**
Each popover is open.

**Then**
The first panel is inside the element of that provider and uses its theme; the second popover displays without a theme scope (B-009).

---

### AC-011 - Nested and sibling theme providers

**Given**
An outer theme provider P (theme "base") containing a region wrapped by a nested theme provider Q (theme "dark") that holds a Popover already open or mounted earlier, and a Popover whose trigger lies in P outside Q. Repeat with Q placed after, and then beside, the second trigger in document order.

**When**
Each popover is open, in either order.

**Then**
The panel (and overlay, when rendered) of the popover whose trigger lies in P outside Q is inside the element of P and not inside the element of Q; the panel of the popover whose trigger lies in Q is inside the element of Q (B-009).

---

### AC-012 - Popover inside a Modal with a themed side area

**Given**
An outer theme provider P containing a nested theme provider Q that holds a Popover (for example a themed side menu), and later a Modal with `zIndex` "base" opened in P with a Popover inside it.

**When**
The popover inside the Modal is open.

**Then**
Its panel is inside the element of P (not Q), uses the theme of P, and is presented above the Modal overlay and container (B-008, B-009).

---

## 14. Origin of Guarantees

Revision R = TiendaNube/nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e. Repository paths below are relative to R. Published pages are the Nimbus documentation at nimbus.nuvemshop.com.br (es-AR).

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001 | Supported | reconstructed | packages/react/src/atomic/Popover/src/popover.spec.tsx (opens by hover when enabled, not when disabled); popover.stories.tsx (basic, top, bottom, right, left); packages/react/src/atomic/Popover/src/popover.docs.json (enabledHover) |
| AC-002 | B-002 | Supported | reconstructed | popover.spec.tsx (opens by click when enabled, not when disabled); popover.docs.json (enabledClick) |
| AC-003 | B-003 | Supported | reconstructed | popover.spec.tsx (controlled tests calling onVisibility with false and true); popover.stories.tsx (controlled story); published Popover implementation page (visible and onVisibility are used together; without them the popover is uncontrolled) |
| AC-004 | B-004 | Supported | reconstructed | packages/react/src/atomic/Popover/src/popover.types.ts and popover.docs.json (children as a function receiving open and setVisibility); published Popover implementation page (render-prop with open and setVisibility) |
| AC-005 | B-005 | Supported | reconstructed | popover.spec.tsx (position tests: fixed positioning, offset translation of 10, arrow orientation, arrow false); popover.docs.json (position values and default, arrow default true, offset default 10, matchReferenceWidth) |
| AC-006 | B-006 | Supported | reconstructed | popover.spec.tsx (backgroundColor and padding class tests); popover.docs.json (defaults, width fit-content, maxWidth, height, zIndex, overflow) |
| AC-007 | B-007 | Supported | reconstructed | popover.spec.tsx (renderOverlay test); popover.stories.tsx (With overlay story: clicks do not reach the row); popover.docs.json (renderOverlay description) |
| AC-008 | B-010 | Supported | reconstructed | popover.docs.json (enabledDismiss: adds listeners that dismiss the floating element); popover.stories.tsx (With overlay story: enabledDismiss true with an overlay so that clicking outside does not trigger the row click) |
| AC-009 | B-008 | Supported | established | Published Modal props page (zIndex "base" below floating components such as tooltip, toast and popover; "top" above them, default portaled path only), also in packages/react/src/composite/Modal/src/modal.types.ts; published zIndex tokens page (600 overlays and 700 modals and sidebars, 800 floating components, 1000 and 1100 reserved for the Modal top layer); packages/core/styles/src/packages/atomic/popover/nimbus-popover.css.ts (content layer 800, overlay layer 600) |
| AC-010 | B-009 | Supported | reconstructed | .storybook/theme/theme.tsx (every story is wrapped in a theme provider that toggles "dark" and "base"); packages/core/styles/src/components/ThemeProvider/contexts/ThemeProviderContext/themeProviderContext.types.ts (the provider exposes its element for portaled content); packages/react/src/atomic/Popover/src/Popover.tsx (floating content is mounted in the provider element obtained from the theme context); published themes page; popover.spec.tsx (opens and displays without a provider). Evidence is indirect: no test or page states the portaled-theme behavior in terms of nested providers. |
| AC-011 | B-009 | Supported | reconstructed | Same sources as AC-010, applied to the nearest enclosing provider obtained from the theme context. |
| AC-012 | B-008, B-009 | Supported | reconstructed | Combination of the AC-009 and AC-010 sources. |

### Rules

- Every Acceptance Criterion has at least one origin row.
- Section 7 and section 11 limitations are scope exclusions drawn from the absence of such behavior in tests, stories and published pages; the `color` input is excluded because package documentation lists it while the panel's text color is not evidenced to follow it.

---

## 15. Compatibility and Migration

There is no previously published component contract to migrate from.

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | None. | §3 |
| Behavior and defaults | Placement of open panels follows B-009 in applications that use several or nested theme providers; defaults are unchanged. | B-009, AC-011, AC-012 |
| Layout and content | None. | §8, §9 |
| Accessibility and interactions | None. | §7, §11 |
| Supported composition | Use inside nested or sibling theme providers is covered by B-009. | §10 |

- Backward compatibility: Existing inputs, defaults and the documented layer scale are unchanged.
- Migration required: No
- Consumer migration steps, when required: Not applicable.

### Rules

- Container identifiers used internally by the component are not part of the Popover's public API.

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Hover triggers with `enabledHover` true and false; check which popovers open. | packages/react/src/atomic/Popover/src/popover.stories.tsx (top, bottom, right, left) | packages/react/src/atomic/Popover/src/popover.spec.tsx (hover tests) |
| AC-002 | B-002 | Click triggers with `enabledClick` true and false; check which popovers open. | packages/react/src/atomic/Popover/src/popover.stories.tsx (basic) | packages/react/src/atomic/Popover/src/popover.spec.tsx (click tests) |
| AC-003 | B-003 | Click triggers of controlled popovers with `visible` true and false; check display and the `onVisibility` argument. | packages/react/src/atomic/Popover/src/popover.stories.tsx (Controlled) | packages/react/src/atomic/Popover/src/popover.spec.tsx (onVisibility tests) |
| AC-004 | B-004 | Use a function child; check the received `open` values and the rendered trigger. | — | — |
| AC-005 | B-005 | Open popovers for each position, with arrow false and with `matchReferenceWidth`; check side, offset, fixed positioning, arrow and width. | packages/react/src/atomic/Popover/src/popover.stories.tsx (top, bottom, right, left) | packages/react/src/atomic/Popover/src/popover.spec.tsx (position and arrow tests) |
| AC-006 | B-006 | Open popovers with each background token and padding; check carried classes and defaults. | — | packages/react/src/atomic/Popover/src/popover.spec.tsx (backgroundColor and padding tests) |
| AC-007 | B-007 | Open with `renderOverlay` true and false; check overlay presence and that a click behind is not received. | packages/react/src/atomic/Popover/src/popover.stories.tsx (With overlay) | packages/react/src/atomic/Popover/src/popover.spec.tsx (renderOverlay test) |
| AC-008 | B-010 | Open with `enabledDismiss` true and false, perform an outside press (mouse press outside panel and trigger); check `onVisibility` and open state. | packages/react/src/atomic/Popover/src/popover.stories.tsx (With overlay) | — |
| AC-009 | B-008 | With a base-layer Modal open, open a popover with an overlay from inside it in a browser; check painted order against the Modal and against a top-layer Modal. | — | — |
| AC-010 | B-009 | Render a popover inside a "dark" theme provider and one outside any provider; check the ancestor of each open panel and the applied theme. | — | packages/react/src/atomic/Popover/src/popover.spec.tsx (GIVEN <Popover /> inside theme providers: displayed inside a single theme provider; displayed outside any theme provider). Partial: DOM ancestry only; the applied theme is not asserted by a retained automated check |
| AC-011 | B-009 | Build the P / nested Q structure in each document order; open each popover and check that its panel's nearest provider ancestor is the expected one. | — | packages/react/src/atomic/Popover/src/popover.spec.tsx (GIVEN <Popover /> inside theme providers: dark provider Q placed as nested-after-anchor, nested-before-anchor and sibling-before, popover of P mounted after Q and popover of Q mounted after P) |
| AC-012 | B-008, B-009 | Mount a themed side area with a popover, open a base-layer Modal in the outer provider, open the Modal's popover; check ancestry, theme and painted order in a browser. | — | packages/react/src/composite/Modal/src/modal.spec.tsx (GIVEN a base-layer <Modal /> opened in P with a themed side area Q). Partial: ancestry of the Modal and of its Popover only; theme colors and painted order are not covered by a retained automated check |
