# Popover Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Popover displays arbitrary content in a floating surface attached to an anchor element. It opens from a click or a hover on the anchor, or under consumer control, and it can be dismissed.

- User need: contextual content or actions (menus, details) next to an element, without leaving the page flow.
- Use it for content that is richer than a text hint. For a short text on hover, use Tooltip.
- Related components: Tooltip (text only, hover); Modal and Sidebar (layers a Popover is displayed above); MultiSelect and SplitButton (compose Popover).
- Scope of this contract: the behaviors listed below. Keyboard handling of the anchor, exact dismissal interactions beyond those in B-106, and assistive-technology semantics are not part of this contract.

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Anchor | Yes | The consumer-provided `children` (or the result of the children function), wrapped so that click and hover are detected over it. |
| Content | While open | Floating surface that shows `content`. |
| Arrow | No | Pointer on the content edge facing the anchor; present by default. |
| Overlay | No | Transparent layer displayed under the content while open; present only when `renderOverlay` is true. |

### Rules

- The content and the overlay exist only while the popover is open.

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| children | React node, or function receiving `{ open, setVisibility }` and returning a React node | Yes | — | Anchor. |
| content | React node | Yes | — | Content of the popover. |
| visible | boolean | No | — | When provided, the popover is displayed if and only if it is true (controlled). |
| onVisibility | function (visible: boolean) | No | — | Called with the requested next visibility. |
| arrow | boolean | No | true | Whether the arrow is displayed. |
| matchReferenceWidth | boolean | No | false | Content width equals the anchor width. |
| position | "top", "right", "bottom", "left", each optionally with "-start" or "-end" | No | bottom | Preferred placement relative to the anchor. |
| enabledHover | boolean | No | false | Hover on the anchor changes the open state. |
| enabledClick | boolean | No | true | Click on the anchor changes the open state. |
| enabledDismiss | boolean | No | true | Dismiss interactions request closing. |
| offset | number | No | 10 | Distance between anchor and content. |
| renderOverlay | boolean | No | false | Renders a transparent overlay that prevents accidental clicks on elements behind the popover. |
| backgroundColor | "neutral-background", "neutral-surfaceHighlight", "primary-surfaceHighlight", "primary-interactiveHover", "success-surfaceHighlight", "danger-surfaceHighlight", "warning-surfaceHighlight" | No | neutral-background | Background of the content. |
| padding | "base", "small", "none" | No | — | Inner space of the content. |
| width, maxWidth, height, zIndex, overflow | string or responsive object | No | — | Size, stacking and overflow of the content. |
| className and other standard div attributes | HTML attributes | No | — | Applied to the content element. |

### Events

| Event | Payload | Trigger |
|---|---|---|
| onVisibility | boolean: the visibility the component requests | A click or hover that changes the open state, or a dismiss interaction. |

### Actions

| Action | Input | Result |
|---|---|---|
| setVisibility (provided to the children function) | boolean | Requests the given visibility. |

### API Rules

- The layer on which the content is displayed and the theme in which it is presented are not required inputs; they follow B-109 to B-112.
- No input was added, removed or renamed by this contract.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| Uncontrolled / controlled | The component owns the open state, or the consumer owns it through `visible`. | Use controlled when several popovers must not be open at once or when other UI must open it. |
| Trigger: click, hover | Selects what opens it. | Click for actions, hover for informative content. |
| With / without arrow, overlay | Visual and click-shielding options. | Overlay when clicks must not reach elements behind. |
| backgroundColor values | Visual emphasis. | As listed in section 3. |

### Rules

- Defaults: click enabled, hover disabled, dismiss enabled, arrow shown, no overlay, placement bottom.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Closed | Initial, or `visible` false, or dismissed. | Content and overlay are not displayed. |
| Open | Click or hover on the anchor when enabled, or `visible` true. | Content is displayed; overlay too when `renderOverlay` is true. |

---

## 6. Behavioral Contract

### B-101 - Triggers

When `enabledClick` is true and the anchor is clicked, or `enabledHover` is true and the pointer hovers the anchor, the Popover MUST request opening. When the corresponding input is false, that interaction MUST NOT open the popover.

