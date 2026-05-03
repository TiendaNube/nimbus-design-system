# Animation Decision Tree

A flowchart for choosing the right easing and approach for any UI animation.

---

## Primary Decision: What Type of Motion?

### A) Entering or Exiting the Screen?

**Examples**: Popover, modal, toast, dropdown, tooltip, sheet, menu

**Use**: Custom ease-out (from `--ease-out-*` family)

**Why**: Fast initial acceleration = perceived responsiveness. The brain wants quick response at the start, calm landing at the end.

**Default**: `--ease-out-quart` with `--dur-2` (180ms)

**Scale**: Never animate from `scale(0)`—it reads as synthetic. Use:
- Small elements (buttons, chips): `scale(0.97-0.98)`
- Medium elements (dropdowns, popovers): `scale(0.95-0.96)`
- Large elements (modals, sheets): `scale(0.94-0.95)`

**Transform Origin**: Match the trigger position. Dropdowns/popovers scaling from center feel disconnected.

```css
.dropdown[data-side="bottom"] {
  transform-origin: top center;
}
.dropdown[data-side="top"] {
  transform-origin: bottom center;
}
```

Radix UI and similar libraries expose CSS variables for this.

---

### B) Already On-Screen, Moving or Morphing?

**Examples**: Layout reflow, accordion expand, list reorder, element resize, card flip

**Use**: Custom ease-in-out (from `--ease-in-out-*` family)

**Why**: Natural acceleration then deceleration. Reads like physical movement.

**Default**: `--ease-in-out-cubic` with `--dur-3` (240ms)

---

### C) Time or Progress Visualization?

**Examples**: Progress bar, marquee/ticker, hold-to-delete, loading spinner, countdown

**Use**: Linear

**Why**: Time should feel linear. Any easing makes progress feel inconsistent.

**Default**: `linear` with duration matching the actual time

---

### D) Subtle Hover/Focus State?

**Examples**: Color change, opacity shift, background transition, border color

**Use**: Built-in `ease`

**Why**: Subtle and elegant. These don't need custom curves.

**Default**: `ease` with `150ms`

**Hover caution**: Don't move the hovered element itself—if hover shifts position, the cursor can leave the hit area, causing flicker. Move a child element instead.

**Touch devices**: Scope hover styles to devices that support hover. Tailwind v4 handles this automatically.

```css
@media (hover: hover) {
  .button:hover {
    background-color: var(--hover-bg);
  }
}
```

---

### E) Keyboard-Driven or High-Frequency?

**Examples**: Arrow key navigation, tab focus, vim-style movement, autocomplete selection, rapid clicking

**Use**: No animation (or effectively 0ms)

**Why**: Any delay breaks the feeling of direct manipulation. Keyboard users expect instant response.

**Default**: `0ms` or `transition: none`

---

### F) Needs "Native" Organic Feel or Interruptibility?

**Examples**: Drag gestures, swipe dismiss, stacking toasts, reorderable lists, pull-to-refresh

**Use**: Spring animation (Motion/Framer Motion, React Spring)

**Why**: Springs carry velocity through interruptions. CSS animations jump when re-targeted.

**Default**: Spring with no bounce. Add bounce only for drag gestures.

---

## Secondary Decisions

### Spring vs Bezier?

| Use Spring When | Use Bezier When |
|-----------------|-----------------|
| Motion can be interrupted mid-animation | Animation runs to completion |
| Gesture-driven (drag, swipe) | Tap/click triggered |
| Need velocity continuity | Simple enter/exit |
| Want "native iOS" feel | Performance critical (CSS-only) |

### Bounce?

**Default**: No bounce

**Allow bounce when**:
- Drag gesture with momentum (dismiss, snap points)
- Intentional playful/toy-like aesthetic
- Physical metaphor (rubber band, spring)

**Never bounce on**:
- Tap-to-open / tap-to-close
- Hover states
- Keyboard interactions
- High-frequency actions

---

## Decision Flowchart

```
Is it entering/exiting the viewport?
├── Yes → ease-out (--ease-out-quart, 180ms)
└── No ↓

Is it already visible and changing position/size?
├── Yes → ease-in-out (--ease-in-out-cubic, 240ms)
└── No ↓

Is it showing time/progress?
├── Yes → linear (duration = actual time)
└── No ↓

Is it a subtle state change (color, opacity)?
├── Yes → ease (150ms)
└── No ↓

Is it keyboard-driven or very frequent?
├── Yes → no animation
└── No ↓

Does it need to be interruptible or gesture-driven?
├── Yes → spring (no bounce default)
└── No → ease-out (safest default)
```

---

## Frequency Modifier

After choosing easing type, adjust duration based on frequency:

| Frequency | Duration Adjustment |
|-----------|---------------------|
| High (keyboard, rapid clicks) | No animation or `--dur-1` max |
| Medium (common interactions) | Standard tokens (`--dur-2`, `--dur-3`) |
| Low (rare, illustrative) | Can use `--dur-4`, `--dur-5`, or longer |

---

## Context Modifier

| Context | Adjustment |
|---------|------------|
| Productivity app | Shorter durations, less motion |
| Marketing site | More freedom, can be slower/richer |
| Mobile/touch | Consider reduced motion preferences |
| Accessibility | Respect `prefers-reduced-motion` |

---

## Accessibility

Always respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
