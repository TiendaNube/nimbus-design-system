# Combobox Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

---

## 1. Purpose

The Combobox lets a person choose one value, or several, from a list of options by typing to filter the list. It can optionally let the person create an option that does not exist yet, show options with a subtitle and a tag, and let the person drill down through a hierarchy of up to six levels.

Use it when:

- the list is long enough that filtering by typing helps, or the options form a hierarchy;
- the person may need several values (`multiple`), or may need to add a value that is not in the list (creation).

Do not use it when:

- a short, fixed list with a single choice is enough: use `Select`;
- the options are few and the person only picks from them without searching or creating: use `MultiSelect` or `Checkbox`;
- the content is free text with no list: use `Input`.

The Combobox is a new component. It coexists with `Select` and `MultiSelect`; it does not modify, replace or deprecate either of them.

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Field | Yes | Bordered container with the text input and the trailing control. |
| Text input | Yes | Receives typing; shows the selected label in single mode. |
| Selected-value display | No | Single mode: the label (with the option's tag and, in a hierarchy, the full path with chevron separators) inside the field. Multiple mode: one removable chip per value. |
| Trailing control | Yes | Chevron when nothing can be cleared or clearing is not allowed; clear button (×) when it can. |
| List | Yes | Popover as wide as the field: the back control and level title above a scrolling listbox of rows. |
| Option row | Yes | Label, optional subtitle, optional tag, optional chevron (branch), optional check (selected). In hierarchical search results, also the ancestor path with chevron separators. |
| Create row | No | First row of the list when creation is available. |
| Back control | No | Hierarchy only, below the root level. |
| Level title row | No | Hierarchy only, below the root level: the current parent as its own row. |
| Dividers | No | Between back control, level title and options, and between enriched rows. |
| Status message | No | "No results" message. |
| Hidden form value | No | Present when `name` is set. |

### Rules

- The Combobox renders no help text, label or error message of its own; those belong to the surrounding form composition.
- Chips are Nimbus `Chip` instances; tags are Nimbus `Tag` instances. Chips have no leading icon.

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| `options` | `ComboboxOption[]` | Yes | — | The options. `ComboboxOption` is `{ value: string; label: string; subtitle?: string; tag?: { label: string; appearance?: "primary" \| "success" \| "warning" \| "danger" \| "neutral" }; disabled?: boolean; children?: ComboboxOption[] }`. An option with `children` is a branch. |
| `multiple` | boolean | No | `false` | Allows several values. |
| `value` | `ComboboxOption \| null` (single) / `ComboboxOption[]` (multiple) | No | — | Controlled value. |
| `defaultValue` | same as `value` | No | none selected | Initial value when uncontrolled. |
| `onChange` | function | No | — | See Events. |
| `onCreate` | `(label: string) => ComboboxOption` | No | — | Enables instant creation. |
| `clearable` | boolean | No | `true` | Single mode: whether a selected value can be cleared. |
| `filter` | `(option: ComboboxOption, query: string) => boolean` | No | label contains query | Replaces the default match. |
| `selectableBranches` | boolean | No | `true` | Hierarchy: a parent can be chosen from its own level. |
| `placeholder` | string | No | — | Shown while the input is empty and nothing is selected. |
| `disabled` | boolean | No | `false` | Disables the whole field. |
| `appearance` | `"neutral" \| "success" \| "warning" \| "danger"` | No | `"neutral"` | Visual style of the field, as on `Input`. |
| `name` | string | No | — | Form field name. |
| `required` | boolean | No | `false` | Requires a value. |
| `id` | string | No | generated | Id of the text input, for a `<label htmlFor>`. |
| `aria-label`, `aria-labelledby`, `aria-describedby` | string | No | — | Forwarded to the text input. |
| `labels` | object | No | English defaults (B-024) | Translatable texts. |
| `data-testid` | string | No | — | Test identifier. |

### Events

| Event | Payload | Trigger |
|---|---|---|
| `onChange` (single) | `ComboboxOption \| null` | A value is chosen, created or cleared. |
| `onChange` (`multiple`) | `ComboboxOption[]` (the full current set; `[]` when empty) | A value is chosen, created or removed, or all are cleared. |

### API Rules

- `onCreate` presence is the only switch for creation; there is no separate flag. Creation is instant and synchronous; asynchronous creation (pending or error states) is not part of this contract.
- `clearable` applies to single mode only; it has no effect in multiple mode.
- `onChange` for `multiple` never receives `null`.
- The component keeps no option store; the consumer owns `options` and receives created options through `onCreate`.
- The component renders no help text; `aria-describedby` is the supported link to help text rendered outside it.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| Single | One value, shown in the input. | Default. |
| Multiple | Several values, shown as chips. | `multiple`. |
| Plain options | Label only. | Simple lists. |
| Enriched options | Label + subtitle and/or tag. | Options that need context. |
| Hierarchical | Drill-down through `children`. | Category-like data. |
| Creatable | Adds a Create row. | `onCreate` provided. |
| Non-clearable single | A value is always selected once chosen; chevron instead of ×. | `clearable={false}`. |

### Rules

- Variants combine freely, except that creation is not offered when any option has `children` (B-007).

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Default | Mounted, closed. | Placeholder or value; chevron. |
| Open | Focus, click, typing, or ArrowDown/ArrowUp. | List shown below the field. |
| Focus | Input focused. | Nimbus focus ring on the field. |
| Hover / active row | Pointer over a row / keyboard-active row. | Row fill: hover lighter, keyboard-active stronger. |
| Selected | Option is a current value. | Row fill and right-aligned check (B-011). |
| Disabled field | `disabled`. | No interaction, disabled styling. |
| Disabled option | `option.disabled`. | Disabled fill and text, not selectable. |
| Empty | No option matches. | B-026. |

---

## 6. Behavioral Contract

### B-001 - Opening and closing

When the person focuses the input (by pointer or by Tab or Shift+Tab into it), clicks it, types in it, or presses ArrowDown or ArrowUp while the field is enabled, the list MUST open. Focus that a component action returns to the input (clearing, clearing all, choosing, creating, removing a chip, changing level, or keyboard activation of a field button) is not one of these triggers and MUST NOT by itself open the list: after each such action the list is in the state that action defines. Escape MUST close it and keep focus in the input. A pointer press outside the field and list, or focus moving from the text input to any other element, MUST close it. In single mode, choosing an option MUST close it; in multiple mode, choosing an option MUST keep it open. A disabled field MUST NOT open.

### B-002 - Filtering

While the list is open, the visible options MUST be those whose label contains the typed text, ignoring letter case and diacritics ("camara" matches "Cámara"). Only the label is searched: subtitle and tag MUST NOT be matched. When `filter` is provided, it MUST replace this match for every option.

### B-003 - Single selection

In single mode, choosing an option MUST set the value, show its label in the input and call `onChange` with the option. Reopening the list MUST show that option as selected (B-011). Choosing the selected option again MUST NOT change the value.

### B-004 - Clear button (single value)

When a single value is selected, the field is enabled and `clearable` is not `false`, the trailing control MUST be a clear button. Activating it, by pointer or by keyboard, MUST clear the value and the text, call `onChange(null)`, leave the list closed and move focus to the input, without reopening the list.

### B-005 - Multiple selection

In multiple mode, each chosen option MUST appear as a removable chip inside the field, before the input, in the order chosen. A chosen option MUST NOT remain in a non-hierarchical list; in a hierarchical list it MUST remain visible and marked selected (B-011). Choosing or removing an option MUST call `onChange` with the full set. The chip remove button and Backspace on an empty input (removes the last chip) MUST remove values. Chips wrap onto further rows; the trailing control stays vertically centered.

### B-006 - Clear all

In multiple mode with two or more chips and an enabled field, the trailing control MUST be a clear-all button replacing the chevron. Activating it, by pointer or by keyboard, MUST remove every value, clear the typed text, call `onChange([])`, leave the list closed and move focus to the input, without reopening the list.

### B-007 - Creation

When `onCreate` is provided and the typed text (trimmed) is not empty and does not equal, ignoring case and diacritics, the label of an existing option, the first row MUST be a Create row showing the create label followed by a plus icon at the end of the row. Activating it MUST call `onCreate` once with the trimmed text. The option it returns MUST be selected as in B-003 or B-005 (multiple mode clears the typed text). Creation MUST NOT be offered when any option has `children`.

### B-008 - Instant creation

Creation MUST be instant: the option returned by `onCreate` MUST be added to the selection in the same interaction, and the component MUST NOT show a loading, pending or error state for it. If the returned option has the same `value` as an existing option, that existing option MUST be selected instead. A product that must wait for server confirmation before creating an option is outside this contract.

### B-009 - Enriched options

An option with a subtitle and/or a tag MUST render its label with the tag at the end of the same line and the subtitle below it; enriched rows MUST be separated by a 1px divider. In single mode the tag MUST also appear inside the field after the selected label. An enriched selected row MUST use the selected fill and MUST NOT show a check.

### B-010 - Disabled options

A disabled option MUST be shown with the disabled fill and text, MUST NOT be selectable by pointer or keyboard, MUST be skipped by arrow-key navigation, and MUST NOT change the selection state of other options.

### B-011 - Selected indication

A selected plain row MUST have the selected fill and a right-aligned check (primary color, 16px); the label MUST NOT shift horizontally when the check appears. A selected branch row MUST show the check immediately before its chevron. Enriched rows follow B-009.

### B-012 - Hierarchy navigation

A branch option MUST be shown with a chevron at the end of its row. Activating it by pointer, Enter, or ArrowRight (with an empty query) MUST open its level, whose rows are its `children`. Choosing a branch row MUST NOT select it. Below the root, a back control MUST precede the level: labeled "Back" below the first level and "Back to {name}" with the name of the level it returns to otherwise; it has no fill state. Activating it, ArrowLeft, or Backspace with an empty query MUST return to the previous level. The back control MUST NOT be an option of the list.

### B-013 - Level limit

A hierarchy MUST support at most six levels, where the root list is level 1. Options below level 6 MUST NOT be rendered, and a level-6 option MUST NOT show a chevron.

### B-014 - Choosing a parent

When `selectableBranches` is `true`, the level of a branch MUST begin with that branch as a title row (medium weight, between two dividers) that selects the branch itself. A branch MUST NOT be selectable from its parent's level. When `false`, the title is plain text and only leaf options are selectable.

### B-015 - Hierarchical search

With text typed in a hierarchy, the list MUST show matching options from the whole tree (B-002 match), flat, each with its ancestor path on a second line: the names from the root list down to the parent, separated by chevrons (for example Fashion › Clothing). A branch result MUST open its level; a leaf result MUST be selected. Clearing the text MUST return to the level that was open.

### B-016 - Hierarchical value display

In single mode a selected option below the root MUST be displayed in the field as its full path from the root list, ending with its own label, with a chevron between levels (for example Fashion › Clothing › Accessories and Electronics › Accessories); a root option is displayed by its label. When the path does not fit, it MUST be truncated with an ellipsis at its start so that the option's own label stays visible. The path as text, with names separated by " > ", MUST be exposed as the field's accessible description. In multiple mode a chip MUST show its label; when two or more chips share the same label, those chips MUST show their full paths, the names separated by the text character "›". Every chip MUST expose its full path as accessible description. The chevron separators of the single value and of result rows are decorative.

### B-017 - Form value

When `name` is set, single mode MUST render one hidden field with the selected `value` (empty when none), and multiple mode one hidden field per selected value, all with that `name`.

### B-018 - Required

When `required` is `true`, the field MUST be invalid for form validation when no value is selected, and valid when at least one is selected, independently of any text typed in the input. The invalid message MUST be `labels.required`.

### B-019 - Unique values

`value` MUST be unique across the whole option tree; the component derives a value's ancestor path from `options` by `value`. With duplicate values, selection behavior is unsupported and a development-mode warning MUST be emitted.

### B-020 - Controlled and uncontrolled

When `value` is provided the displayed selection MUST follow it and `onChange` reports requests only. Otherwise the component MUST manage the selection, starting from `defaultValue`.

### B-021 - Help text

The Combobox MUST NOT render help text. A consumer-provided `aria-describedby` MUST be present on the text input; the hierarchical full-path description (B-016) MUST be added without removing it.

### B-022 - Sizes and spacing

The field MUST be 34px tall including its 1px border (the height of `Input`), with one row of chips, and each further row of chips adds 28px (62px with two rows); chips are inset 4px inside the border. Plain rows, the Create row, the back control and the title row MUST be 26px tall with 8px horizontal padding; enriched rows MUST be 44px tall (8px horizontal, 4px vertical padding); result rows with a path line keep 4px vertical padding. The list MUST have 8px padding, 4px between rows, and be as wide as the field. The list MUST scroll beyond a maximum height of 220px (non-hierarchical) or 280px (hierarchical).

### B-023 - Scrolling

A scrolling list MUST use the Nimbus thin scrollbar that is always visible. The scrollbar MUST NOT cover rows, chevrons or checks. The back control and the level title stay above the scrolling rows; the maximum heights of B-022 apply to the whole list.

### B-024 - Labels

All component-provided texts MUST come from `labels`, each with an English default: `back` "Back", `backTo` "Back to {name}", `branchHint` "has subcategories", `clearSelection` "Clear selection", `clearAll` "Clear all", `removeChip` "Remove {name}", `noResults` "No results", `listbox` "Options", `results` "Results", `create` "Create \"{text}\"", `required` "Select a value". A consumer MAY override any of them.

### B-025 - Appearance and disabled field

`appearance` MUST change the field border and focus color as on `Input`. A disabled field MUST show the disabled fill, MUST NOT accept typing, opening, clearing or chip removal, and MUST NOT be part of tab order.

### B-026 - No results

When no option matches and creation is not offered, the list MUST show `labels.noResults` as a non-selectable message.

### B-027 - Non-clearable single value

When `clearable` is `false` in single mode, the trailing control MUST be the chevron even when a value is selected; activating it opens the list so another option can be chosen. Typing to search MUST NOT remove or change the value and MUST NOT call `onChange`: the typed text is only the search text, the selected row stays marked, and the value stays selected until another option is chosen. Closing the list or leaving the field without choosing MUST clear the typed text and show the selected value again. The consumer MUST provide an initial value through `value` or `defaultValue` so that a value is always selected; if none is provided, the field is empty until the first option is chosen and cannot be emptied afterwards. This applies to every single-mode variant, including enriched options.

### B-028 - Typing over a selected value

With `clearable` not `false`, typing in the input while a single value is selected MUST clear that value and call `onChange(null)` on that first edit. The typed text MUST be preserved as the search text (it MUST NOT be cleared), the list MUST be open and filtered by it, and focus MUST stay in the input. The component MUST NOT select the text of the input when it receives focus, so typing edits the text that is shown.

### B-029 - Choosing a selected option again (multiple)

In multiple mode, choosing an option that is already selected (a hierarchical list keeps it visible and marked, B-005) MUST remove it and call `onChange` with the remaining set. Creation never removes: if `onCreate` returns an option that is already selected, the selection does not change (B-008).

### B-030 - Reopening a single value in a hierarchy

In single mode with a hierarchy, opening the list MUST show the level that contains the selected option, with that option marked selected (B-011), and the root list when no value is selected.

### B-031 - Scrolling region

The scrolling region of the list MUST be the listbox itself. It MUST be keyboard-focusable (`tabindex="0"`) and have the accessible name `labels.listbox`. While the list is open the focus MUST stay in the text input; if the focus is placed on the listbox other than by Tab from the text input (for example by assistive technology), it MUST return to the text input and the list MUST stay open.

### B-032 - Tab leaves the field

Tab and Shift+Tab MUST leave the field without trapping the focus. When Tab from the text input reaches the listbox (the list is rendered after the field, so this happens when nothing else is focusable after the field), the list MUST close and the focus MUST move on. When the list is closed no listbox, and so no focusable region of the list, remains in the document.

### B-033 - Active row visible

The active row MUST be kept visible: when the arrow keys, Home or End move it, the scrolling region MUST scroll just enough to show it.

---

## 7. Interaction Contract

### Pointer

- Clicking the field focuses the input and opens the list.
- Clicking a row activates it (select, or open a branch); the input keeps focus.
- Chip remove, clear, clear-all and back controls act on click without moving focus out of the input.

### Keyboard

All keys in this table are handled by the text input while it is focused (not at document level), only while the list is open unless stated, and prevent the default action when they act. Tab and Shift+Tab are not handled by the component.

| Key | Behavior |
|---|---|
| ArrowDown / ArrowUp | Opens the list if closed; moves the active row, without wrapping. |
| Home / End | Active row to first / last selectable row. |
| Enter | Activates the active row. |
| Escape | Closes the list; keeps focus. If the list is closed it does nothing and does not stop propagation. |
| ArrowRight | Hierarchy, empty query: opens the active branch. While searching, only when the caret is at the end of the text. |
| ArrowLeft | Hierarchy, empty query, below the root: returns one level. |
| Backspace | Empty text, hierarchy, below the root: returns one level. Otherwise, empty text, multiple: removes the last chip (so at the root of a hierarchy it removes the last chip). |

Escape stops propagation only when it closes the list, so an enclosing Modal or Popover is not also closed by that same press; a nested open Combobox list closes first.

### Touch

- Tapping rows, chips' remove buttons and controls behaves as the pointer.
- Rows and controls remain tappable on narrow screens (B-022 sizes do not shrink).

### Focus

- While the list is open and focus is in the text input, no component action (choosing, changing level, removing, clearing, creating) moves focus out of it; the active row is exposed with `aria-activedescendant`. Focus leaves the input only through Tab or Shift+Tab, or a pointer press outside; the list then closes (B-001).
- Closing the list with Escape keeps focus in the input; an outside press leaves focus where the press put it.
- The scrolling region of the list is the listbox: focusable and named, but it never holds the focus (B-031); Tab leaves the field without a stop in it (B-032).
- Tab sequence: chip remove buttons (in chip order), the text input, then the clear or clear-all button, all in the field's order and only while they are shown. They are real buttons outside the listbox, activated with Enter or Space; activating one by keyboard moves focus to the text input, and that return of focus does not open the list (B-001). The back control and the chevron are not in the tab sequence: the back control is reached through ArrowLeft and Backspace (B-012) or by pointer, and the chevron is decorative. Activating any of these buttons by pointer does not take focus from the input.

---

## 8. Content Contract

### Labels

- Option `label` is plain text. The visible Back control and rows use `labels` (B-024).

### Supporting Content

- `subtitle` is one line of secondary text; `tag.label` is a short status text.

### Icons

- Chevron (closed field / branch rows), clear (×), plus (Create row), check (selected row), back arrow, chip remove icon; none is configurable. Chips have no leading icon.

### Long Content

- Labels wrap inside rows; chip labels clamp to one line; a single value's path truncates with an ellipsis at its start so the option's own label stays visible.

### Localization

- Every provided text is translatable through `labels`; `{name}` and `{text}` placeholders are replaced. Option labels and paths are the consumer's text. Longer text expands rows vertically; rows are not fixed-width.

---

## 9. Layout and Responsive Behavior

### Sizing

- See B-022.

### Alignment

- The trailing control is 24px, vertically centered in the field including when chips wrap, and its icon sits 9px from the field's outer edge in every variant.

### Overflow

- Chips wrap; the list scrolls (B-022, B-023).

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| Field width 320px to 414px | Field and list fill the container; no horizontal page scroll. |
| Long single value or path | Truncated with an ellipsis at the start. |

---

## 10. Composition Contract

### Supported Composition

- Inside a form field composition that renders a label (`<label htmlFor>` with `id`) and help text (linked with `aria-describedby`).
- Inside a native `<form>` through `name` and `required`.

### Unsupported Composition

- Wrapping another Combobox inside a row; custom row content; help text inside the component.

### Nesting Rules

- The list is a popover; inside a Modal it stays above the Modal's content.

### Multiple Instances

- Opening one Combobox closes no other automatically; each instance keeps its own value, active row and level.

---

## 11. Accessibility Contract

### Semantics

- The text input has `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls` (the listbox) and `aria-autocomplete="list"`.
- The list is a `listbox` (with `aria-multiselectable` in multiple mode) that is also the scrolling region: it has `tabindex="0"` and the name `labels.listbox`; a hierarchy level is a `group` named by its title; rows are `option`s with `aria-selected`, `aria-disabled` where applicable.
- Branch options expose `labels.branchHint` in their accessible name; the back control, chips' remove buttons and clear buttons are buttons outside the listbox.

### Accessible Name

- The field is named by `aria-label`, `aria-labelledby` or an associated `<label>`; the placeholder is not its name.
- The listbox is named `labels.listbox`. Chip remove buttons are named `labels.removeChip` with the option label; clear and clear-all use `labels.clearSelection` and `labels.clearAll`; the back control by its visible text.
- An enriched option's name is its label, subtitle and tag in that order.

### Keyboard Access

- Everything operable by pointer is operable by keyboard: with the keys in §7 from the text input, and with Tab, Shift+Tab, Enter and Space on the chip remove, clear and clear-all buttons.

### Focus

- A visible Nimbus focus ring appears on the field when the input is focused, and on buttons when they receive keyboard focus.
- Focus order: the tab sequence in §7 Focus (chip remove buttons, text input, clear or clear-all button; never the back control or the chevron). Options are never in the tab sequence; they are reached with arrow keys. The listbox never holds the focus (B-031).

### Screen Reader Behavior

- The active row, the selected state, level changes (the level's group name) and the number of results MUST be communicated.

### Visual Accessibility

- Selection is indicated by fill and a check, not color alone. The check uses the Nimbus interactive color. Reduced motion: no animation is required by the contract.

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| Long content | Row labels wrap; chip labels clamp to one line; single value truncates. |
| Missing optional content | No subtitle or tag: plain row; no `placeholder`: empty input. |
| Empty data | `options` empty: the list shows `labels.noResults`; with `onCreate` and typed text the Create row is offered. |
| Same label under different branches | Distinguished by the full path: chevron separators in the single value and in results, the text character "›" in chips (B-015, B-016). |
| Disabled state | Field disabled: no events, no chip removal. |
| Dynamic update | `options` change while open: the list re-filters; a selected value no longer in `options` stays selected. |
| Multiple instances | Independent state. |
| Invalid combination | `children` below level 6 are ignored; duplicate `value` is unsupported (B-019); `onCreate` returning an option equal to an existing one selects the existing one. |
| Unmatched query in a hierarchy | No Create row; the whole-tree search shows `labels.noResults` when nothing matches. |
| Non-clearable without initial value | Empty until the first choice; then it cannot be emptied (B-027). |

---

## 13. Acceptance Criteria

### AC-001 - Opening and closing
**Given** an enabled Combobox with options, **When** the input is focused by pointer or by Tab, clicked, typed in, or ArrowDown is pressed, **Then** the list opens; focus returned to the input by a component action does not open it; **And When** Escape is pressed **Then** it closes with focus kept in the input; a press outside closes it; a disabled field never opens (B-001).

### AC-002 - Filtering
**Given** options "Cámara" and "Bolsa", **When** "camara" is typed, **Then** only "Cámara" is listed; text that appears only in a subtitle or tag does not match; with a `filter` function the function alone decides (B-002).

### AC-003 - Single selection
**Given** single mode, **When** an option is chosen, **Then** the list closes, the input shows its label, `onChange` receives the option, and reopening shows it selected; choosing it again leaves the value unchanged (B-003).

### AC-004 - Clearing a single value
**Given** a selected single value and `clearable` not `false`, **When** the clear button is activated, **Then** `onChange(null)` fires, the value and the text are cleared, the list is closed and focus is in the input, and the list is not reopened by that focus (B-004).

### AC-005 - Multiple selection
**Given** `multiple`, **When** options are chosen, **Then** chips appear in order, the list stays open, chosen options leave a flat list, and `onChange` receives the full set each time (B-005).

### AC-006 - Chip removal
**Given** two chips, **When** a chip's remove button is activated, or Backspace is pressed on an empty input, **Then** that chip (or the last chip) is removed and `onChange` receives the remaining set (B-005).

### AC-007 - Clear all
**Given** two or more chips, **When** the clear-all button is activated, **Then** all chips are removed, the list is closed and not reopened by the returned focus, focus is in the input and `onChange([])` fires; with fewer than two chips the trailing control is the chevron (B-006).

### AC-008 - Create row
**Given** `onCreate` and typed text "Eco" with no equal label, **When** the list opens, **Then** the first row reads the create label with a plus icon at its end; activating it calls `onCreate("Eco")` and selects the result; with text equal to an existing label, empty text, or options that contain a hierarchy, no Create row appears (B-007).

### AC-009 - Instant creation
**Given** `onCreate` that returns an option, **When** the Create row is activated, **Then** `onCreate` is called once, the returned option is selected in the same interaction, and no loading, pending or error state is shown; if the returned option has the same `value` as an existing one, the existing one is selected (B-008).

### AC-011 - Enriched options
**Given** options with subtitle and tag, **When** the list opens, **Then** each row is 44px with label, tag at line end, subtitle below and 1px dividers between rows; the chosen tag also shows in the single field; a selected enriched row has the fill and no check (B-009).

### AC-012 - Disabled option
**Given** a disabled option among others, **When** it is clicked or arrow-key navigation passes it, **Then** it is not selected, not focused as active, and other selections are unchanged (B-010).

### AC-013 - Selected indication
**Given** a selected plain option, a selected branch and an unselected plain row, **When** the list opens, **Then** the plain selected row has fill and a right-aligned check, the selected branch shows the check before its chevron, and the row text does not move between selected and unselected (B-011).

### AC-014 - Hierarchy navigation
**Given** a hierarchical list, **When** a branch is clicked, or Enter or ArrowRight (empty query) is pressed on it, **Then** its level opens with a back control; activating the back control, ArrowLeft or Backspace (empty query) returns, and the back control is labeled "Back" below the first level and "Back to {name}" deeper (B-012).

### AC-015 - Level limit
**Given** a tree with seven nested levels, **When** it is navigated to level 6, **Then** level-7 options are not rendered and level-6 rows have no chevron (B-013).

### AC-016 - Choosing a parent
**Given** `selectableBranches` true, **When** a level opens, **Then** its title row (medium weight, between two dividers) selects the parent; the parent is not selectable from its own parent's level; with `false` the title is plain text (B-014).

### AC-017 - Hierarchical search
**Given** a hierarchy, **When** text is typed, **Then** results from the whole tree are listed flat with the ancestor path, separated by chevrons, below each label; a branch result opens its level; a leaf result is selected; clearing the text returns to the open level (B-015).

### AC-018 - Hierarchical value display
**Given** options "Accessories" under both "Fashion › Clothing" and "Electronics", **When** one is selected in single mode and the field is closed, **Then** the field shows its full path with chevron separators (Fashion › Clothing › Accessories, or Electronics › Accessories), a path that does not fit is truncated at its start, and the field's description holds the path as text with " > " separators (B-016).

### AC-019 - Form value
**Given** `name` inside a form, **When** the form data is read, **Then** single mode yields one entry with the selected value (empty when none) and multiple mode one entry per value (B-017).

### AC-020 - Required
**Given** `required` in a form, **When** validity is checked, **Then** it is invalid with no value, even with text typed, and valid with one or more values, even with an empty input; the message is `labels.required` (B-018).

### AC-021 - Unique values
**Given** two options with the same `value`, **When** the component renders in development mode, **Then** a warning is emitted (B-019).

### AC-022 - Controlled value
**Given** `value`, **When** the user picks an option, **Then** `onChange` fires and the display changes only when `value` changes; without `value` the component manages the selection from `defaultValue` (B-020).

### AC-023 - Help text link
**Given** `aria-describedby="help"` and a hierarchical value, **When** the input is inspected, **Then** its description includes "help" and the full path, and the component renders no help text (B-021).

### AC-024 - Sizes
**Given** the default theme, **When** measured, **Then** the field is 34px including its border (62px with two chip rows), plain rows are 26px, enriched rows 44px, path result rows have 4px vertical padding, list padding 8px, row gap 4px, trailing icon 9px from the field edge and vertically centered (B-022).

### AC-025 - Scrolling
**Given** more rows than fit, **When** the list opens, **Then** it scrolls at the maximum height with the always-visible Nimbus thin scrollbar, visible without hovering, no row, chevron or check is covered, and the back control and level title stay above the scrolling rows (B-022, B-023).

### AC-026 - Labels
**Given** default and overridden `labels`, **When** each text appears (including the name of the list), **Then** it shows the override or the English default, placeholders `{name}` and `{text}` replaced (B-024).

### AC-027 - Appearance and disabled field
**Given** `appearance="danger"`, **When** rendered, **Then** the border follows `Input`; **Given** `disabled`, **Then** typing, opening, clearing and chip removal do nothing and the input is not tabbable (B-025).

### AC-028 - No results
**Given** no matching option and no creation, **When** the list is open, **Then** it shows `labels.noResults` as a non-selectable message (B-026).

### AC-029 - Semantics and names
**Given** any state, **When** the accessibility tree is read, **Then** the input is a combobox controlling a listbox of options with `aria-selected`, levels are named groups, and buttons outside the listbox have the names in §11 (§11 Semantics, Accessible Name).

### AC-030 - Keyboard map
**Given** the focused input, **When** the keys of the §7 table are pressed, **Then** each has the stated effect, Escape propagates only when the list is closed, and none of those keys moves focus out of the input (§7 Keyboard).

### AC-031 - Focus
**Given** an open list with focus in the input, **When** an option is chosen, a level changes or a chip is removed by pointer, **Then** focus remains in the input and the active row is exposed with `aria-activedescendant`; **When** Escape is pressed, **Then** the list closes and focus stays (§7 Focus).

### AC-032 - Responsive
**Given** a 320px, 375px and 414px viewport, **When** the field and an open list render, **Then** there is no horizontal page scroll and the list is as wide as the field (§9).

### AC-033 - Multiple instances
**Given** two Comboboxes, **When** one is used, **Then** the other's value, active row and level are unchanged (§10).

### AC-034 - Non-clearable single value
**Given** single mode, `clearable={false}` and an initial value, **When** the field is rendered, **Then** the trailing control is the chevron, not ×; **When** text is typed to search and then the list is closed or the field left without choosing, **Then** `onChange` is not called, the typed text is removed and the selected value is shown again; **When** another option is chosen, **Then** it becomes the value (B-027).

### AC-035 - Chips with the same label
**Given** two selected options with the same label under different branches, **When** the field is rendered in multiple mode, **Then** both chips show their full paths separated by the text character "›"; a chip whose label is unique shows its label only; every chip exposes its full path as accessible description (B-016).

### AC-036 - Typing over a selected value
**Given** a selected single value and `clearable` not `false`, **When** the person types in the input, **Then** `onChange(null)` fires on the first edit, the typed text stays in the input, the list is open and filtered by it, and focus stays in the input; the text of the input is not selected when the input receives focus (B-028).

### AC-037 - Tab sequence and leaving the field
**Given** a field with chips, a selected single value or a clear button, **When** Tab and Shift+Tab are pressed, **Then** focus moves along the sequence chip remove buttons, text input, clear or clear-all button, without the back control or the chevron; activating a focused button with Enter or Space performs its action and moves focus to the input; when focus leaves the text input the list closes (§7 Focus, §11 Focus, B-001).

### AC-038 - Keyboard clear leaves the list closed
**Given** a selected single value with `clearable` not `false` (or two or more chips) and focus on the clear (or clear-all) button, **When** Enter or Space is pressed, **Then** the value (or all chips) and the text are empty, the list is closed, focus is in the input, and the focus returned to the input does not open the list (B-001, B-004, B-006).

### AC-039 - Focusable named list region
**Given** an open list, **When** the accessibility tree is read and the focus is placed on the listbox other than by Tab, **Then** the listbox is the scrolling region, has `tabindex="0"` and the name `labels.listbox` ("Options" by default), the focus stays in the text input with the active row exposed by `aria-activedescendant`, and a focus placed on the listbox returns to the text input with the list still open (B-031).

### AC-040 - Tab leaves the field
**Given** a field with an open list, **When** Tab or Shift+Tab is pressed, **Then** the focus leaves the field without being trapped, the list closes, Tab from the text input of a field with nothing focusable after it does not stop on the list, and once the list is closed no listbox remains in the document (B-032).

### AC-041 - Active row visible
**Given** a list taller than its maximum height, **When** the arrow keys, Home or End move the active row, **Then** the scrolling region scrolls so that the active row is visible (B-033).

### AC-042 - Choosing a selected option again
**Given** `multiple` and a selected option, **When** that option is chosen again (also in a hierarchy, where the row stays visible and marked), **Then** it is removed and `onChange` receives the remaining set; an `onCreate` result that is already selected leaves the selection unchanged (B-029).

### AC-043 - Reopening a single value in a hierarchy
**Given** single mode, a hierarchy and a selected option below the root, **When** the list is opened again, **Then** it shows the level that contains the selected option with that option marked selected, and the root list when no value is selected (B-030).

### Acceptance Criteria Rules

- Each criterion references the behavior or section it verifies; every normative behavior is covered by at least one criterion.

---

## 14. Origin of Guarantees

`Supported` rows cite a Design decision signed on the request issue (comment 6834339585, "signed Design confirmation") or another explicit Design decision; `Design choice` rows are contract design within that scope.

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001, AC-003 | B-001, B-003 | Supported | established | Creatable selection with filtering: request issue #508 (original request and Playground outcome comment on pull request #545, comment 6694670424). |
| AC-004 | B-004 | Supported | established | Clear control on a selected single value by default: signed Design confirmation, issue #508 comment 6834339585. |
| AC-034 | B-027 | Supported | established | Configurable clearing with chevron when not allowed; search does not remove the selection; initial value provided: signed Design confirmation, issue #508 comment 6834339585. |
| AC-002 (label-only search) | B-002 | Supported | established | Search by the option's main text only: signed Design confirmation, issue #508 comment 6834339585. |
| AC-005, AC-006, AC-007 | B-005, B-006 | Supported | established | Multiple selection with removable chips (not tags), clear all from two chips: Playground outcome comment on pull request #545, comment 6694670424. |
| AC-008, AC-009 | B-007, B-008 | Supported | established | Optional creation, instant, without loader, adding and selecting the new option at once: signed Design confirmation, issue #508 comment 6834339585; create label first with the plus icon at the end of the row: explicit Design decision. |
| AC-011 | B-009 | Supported | established | Enriched options with subtitle and tag; right-aligned check not shown on enriched rows: explicit Design decisions. |
| AC-012 | B-010 | Supported | established | Per-option disabled: Playground outcome comment on pull request #545, comment 6694670424. |
| AC-013 | B-011 | Supported | established | Right-aligned check on selected rows: explicit Design decision. |
| AC-014, AC-016, AC-017 | B-012, B-014, B-015 | Supported | established | Hierarchical navigation in the same component, back control "Back to {name}", parent selectable from its own level, search across the tree with the path shown with chevron separators: signed Design confirmation, issue #508 comment 6834339585, and Playground outcome comment #545 comment 6694670424. |
| AC-018 (full path with chevrons) | B-016 | Supported | established | Full hierarchical path with chevron separators identifies same-name categories: signed Design confirmation, issue #508 comment 6834339585. |
| AC-015 | B-013 | Supported | established | Up to six levels, the initial list being level 1: signed Design confirmation, issue #508 comment 6834339585. |
| AC-019 | B-017 | Supported | established | Hidden native value for forms: Playground outcome comment on pull request #545, comment 6694670424. |
| AC-023 | B-021 | Supported | established | Help text is not part of the component; composition with the form field; `aria-describedby` pass-through: signed Design confirmation, issue #508 comment 6834339585. |
| AC-024 (34px field, 26px rows, enriched 44px, spacing) | B-022 | Supported | established | Field height consistent with `Input`, simple rows 26px: signed Design confirmation, issue #508 comment 6834339585; enriched row height and spacing: Design source referenced by explicit Design decision. |
| AC-025 | B-023 | Supported | established | Scrollbar always visible, the existing Nimbus one: signed Design confirmation, issue #508 comment 6834339585. |
| AC-029 (names of chip controls) | §11 | Supported | established | Reuse of Chip with a translatable, contextual remove label: request issue #508 comment 6806408691. |
| AC-002 (accent-insensitive match, `filter`), AC-022 | B-002, B-020 | Design choice | — | Serves selection with filtering; the match and a controlled/uncontrolled value follow the conventions of Nimbus form controls. |
| AC-018 (truncation at the start) | B-016 | Design choice | — | Serves keeping the option's own label visible when the path does not fit. |
| AC-035 | B-016 | Supported | established | Chips show the path only when labels collide, with the text character "›" between the names: explicit Design decision of 2026-11-13, recorded on issue #508 in the revision 5 comment. |
| AC-034 (no initial value case) | B-027 | Design choice | — | Serves the always-selected rule; defines the case where the consumer gives no initial value. |
| AC-020, AC-021 | B-018, B-019 | Design choice | — | Serves form validity; validity by value count and unique values are required for a reliable form value. |
| AC-024 (extra chip row 28px, maximum list heights) | B-022 | Design choice | — | Serves a usable list; 220px and 280px come from the explored behavior; 28px is a 24px chip plus a 4px gap. |
| AC-026 | B-024 | Design choice | — | Serves translatable texts; English defaults follow the other composite components. |
| AC-027, AC-028 | B-025, B-026 | Design choice | — | Serves consistency with Nimbus form controls (`appearance`, disabled) and an empty list. |
| AC-029 (semantics), AC-030, AC-031, AC-037, AC-038 | §11, §7, B-001 | Design choice | — | Serves operability by keyboard and assistive technology; no existing Nimbus combobox contract exists to reuse. |
| AC-036 | B-028 | Design choice | — | Serves search over a selected value when clearing is allowed; keeps the behavior of the explored prototype. |
| AC-036 (no selection on focus) | B-028 | Supported | established | The current behavior is kept, without selecting the text when the input receives focus: explicit Design decision of 2026-11-13, recorded on issue #508 in the revision 5 comment. |
| AC-042, AC-043 | B-029, B-030 | Supported | established | Choosing a selected option again removes it in multiple mode, and a single value reopens at its own level in a hierarchy: explicit Design decision of 2026-11-13, recorded on issue #508 in the revision 5 comment. |
| AC-039 (focusable, named region) | B-031 | Supported | established | The scrolling region is focusable with `tabindex="0"` and has an accessible name, the focus staying in the text input with `aria-activedescendant`; the technical solution is left to Engineering: explicit Design decision of 2026-11-13, recorded on issue #508 in the revision 5 comment. |
| AC-039 (focus returns to the input), AC-040, AC-041 | B-031, B-032, B-033 | Design choice | — | Serves the combobox pattern without a keyboard trap: the focus lives in the text input, Tab leaves the field, the active row stays visible. |
| AC-032, AC-033 | §9, §10 | Design choice | — | Serves narrow screens and several instances per form. |

---

## 15. Compatibility and Migration

This is a new component; there is no previous contract to migrate.

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | New component and package. | §3 |
| Behavior and defaults | None for existing components. | — |
| Layout and content | None. | — |
| Accessibility and interactions | New. | §7, §11 |
| Supported composition | Coexists with `Select`, `MultiSelect`, `Chip`, `Tag`, `Input`, `Popover`. | §10 |

- Backward compatibility: `Select`, `MultiSelect` and `Input` are unchanged. `Chip` gains an optional way to customize its remove label without changing its default.
- Migration required: No
- Consumer migration steps, when required: Not applicable.

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Open with pointer focus, Tab into the input, click, typing, ArrowDown; focus returned by a component action does not open; close with Escape, outside press and focus leaving; disabled never opens. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Opening and closing" |
| AC-002 | B-002 | Type "camara" with "Cámara" present; text only in subtitle or tag does not match; custom `filter` alone decides. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Filtering" |
| AC-003 | B-003 | Pick an option; check input, `onChange`, reopen state, re-pick. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Single selection" |
| AC-004 | B-004 | With `clearable` not `false`: activate the clear button; check `onChange(null)`, value and text cleared, list closed, focus in input. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Clearing a single value" |
| AC-005 | B-005 | Pick three options; chips order, open list, flat list shrinks. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Multiple | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Multiple selection" |
| AC-006 | B-005 | Remove via button and via Backspace on empty input. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Multiple | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Chip removal" |
| AC-007 | B-006 | Clear all with 2+ chips; with 1 chip the chevron shows. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Multiple | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Clear all" |
| AC-008 | B-007 | Unmatched text offers Create; equal text, empty text and sub-root level do not. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Creatable; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › CreatableMultiple | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Create row" |
| AC-009 | B-008 | `onCreate` returns an option: selected at once, no loading or error state; equal `value` selects the existing option. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Creatable | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Instant creation" |
| AC-011 | B-009 | Render enriched options; measure rows, dividers, tag in field, no check. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › EnrichedOptions | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Enriched options" |
| AC-012 | B-010 | Click and arrow past a disabled option. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › EnrichedOptions | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Disabled option" |
| AC-013 | B-011 | Selected plain, selected branch, unselected rows; text position stable. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Hierarchical | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Selected indication" |
| AC-014 | B-012 | Branch via click, Enter, ArrowRight; back via control, ArrowLeft, Backspace; labels. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Hierarchical | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Hierarchy navigation" |
| AC-015 | B-013 | Seven-level tree; level 7 absent, level 6 without chevron. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › SixLevels | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Level limit" |
| AC-016 | B-014 | Level title selects parent; absent from parent's level; `false` plain title. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Hierarchical; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › HierarchicalParentsNotSelectable | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Choosing a parent" |
| AC-017 | B-015 | Search across tree; ancestor paths with chevrons; branch vs leaf result; clear text. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Hierarchical | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Hierarchical search" |
| AC-018 | B-016 | Same-name options under different branches: field shows full path with chevrons; long path truncated at start; description text. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › HierarchicalWithValue; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › LongPathValue | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Hierarchical value display" |
| AC-019 | B-017 | `FormData` of single and multiple forms. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › InForm | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Form value" |
| AC-020 | B-018 | Validity with 0/1 values × text/no text. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › InForm | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Required" |
| AC-021 | B-019 | Duplicate `value` warning. | — | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Unique values" |
| AC-022 | B-020 | Controlled vs uncontrolled with `defaultValue`. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Controlled value" |
| AC-023 | B-021 | Inspect `aria-describedby` with and without path. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › WithLabelAndHelpText; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › HierarchicalWithValue | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Help text link" |
| AC-024 | B-022 | Measure field (34px with 1 chip row, 62px with 2), rows, padding, gaps, icon offset. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › MultipleWithManyChips; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › EnrichedOptions | — |
| AC-025 | B-022, B-023 | Long list: maximum height, scrollbar, nothing covered. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Hierarchical | — |
| AC-026 | B-024 | Default and overridden labels. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › TranslatedLabels | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Labels" |
| AC-027 | B-025 | `danger` appearance; disabled interactions and tab order. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Appearances; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Disabled | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Appearance and disabled field" |
| AC-028 | B-026 | No match without creation. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "No results" |
| AC-029 | §11 | Read the accessibility tree in each state. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Hierarchical; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › EnrichedOptions | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Semantics and names" |
| AC-030 | §7 Keyboard | Press every key of the table in open and closed states; none moves focus out of the input. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Keyboard map" |
| AC-031 | §7 Focus | Choose, change level, remove chip by pointer, press Escape; focus and active row. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › InsideModal | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Focus" |
| AC-032 | §9 | 320, 375, 414px: no horizontal scroll. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Hierarchical | — |
| AC-033 | §10 | Two instances used in turn. | — | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Multiple instances" |
| AC-034 | B-027 | `clearable={false}` with initial value: chevron, search without change, restore on leaving, choose another. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › NotClearable; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › EnrichedNotClearable | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Non-clearable single value" |
| AC-035 | B-016 | Two chips with the same label under different branches; unique label chip. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › HierarchicalMultiple | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Chips with the same label" |
| AC-036 | B-028 | Select a single value, type a character; check `onChange(null)` once, preserved text, open filtered list, focus. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Typing over a selected value" |
| AC-037 | §7 Focus, §11 Focus, B-001 | Tab and Shift+Tab through chips, input, clear buttons; Enter/Space on a button; list closes when focus leaves the input. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Multiple | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Tab sequence and leaving the field" |
| AC-038 | B-001, B-004, B-006 | Tab to the clear button (single) and to clear-all (2+ chips), press Enter and Space; check empty value and text, closed list, focus in input, list not reopened. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Multiple | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Keyboard clear leaves the list closed" |
| AC-039 | B-031 | Open the list; read the accessibility tree; focus the listbox with a script. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Focusable named list region" |
| AC-040 | B-032 | Tab and Shift+Tab with the list open; Tab from the last focusable field; close the list and look for a listbox. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single; `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Multiple | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Tab leaves the field" |
| AC-041 | B-033 | Long list: arrow keys, Home and End; check the active row is inside the scrolling region. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › Single | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Active row visible" |
| AC-042 | B-029 | Multiple, hierarchy: choose an option twice; `onCreate` returning a selected option. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › HierarchicalMultiple | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Choosing a selected option again" |
| AC-043 | B-030 | Select a nested option, reopen; open without a value. | `packages/react/src/composite/Combobox/src/combobox.stories.tsx` › HierarchicalWithValue | `packages/react/src/composite/Combobox/src/combobox.spec.tsx` › "Reopening a single value in a hierarchy" |