### B-102 - Controlled visibility

When `visible` is provided, the Popover MUST display its content if and only if `visible` is true, and MUST call `onVisibility` with the requested next value (false when open, true when closed) when the anchor is clicked.

### B-103 - Placement and arrow

When open, the Popover MUST place the content on the side given by `position` (default bottom) separated by `offset`, and MUST show the arrow unless `arrow` is false. When there is not enough room on the preferred side, the content MAY be moved or shifted so that it remains within the viewport.

### B-104 - Appearance

When `backgroundColor` or `padding` is provided, the Popover MUST present the content with that value; without `backgroundColor` it MUST use neutral-background.

### B-105 - Overlay

When `renderOverlay` is true and the popover is open, the Popover MUST display a transparent overlay that intercepts presses so that they do not reach elements behind the popover. When `renderOverlay` is false, no overlay is displayed.

### B-106 - Dismissal

When `enabledDismiss` is true and the user presses outside the content and the anchor while the popover is open, the Popover MUST request closing through `onVisibility(false)`. When `enabledDismiss` is false, that press MUST NOT request closing.

### B-107 - Anchor width

When `matchReferenceWidth` is true, the content width MUST equal the anchor width.

### B-108 - Children function

When `children` is a function, the Popover MUST call it with the current open state and a `setVisibility` function and render the result as the anchor.

### B-109 - Layer order

When a Popover without a `zIndex` input is opened from an element inside an open Modal in its base layer (`zIndex` omitted or "base") or inside an open Sidebar without a `zIndex` input, both in the default presentation (without `root`), its content MUST be displayed above that Modal's or Sidebar's overlay and container. Inside a Modal with `zIndex="top"`, the Modal's top-layer order applies instead.

### B-110 - Theme of origin

When a Popover is rendered inside a ThemeProvider, its content MUST be presented with the theme of the nearest enclosing ThemeProvider of that Popover in the component tree.

### B-111 - Independence from other providers and floating elements

B-109 and B-110 MUST hold regardless of how many other ThemeProviders, Tooltips, Popovers, Modals or Sidebars exist on the page, and regardless of the order in which they were rendered or opened. A floating element rendered in another ThemeProvider MUST NOT change the theme or the layer of this popover's content.

### B-112 - No ThemeProvider

When a Popover is not inside any ThemeProvider, its content MUST be presented with the default theme and B-109 MUST hold.

### B-113 - Recognizable floating content

The content (and the overlay when present) of an open Popover MUST be contained by an element that carries the attribute `data-floating-ui-portal`, so that first-party consumers can recognize presses and touches inside it as belonging to floating content.

### B-114 - Use from inside a BottomSheet

When a Popover is opened from content inside an open BottomSheet of TiendaNube/nimbus-patterns rendered under a ThemeProvider, the popover content MUST be displayed above the sheet, a press inside the popover MUST NOT dismiss the sheet, and a touch gesture inside the popover MUST NOT be cancelled by the sheet's scroll lock.

---

## 7. Interaction Contract

### Pointer

- Click on the anchor opens or closes the popover when `enabledClick` is true (B-101, B-102).
- Hover on the anchor opens it when `enabledHover` is true (B-101).
- A press outside the content and the anchor closes it when `enabledDismiss` is true (B-106).
- With `renderOverlay`, presses land on the overlay and not on elements behind (B-105).

### Keyboard

No key binding is defined by this contract for Popover. Keyboard behavior of the anchor is that of the consumer-provided element.

### Touch

- A touch gesture inside the popover content is not cancelled by a BottomSheet's scroll lock (B-114).

### Focus

Popover does not define focus entry, movement or restoration in this contract.

---

## 8. Content Contract

### Labels

Not applicable — the content is consumer-provided.

### Supporting Content

- `content` accepts any React node.

### Icons

Not applicable.

### Long Content

- `width`, `maxWidth`, `height` and `overflow` control size and overflow of the content; no default wrapping or truncation is part of this contract.

### Localization

