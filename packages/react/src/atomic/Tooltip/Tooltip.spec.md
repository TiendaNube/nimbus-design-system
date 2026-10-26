# Tooltip Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Tooltip displays short, additional information about an element in a non-intrusive way.

- Use it to give optional context in limited space: explaining terms in forms, explaining new features, or giving tips on buttons without text.
- Do not use it for information that is essential to the experience. Use Alert to show mandatory information without requiring an interaction.
- Related components: Popover (actions or multi-line content anchored to a trigger), Alert, Icon button (a frequent trigger), Toast (confirming the result of an action).

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Trigger | Yes | The consumer-provided element the Tooltip is anchored to. |
| Floating text box | Yes | The floating box that shows the `content` text while the Tooltip is displayed. |
| Arrow | No | A pointer from the floating text box to the trigger, shown only when `arrow` is enabled. |

### Rules

- The floating text box exists only while the Tooltip is displayed (B-001).
- The floating text box is rendered as a floating layer over the page, not in the trigger's layout flow (B-004).

---

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| `children` | Element | Yes | — | The trigger that positions the Tooltip. |
| `content` | string | Yes | — | The text shown in the floating text box. |
| `arrow` | boolean | No | `false` | Shows the arrow when `true` (B-003). |
| `position` | `top` \| `bottom` \| `left` \| `right` | No | `bottom` | Preferred side of the trigger where the floating text box is placed (B-002). |
| `maxWidth` | string or responsive object | No | — | Maximum width of the floating text box content area. |

### Events

Not applicable — Tooltip exposes no consumer callbacks.

### Actions

Not applicable — Tooltip exposes no imperative actions.

### API Rules

- Each input MUST have one clear responsibility.
- Inputs MUST represent supported use cases.
- Equivalent behaviors SHOULD NOT be exposed through competing inputs.
- Internal implementation details MUST NOT be part of the public API.
- Default values MUST be explicitly documented when applicable.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| With arrow | Points the floating text box at its trigger. | When the relation between the text and the trigger must be explicit. |
| Without arrow (default) | Plain floating text box. | Default presentation. |

### Rules

- Position (`top`, `bottom`, `left`, `right`) is a placement option, not a visual variant.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Hidden | Initial state | The floating text box is not rendered. |
| Displayed | The user hovers, clicks or taps the trigger (B-001) | The floating text box shows `content` next to the trigger, above page content (B-004). |

---

## 6. Behavioral Contract

### B-001 - Display on user activation

When the user moves the pointer over, clicks or taps the trigger,
the component MUST display the floating text box with the `content` text.
While the Tooltip is hidden, the floating text box MUST NOT be rendered.

### B-002 - Placement

When the Tooltip is displayed,
the component MUST place the floating text box on the side of the trigger requested by `position`, or below it when `position` is not provided, and MUST keep the floating text box positioned relative to the viewport.

### B-003 - Arrow

When `arrow` is `true` and the Tooltip is displayed,
the component MUST show an arrow pointing to the trigger.
When `arrow` is not provided, the component MUST NOT show the arrow.

### B-004 - Floating layer order

When the Tooltip is displayed,
the floating text box MUST appear above page content and above a Modal or Sidebar that uses its standard layer, including a Tooltip whose trigger is inside that Modal or Sidebar. Only a Modal on its `top` layer appears above the Tooltip.

### B-005 - Theme of the enclosing ThemeProvider

When the Tooltip's trigger is inside a ThemeProvider,
the floating text box MUST present that ThemeProvider's theme.
It MUST NOT take the theme of, or be layered within, a ThemeProvider that does not contain the trigger, including when such a ThemeProvider elsewhere on the page already contains a displayed or previously displayed Tooltip.

---

## 7. Interaction Contract

### Pointer

- Moving the pointer over the trigger, or clicking it, displays the Tooltip (B-001).

### Keyboard

- No keyboard binding is part of this contract.

### Touch

- Tapping the trigger displays the Tooltip (B-001).

### Focus

- Displaying the Tooltip does not move focus. The floating text box contains no focusable content defined by this contract.

---

## 8. Content Contract

### Labels

- `content` is plain text and is the only text in the floating text box.

### Supporting Content

- The text is optional, supplementary information; it must not be essential to complete the task (§1).

### Icons

- The trigger may be an icon. The icon must represent the information the Tooltip presents.

### Long Content

- Text longer than the available width wraps within the floating text box; `maxWidth` limits its width.

### Localization

- Translated text follows the same wrapping rule. No RTL-specific behavior is part of this contract.

---

## 9. Layout and Responsive Behavior

### Sizing

- The floating text box width is limited by `maxWidth` when provided.

