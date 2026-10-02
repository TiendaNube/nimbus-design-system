# Modal Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

The Modal presents focused content (a task, a confirmation, a short form) in a dialog panel above a dimmed overlay, until it is dismissed or the consumer closes it.

- Use it for content that needs the user's attention before returning to the page.
- Do not use it for a brief text-only tip (Tooltip), for contextual content anchored to a trigger (Popover), or for a panel that slides in from an edge (Sidebar).
- The Modal is a floating element: by default it is presented above page content, below tooltips, toasts and popovers, and in the theme scope of the place where it is declared (B-007, B-008). A "top" layer variant is presented above all other floating components.

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Overlay | Yes (while open) | The dimmed layer behind the panel. |
| Container | Yes (while open) | The dialog panel holding the `children`. |
| Dismiss button | No | A close (X) control in the container. Present only when dismissal is possible and requested (B-003). |
| Header, Body, Footer regions | No | Optional content regions offered as Modal.Header (title, tag or children), Modal.Body and Modal.Footer. Their documented inputs are title, tag, children and padding; their behavior is not further defined by this contract. |

### Rules

- While the Modal is closed nothing is rendered.
- On the default path the Modal is portaled outside its declaration point (B-007, B-008); with a `root` it is rendered inside that element (B-006).

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| children | renderable content | Yes | — | The content of the Modal. |
| open | boolean | Yes | — | Whether the Modal is open. |
| onDismiss | function receiving the requested open state (false) | No | — | Called when the Modal requests to be closed. |
| portalId | string | No | A library-provided identifier | Identifier applied to the portal element that hosts the Modal on the default path. |
| closeOnOutsidePress | boolean, or function receiving the press event and returning a boolean | No | true | Controls whether a press outside the Modal requests closing. |
| ignoreAttributeName | string | No | "data-nimbus-outside-press-ignore" | Name of an attribute; a press on an element carrying it (or inside one) does not request closing. |
| padding | "base", "none" or "small" | No | "base" | Space around the Modal content area. |
| renderDismissButton | boolean | No | true | Shows the built-in close button; only takes effect when `onDismiss` is provided. |
| zIndex | "base" or "top" | No | "base" | Stacking layer (B-007). |
| maxWidth | string or breakpoint object | No | { xs: "100%", md: "500px" } | Maximum width of the content area. |
| root | element or null | No | — | When an element is provided, the Modal is rendered inside it (B-006); null or omitted selects the default path. |
| className | string | No | — | Additional class names applied to the container. |
| Other standard element attributes | element attributes | No | — | Applied to the container element. |

### Events

| Event | Payload | Trigger |
|---|---|---|
| onDismiss | false as first argument; for an outside press also the press event and the reason "outside-press" | The dismiss button is used, the Escape key is pressed, or an allowed outside press occurs (B-002). |

### Actions

Not applicable.

### API Rules

- The Modal is controlled by the consumer through `open`; `onDismiss` only reports the request to close.
- Without `onDismiss` the Modal cannot be dismissed by the user.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| zIndex "base" | Standard modal layer | Default |
| zIndex "top" | Layer above all other floating components | Only for a Modal that must cover tooltips, toasts and popovers |
| Default portaled path | Rendered in the theme scope of the declaration point | Default |
| Scoped path (`root`) | Rendered inside a consumer element, with an overlay limited to that element | A modal confined to an area |
| With or without dismiss button, with or without dismissal | Dismissal options | See B-002 and B-003 |

### Rules

- Variants combine freely, except that `zIndex` "top" has no effect on the scoped path (B-007).

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | `open` false | Nothing is rendered. |
| Open | `open` true | Overlay and container are rendered with the `children`. |

Other states: Not applicable.

---

## 6. Behavioral Contract

### B-001 - Visibility and content

When `open` is false the component MUST render nothing. When `open` is true the component MUST render the `children` in the container.

### B-002 - Dismissal

When `onDismiss` is provided and the Modal is open:

- Using the dismiss button MUST call `onDismiss` with false.
- Pressing the Escape key MUST call `onDismiss`, including when the dismiss button is not rendered.
- A press outside the Modal MUST call `onDismiss` with false, the press event and the reason "outside-press" when `closeOnOutsidePress` is true, or is a function that returns true for the event, and the press target is neither an element carrying the `ignoreAttributeName` attribute nor inside one. When `closeOnOutsidePress` is false, or the function returns false, or the press is on an ignored region, `onDismiss` MUST NOT be called.

