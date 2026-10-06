# Breadcrumb Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Breadcrumb shows the ordered path from the top of a multi-level hierarchy (root) to the page the user is on (current level), and lets the user navigate back to any ancestor level.

Use it when a page sits two or more levels deep in a hierarchy and the user needs to understand their position and go back to an ancestor.

Do not use it for:

- switching between views at the same level; use Nav Tabs for same-level views.
- step-by-step progress, selection of a value, or actions; Breadcrumb has no selection semantics and no actions.

Breadcrumb is standalone. Its documented placement is directly above the Page.Header of the Page pattern, positioned by the consumer; Page.Header itself exposes no slot for it. Breadcrumb may coexist with Nav Tabs on the same page (Nav Tabs for same-level views, Breadcrumb for hierarchy levels).

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Navigation landmark | Yes | Named container for the whole path. Rendered whenever `items` is non-empty. |
| Ordered list | Yes | One list item per visible level, plus one list item for the hidden-levels trigger when it is shown. |
| Ancestor link | Yes (per ancestor with `href`) | Navigable link for a level above the current one. |
| Ancestor text | No | Plain non-interactive text for an ancestor without `href`. |
| Current level | Yes (last item) | Non-interactive text marked as the current page. |
| Separator | Yes (between consecutive visible entries) | Decorative chevron, hidden from assistive technology, not a list item. |
| Hidden-levels trigger | No | Bare horizontal-ellipsis button, with no visible circle or background. Shown only when the path is collapsed (B-005). |
| Hidden-levels panel | No | Dropdown listing the hidden levels. Exists only while open. |

### Rules

- The trigger is shown if and only if at least one level is hidden (B-005).
- A separator appears between every two consecutive visible entries, including before and after the trigger, and nowhere else.
- Root and current level are never hidden.

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| `items` | Ordered array of `{ label: string, href?: string }` | Yes | — | Path from root (first) to current level (last). `label` is required non-empty text. `href` is the navigation target of an ancestor. May be an empty array. |
| `maxVisible` | Integer | No | `4` | Level limit. Finite integers below 3 behave as 3. Non-integer or non-finite values behave as the default 4. |
| `linkAs` | Consumer link component | No | Standard anchor | Used to render every ancestor link, visible and in the panel. Breadcrumb gives it the `href`, the label as content, and Breadcrumb's own appearance, focus and handler attributes. It MUST render a native anchor with that `href` and forward the received attributes. |
| `ariaLabel` | string | No | `"Breadcrumb"` | Accessible name of the navigation landmark. |
| `hiddenLevelsLabel` | string | No | `"Show hidden levels"` | Accessible name of the hidden-levels trigger. |

### Events

Not applicable — Breadcrumb exposes no events. Navigation is performed by the rendered links.

### Actions

Not applicable — Breadcrumb exposes no explicit actions.

### API Rules

- Breadcrumb does not depend on any specific router; `linkAs` is the only integration point for router-rendered links.
- The consumer supplies navigation only; link appearance, focus ring and tokens remain Breadcrumb's (B-003, B-021).
- There is no per-item component input, no disabled input and no input for width-driven behavior.
- `items` entries are rendered in the given order; Breadcrumb never reorders, deduplicates or drops entries.

---

## 4. Variants

Not applicable — Breadcrumb has a single variant.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Empty | `items` is an empty array | Nothing is rendered (B-007). |
| Single level | `items` has one entry | Only the current level is shown, as text (B-007). |
| Expanded path | Item count is at or below the limit | All levels are shown; no trigger (B-005). |
| Collapsed, panel closed | Item count exceeds the limit | Root, trigger, parent, current are shown; hidden levels are not rendered or exposed (B-005, B-009). |
| Collapsed, panel open | Trigger activated | Panel lists the hidden levels (B-009, B-011). |
| Hover | Pointer over an ancestor link | Nimbus Link hover appearance (B-021). |
| Focus | Keyboard focus on a link or the trigger | Nimbus focus ring (B-021). |

Disabled, loading and error states are not applicable: Breadcrumb has no such states.

---

## 6. Behavioral Contract

### B-001 - Ordered path
When `items` is non-empty, the component MUST render a navigation landmark named by `ariaLabel` containing an ordered list that presents the levels in `items` order from root to current, subject to B-005.

