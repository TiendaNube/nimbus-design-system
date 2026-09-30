# Breadcrumb Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Breadcrumb shows a user's current position in a multi-level navigation hierarchy and lets them navigate back to any ancestor level.

- **Use when:** a product experience has a multi-level navigation hierarchy and users need location context and a way back to previous levels.
- **Do not use for:** switching between views of equal hierarchy (use Nav Tabs), stepping through a long list (Pagination), a single link to another destination (Link), or internal navigation within a single view or flow.
- **Related:** Nav Tabs may be shown near a Breadcrumb; the two are independent (§10). Breadcrumb represents the path only. It does not represent sibling levels.

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Navigation region | Yes | Landmark that contains the whole breadcrumb; has an accessible name. |
| Level list | Yes | Ordered list of levels, from the top-most ancestor to the current level. |
| Ancestor link | Yes (all levels except the current one that are visible) | Link to an ancestor level. |
| Current level | Yes | Last level; non-interactive text. |
| Separator | Yes (between adjacent visible parts) | Decorative chevron between two adjacent parts. |
| Overflow trigger | Only when at least one ancestor is hidden | Button showing a bare horizontal ellipsis glyph (no visible circle or background). |
| Hidden-levels panel | Only while open | Dropdown of links to the hidden ancestors, in hierarchy order. |

### Rules

- Levels are ordered top-most ancestor first, current level last (B-001).
- The trigger appears if and only if at least one ancestor is hidden (B-006, B-007). The panel exists only while open.
- Separators appear only between two adjacent parts in the visible strip (level or trigger). None appears before the first part or after the current level, and none appears inside the panel.
- The trigger takes the position of the hidden run: after the first level when the first level is visible, otherwise first in the strip.

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| `items` | list of level items (below) | Yes | — | Levels from top-most ancestor to current level. May be empty (B-013). |
| `label` | text | Yes | — | Accessible name of the navigation region (for example "Breadcrumb"), supplied by the consumer in the product language. |
| `hiddenLevelsLabel` | text | Yes | — | Accessible name of the overflow trigger (for example "Show hidden levels"), supplied by the consumer in the product language. |
| `as` | link element type or link component | No | native anchor | Element or component used to render every ancestor link, visible and inside the panel (B-004). |

**Level item**

| Field | Type | Required | Description |
|---|---|---:|---|
| `label` | text | Yes | Text of the level. |
| `href` | text (URL) | Yes for every level except the last | Destination of the ancestor link. |
| `linkProps` | key/value attributes | No | Extra attributes forwarded to the rendered ancestor link (for example a router destination), used with `as`. |

`href` and `linkProps` on the last item are ignored: the last item is always the current level (B-002).

### Events

Not applicable — Breadcrumb exposes no events of its own. Consumers observe navigation through the links themselves (for example an `onClick` supplied in `linkProps`). The open state of the panel is internal and not controllable.

### Actions

Not applicable — no explicit actions.

### API Rules

- No router or framework navigation library is a dependency; routing is supplied by the consumer through `as` (B-004).
- The consumer never supplies markup for the trigger, separators or panel; there is no separate input for a maximum visible count (collapse is width-driven, B-006).
- Defaults: `as` renders a native anchor using `href`.

## 4. Variants

Not applicable — a single visual variant is supported.

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Default, all levels visible | Container wide enough for every level at full label width | All levels in the strip, no trigger (B-006). |
| Collapsed, panel closed | At least one ancestor hidden, panel not open | Trigger shown, no panel (B-007). |
| Collapsed, panel open | Trigger activated | Panel lists all hidden ancestors; trigger reports expanded (B-008). |
| Link hover / focus-visible / active | Pointer or keyboard on an ancestor link, trigger or panel link | Same interaction states as the Nimbus Link (links) or a visibly indicated focus and hover (trigger) (B-005, B-007). |
| Empty | `items` is empty | Nothing rendered (B-013). |
| Disabled, loading, error | — | Not applicable — not part of this component. |

## 6. Behavioral Contract

### B-001 - Level structure and order
When `items` is non-empty, the component MUST render a navigation region with an accessible name (`label`) containing an ordered list of levels in the input order. Every level is either in the visible strip or, when hidden, in the panel; no level is duplicated or lost.

### B-002 - Current level
The last item MUST always be the current level. It MUST be non-interactive text (not a link, not focusable) and MUST expose `aria-current="page"`. It MUST be distinguishable from ancestor links without relying on color alone. No other level exposes `aria-current`.