Not applicable.

---

## 9. Layout and Responsive Behavior

### Sizing

- `matchReferenceWidth` sizes the content to the anchor (B-107); otherwise `width`, `maxWidth` and `height` apply.

### Alignment

- Placement follows `position` and `offset` (B-103).

### Overflow

- When the preferred side lacks room, the content stays within the viewport by moving or shifting (B-103). `overflow` controls content overflow.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| Not enough room on the preferred side | Content moves or shifts to remain visible (B-103). |
| `width` or `maxWidth` given per breakpoint | Applied per breakpoint. |

---

## 10. Composition Contract

### Supported Composition

- A Popover inside the content of a Modal or a Sidebar, inside any ThemeProvider, and inside a BottomSheet (B-109 to B-114).
- Popover as a building block of MultiSelect and SplitButton; MultiSelect drives it through `visible`, `onVisibility`, `matchReferenceWidth`, `zIndex` and the appearance inputs (B-101 to B-108).

### Unsupported Composition

Not applicable — no unsupported composition is evidenced.

### Nesting Rules

- Nested ThemeProviders: each Popover follows its nearest ThemeProvider (B-110).

### Multiple Instances

- Popovers are independent of each other and of other floating elements regarding theme and layer (B-111).

---

## 11. Accessibility Contract

### Semantics

Not applicable — no role or description linkage is part of this contract.

### Accessible Name

Not applicable — provided by the consumer's anchor.

### Keyboard Access

No keyboard behavior is part of this contract (section 7).

### Focus

No focus behavior is part of this contract (section 7).

### Screen Reader Behavior

Not applicable.

### Visual Accessibility

- The content is presented with the colors of the theme given by B-110 and B-112; no other contrast guarantee is part of this contract.

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| Missing optional inputs | Click opens, bottom placement, arrow, no overlay, neutral-background (B-101, B-103, B-104). |
| `visible` true on first render | Content is displayed (B-102). |
| `visible` false and anchor clicked | `onVisibility(true)` is called and the content stays hidden until the consumer sets `visible` true (B-102). |
| `enabledClick` and `enabledHover` both false | The anchor does not open the popover; only `visible` can (B-101, B-102). |
| Popover opened inside an open Modal whose page also contains a themed side menu with its own Popover or Tooltip | The Modal's popover is displayed above the Modal in the theme of the Modal's ThemeProvider (B-109, B-110, B-111). |
| Popover with an explicit `zIndex` input | The given stack order applies; B-109 is stated for a popover without `zIndex`. |
| Popover inside an open Modal with `zIndex="top"` | The Modal's top layer is above every floating component (B-109 applies to the base layer only). |
| Popover in a nested ThemeProvider | Presented with the nested provider's theme (B-110). |
| Popover with no ThemeProvider | Default theme (B-112). |

---

## 13. Acceptance Criteria

### AC-101 - Click trigger (B-101)

**Given** a Popover with `enabledClick` true, and another with `enabledClick` false
**When** each anchor is clicked
**Then** the first displays its content and the second does not.

---

### AC-102 - Hover trigger (B-101)

**Given** a Popover with `enabledHover` true, and another with `enabledHover` false
**When** the pointer hovers each anchor
**Then** the first displays its content and the second does not.

---

### AC-103 - Controlled visibility (B-102)

**Given** a Popover with `visible` true and an `onVisibility` function, and another with `visible` false
**When** each anchor is clicked
**Then** the first is displayed from the start and `onVisibility` receives false; the second stays hidden and its `onVisibility` receives true.

---

### AC-104 - Placement and arrow (B-103)

**Given** Popovers with `position` top, bottom, left and right, hover enabled, and one with `arrow` false
**When** each is hovered
**Then** each content opens on the requested side separated from the anchor by the offset, shows an arrow on the edge facing the anchor, and the `arrow` false popover shows none.

---

### AC-105 - Appearance (B-104)

**Given** Popovers with each `backgroundColor` value, without `backgroundColor`, and with `padding` base, none and small
**When** each opens
**Then** each content carries the requested background and padding, and the one without `backgroundColor` carries neutral-background.