When `onDismiss` is not provided the component MUST NOT render the dismiss button and MUST NOT close the Modal by Escape or by outside press.

### B-003 - Dismiss button

When `onDismiss` is provided and `renderDismissButton` is not false, the component MUST render the dismiss button. When `renderDismissButton` is false, or `onDismiss` is not provided, it MUST NOT.

### B-004 - Appearance inputs

When open, the component MUST apply `padding` (default "base") to the container, `maxWidth` (default `{ xs: "100%", md: "500px" }`), `className` and other element attributes.

### B-005 - Scoped path

When `root` is an element, the component MUST render the overlay and the container inside that element; when `root` is null or omitted it MUST use the default path.

### B-006 - Scoped path precedence

When `root` is an element, the component MUST display the Modal inside `root` regardless of any theme provider (the placement rule of B-008 does not apply), the overlay MUST be limited to the area of `root`, and `zIndex` "top" MUST have no effect.

### B-007 - Layering

On the default path the Modal MUST be presented at the layer selected by `zIndex`: "base" (overlay and container) above page content and above the base sidebar, and below floating components such as tooltips, toasts and popovers; "top" above all other floating components. The "top" layer is reserved for Modal. Floating components displayed from inside a Modal that uses "base" MUST therefore be presented above that Modal. This ordering applies among Nimbus layers presented by the application at its layout root; it is not a guarantee against ordering imposed by stacking contexts that the consuming application creates around a theme provider element.

### B-008 - Placement in the theme scope of the origin

On the default path, whatever the `portalId` value, when the Modal is open:

- If a theme provider encloses the place where the Modal is declared, the overlay and container MUST be rendered inside the element of the nearest enclosing theme provider and MUST NOT be rendered inside the element of any other theme provider (a provider nested inside the enclosing one, a sibling provider, or a provider that was mounted earlier in the document). The Modal therefore uses the theme of its origin. This holds regardless of the order in which providers or other floating elements were mounted or displayed, including a Modal opened after floating elements were displayed in another provider.
- If no theme provider encloses it, the Modal MUST still be displayed (B-001) and no theme scope is carried.

`portalId` is applied to the element that hosts the Modal; when omitted a library-provided identifier is used.

---

## 7. Interaction Contract

### Pointer

- Clicking the dismiss button requests closing (B-002).
- Pressing the primary pointer button outside the Modal requests closing when allowed by `closeOnOutsidePress` and `ignoreAttributeName` (B-002); the press is evaluated when the button goes down.

### Keyboard

| Key | Listening scope | Active when | Effect |
|---|---|---|---|
| Escape | The document | The Modal is open and `onDismiss` is provided | Calls `onDismiss` (B-002). |

- Propagation of the Escape event is not part of this contract. Combined handling of Escape when a Modal is open together with another floating element that also closes on Escape (for example a Popover) is not part of this contract.

### Touch

No touch-specific behavior is part of this contract.

### Focus

No focus movement, trapping or restoration is part of this contract.

---

## 8. Content Contract

### Labels

- The header title is provided by the consumer (Modal.Header `title`); the component adds no visible text of its own.

### Supporting Content

- The header may include a tag and children; Modal.Body and Modal.Footer hold body and footer content.

### Icons

- The dismiss button shows a close (X) icon.

### Long Content

- Content wider than `maxWidth` is bounded by it; vertical overflow behavior is not part of this contract.

### Localization

Not applicable — content is provided by the consumer.

---

## 9. Layout and Responsive Behavior

### Sizing

- The container is limited by `maxWidth`: by default the full available width on the smallest breakpoint and 500px from the medium breakpoint.

### Alignment

Not applicable — alignment of the container inside the overlay is not part of this contract.

### Overflow

- Not specified beyond B-006.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| `maxWidth` given as a breakpoint object | The maximum width follows the active breakpoint. |

---

## 10. Composition Contract

### Supported Composition

- Any content as `children`, including Tooltips and Popovers inside the Modal, and the Modal.Header, Modal.Body and Modal.Footer regions.
- Declaration inside zero, one or several theme providers, nested or side by side.
- A Modal alongside a Sidebar.

### Unsupported Composition

- Not applicable beyond the exclusions stated in sections 7 and 11.

### Nesting Rules