### B-003 - Ancestor links preserve native behavior
Each ancestor MUST be a link to its destination, in the strip and in the panel. Native link behavior MUST be preserved: modifier-click, middle-click and opening in a new tab work as for any link, and the component MUST NOT prevent default navigation.

### B-004 - Router-aware links
By default ancestors render as native anchors with `href`. When `as` is provided, every ancestor link (visible or in the panel) is rendered with that element or component, receiving `href` and `linkProps`, so client-side routers can handle navigation. Breadcrumb MUST NOT depend on a specific router. The component or element supplied via `as` is responsible for rendering an element that is a link.

### B-005 - Default appearance preserved
Ancestor links MUST have the same Nimbus appearance, tokens and interaction states whether rendered by default or through `as`. Customizing navigation MUST NOT change the visual design by default.

### B-006 - Width-driven collapse
Collapse depends only on available width; there is no count limit. Let the levels be 1..n (n = number of items) with level n the current level.

**Definitions.** A set of parts "fits" when the sum of its parts' widths plus one separator between each pair of adjacent parts is at most the container width. A level is measured at its full single-line label width. The overflow trigger counts as a part whenever at least one ancestor is hidden.

**Priority of parts, from highest to lowest:**
1. The current level (level n) is always visible.
2. The overflow trigger is visible whenever any ancestor is hidden.
3. Level 1, when n ≥ 2.
4. The ancestors nearest to the current level: n-1, then n-2, … down to level 2.
A lower-priority part is shown only if every higher-priority part remains visible and the strip still fits.

**Selection procedure.**
1. If every level fits on one line at full label width (no trigger), all levels are visible and there is no trigger.
2. Otherwise the trigger is reserved, and the strip starts as {trigger, level n}. First, level 1 is added if it fits (strip: level 1, trigger, level n). Then levels n-1, n-2, … down to level 2 are each tried in that order; a level is added only if it fits, and the procedure stops at the first level that does not fit. A nearer-to-current level that does not fit therefore also keeps every farther level hidden, even a short one (no skipping). Level 1 is the only exception to nearest-first order, because it is tested before the others.
3. All levels not in the strip are hidden. Because level 1 is either hidden or followed directly by the hidden run, and the added nearer levels are always a run ending at level n-1, the hidden set is one contiguous run of ancestors, listed in hierarchy order in the panel, and is never empty in this case. (If every ancestor fit alongside the reserved trigger, every level would also fit without it, and step 1 would have applied.)
4. Truncation: the current level is truncated (B-011) only when trigger + separator + current level at full width does not fit the container, that is, when even with every ancestor hidden it cannot fit at full width. With n = 1 there is no trigger and it is truncated if wider than the container. Ancestors are never truncated in the strip; an ancestor that does not fit is hidden.
5. The rule applies within the supported layout domain (B-012).

**Worked example (widths in arbitrary units).** Levels A › B › C › D (D current), every label width 10, separator 2, trigger 3. All levels: 4×10 + 3×2 = 46.

| Container width | Visible strip | Hidden (panel order) | Why |
|---|---|---|---|
| 46 or more | A › B › C › D | none | Step 1 |
| 39 to 45 | A › … › C › D | B | A (27) and C (39) fit; B would make everything visible (46) |
| 27 to 38 | A › … › D | B, C | A fits (27); C does not (39) |
| 15 to 26 | … › D | A, B, C | A does not fit (27); C would also need 27; D with trigger is 15 |
| 12 to 14 (assuming an ellipsis plus one character is 7 wide; lower bound of B-012) | … › D with D truncated | A, B, C | D is truncated so the trigger stays visible |

**Further boundary examples.**
- Very wide A: A › B › C › D where A is 40 wide and B, C, D are 10 wide, container 30: A does not fit (40 + 2 + 3 + 2 + 10 > 30); C fits (3+2+10+2+10 = 27); B does not (27 + 2 + 10 = 39 > 30). Strip: … › C › D; hidden {A, B}.
- Two levels A › D, container narrower than A + separator + D: strip … › D; hidden {A}. No level is hidden when A › D fits.
- Three levels A › B › C, B shorter than A: if A does not fit with trigger and C but B does, strip … › B › C; hidden {A}.
- One level: only the current level; truncated when wider than the container.