### Alignment

- The floating text box is aligned to the side of the trigger given by `position` (B-002).

### Overflow

- The floating text box is a floating layer and does not change the layout of the trigger or its container (B-004).

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| `maxWidth` given as a responsive object | The maximum width applied follows the breakpoint values provided. |

---

## 10. Composition Contract

### Supported Composition

- A Tooltip may be used inside a Modal, a Sidebar or a Popover; its floating text box appears above them as defined by B-004.
- A Tooltip may be used inside a ThemeProvider, including an application with more than one ThemeProvider (B-005).

### Unsupported Composition

- Not applicable — no unsupported composition is evidenced.

### Nesting Rules

- Layer order and theme are defined by B-004 and B-005 regardless of where on the page other ThemeProviders, Tooltips or Popovers are mounted.

### Multiple Instances

- Several Tooltips can exist on the same page; each one follows B-004 and B-005 for its own trigger, independently of other instances.

---

## 11. Accessibility Contract

### Semantics

- The Tooltip presents supplementary text; this contract defines no ARIA role for it.

### Accessible Name

- Not applicable — the Tooltip does not name its trigger. The trigger provides its own accessible name.

### Keyboard Access

- No keyboard behavior is part of this contract (§7).

### Focus

- Displaying the Tooltip does not move focus (§7).

### Screen Reader Behavior

- Because the information is supplementary (§1, §8), no screen-reader announcement is part of this contract.

### Visual Accessibility

- The text uses the theme's colors for the floating text box (B-005).

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| `arrow` not provided | No arrow is shown (B-003). |
| `position` not provided | The floating text box is placed below the trigger (B-002). |
| Trigger inside a Modal on its standard layer | The floating text box appears above the Modal (B-004). |
| Another ThemeProvider elsewhere on the page already contains a Tooltip | The Tooltip keeps the theme and layer order of its own trigger's ThemeProvider (B-004, B-005). |
| Multiple instances | Each Tooltip follows B-004 and B-005 for its own trigger. |

---

## 13. Acceptance Criteria

### AC-001 - Display on hover

**Given**
a Tooltip with `content` "string" that is hidden

**When**
the user moves the pointer over the trigger

**Then**
the floating text box is rendered and shows "string" (B-001).

---

### AC-002 - Display on click or tap

**Given**
a hidden Tooltip

**When**
the user clicks the trigger with a mouse, or taps it on a touch device

**Then**
the floating text box is rendered and shows `content` (B-001).

---

### AC-003 - Placement

**Given**
a Tooltip with `position` set to `top`, `bottom`, `left` or `right`, or not provided

**When**
the Tooltip is displayed

**Then**
the floating text box is placed on the requested side of the trigger, or below it when `position` is not provided, and is positioned relative to the viewport (B-002).

---

### AC-004 - Arrow

**Given**
a Tooltip with `arrow` set to `true`, and another with `arrow` not provided

**When**
each Tooltip is displayed

**Then**
the first shows an arrow pointing to the trigger, and the second shows no arrow (B-003).

---

### AC-005 - Maximum width

**Given**
a Tooltip with `maxWidth` "400px"

**When**
the Tooltip is displayed

**Then**
the floating text box content area does not exceed 400px wide (§3 Public API).

---

### AC-006 - Above a standard Modal

**Given**
a Modal on its `base` layer that is open, with a Tooltip whose trigger is inside the Modal

**When**
the user hovers the Tooltip's trigger

**Then**
the floating text box is painted above the Modal and its overlay (B-004).

---

### AC-007 - Not captured by another ThemeProvider

**Given**
an application wrapped in a ThemeProvider with the `base` theme, containing a side area wrapped in its own ThemeProvider with the `dark` theme that holds a Tooltip that has been displayed, and a Modal on its `base` layer opened later outside the side area with a Tooltip inside it

**When**
the user hovers the Tooltip inside the Modal

**Then**
its floating text box presents the `base` theme, is not layered within the side area's ThemeProvider, and is painted above the Modal (B-004, B-005).

---

### AC-008 - Theme within a single ThemeProvider

**Given**
a Tooltip whose trigger is inside a ThemeProvider with the `dark` theme

**When**
the Tooltip is displayed

**Then**
the floating text box presents the `dark` theme (B-005).

### Acceptance Criteria Rules

- Every normative behavior MUST be covered by at least one Acceptance Criterion.
- Each Acceptance Criterion MUST reference the behavior IDs (such as `B-001`) or exact contract sections it verifies.
- Acceptance Criteria MUST be testable.
- Acceptance Criteria MUST describe user- or consumer-observable outcomes.
- Acceptance Criteria MUST NOT refer to implementation details.
- Acceptance Criteria SHOULD cover core behavior, states, interactions, accessibility and relevant edge cases.