---

### AC-106 - Overlay (B-105)

**Given** an open Popover with `renderOverlay` true, and another open one with `renderOverlay` false
**When** the page is inspected
**Then** only the first has an overlay and a press at a point covered by the overlay does not reach the element behind it.

---

### AC-107 - Dismissal (B-106)

**Given** an open Popover with `enabledDismiss` true and an `onVisibility` function, and another with `enabledDismiss` false
**When** the user presses outside the content and the anchor
**Then** the first calls `onVisibility(false)` and the second does not request closing.

---

### AC-108 - Anchor width (B-107)

**Given** an open Popover with `matchReferenceWidth` true
**When** its content and anchor are measured
**Then** their widths are equal.

---

### AC-109 - Children function (B-108)

**Given** a Popover whose `children` is a function
**When** it is rendered, opened and closed
**Then** the function receives the current open state and a working `setVisibility`, and its result is the anchor.

---

### AC-110 - Above an open Modal (B-109)

**Given** an open Modal (default presentation, `zIndex` omitted) whose content contains a Popover without `zIndex`, on a page where another area is layered below the Modal
**When** the Popover is opened
**Then** its content is visible and painted above the Modal's overlay and container.

---

### AC-111 - Above an open Sidebar (B-109)

**Given** an open Sidebar (default presentation, no `zIndex`) whose content contains a Popover without `zIndex`
**When** the Popover is opened
**Then** its content is visible and painted above the Sidebar's overlay and container.

---

### AC-112 - Theme of origin (B-110)

**Given** a "base" ThemeProvider that contains a "next-dark" ThemeProvider, each containing a Popover
**When** each popover is opened
**Then** the nested one is presented with the "next-dark" theme colors and the other with the "base" theme colors.

---

### AC-113 - Independence from mount order (B-109, B-110, B-111)

**Given** a root ThemeProvider ("base") with an open Modal (`zIndex` omitted) whose content has a Popover, and a "next-dark" ThemeProvider wrapping a side menu with its own Popover and layered below the Modal
**When** the menu's Popover is rendered or opened before the Modal opens, rendered after it in the tree, or in a different order, and the Modal's Popover is then opened
**Then** in every arrangement the Modal's popover is displayed above the Modal in the "base" theme colors, and the menu's popover, opened with no Modal open, is presented in the "next-dark" theme colors.

---

### AC-114 - No ThemeProvider (B-112)

**Given** a Popover without any ThemeProvider, including one inside an open Modal (`zIndex` omitted)
**When** it is opened
**Then** its content uses the default theme colors and, inside the Modal, is displayed above the Modal.

---

### AC-115 - Recognizable floating content (B-113)

**Given** an open Popover, with and without `renderOverlay`, under a ThemeProvider and without one
**When** the content and the overlay are queried for their closest ancestor with the attribute `data-floating-ui-portal`
**Then** such an ancestor exists for both.

---

### AC-116 - Use from inside a BottomSheet (B-114)

**Given** an open BottomSheet inside a ThemeProvider whose body contains a Popover
**When** the Popover is opened, then a press is made inside the popover content, and a touch move is made inside it
**Then** the popover content is displayed above the sheet, the sheet's `onRemove` is not called, and the touch move is not default-prevented.

---

### Acceptance Criteria Rules

- Every behavior above is covered by at least one criterion.
- Criteria describe consumer-observable outcomes.

---