### B-007 - Overflow trigger
The trigger MUST exist only while at least one ancestor is hidden, be a button with an accessible name (`hiddenLevelsLabel`), show only a bare ellipsis glyph without a visible circle or background, expose its expanded/collapsed state, and never submit an enclosing form.

### B-008 - Hidden-levels panel
Activating the trigger (pointer, touch, Enter or Space) MUST open a panel adjacent to the trigger listing every hidden ancestor as a link, in hierarchy order. The panel uses navigation semantics: it is a list of links, not a menu or listbox, and its items are not selectable values. Panel labels wrap rather than truncate. Activating the trigger while the panel is open closes it.

### B-009 - Keyboard model
Keyboard access is Tab order only; there is no arrow-key navigation. In the strip the tab sequence is: ancestor links and the trigger in visual order; the current level is skipped. When the panel opens, focus moves to its first link (regardless of input method). Tab moves to the next panel link and Shift+Tab to the previous. Tab from the last panel link closes the panel and moves focus to the next tabbable element after the trigger in the strip, or the next tabbable after the Breadcrumb when none follows. Shift+Tab from the first panel link closes the panel and moves focus to the trigger.

### B-010 - Dismissal and focus return
The panel closes on: Escape, activating a panel link, activating the trigger, Tab/Shift+Tab out of the panel (B-009), an outside pointer or touch press, and the hidden set becoming empty (B-015). On every dismissal focus MUST return to the trigger, with these exceptions: (a) after Tab out of the panel, focus goes where B-009 states; (b) after an outside press on a focusable element, focus stays on that element and MUST NOT be pulled back; (c) when the hidden set becomes empty, focus moves as B-015 states; (d) after an unmodified activation of a panel link that navigates away, the trigger receives focus only if it still exists after navigation. Modifier-click or new-tab activation of a panel link closes the panel and returns focus to the trigger.

### B-011 - Long labels
Strip labels are single-line. Only the current level truncates, with an ellipsis, and its full text remains the accessible text. Panel labels wrap (B-008). Levels are never wrapped onto a second line.

### B-012 - Supported layout domain
Guarantees in B-006 hold when the container is at least as wide as the trigger, one separator and the current level truncated to an ellipsis plus at least one character of its label (with a single level: the current level truncated to that size alone). At the smallest width in the domain the visible strip is the trigger and the truncated current level; every ancestor is in the panel. Below this width no layout is guaranteed, though every level remains in the accessibility tree order of B-001 and none is discarded.

### B-013 - Empty and single level
With no items nothing is rendered, including no navigation region. With one item only the current level is rendered inside the navigation region: no links, separators or trigger.

### B-014 - Multiple instances
Instances are independent. At most one panel is open across instances at a time: opening a panel of one instance closes an open panel of another, without that dismissal moving focus away from the newly opened panel (B-010(b)). After opening, focus is on the first link of the newly opened panel.

### B-015 - Dynamic updates
When width or `items` changes, B-006 is re-evaluated. Focus is handled by the first applicable rule below; in every case a still-existing focused element keeps focus unless a rule says otherwise.
1. **Hidden set becomes empty.** The trigger disappears and any open panel closes. If focus was on the trigger or on a panel link, it moves to the first level's link when one exists (two or more items), otherwise no focus target is guaranteed. Focus on a visible strip link does not move.
2. **Hidden set stays non-empty, panel open, focus on a panel link whose level left the hidden set or was removed from `items`.** The panel stays open and lists the updated hidden set; focus moves to the first remaining panel link.
3. **Hidden set is non-empty and focus is on a strip ancestor link whose level becomes hidden** (the level is still in `items`, for example because the container narrowed). If the panel of that instance is open, it stays open and lists that level, and focus moves to that level's link in the panel. If the panel is closed, focus moves to the trigger (which appears if it was not already present). This applies whether focus reached the strip link by Tab, pointer, or, while the panel is open, by assistive technology or script. A strip link that stays visible keeps focus and is not affected.
4. **Focused strip link's level is removed from `items` or becomes the current level.** No focus target is guaranteed.

Panel open or closed state is otherwise preserved while the hidden set stays non-empty. Rules apply per instance; another instance's open panel is unaffected by them (B-014).

### B-016 - Accessible names
The navigation region is named by `label` and the trigger by `hiddenLevelsLabel`; both names are consumer-supplied and localized by the consumer.

## 7. Interaction Contract