### B-002 - Native ancestor links
When an ancestor has `href` and `linkAs` is omitted, the component MUST render it as a standard anchor with that `href`. A plain primary click MUST navigate natively; the component MUST NOT prevent the default action of any click on a link. Opening in a new tab or window, and modifier-click and middle-click navigation, MUST behave as for any native anchor.

### B-003 - Router-agnostic link rendering
When `linkAs` is provided, the component MUST render every ancestor link with `href`, visible and in the panel, through it, passing the `href`, the label content and Breadcrumb's appearance, focus and handler attributes. The resulting element MUST be a native anchor with that `href`. Links rendered through `linkAs` MUST keep Breadcrumb's own link appearance, focus ring and tokens (B-021).

### B-004 - Current level
The last item MUST render as non-interactive text, not focusable, with `aria-current="page"`. An `href` on the last item MUST have no effect.

### B-005 - Collapse by level count
Let n be the number of items and L the effective limit (B-006). When n is at or below L, all levels MUST be shown and no trigger rendered. When n exceeds L, the visible path MUST be: item 1 (root), the trigger, item n-1 (parent), item n (current). Items at positions 2 through n-2 are hidden and MUST be listed in the panel in path order. The rule is identical at every screen size and there is no separate mobile form. The hidden set is never empty when the trigger is shown (L >= 3, so collapse occurs only at n >= 4). No item is duplicated or lost.

| Limit | n | Visible path | Hidden (panel) |
|---|---|---|---|
| 4 | 0 | nothing rendered | — |
| 4 | 1 | [current] | — |
| 4 | 3 | all 3 | — |
| 4 | 4 | all 4 | — |
| 4 | 5 | root, trigger, parent, current | item 2, 3 |
| 4 | 8 | root, trigger, parent, current | items 2 to 6 |
| 3 | 3 | all 3 | — |
| 3 | 4 | root, trigger, parent, current | item 2 |
| 10 | 8 | all 8 | — |

### B-006 - Limit normalization
`maxVisible` defaults to 4. A finite integer below 3 MUST behave as 3. A non-integer or non-finite value MUST behave as 4. A finite integer of 3 or more is used as given.

### B-007 - Empty and single input
When `items` is empty the component MUST render nothing. When `items` has one entry it MUST render only the current level, with the landmark, and no separator or trigger.

### B-008 - Wrapping
When the visible path does not fit on one line, it MUST wrap onto additional lines. Long labels MUST wrap; labels are never truncated and the path never collapses because of width.

### B-009 - Hidden levels panel
The panel MUST exist only while open. It MUST present the hidden levels, in path order, as a list inside a navigation group named by the trigger's accessible name. Each hidden level with `href` is a navigable link reachable by keyboard. The panel is navigation, not a listbox or menu: it has no selection semantics.

### B-010 - Trigger
When the trigger is shown, it MUST be a native button with a bare horizontal-ellipsis appearance and accessible name `hiddenLevelsLabel`, with `aria-expanded` reflecting whether the panel is open and a reference to the panel it controls while open. Its interactive target MUST be at least 32 by 32 CSS px.

### B-011 - Opening and toggling
Activating the trigger (click, Enter or Space) while the panel is closed MUST open it and move focus to the first link in the panel; if the panel contains no link, focus MUST stay on the trigger. Activating the trigger while the panel is open MUST close it, with focus remaining on the trigger.

### B-012 - Tab order
Keyboard movement between entries uses Tab and Shift+Tab only; arrow keys MUST NOT move focus between entries. Forward order follows the visible path: each visible ancestor link in path order, with the trigger at its position when shown and, while the panel is open, the panel's links in path order immediately after the trigger; then the next focusable element after Breadcrumb. For a collapsed path this is: root link, trigger, (panel open: hidden links), parent link, next element. The current level and levels without `href` (B-017) are never focusable and are skipped. Reverse order is exactly the opposite. Shift+Tab from the first panel link MUST move focus to the trigger with the panel still open.

### B-013 - Tab exit
When focus leaves the trigger-and-panel group through Tab or Shift+Tab, the panel MUST close and focus MUST remain where the user moved it, with no restoration to the trigger.