- A Modal declared inside a theme provider nested in another provider is placed according to B-008.

### Multiple Instances

- Several Modals may be declared; each is rendered according to B-005 or B-008 independently. Which one handles Escape or an outside press when several are open is not part of this contract.

---

## 11. Accessibility Contract

### Semantics

The existing evidence (tests, stories and published pages) establishes no role, accessible-name or description behavior for the Modal container. This contract makes no guarantee about them.

### Accessible Name

Not defined by this contract.

### Keyboard Access

- The Escape key dismisses the Modal when `onDismiss` is provided, even when the dismiss button is hidden (B-002).
- Tab order, focus trapping and focus restoration are not part of this contract.

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
| `onDismiss` omitted | No dismiss button; Escape and outside press do not close (B-002, B-003). |
| `renderDismissButton` false | No button; Escape and allowed outside press still call `onDismiss` (B-002). |
| `closeOnOutsidePress` function returns false | No dismissal by outside press (B-002). |
| Press inside a region carrying the ignore attribute | No dismissal (B-002). |
| `root` null | Default path (B-005). |
| `root` element with `zIndex` "top" | Rendered inside `root`; `zIndex` has no effect (B-006). |
| Tooltip or Popover displayed from inside a "base" Modal | Presented above the Modal, in the theme scope of the Modal's origin (B-007, B-008). |
| Another provider already hosts displayed or earlier-mounted floating content, then the Modal opens | The Modal is placed inside its own nearest enclosing provider element (B-008). |
| No theme provider | Displayed without a theme scope (B-008). |

---

## 13. Acceptance Criteria

### AC-001 - Visibility and content

**Given**
A Modal with `open` false and the same Modal with `open` true and content "My content".

**When**
Each is rendered.

**Then**
The closed Modal renders nothing; the open Modal renders "My content" (B-001).

---

### AC-002 - Dismissal

**Given**
An open Modal with an `onDismiss` function, and an open Modal without `onDismiss`.

**When**
The dismiss button is used, then Escape is pressed, then an outside press occurs.

**Then**
For the first Modal, `onDismiss` is called with false for the button, is called for Escape, and is called with false, the press event and "outside-press" for the outside press; the second Modal renders no dismiss button and stays open for Escape and outside press (B-002, B-003).

---

### AC-003 - Outside press options

**Given**
An open Modal with `onDismiss` and `closeOnOutsidePress` as a function returning false, one as a function returning true, one with an element carrying the ignore attribute, and one with `closeOnOutsidePress` false.

**When**
A press occurs outside the Modal, and on the element carrying the ignore attribute.

**Then**
`onDismiss` is not called when the function returns false, when `closeOnOutsidePress` is false, or when the press is on the ignored region; it is called when the function returns true and the press is not on an ignored region (B-002).

---

### AC-004 - Dismiss button and Escape without the button

**Given**
An open Modal with `onDismiss` and `renderDismissButton` false.

**When**
The Modal is rendered and Escape is pressed.

**Then**
No dismiss button is rendered and `onDismiss` is called (B-002, B-003).

---

### AC-005 - Appearance inputs

**Given**
Open Modals with `padding` "base", "none" and "small", and one with none given.

**When**
They are rendered.

**Then**
The container carries the requested padding; the default is "base" (B-004).

---

### AC-006 - Scoped path

**Given**
An open Modal with `root` set to an element, and an open Modal with `root` null.

**When**
They are rendered.

**Then**
The first renders its overlay and content inside the root element; the second is displayed on the default path (B-005).

---

### AC-007 - Layer order

**Given**
A Modal with `zIndex` "base" is open with a Tooltip and a Popover whose triggers are inside it, a Sidebar is open, and the nearest enclosing theme provider element is not inside a stacking context created by the consuming application.

**When**
The tooltip and popover are displayed.

**Then**
The Modal overlay and container are presented above page content and above the Sidebar, and below the displayed tooltip and popover; a Modal with `zIndex` "top" on the default path is presented above all of them; a Modal on the scoped path ignores `zIndex` "top" (B-006, B-007).

---

### AC-008 - Placement in the theme scope of the origin

**Given**
An application area wrapped by a theme provider with the "dark" theme containing an open Modal on the default path, a Modal with `portalId` "custom", and an open Modal outside any theme provider.

**When**
The Modals are open.