### Pointer
- Clicking an ancestor link navigates per B-003/B-004; clicking the trigger opens or closes the panel (B-008); pressing outside dismisses it (B-010).

### Keyboard
- As B-009 (traversal) and B-010 (dismissal). Enter/Space on the trigger open it. Escape closes the panel.
- Sequence with panel closed, and controls X before and Y after the Breadcrumb, for A › … › C › D: forward X → A → trigger → C → Y; reverse Y → C → trigger → A → X (D is skipped). If A is hidden: forward X → trigger → C → Y.
- Sequence with panel open: trigger activated → first panel link → … → last panel link → Tab → C.

### Touch
- Tap behaves as pointer click and tap outside as outside press.

### Focus
- Focus entry, movement and restoration are defined in B-009, B-010, B-014 and B-015; the visible focus indication is in §11.

## 8. Content Contract

### Labels
- Level labels and both accessible names are plain text supplied by the consumer.

### Supporting Content
- Not applicable — no supporting content.

### Icons
- The separator is a decorative chevron hidden from assistive technology; the trigger uses only an ellipsis glyph.

### Long Content
- As B-011.

### Localization
- All text is consumer-supplied. Right-to-left layouts are outside the supported scope of this contract.

## 9. Layout and Responsive Behavior

### Sizing
- Width fills the available container; height follows one line of content.

### Alignment
- Parts are aligned to the start of the container on one line.

### Overflow
- Handled by collapse (B-006) and truncation of the current level (B-011).

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| Everything fits | All levels visible, no trigger (B-006 step 1). |
| Not everything fits, within B-012 domain | Priority order of B-006: current level, then trigger, then level 1, then the nearest ancestors; the rest are hidden in one contiguous run and listed in the panel. |
| Current level with trigger does not fit at full width | All ancestors hidden; only the current level truncates (B-006.4). |
| Container below B-012 domain | No layout guarantee (B-012). |

The worked widths table in B-006 is the reference for boundaries between these rows.

## 10. Composition Contract

### Supported Composition
- Placed near Nimbus Nav Tabs or other navigation surfaces as an independent component; it does not affect or depend on them.
- Router links via `as` (B-004).

### Unsupported Composition
- Nesting a Breadcrumb inside another Breadcrumb or inside its panel.
- Custom content in the trigger or panel.

### Nesting Rules
- Not applicable beyond the above.

### Multiple Instances
- As B-014.

## 11. Accessibility Contract

### Semantics
- Navigation landmark containing an ordered list; ancestor links are links; current level has `aria-current="page"`; the trigger is a button exposing expanded state; the panel is a list of links (no menu or listbox roles).

### Accessible Name
- B-016.

### Keyboard Access
- B-009 and B-010.

### Focus
- Visible focus indication on links, the trigger and panel links; focus order per B-009; restoration per B-010.

### Screen Reader Behavior
- The landmark name, list position, current page and the trigger's expanded state are conveyed; decorative separators are not announced. Panel content order relative to the landmark is verified as part of AC-013.

### Visual Accessibility
- Current level, links and trigger must meet Nimbus contrast tokens for text and interactive states; the collapse must remain usable at text zoom because it is width-driven.

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| Empty `items` | Nothing rendered (B-013). |
| One item | Current level only (B-013). |
| Two items, container narrower than both levels together | Trigger, then current level; hidden {level 1}; if both fit, no trigger (B-006). |
| Nearer ancestor too wide while a farther one is short | Farther level stays hidden; no skipping (B-006 step 2). |
| Very long ancestor label | Hidden if it does not fit; wrapped in panel (B-006, B-011). |
| Very long current label | Truncated only after all ancestors are hidden (B-006.4). |
| `href` on last item | Ignored (B-002). |
| Ancestor without `href` | Invalid input; unsupported, the component must not throw. |
| Router `as` with modifier-click | Native behavior preserved (B-003). |
| Two instances, open one then press the other's trigger | First closes, second opens with focus on its first link (B-014). |
| Focused panel link removed by update | B-015 rule 2. |
| Focused strip ancestor link hidden by a narrower container, panel open | Panel stays open; focus moves to that level's link in the panel (B-015 rule 3). |
| Focused strip ancestor link hidden by a narrower container, panel closed | Focus moves to the trigger (B-015 rule 3). |
| Focused strip ancestor link stays visible after resize | Focus unchanged (B-015 rule 3). |

## 13. Acceptance Criteria