### B-014 - Escape
While the panel is open and focus is on the trigger or inside the panel, Escape MUST close only the panel and return focus to the trigger; an enclosing open Modal or Sidebar MUST stay open. When the panel is closed, Breadcrumb MUST NOT handle Escape, so it reaches an enclosing Modal or Sidebar normally. Whenever the panel is dismissed, focus returns to the trigger, except in the cases defined by B-013, B-015, B-016 and B-020.

### B-015 - Outside press
A pointer press outside the trigger and panel MUST close the panel. When the pressed target takes focus, focus MUST go to that target; when it does not, focus MUST return to the trigger.

### B-016 - Panel link activation
An unmodified primary click, or Enter, on a panel link MUST close the panel and navigation MUST proceed; Breadcrumb does not move focus to the trigger. A modifier-click or middle-click (new tab or window) MUST leave the panel open and focus unchanged.

### B-017 - Levels without link
An ancestor without `href` MUST render as non-interactive plain text in its position, in the visible path or in the panel, with no `aria-current` and not focusable.

### B-018 - Inside Modal or Sidebar
When Breadcrumb is inside an open Modal or Sidebar, its links and trigger, and the open panel's links, MUST be keyboard reachable and exposed to assistive technology.

### B-019 - Multiple instances
Instances are independent. Pressing another instance's trigger while a first instance's panel is open MUST close the first panel as an outside press (B-015, no focus restoration because the target takes focus) and open the second panel with focus on its first link. Outside-press dismissal leaves at most one panel open as a consequence.

### B-020 - Dynamic update
When `items` or `maxVisible` change while the panel is open, the panel MUST close. If focus was on the trigger or in the panel and the trigger still exists, focus MUST move to the trigger; if the trigger no longer exists, Breadcrumb MUST NOT relocate focus. When the panel is closed, the new visible and hidden sets apply per B-005.

### B-021 - Appearance
Ancestor links MUST use the Nimbus Link neutral appearance, with no underline at rest, Nimbus Link hover and the Nimbus focus ring. The current level MUST use Nimbus text styling distinguishable from links without relying on color alone; it is not underlined and not interactive. An unbreakable word longer than the container MUST break within the word, so there is no horizontal overflow.

### B-022 - Reading direction
In right-to-left contexts, the order of levels MUST follow reading direction and chevron separators MUST mirror.

### B-023 - Layout domain
In containers at least as wide as the trigger target plus one separator, the component MUST NOT overflow horizontally, at every breakpoint. Narrower containers are outside the supported domain.

---

## 7. Interaction Contract

### Pointer

- Clicking an ancestor link navigates natively (B-002, B-003); the default action is never prevented.
- Clicking the trigger toggles the panel (B-011).
- A press outside closes the panel (B-015). Clicking a panel link closes it (B-016).

### Keyboard

| Key | Listener | Active when | Effect |
|---|---|---|---|
| Tab / Shift+Tab | Focused element | Always | Moves per B-012; panel closes on leaving the group (B-013). Not prevented. |
| Enter / Space | Trigger | Trigger shown | Toggles panel per B-011 (native button). |
| Enter | Focused link | Always | Native navigation; on a panel link closes the panel (B-016). |
| Escape | Trigger and panel | Panel open and focus on trigger or in panel | Closes only the panel, focus to trigger; the key event does not propagate to an enclosing Modal or Sidebar, which also handle Escape and stay open (B-014). |

When the panel is closed, Escape is not handled by Breadcrumb and reaches Modal or Sidebar normally.

### Touch

- Tapping behaves as a pointer click and outside press (B-011, B-015, B-016).

### Focus

- Focus enters through the root link, the trigger or a visible ancestor link by Tab (B-012).
- Opening moves focus to the first panel link, or stays on the trigger when none (B-011).
- Dismissal focus rules: B-013 to B-016. Dynamic change: B-020.

---

## 8. Content Contract

### Labels

- Each `label` is non-empty text. The trigger name is `hiddenLevelsLabel`; the landmark name is `ariaLabel`. Both are consumer-localizable.

### Supporting Content

Not applicable — levels contain label text only.

### Icons

- The ellipsis in the trigger and the chevron separators are provided by Breadcrumb. Separators are decorative and hidden from assistive technology.

### Long Content

- Labels wrap; never truncated (B-008). Unbreakable words break within the word (B-021). The path wraps onto additional lines when needed.

### Localization