---

## 14. Origin of Guarantees

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001 | Supported | reconstructed | `packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx` ("should display tooltip if anchor receives hover event") and `packages/react/src/atomic/Tooltip/README.md` ("Tooltip display") at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-002 | B-001 | Supported | reconstructed | `packages/react/src/atomic/Tooltip/README.md` ("displayed by clicking, tapping or mouse over") at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-003 | B-002 | Supported | reconstructed | `packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx` (top/bottom/left/right position tests, fixed position) and `tooltip.stories.tsx` (top, bottom, left, right stories) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e; Tooltip props: https://nimbus.nuvemshop.com.br/es-AR/documentation/atomic-components/tooltip#props |
| AC-004 | B-003 | Supported | reconstructed | `packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx` ("should not display arrow if arrow is not passed"; arrow shown with `arrow: true`) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e |
| AC-005 | §3 Public API | Supported | reconstructed | `packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx` (maxWidth sprinkle test) at nimbus-design-system@dcea961a3abb65e847e0131e54e4b5136363538e; https://nimbus.nuvemshop.com.br/es-AR/documentation/atomic-components/tooltip#example-max-width |
| AC-006 | B-004 | Supported | established | Modal `zIndex` prop ("base": above the page, below floating components like tooltip/toast/popover): https://nimbus.nuvemshop.com.br/es-AR/documentation/composite-components/modal#props; zIndex tokens (600/700 modals and sidebars, 800 tooltips and popovers, 1000/1100 reserved for Modal `top`): https://nimbus.nuvemshop.com.br/es-AR/documentation/tokens/zIndex |
| AC-007 | B-004, B-005 | Supported | established | Layer order: modal#props and tokens/zIndex as for AC-006. Theme: ThemeProvider applies the selected theme to the application's Nimbus components: https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas |
| AC-008 | B-005 | Supported | established | https://nimbus.nuvemshop.com.br/es-AR/documentation/resources/themes#implementando-temas |

---

## 15. Compatibility and Migration

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | No change. | §3 |
| Behavior and defaults | No change to defaults. Layer order and theme follow the trigger's own ThemeProvider when other ThemeProviders exist. | B-004, B-005 |
| Layout and content | No change. | §8, §9 |
| Accessibility and interactions | No change. | §7, §11 |
| Supported composition | Use inside Modal, Sidebar and multiple ThemeProviders is supported as defined. | §10 |

- Backward compatibility: Inputs, defaults and supported compositions are unchanged.
- Migration required: No

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Hover the trigger of a hidden Tooltip; the floating text box appears with the content text. | `packages/react/src/atomic/Tooltip/src/tooltip.stories.tsx` (basic) | `packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx` ("should display tooltip if anchor receives hover event") |
| AC-002 | B-001 | Click the trigger with a mouse, and tap it with touch emulation; the floating text box appears each time. | — | — |
| AC-003 | B-002 | Display Tooltips with each `position` and without it; check the side of the trigger and viewport-relative positioning. | `packages/react/src/atomic/Tooltip/src/tooltip.stories.tsx` (top, bottom, left, right) | `packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx` (position tests) |
| AC-004 | B-003 | Display with `arrow` true and without it; the arrow is present only in the first case. | — | `packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx` ("should not display arrow if arrow is not passed" and position tests with `arrow: true`) |
| AC-005 | §3 Public API | Display with `maxWidth` "400px" and long content; the content area does not exceed 400px. | — | `packages/react/src/atomic/Tooltip/src/tooltip.spec.tsx` ("should set correctly the className and width using the sprinkle") |
| AC-006 | B-004 | In a browser, open a `base` Modal containing a Tooltip, hover the trigger, and check that the floating text box is painted above the Modal and its overlay. | — | — |
| AC-007 | B-004, B-005 | Render a `base` ThemeProvider with a `dark` ThemeProvider side area holding a displayed Tooltip, then open a `base` Modal with a Tooltip; hover it and check that the floating text box is not a descendant of the side area's ThemeProvider, presents the `base` theme, and is painted above the Modal. | — | `packages/react/src/atomic/Tooltip/src/tooltip.themeScope.spec.tsx` (nested ThemeProvider containment suite; DOM ancestry only) |
| AC-008 | B-005 | Display a Tooltip inside a `dark` ThemeProvider; check that its floating text box presents the `dark` theme. | — | `packages/react/src/atomic/Tooltip/src/tooltip.themeScope.spec.tsx` (nested ThemeProvider containment suite; DOM ancestry only) |