### AC-001 - Structure and current level
**Given** items A, B, C in a container wide enough for all. **When** rendered. **Then** a named navigation region contains an ordered list A › B › C; A and B are links; C is non-focusable text with `aria-current="page"` and no other level has it; there is no trigger. (B-001, B-002, B-006.1)

### AC-002 - Native link behavior
**Given** ancestor links in the strip and in the panel. **When** the user modifier-clicks or opens one in a new tab. **Then** the browser performs its native behavior and the component does not prevent it. (B-003)

### AC-003 - Router-aware links, requirement
**Given** no `as`. **When** an ancestor is activated. **Then** it is a native anchor navigating to `href`. **Given** a router link component is provided without importing any router into Breadcrumb. **Then** ancestors navigate through it. (B-004)

### AC-004 - `as` API shape
**Given** `as` and `linkProps` with a router destination. **When** rendered with hidden ancestors. **Then** both strip links and panel links use the supplied component with `href` and `linkProps`. (B-004, §3)

### AC-005 - Appearance preserved
**Given** default rendering and `as` rendering of the same items. **When** compared. **Then** color, typography, and hover, focus and active states are identical. (B-005)

### AC-006 - Collapse guarantees
**Given** A › B › C › D and a width where not everything fits. **When** rendered. **Then** D is visible, a trigger is present, the hidden ancestors form one contiguous run, every hidden ancestor appears in the panel exactly once, and A is visible whenever it fits with the trigger and D. (B-006, B-007)

### AC-007 - Collapse selection order
**Given** A › B › C › D with label width 10, separator 2 and trigger 3. **When** the container width shrinks. **Then** the strip is A › B › C › D at 46 or more; A › … › C › D (hidden B) at 39–45; A › … › D (hidden B, C) at 27–38; … › D (hidden A, B, C) at 15–26; panel order is the hierarchy order of the hidden levels. With a 40-wide A and 10-wide B, C, D at width 30, the strip is … › C › D with hidden {A, B}. (B-006)

### AC-008 - Trigger presence and appearance
**Given** hidden count 0 versus greater than 0. **When** rendered. **Then** no trigger exists at 0; at >0 it is a named button showing a bare ellipsis with no visible circle or background, reports collapsed while closed and expanded while open, and does not submit an enclosing form. (B-007)

### AC-009 - Panel content and semantics
**Given** hidden ancestors and the trigger activated by pointer, touch, Enter or Space. **When** the panel opens. **Then** it lists hidden ancestors as links in hierarchy order, with no menu or listbox role, and labels wrap. (B-008)

### AC-010 - Keyboard traversal
**Given** X, then A › … › C › D, then Y. **When** the user tabs forward and back with the panel closed, and then with it open. **Then** the sequences in §7 occur, D is skipped, opening moves focus to the first panel link, Tab from the last panel link closes the panel and focuses C, and Shift+Tab from the first panel link focuses the trigger. (B-009)

### AC-011 - Focus return (required)
**Given** an open panel. **When** it is dismissed by Escape or by activating a link with modifier-click. **Then** focus is on the trigger. (B-010)

### AC-012 - Focus return exceptions
**Given** an open panel. **When** the user presses an outside focusable control, or presses an outside non-focusable area, or activates a link that navigates away. **Then** respectively: focus stays on the pressed control; focus returns to the trigger; focus goes to the trigger only if it still exists. (B-010)

### AC-013 - Screen reader
**Given** a screen reader. **When** navigating the breadcrumb and opening the panel. **Then** the landmark name, list positions, current page and expanded state are announced, separators are not, and the panel is reachable in reading order after opening. (B-016, §11)

### AC-014 - Long labels
**Given** a current label wider than the container, an ancestor wider than its available space, and a long hidden ancestor. **When** rendered. **Then** only the current level shows an ellipsis (once trigger, separator and the full current level no longer fit, with every ancestor hidden), the ancestor is hidden instead of truncated, and the panel label wraps. (B-011, B-006.4)

### AC-015 - Layout domain
**Given** widths at and below the B-012 minimum. **When** rendered. **Then** at the minimum the strip is the trigger and the truncated current level with every ancestor in the panel; below it no layout is required but all levels remain in the DOM order. (B-012)

### AC-016 - Empty and single
**Given** zero items and one item. **When** rendered. **Then** zero renders nothing; one renders only the current level, with no links, separators or trigger. (B-013)