- Label, `ariaLabel` and `hiddenLevelsLabel` text lengths are not constrained; longer text wraps (B-008).
- RTL: B-022.

---

## 9. Layout and Responsive Behavior

### Sizing

- Trigger target at least 32 by 32 CSS px (B-010). Layout is the same at all breakpoints.

### Alignment

- Entries flow in reading direction, separated by chevrons (B-001, B-022).

### Overflow

- No horizontal overflow within the supported domain (B-023, B-021).

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| Any screen size | Collapse depends on level count only (B-005). |
| Path does not fit one line | Wraps to additional lines (B-008). |
| Container narrower than trigger target plus one separator | Outside the supported domain. |

---

## 10. Composition Contract

### Supported Composition

- Placed by the consumer directly above Page.Header of the Page pattern.
- Coexisting with Nav Tabs on the same page.
- Inside Modal or Sidebar (B-018).
- Router-rendered links through `linkAs` (B-003).

### Unsupported Composition

- A Page.Header slot for Breadcrumb; Page.Header is unchanged.
- Width-driven collapse, label truncation and a separate mobile back-link form.
- Arrow-key navigation and selection semantics.
- A `linkAs` component that does not render a native anchor with the given `href`.

### Nesting Rules

- Breadcrumb does not host other components; its entries are text links.

### Multiple Instances

- B-019.

---

## 11. Accessibility Contract

### Semantics

- Navigation landmark containing an ordered list; the panel is a list inside a navigation group, not a listbox or menu. Current level carries `aria-current="page"` (B-001, B-004, B-009).

### Accessible Name

- Landmark: `ariaLabel` (default "Breadcrumb"). Trigger: `hiddenLevelsLabel` (default "Show hidden levels"); panel group: the trigger's name (B-009, B-010).

### Keyboard Access

- Order: B-012. Opening, dismissal and activation: B-011, B-013 to B-016. All links and the trigger are keyboard reachable, also inside Modal or Sidebar (B-018).

### Focus

- Visible focus ring on every link and the trigger (B-021).
- Order, movement and restoration: B-011 to B-016, B-020.

### Screen Reader Behavior

- Communicates the landmark name, list position, the current page, the trigger name and expanded state, and the panel's group name while open. Separators are not announced. Hidden levels are not exposed while the panel is closed.

### Visual Accessibility

- Current level is distinguishable from links without relying on color alone (B-021). Text wraps at increased text size and zoom without horizontal overflow (B-008, B-023). Hover and focus use Nimbus tokens.

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| Long content | Labels wrap; long words break (B-008, B-021). |
| Empty data | Nothing rendered (B-007). |
| Single item | Only current level as text (B-007). |
| Ancestor without `href` | Plain text, not focusable, in the path or panel (B-017). |
| Panel with no links | Focus stays on the trigger when opened (B-011). |
| `href` on last item | No effect; current level stays text (B-004). |
| `maxVisible` below 3, e.g. 1 or 2 | Behaves as 3 (B-006). |
| `maxVisible` non-integer or non-finite | Behaves as 4 (B-006). |
| `maxVisible` at or above item count | No collapse; wrapping still applies (B-005, B-008). |
| Dynamic update with panel open | Panel closes, focus per B-020. |
| Multiple instances | B-019. |
| Escape inside Modal or Sidebar | B-014. |
| Disabled state | Not applicable — no disabled state. |

---

## 13. Acceptance Criteria

### AC-001 - Ordered path and landmark

**Given** `items` with 3 entries, `ariaLabel` omitted
**When** rendered
**Then** a navigation landmark named "Breadcrumb" contains an ordered list with the 3 levels in root-to-current order, with decorative chevrons hidden from assistive technology between entries (B-001, §2).

---

### AC-002 - Native link navigation

**Given** an ancestor with `href` and `linkAs` omitted
**When** the user plain-clicks, modifier-clicks or middle-clicks it
**Then** it is a standard anchor with that `href`, plain click navigates natively with default action not prevented, and new tab or window behaves natively (B-002).

---

### AC-003 - Router-rendered links

**Given** `linkAs` is a consumer component rendering a native anchor with the received attributes
**When** the path is collapsed and the panel is open
**Then** every visible ancestor link and every panel link is rendered through it with its `href`, and all keep Breadcrumb's appearance and focus ring (B-003, B-021).

---