**Then**
The first Modal's overlay and container are inside the element of that provider and use its theme; the `portalId` Modal is inside the element of its enclosing provider and its hosting element carries the identifier "custom"; the third is displayed without a theme scope (B-008).

---

### AC-009 - Nested and sibling theme providers

**Given**
An outer theme provider P (theme "base") containing a region wrapped by a nested theme provider Q (theme "dark") that holds a displayed or earlier-mounted floating element such as a Tooltip, a Popover or a Sidebar, and a Modal declared in P outside Q that is opened afterwards. Repeat with Q placed after, and then beside, the Modal's declaration point in document order.

**When**
The Modal is opened.

**Then**
The Modal's overlay and container are inside the element of P and not inside the element of Q (B-008).

---

### AC-010 - Floating elements displayed from a Modal in a themed context

**Given**
An outer theme provider P containing a nested theme provider Q that holds a Tooltip (for example a themed side menu), and a Modal with `zIndex` "base" opened in P with a Tooltip and a Popover inside it.

**When**
The tooltip and popover are displayed.

**Then**
Their content is inside the element of P (not Q), uses the theme of P, and is presented above the Modal overlay and container (B-007, B-008).

---

## 14. Origin of Guarantees

Revision R = TiendaNube/nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e. Repository paths below are relative to R. Published pages are the Nimbus documentation at nimbus.nuvemshop.com.br (es-AR).

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001 | Supported | reconstructed | packages/react/src/composite/Modal/src/modal.spec.tsx (renders the submitted content); modal.stories.tsx (open and close stories); modal.docs.json (open required) |
| AC-002 | B-002, B-003 | Supported | reconstructed | modal.spec.tsx (button calls onDismiss with false; Escape on the document calls onDismiss; no dismissal control or Escape closing without onDismiss; outside press calls onDismiss with false, the event and "outside-press"); modal.stories.tsx (noDismiss and noDismissButton stories: the X icon hidden but Escape and clicking outside still close; no dismissal without onDismiss) |
| AC-003 | B-002 | Supported | reconstructed | modal.spec.tsx (closeOnOutsidePress function returning false, ignored attribute region, function returning true); modal.stories.tsx (withIgnoreAttribute); packages/react/src/composite/Modal/src/modal.types.ts and modal.docs.json (closeOnOutsidePress and ignoreAttributeName) |
| AC-004 | B-002, B-003 | Supported | reconstructed | modal.spec.tsx (renderDismissButton tests, including Escape with the button hidden) |
| AC-005 | B-004 | Supported | reconstructed | modal.spec.tsx (padding default, none, base, small); modal.docs.json (padding and maxWidth defaults) |
| AC-006 | B-005 | Supported | reconstructed | modal.spec.tsx (root renders inside the container; null root keeps the default behavior); modal.stories.tsx (withRoot); published Modal "Con root" example |
| AC-007 | B-006, B-007 | Supported | established | Published Modal props page and packages/react/src/composite/Modal/src/modal.types.ts (zIndex "base": above the page, below floating components like tooltip, toast and popover; "top": above all other floating components, reserved for Modal, default portaled path only, no effect with root); published zIndex tokens page (600 overlays and 700 modals and sidebars, 800 floating components, 1000 and 1100 reserved for the Modal top layer); modal.spec.tsx (base and top layer classes applied); modal.stories.tsx (modalOverSidebar story text) |
| AC-008 | B-008 | Supported | reconstructed | .storybook/theme/theme.tsx (every story is wrapped in a theme provider that toggles "dark" and "base"); packages/core/styles/src/components/ThemeProvider/contexts/ThemeProviderContext/themeProviderContext.types.ts (the provider exposes its element for portaled content); packages/react/src/composite/Modal/src/Modal.tsx (default path is mounted in the provider element obtained from the theme context); modal.docs.json (portalId: identifier embedded in the portal element); modal.spec.tsx (default path renders without a provider). Evidence is indirect: no test or page states the portaled-theme behavior in terms of nested providers. |
| AC-009 | B-008 | Supported | reconstructed | Same sources as AC-008, applied to the nearest enclosing provider obtained from the theme context. |
| AC-010 | B-007, B-008 | Supported | reconstructed | Combination of the AC-007 and AC-008 sources. |

### Rules

- Every Acceptance Criterion has at least one origin row.
- Accessibility, focus and Escape-propagation exclusions in sections 7, 10 and 11 are scope exclusions drawn from the absence of such behavior in tests, stories and published pages.
- The documented default of `portalId` is a library identifier; its value is not part of the guarantee.