### AC-017 - Multiple instances
**Given** two instances with hidden ancestors, the first panel open. **When** the second trigger is pressed. **Then** the first closes, the second opens, focus is on the second's first link and is not restored to the first trigger. (B-014, B-010)

### AC-018 - Dynamic updates
**Given** an open panel. **When** the container widens so nothing is hidden, or items change so hidden set stays non-empty, or a focused panel link is removed. **Then** respectively: the trigger and panel disappear and focus goes to A's link; the panel stays open with updated links; focus moves to the first remaining panel link. (B-015 rules 1 and 2)

### AC-019 - Accessible names and invalid input
**Given** `label` and `hiddenLevelsLabel`. **When** rendered. **Then** the region and trigger are exposed with those names; an ancestor without `href` does not throw and `href` on the last item is ignored. (B-016, B-002, §12)

### AC-020 - Priority and no-skip boundaries
**Given** A › B › C (B shorter than A) and A › D, and a container where not everything fits. **When** rendered at widths around each boundary. **Then** the current level stays visible and the trigger appears as soon as any ancestor is hidden; level 1 is preferred over nearer ancestors; a nearer ancestor that does not fit keeps every farther ancestor (except level 1) hidden even if that one would fit; with two levels the trigger and D are shown with A hidden only when A › D does not fit; no level is duplicated or lost. (B-006)

### AC-021 - Focused link hidden by resize
**Given** A › B › C › D with label width 10, separator 2 and trigger 3, and focus on C's link in the strip at container width 40 (strip A › … › C › D, hidden {B}). **When** the container narrows to 30 (strip A › … › D, hidden {B, C}). **Then** with the panel closed, focus is on the trigger; with the panel open (focus having been placed on C by assistive technology or script), the panel stays open listing B and C and focus is on C's link in the panel. **Given** focus on A's link at width 30 and a narrowing to 20 (hidden {A, B, C}). **Then** likewise focus is on the trigger (panel closed) or on A's link in the open panel. **Given** focus on A's link and a change from width 46 to 44 (hidden {B}). **Then** focus stays on A's link. **Given** focus on C's link and the container narrowing to 30 while the item C is at the same time removed from `items`. **Then** no focus target is guaranteed. (B-015 rules 3 and 4)

### Acceptance Criteria Rules
- Each AC verifies the referenced behaviors; every B-xxx is covered by an AC above.

## 14. Origin of Guarantees

Human decisions are cited as issue #553 decisions in the Nimbus contribution process; repository evidence is cited at nimbus-design-system revision dcea961a3abb65e847e0131e54e4b5136363538e.

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001, B-002 | Supported | established | Human decision: the current (last) level is non-interactive text with aria-current="page". |
| AC-002 | B-003 | Supported | established | Human decision: native link behavior preserved, including new tab and modifier-click. |
| AC-003 | B-004 | Supported | established | Human decision: router-aware links through an optional link-rendering mechanism, standard anchors with href by default, no dependence on a specific router. |
| AC-004 | B-004, §3 | Design choice | — | Human delegation: prefer an existing Nimbus composition convention where suitable, otherwise a small router-independent API. The polymorphic `as` prop is the existing convention (Link.tsx and Box.tsx at the revision above); a single component-level `as` plus per-item `linkProps` is proposed because no existing component applies `as` per list item. |
| AC-005 | B-005 | Supported | established | Human decision: router-aware links preserve Breadcrumb's default Nimbus appearance, tokens and interaction states. |
| AC-006 | B-006, B-007 | Supported | established | Human decision: keep the current level visible, keep every hidden ancestor reachable through the overflow control, show the first level when space permits. Contiguity of the hidden run is part of the proposed selection rule (see AC-007). |
| AC-007 | B-006 | Design choice | — | Human delegation: define the responsive behavior and minimum layout in the specification, without changing the agreed outcome. Priority order, the no-skip stop rule, trigger reservation and the contiguous hidden run are proposed to serve that outcome and were clarified, not changed, after the clarification request. |
| AC-008 | B-007 | Design choice | — | Bare ellipsis trigger is a human decision; button semantics, accessible name, expanded state and non-submit type are proposed, since Box sets no default button type (Box.tsx at the revision above). |
| AC-009 | B-008 | Supported | established | Human decision: dropdown of hidden levels, each a navigable link, navigation semantics and not a listbox. |
| AC-010 | B-009 | Design choice | — | Human decision requires keyboard access and navigation semantics; Tab-order only follows Nimbus accessibility documentation for menu, menu button and split button (arrow keys are reserved for menu and listbox widgets). Focus entering the panel and the Tab exit rules are proposed so a portaled panel stays keyboard reachable. |
| AC-011 | B-010 | Supported | established | Human decisions: focus returns to the trigger when dismissed; a Breadcrumb-local implementation is acceptable and the implementation choice is delegated to engineering. |
| AC-012 | B-010 | Design choice | — | Exceptions are proposed so focus return does not steal focus from a control the user chose; supporting requirement is the focus-return decision above. |
| AC-013 | B-016, §11 | Design choice | — | Landmark, list and expanded-state communication proposed from the navigation-semantics decision; screen-reader verification is pending. |
| AC-014 | B-011, B-006 | Design choice | — | Truncation and wrapping proposed under the responsive delegation. |
| AC-015 | B-012 | Design choice | — | The human asked for the minimum supported layout to be defined in the specification; it is defined by content dimensions, not a pixel value. |
| AC-016 | B-013 | Design choice | — | Empty and single-level behavior is a consistent refinement of the request's expected outcome. |
| AC-017 | B-014 | Design choice | — | Single open panel and independence proposed from the dismissal and focus-return decision. |
| AC-018 | B-015 | Design choice | — | Consistent dynamic behavior proposed for the responsive requirement. |
| AC-019 | B-016, B-002, §12 | Design choice | — | Consumer-supplied names proposed for localization; invalid-input handling proposed. |
| AC-020 | B-006 | Design choice | — | Boundary verification of the proposed selection rule in AC-007, under the same responsive delegation. |
| AC-021 | B-015 | Design choice | — | Requirement: keyboard-accessible disclosure with appropriate focus handling (focus return to the trigger on dismissal, Breadcrumb-local implementation delegated to engineering), plus a request that focus behavior when a resize hides the focused ancestor link be specified. The exact destinations are proposed: the same level's link in the open panel keeps the user's position and leaves the panel in a state B-009 already defines, while the trigger is the control that now stands in for the hidden run when the panel is closed. |