### AC-004 - Current level

**Given** `items` whose last entry has an `href`
**When** rendered
**Then** the last level is non-interactive, not focusable text with `aria-current="page"` and no link (B-004).

---

### AC-005 - Collapse by count

**Given** limit and item counts from the B-005 table
**When** rendered
**Then** each row's visible path and hidden set match the table exactly, with root and current always visible, hidden items in path order in the panel when opened, none duplicated or lost, and identical output at every screen size (B-005).

---

### AC-006 - Limit normalization

**Given** `maxVisible` is 1, 2, 2.5, `NaN`, `Infinity`, or omitted, with 4 items and then 5 items
**When** rendered
**Then** 1 and 2 behave as 3 (4 items collapse item 2); 2.5, `NaN`, `Infinity` and omitted behave as 4 (4 items show all; 5 items collapse items 2 and 3) (B-006).

---

### AC-007 - Empty and single

**Given** `items` is `[]`, then one entry
**When** rendered
**Then** the first renders nothing; the second renders only the current level as text, with no trigger or separator (B-007).

---

### AC-008 - Wrapping without truncation

**Given** a path with long labels in a container too narrow for one line, at least as wide as the trigger target plus one separator
**When** rendered
**Then** the path wraps onto additional lines, labels are fully shown, no width-driven collapse occurs, and an unbreakable word longer than the container breaks within the word with no horizontal overflow (B-008, B-021, B-023).

---

### AC-009 - Hidden levels panel content

**Given** a collapsed path whose hidden levels include linked entries
**When** the panel is closed, then opened
**Then** while closed no hidden level is rendered or exposed; while open a list of the hidden levels in path order appears inside a navigation group named by the trigger's accessible name, each linked level keyboard reachable, with no listbox, menu or selection semantics (B-009).

---

### AC-010 - Trigger semantics

**Given** a collapsed path, so the trigger exists
**When** inspected closed and open
**Then** it is a native button named "Show hidden levels" (or `hiddenLevelsLabel`), with a bare ellipsis and no visible circle or background, `aria-expanded` false then true, referencing the panel while open, and a target of at least 32 by 32 CSS px (B-010).

---

### AC-011 - Opening and toggling

**Given** a collapsed path, panel closed
**When** the trigger is activated by click, Enter or Space; then activated again
**Then** the first activation opens the panel with focus on its first link (or on the trigger if the panel has no link); the second closes it with focus on the trigger (B-011).

---

### AC-012 - Tab order

**Given** a focusable control before and after Breadcrumb, with a collapsed path and then an uncollapsed path
**When** the user tabs forward and then backward, for the collapsed path with the panel closed and with it open
**Then** forward order is root link, trigger, (open: hidden links in order), visible ancestor links, next control; current is skipped; reverse is exactly opposite; Shift+Tab from the first panel link reaches the trigger with the panel open; arrow keys do not move focus between entries; with an uncollapsed path of 3 linked ancestors and a current level, forward order is the 3 ancestor links then the next control (B-012).

---

### AC-013 - Tab exit

**Given** the panel is open with focus in the panel
**When** the user tabs or shift-tabs out of the trigger-and-panel group
**Then** the panel closes and focus stays on the element the user moved to (B-013).

---

### AC-014 - Escape

**Given** the panel is open, with focus on the trigger, then inside the panel, then the panel closed; Breadcrumb inside an open Modal
**When** Escape is pressed
**Then** while open the panel closes, focus is on the trigger, and the Modal stays open; while closed Escape reaches the Modal normally (B-014).

---

### AC-015 - Outside press

**Given** the panel is open, with focus inside it, then (reopened) with focus on the trigger
**When** in each case the user presses a non-focusable area outside, then (reopened) a focusable control outside
**Then** the panel closes every time; after a non-focusable press focus is on the trigger, after a focusable press focus is on the pressed control (B-015).

---

### AC-016 - Panel link activation

**Given** the panel is open with a linked hidden level
**When** the user plain-clicks it or presses Enter on it, then (reopened) modifier-clicks or middle-clicks it
**Then** the first closes the panel and navigation proceeds without focus moving to the trigger; the second leaves the panel open, focus unchanged, and the link opens in a new tab or window (B-016, B-002).

---

### AC-017 - Levels without link