---

## 15. Compatibility and Migration

There is no previously published component contract to migrate from.

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | None. | §3 |
| Behavior and defaults | Placement of the default-path Modal follows B-008 in applications that use several or nested theme providers; defaults are unchanged. | B-008, AC-009 |
| Layout and content | None. | §8, §9 |
| Accessibility and interactions | None. | §7, §11 |
| Supported composition | Use inside nested or sibling theme providers is covered by B-008. | §10 |

- Backward compatibility: Existing inputs, defaults, the `portalId` and `root` inputs and the documented layer scale are unchanged.
- Migration required: No
- Consumer migration steps, when required: Not applicable.

### Rules

- The `root` path is unchanged.

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Render closed and open Modals; check nothing versus the content. | packages/react/src/composite/Modal/src/modal.stories.tsx (basic) | packages/react/src/composite/Modal/src/modal.spec.tsx (renders the submitted content) |
| AC-002 | B-002, B-003 | Use the button, press Escape, press outside, with and without `onDismiss`; check calls and arguments. | packages/react/src/composite/Modal/src/modal.stories.tsx (noDismiss, noDismissButton) | packages/react/src/composite/Modal/src/modal.spec.tsx (dismissal tests) |
| AC-003 | B-002 | Press outside and on an ignored region with each `closeOnOutsidePress` value; check whether `onDismiss` is called. | packages/react/src/composite/Modal/src/modal.stories.tsx (withIgnoreAttribute) | packages/react/src/composite/Modal/src/modal.spec.tsx (closeOnOutsidePress function tests) |
| AC-004 | B-002, B-003 | Hide the button and press Escape; check the call. | packages/react/src/composite/Modal/src/modal.stories.tsx (noDismissButton) | packages/react/src/composite/Modal/src/modal.spec.tsx (renderDismissButton tests) |
| AC-005 | B-004 | Render each padding value and none; check the applied padding. | — | packages/react/src/composite/Modal/src/modal.spec.tsx (padding tests) |
| AC-006 | B-005 | Render with an element root and a null root; check where content appears. | packages/react/src/composite/Modal/src/modal.stories.tsx (withRoot) | packages/react/src/composite/Modal/src/modal.spec.tsx (root tests) |
| AC-007 | B-006, B-007 | In a browser, open a base Modal with a displayed tooltip, popover and an open Sidebar; check painted order; repeat with a top Modal and with a root Modal using "top". | packages/react/src/composite/Modal/src/modal.stories.tsx (modalOverSidebar) | packages/react/src/composite/Modal/src/modal.spec.tsx (zIndex layer class tests) |
| AC-008 | B-008 | Render Modals inside a "dark" provider, with a `portalId`, and outside any provider; check ancestry, hosting identifier and theme. | — | packages/react/src/composite/Modal/src/modal.spec.tsx (GIVEN <Modal /> inside theme providers: open inside a single theme provider with the default identifier and with a portalId, opened after mount and open on first render; open outside any theme provider). Partial: ancestry and hosting identifier only; the applied theme is not asserted by a retained automated check |
| AC-009 | B-008 | Build the P / nested Q structure in each document order with floating content already displayed in Q; open the Modal and check its provider ancestor. | — | packages/react/src/composite/Modal/src/modal.spec.tsx (GIVEN <Modal /> inside theme providers: dark provider Q placed as nested-after-origin, nested-before-origin and sibling-before, with the default identifier and with a portalId, Modal of P opened after Q and Modal of Q opened after P). Partial: floating content already displayed in Q is another Modal; a Tooltip displayed in Q before the Modal opens in P is covered only by the base-layer Modal case (GIVEN a base-layer <Modal /> opened in P with a themed side area Q), where it does not share the Modal identifier; a Popover or Sidebar in Q is not exercised against the Modal |
| AC-010 | B-007, B-008 | Mount a themed side area with a tooltip, open a base Modal in P with a tooltip and a popover; check ancestry, theme and painted order in a browser. | — | packages/react/src/composite/Modal/src/modal.spec.tsx (GIVEN a base-layer <Modal /> opened in P with a themed side area Q). Partial: ancestry of the Modal, its Tooltip and its Popover only; theme colors and painted order are not covered by a retained automated check |