## 15. Compatibility and Migration

New component: there is no previous contract to migrate.

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | New API | §3 |
| Behavior and defaults | New | §6 |
| Layout and content | New | §9 |
| Accessibility and interactions | New | §11 |
| Supported composition | New | §10 |

- Backward compatibility: Not applicable — no earlier version exists.
- Migration required: No.
- Consumer migration steps: Not applicable.
- Existing components such as Popover and Link are not changed by this contract.

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001, B-002 | Render three levels wide; inspect roles, aria-current | To add | To add |
| AC-002 | B-003 | Modifier-click ancestor in strip and panel; default not prevented | To add | To add |
| AC-003 | B-004 | Default anchor and router component | To add | To add |
| AC-004 | B-004 | `as` plus `linkProps` in strip and panel | To add | To add |
| AC-005 | B-005 | Compare default and `as` visuals | To add | To add |
| AC-006 | B-006, B-007 | Shrink width, verify current, panel set | To add | To add |
| AC-007 | B-006 | Boundary widths for four levels | To add | To add |
| AC-008 | B-007 | Trigger presence, name, expanded, form non-submit | To add | To add |
| AC-009 | B-008 | Open by pointer, touch, Enter, Space | To add | To add |
| AC-010 | B-009 | Full Tab and Shift+Tab sequences | To add | To add |
| AC-011 | B-010 | Escape and modifier-click return | To add | To add |
| AC-012 | B-010 | Outside press cases, navigation | To add | To add |
| AC-013 | B-016, §11 | Manual screen reader check (needed since portal order cannot be asserted automatically) | To add | To add |
| AC-014 | B-011, B-006 | Long label cases | To add | To add |
| AC-015 | B-012 | Minimum width check | To add | To add |
| AC-016 | B-013 | Zero and one item | To add | To add |
| AC-017 | B-014 | Two instances | To add | To add |
| AC-018 | B-015 | Resize and item updates while open | To add | To add |
| AC-019 | B-016, §12 | Names and invalid input | To add | To add |
| AC-020 | B-006 | Boundary widths for two- and three-level cases and the no-skip rule | To add | To add |
| AC-021 | B-015 | Focus a strip link, narrow the container so it becomes hidden with the panel closed and with it open; widen slightly without hiding it; remove the item concurrently | To add | To add |

- Execution results and approvals belong to a separate validation report.