**Given** an ancestor without `href`, visible and then hidden in the panel
**When** rendered and tabbed through
**Then** it appears as plain text in its position, with no `aria-current`, never focusable and skipped in the Tab order (B-017, B-012).

---

### AC-018 - Inside Modal or Sidebar

**Given** Breadcrumb inside an open Modal, then an open Sidebar, with the panel open
**When** the user tabs and inspects the accessibility tree
**Then** links, trigger and panel links are keyboard reachable and exposed to assistive technology (B-018).

---

### AC-019 - Multiple instances

**Given** two collapsed Breadcrumbs, with the first panel open
**When** the user presses the second instance's trigger
**Then** the first panel closes without focus restoration, and the second opens with focus on its first link, leaving one panel open (B-019).

---

### AC-020 - Dynamic update

**Given** the panel is open with focus on a panel link, then again with focus on the trigger
**When** `items` or `maxVisible` change, once keeping the trigger and once removing it
**Then** the panel closes; with the trigger present focus moves to it; without it Breadcrumb does not relocate focus; after closing the new sets follow B-005 (B-020).

---

### AC-021 - Appearance

**Given** a rendered path
**When** links are at rest, hovered and focused, and the current level is inspected
**Then** links have the Nimbus Link neutral appearance with no underline at rest, Nimbus Link hover and the Nimbus focus ring; the current level is styled distinguishably without relying on color alone, not underlined and not interactive (B-021).

---

### AC-022 - Reading direction

**Given** a right-to-left context
**When** rendered
**Then** levels follow reading direction and chevrons mirror (B-022).

---

### AC-023 - Layout domain

**Given** containers at the minimum supported width (trigger target plus one separator) and wider, at several breakpoints
**When** rendered with a collapsed path
**Then** there is no horizontal overflow (B-023, B-008).

---