## 14. Origin of Guarantees

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-101 | B-101 | Supported | reconstructed | nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("THEN should display popover if anchor receives click event", "THEN should not display popover if anchor does not receive click event"); `popover.types.ts` `enabledClick` |
| AC-102 | B-101 | Supported | reconstructed | `popover.spec.tsx` ("THEN should display popover if anchor receives hover event", "THEN should not display popover if anchor does not receive hover event"); `popover.types.ts` `enabledHover` |
| AC-103 | B-102 | Supported | reconstructed | `popover.spec.tsx` ("THEN should render the popover open by default", "THEN should control the operation by the onVisibility function sent and with popover open", "... and with popover close"); `popover.types.ts` `visible`, `onVisibility`; story "Controlled" |
| AC-104 | B-103 | Supported | reconstructed | `popover.spec.tsx` (position tests for top, right, bottom, left; "THEN should not render popover arrow"); `popover.types.ts` defaults for `arrow`, `position`, `offset` |
| AC-105 | B-104 | Supported | reconstructed | `popover.spec.tsx` ("THEN should correctly render the submitted backgroundColor", including the default; "THEN should correctly render the submitted padding") |
| AC-106 | B-105 | Supported | reconstructed | `popover.spec.tsx` ("THEN should render popover with transparent overlay when renderOverlay prop is true"); `popover.types.ts` `renderOverlay`; story "With overlay" |
| AC-107 | B-106 | Supported | reconstructed | `popover.types.ts` `enabledDismiss` ("Adds listeners that dismiss (close) the floating element"); story "With overlay" (`enabledDismiss` true with outside presses) and stories top, bottom, right, left (`enabledDismiss` false) |
| AC-108 | B-107 | Supported | reconstructed | `popover.types.ts` `matchReferenceWidth`; consumer composition in `packages/react/src/atomic/MultiSelect/src/MultiSelect.tsx` |
| AC-109 | B-108 | Supported | reconstructed | `popover.types.ts` `children` function signature |
| AC-110 | B-109 | Supported | established | Nimbus zIndex tokens https://nimbus.nuvemshop.com.br/es-AR/documentation/tokens/zIndex (floating components at 800; modals and sidebars at 600 and 700); Modal `zIndex` documentation https://nimbus.nuvemshop.com.br/es-AR/documentation/composite-components/modal#props (base layer below tooltip, toast and popover) |
| AC-111 | B-109 | Supported | reconstructed | zIndex tokens documentation; Sidebar layer values in `packages/core/styles/src/packages/composite/sidebar/nimbus-sidebar.css.ts` and Popover content layer in `packages/core/styles/src/packages/atomic/popover/nimbus-popover.css.ts` at dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-112 | B-110 | Supported | reconstructed | Themes documentation https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas; `useTheme` and ThemeProvider in `packages/core/styles/src/components/ThemeProvider/ThemeProvider.tsx` at dcea961a3abb65e847e0131e54e4b5136363538e; TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `BottomSheet.tsx` and `bottomSheet.spec.tsx` (floating content treated as belonging to the nearest provider) |
| AC-113 | B-109, B-110, B-111 | Supported | established | Same sources as AC-110 and AC-112; the documented layer order carries no qualifier about the order in which elements are rendered or opened |
| AC-114 | B-112 | Supported | reconstructed | Themes documentation (default theme without ThemeProvider); `popover.spec.tsx` renders Popover without a provider |
| AC-115 | B-113 | Supported | reconstructed | TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `packages/react/src/components/BottomSheet/src/bottomSheet.constants.ts` (`FLOATING_UI_PORTAL_SELECTOR`), `hooks/useDismissHandlers.ts` and `hooks/useScrollLock.ts` (they treat presses and touches inside `[data-floating-ui-portal]` as floating content) |
| AC-116 | B-114 | Supported | reconstructed | TiendaNube/nimbus-patterns@6ce2872c7b9899024a0ae111fab53e824b3676d9 `BottomSheet/src/bottomSheet.spec.tsx` ("THEN a real Popover opened from inside the sheet should render above it, even inside a real Nimbus ThemeProvider", press-on-ignored-region and touchmove tests) |

---

## 15. Compatibility and Migration

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | None. No input added, removed or renamed; `visible`, `onVisibility`, `matchReferenceWidth`, `zIndex` and the children function keep working for MultiSelect and SplitButton. | Section 3 |
| Behavior and defaults | In page arrangements where another ThemeProvider's floating container previously held this popover's content, the popover is displayed above the Modal or Sidebar and in its own theme. | B-109 to B-111 |
| Layout and content | None. | Sections 8 and 9 |
| Accessibility and interactions | None. Presses and touches inside the content remain recognizable to first-party consumers. | B-113, B-114 |
| Supported composition | Unchanged. `useTheme` keeps returning the reference to the element that carries the theme and contains the provider's children, together with the current theme name; BottomSheet uses that element as its default placement. | Section 10 |