## 14. Origin of Guarantees

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001 | Supported | established | Nimbus Breadcrumb direction for issue #553 (Design decision): ordered path root to current; need: understand position in a multi-level hierarchy (TiendaNube/nimbus-design-system issue #553) |
| AC-002 | B-002 | Supported | established | Nimbus Breadcrumb direction for issue #553 (Design decision): ancestors are real links, native behavior preserved, plain click never prevented |
| AC-003 | B-003 | Supported | established | Nimbus Breadcrumb direction for issue #553 (Design decision): router-agnostic link rendering; router-rendered links keep Breadcrumb appearance, consumer supplies only navigation |
| AC-003 | B-003 (`linkAs` input) | Design choice | — | Serves router-agnostic rendering and appearance preservation; follows the Link polymorphic `as` convention (nimbus-design-system@dcea961:packages/react/src/atomic/Link/src/Link.tsx#L18-L77; packages/core/typings/src/index.types.ts#L54-L79) |
| AC-004 | B-004 | Supported | established | Nimbus Breadcrumb direction (Design decision): current level is non-interactive text with `aria-current="page"` |
| AC-005 | B-005 | Supported | established | Nimbus Breadcrumb direction (Design decision): collapse by level count only, default 4, minimum 3, root, ellipsis, parent, current; same on all sizes |
| AC-006 | B-006, §3 | Design choice | — | Serves the default 4 / minimum 3 requirement; defines a total behavior for out-of-range and non-numeric values |
| AC-007 | B-007 | Supported | established | Nimbus Breadcrumb direction (Design decision): empty renders nothing, single item shows only current level |
| AC-008 | B-008 | Supported | established | Nimbus Breadcrumb direction (Design decision): paths wrap, long labels wrap, no truncation or width-driven collapse |
| AC-009 | B-009 | Supported | established | Nimbus Breadcrumb direction (Design decision): hidden levels in a dropdown, navigation semantics not listbox/menu |
| AC-009 | B-009 (list within named navigation group, exists only while open) | Design choice | — | Serves the dropdown-with-navigation-semantics requirement; named group gives it an accessible name |
| AC-010 | B-010 (bare horizontal ellipsis, no circle or background) | Supported | established | Nimbus Breadcrumb direction for issue #553 (Design decision): bare horizontal-ellipsis trigger without visible circle or background |
| AC-010 | B-010 (native button, `aria-expanded`, panel reference, default name, 32 by 32 target) | Design choice | — | Serves the dropdown trigger requirement with standard disclosure-button semantics; target size follows the Nimbus SplitButton accessibility guidance (nimbus docs composite-components/split-button#accesibilidad) |
| AC-011 | B-011 | Design choice | — | Serves keyboard access to hidden levels; moves focus into the panel so the links are reachable |
| AC-012 | B-012 | Design choice | — | Serves the requirement that every hidden level is a keyboard-accessible link with navigation semantics; Tab-only movement follows the Tab-based Nimbus Menu accessibility guidance (nimbus docs patterns/menu#accesibilidad) and makes the order across visible links, trigger and panel explicit |
| AC-013 | B-013 | Design choice | — | Serves keyboard access without trapping focus; no focus restoration so the user's move is respected |
| AC-014 | B-014 | Supported | established | Nimbus Breadcrumb direction (Design decision): focus returns to the trigger when the dropdown is dismissed |
| AC-014 | B-014 (Escape scope, propagation, Modal/Sidebar interaction) | Design choice | — | Serves dismissal with focus return; Escape handling in nimbus-design-system@dcea961:packages/react/src/composite/Modal/src/Modal.tsx#L80-L125 and composite/Sidebar/src/Sidebar.tsx#L74-L105 requires a defined outcome when nested |
| AC-015 | B-015 | Design choice | — | Serves dismissal behavior; focus goes to a pressed target that takes focus (Popover dismissal in nimbus-design-system@dcea961:packages/react/src/atomic/Popover/src/Popover.tsx#L99-L174) |
| AC-016 | B-016 | Design choice | — | Serves preserved native link behavior (modifier-click) and dropdown dismissal |
| AC-017 | B-017 | Design choice | — | Serves the requirement that only links are navigable; defines an ancestor lacking `href` |
| AC-018 | B-018 | Design choice | — | Serves keyboard access to hidden levels; Modal and Sidebar make outside content inert (nimbus-design-system@dcea961 Modal.tsx#L80-L125, Sidebar.tsx#L74-L105) |
| AC-019 | B-019 | Design choice | — | Serves independent instances and dismissal consistency; limited to outside-press consequence |
| AC-020 | B-020 | Design choice | — | Serves the focus-return requirement when the focused element or hidden set changes |
| AC-021 | B-021 | Design choice | — | Serves the requirement that ancestor links, including router-rendered ones, share one Breadcrumb appearance distinct from the non-interactive current level; reuses the Nimbus Link styles and focus ring (nimbus-design-system@dcea961:packages/core/styles/src/packages/atomic/link/nimbus-link.css.ts#L14-L33; Figma Link node figma:TDwgeblsVNeHKKRvoDRk7n#20305:2285); word breaking serves wrapping without truncation |
| AC-022 | B-022 | Design choice | — | Serves reading-order correctness for RTL consumers |
| AC-023 | B-023 | Design choice | — | Serves wrapping without truncation; defines a physically possible layout domain from the trigger target (SplitButton guidance) |

---

## 15. Compatibility and Migration

Breadcrumb is a new component. There is no previous contract to migrate.

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | Adds `items`, `maxVisible`, `linkAs`, `ariaLabel`, `hiddenLevelsLabel`. | §3 |
| Behavior and defaults | Additive; defaults 4 and 3. | B-005, B-006 |
| Layout and content | Additive. | §9 |
| Accessibility and interactions | Additive. | §11, B-011 to B-020 |
| Supported composition | Placed above Page.Header by the consumer; Page.Header and Nav Tabs are unchanged. | §10 |

- Backward compatibility: no existing component is changed.
- Migration required: No
- Consumer migration steps, when required: Not applicable.

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Render 3 items; check landmark name, ordered list, order and chevrons hidden from the accessibility tree. | `src/breadcrumb.stories.tsx`: `Basic` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-001 …` |
| AC-002 | B-002 | Render ancestor with href; plain click navigates and is not default-prevented; modifier and middle click open new tab. | `src/breadcrumb.stories.tsx`: `Basic` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-002 …` |
| AC-003 | B-003 | Render with a native-anchor `linkAs`; confirm visible and panel links use it, with Breadcrumb appearance and focus ring. | `src/breadcrumb.stories.tsx`: `RouterLink` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-003 …` |
| AC-004 | B-004 | Render last item with href; confirm text, not focusable, `aria-current="page"`. | `src/breadcrumb.stories.tsx`: `Basic` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-004 …` |
| AC-005 | B-005 | Render each row of the boundary table; compare visible and hidden sets and panel order, at narrow and wide viewports. | `src/breadcrumb.stories.tsx`: `Collapsed`, `CustomLimit` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-005 …` |
| AC-006 | B-006 | Render with 1, 2, 2.5, NaN, Infinity, omitted at 4 and 5 items; compare sets. | `src/breadcrumb.stories.tsx`: `CustomLimit` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-006 …` |
| AC-007 | B-007 | Render `[]` and one item; check output. | `src/breadcrumb.stories.tsx`: `Basic` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-007 …` |
| AC-008 | B-008, B-021, B-023 | Render long labels and a long unbreakable word in a narrow container; check wrapping and no horizontal scroll. | `src/breadcrumb.stories.tsx`: `LongLabels` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-008 …` (layout wrapping and no horizontal scroll pending browser check) |
| AC-009 | B-009 | Collapsed path: panel absent from DOM and accessibility tree when closed; list, group name and order when open. | `src/breadcrumb.stories.tsx`: `Collapsed` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-009 …` |
| AC-010 | B-010 | Inspect trigger role, name, `aria-expanded`, panel reference, bare look and 32 by 32 target. | `src/breadcrumb.stories.tsx`: `Collapsed` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-010 …` (bare look and 32 by 32 rendered size pending browser check) |
| AC-011 | B-011 | Activate by click, Enter, Space; check focus on first panel link; panel without link keeps focus; second activation closes. | `src/breadcrumb.stories.tsx`: `Collapsed` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-011 …` |
| AC-012 | B-012 | Tab forward and backward across surrounding controls for an uncollapsed path and a collapsed path, closed and open; arrow keys do not move focus between entries. | `src/breadcrumb.stories.tsx`: `Collapsed` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-012 …` |
| AC-013 | B-013 | Open panel, Tab and Shift+Tab out; confirm panel closed and focus on the moved-to element. | `src/breadcrumb.stories.tsx`: `Collapsed` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-013 …` |
| AC-014 | B-014 | Press Escape open (trigger and panel focus) inside a Modal; then closed; check Modal state and focus. | `src/breadcrumb.stories.tsx`: `InsideModal` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-014 …` |
| AC-015 | B-015 | With focus in the panel and then on the trigger, press outside on a non-focusable area and on a button; check close and focus target. | `src/breadcrumb.stories.tsx`: `Collapsed` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-015 …` (real-browser focus target pending browser check) |
| AC-016 | B-016 | Plain-click, Enter, modifier-click and middle-click a panel link; check panel, focus and navigation. | `src/breadcrumb.stories.tsx`: `Collapsed` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-016 …` (real new-tab navigation pending browser check) |
| AC-017 | B-017, B-012 | Items without href, visible and hidden; check text, no focus, Tab skip. | `src/breadcrumb.stories.tsx`: `WithoutLinks` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-017 …` |
| AC-018 | B-018 | Open Modal and Sidebar with Breadcrumb; tab through and inspect accessibility tree. | `src/breadcrumb.stories.tsx`: `InsideModal`, `InsideSidebar` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-018 …` |
| AC-019 | B-019 | Two instances; open first, press second trigger; check panels and focus. | `src/breadcrumb.stories.tsx`: `MultipleInstances` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-019 …` |
| AC-020 | B-020 | Open panel, change `items` and `maxVisible`, with and without the trigger remaining; check focus and sets. | `src/breadcrumb.stories.tsx`: `Collapsed` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-020 …` |
| AC-021 | B-021 | Inspect rest, hover, focus styles and current-level styling. | `src/breadcrumb.stories.tsx`: `Basic`, `RouterLink` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-021 …` (hover and focus-ring paint pending browser check) |
| AC-022 | B-022 | Render under RTL; check order and mirrored chevrons. | `src/breadcrumb.stories.tsx`: `RTL` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-022 …` (mirrored chevron paint pending browser check) |
| AC-023 | B-023 | Render at minimum supported width and wider across breakpoints; check no horizontal overflow. | `src/breadcrumb.stories.tsx`: `LongLabels` | `src/breadcrumb.spec.tsx`: tests titled `THEN AC-023 …` (no horizontal overflow across breakpoints pending browser check) |