- Backward compatibility: Yes.
- Migration required: No.
- Consumer migration steps, when required: Not applicable.

### Rules

- Consumers of Popover inside this repository (MultiSelect, SplitButton) and in TiendaNube/nimbus-patterns (BottomSheet) keep working without changes (B-102, B-108, B-113, B-114).

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-101 | B-101 | Click anchors with click enabled and disabled; assert content presence. | `packages/react/src/atomic/Popover/src/popover.stories.tsx` (basic, Controlled) | `packages/react/src/atomic/Popover/src/popover.spec.tsx` ("THEN should display popover if anchor receives click event", "THEN should not display popover if anchor does not receive click event") |
| AC-102 | B-101 | Hover anchors with hover enabled and disabled; assert content presence. | `popover.stories.tsx` (top, bottom, right, left) | `popover.spec.tsx` (hover tests) |
| AC-103 | B-102 | Render with `visible` true and false, click, assert display and `onVisibility` argument. | `popover.stories.tsx` (Controlled) | `popover.spec.tsx` (onVisibility tests) |
| AC-104 | B-103 | Hover each position and with `arrow` false; assert side, offset and arrow. | `popover.stories.tsx` (top, bottom, right, left) | `popover.spec.tsx` (position and arrow tests) |
| AC-105 | B-104 | Render each background and padding value; assert classes. | — | `popover.spec.tsx` (backgroundColor and padding tests) |
| AC-106 | B-105 | Open with and without `renderOverlay`; assert overlay and that a press on it does not reach the element behind. | `popover.stories.tsx` (With overlay) | `popover.spec.tsx` ("THEN should render popover with transparent overlay when renderOverlay prop is true") |
| AC-107 | B-106 | Open with `enabledDismiss` true and false, press outside, assert `onVisibility`. | `popover.stories.tsx` (With overlay) | — |
| AC-108 | B-107 | Open with `matchReferenceWidth`, measure widths in a browser. | — | — |
| AC-109 | B-108 | Render with a children function, toggle, assert arguments. | — | — |
| AC-110 | B-109 | In a real browser render, open a Modal with a Popover and open the popover; assert painted order and visibility. | — | — |
| AC-111 | B-109 | Same as AC-110 with a Sidebar. | — | — |
| AC-112 | B-110 | Nest a "next-dark" provider in a "base" one, open each popover, assert computed colors. | — | — |
| AC-113 | B-109, B-110, B-111 | Arrange the menu provider and the Modal in each order listed, open both popovers, assert painted order and computed colors. | — | Partial, DOM structure only: `popover.spec.tsx` ("THEN content mounts in its own provider after another provider's popover mounted first", "AND content mounts in its own provider when the providers are used in reverse order") assert the portal parent in both orders; painted order and computed colors need a browser and are not verified |
| AC-114 | B-112 | Render without ThemeProvider, with and without a Modal, assert default colors and painted order. | — | Partial, DOM structure only: `popover.spec.tsx` ("AND content without a provider mounts in a body wrapper after a provider's popover mounted first") asserts the body wrapper; default colors and painted order need a browser and are not verified |
| AC-115 | B-113 | Open with and without overlay under and outside a provider; assert the closest `[data-floating-ui-portal]` ancestor. | — | Partial: `popover.spec.tsx` ("THEN content mounts in its own provider after another provider's popover mounted first", "AND content without a provider mounts in a body wrapper after a provider's popover mounted first") assert the closest `[data-floating-ui-portal]` ancestor without overlay only; the overlay variant is not covered |
| AC-116 | B-114 | Run the BottomSheet scenario with the changed Popover against TiendaNube/nimbus-patterns BottomSheet tests. | — | — |

### Rules

- Every Acceptance Criterion appears in the mapping.
- A dash means no reference is supplied; it does not mean the check passed.
