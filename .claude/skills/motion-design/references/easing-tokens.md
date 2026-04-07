# Easing & Duration Tokens

Standardized motion values for consistent, intentional UI animation.

---

## Easing Curves

### Ease-Out Family (Enter/Exit, User-Triggered)

Use for elements appearing or disappearing. Fast initial acceleration creates responsiveness.

| Token | Value | Intensity |
|-------|-------|-----------|
| `--ease-out-quad` | `cubic-bezier(.25, .46, .45, .94)` | Gentle |
| `--ease-out-cubic` | `cubic-bezier(.215, .61, .355, 1)` | Moderate |
| `--ease-out-quart` | `cubic-bezier(.165, .84, .44, 1)` | Strong |
| `--ease-out-quint` | `cubic-bezier(.23, 1, .32, 1)` | Very strong |
| `--ease-out-expo` | `cubic-bezier(.19, 1, .22, 1)` | Aggressive |
| `--ease-out-circ` | `cubic-bezier(.075, .82, .165, 1)` | Unique curve |

**Default choice**: `--ease-out-quart` for most enter/exit animations.

### Ease-In-Out Family (Reposition/Morph/Layout)

Use for elements already on screen that move or change shape. Natural acceleration and deceleration.

| Token | Value | Intensity |
|-------|-------|-----------|
| `--ease-in-out-quad` | `cubic-bezier(.455, .03, .515, .955)` | Gentle |
| `--ease-in-out-cubic` | `cubic-bezier(.645, .045, .355, 1)` | Moderate |
| `--ease-in-out-quart` | `cubic-bezier(.77, 0, .175, 1)` | Strong |
| `--ease-in-out-quint` | `cubic-bezier(.86, 0, .07, 1)` | Very strong |
| `--ease-in-out-expo` | `cubic-bezier(1, 0, 0, 1)` | Aggressive |
| `--ease-in-out-circ` | `cubic-bezier(.785, .135, .15, .86)` | Unique curve |

**Default choice**: `--ease-in-out-cubic` for most layout/morph animations.

### Ease-In Family (Rarely Used)

Generally avoid for UI. Only use for:
- Elements exiting permanently (not returning)
- Creating anticipation before a larger motion

| Token | Value |
|-------|-------|
| `--ease-in-quad` | `cubic-bezier(.55, .085, .68, .53)` |
| `--ease-in-cubic` | `cubic-bezier(.55, .055, .675, .19)` |
| `--ease-in-quart` | `cubic-bezier(.895, .03, .685, .22)` |

### Built-in CSS Ease

Reserved for subtle hover states: color, opacity, background transitions.

```css
transition: color 150ms ease;
```

### Linear

For time-based visualizations where progress should feel constant:
- Progress bars
- Marquee/ticker
- Hold-to-delete indicators
- Loading spinners

```css
transition: transform 1000ms linear;
```

---

## Duration Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `--dur-1` | `120ms` | Micro feedback, quick fades, button press |
| `--dur-2` | `180ms` | Dropdowns, popovers, small surfaces |
| `--dur-3` | `240ms` | Dialogs, sheets, medium surfaces |
| `--dur-4` | `300ms` | Upper bound for most UI (use sparingly) |
| `--dur-5` | `500ms` | Large surfaces, steep early curves only |
| `--dur-illustrative` | `700-1200ms` | Marketing, illustration, onboarding only |

### Duration Guidelines

**Product UI**: 120-240ms for most interactions. Rarely exceed 300ms.

**When to use longer durations** (300ms+):
- Element is physically large
- Easing curve is steep early (snappy start, long tail)
- It's illustrative/marketing content

**Tooltip special case**:
- First tooltip: add delay (prevent accidental activation)
- Subsequent tooltips while one is open: no delay, minimal animation

---

## CSS Custom Properties

```css
:root {
  /* Durations */
  --dur-1: 120ms;
  --dur-2: 180ms;
  --dur-3: 240ms;
  --dur-4: 300ms;
  --dur-5: 500ms;

  /* Ease-out */
  --ease-out-quad: cubic-bezier(.25, .46, .45, .94);
  --ease-out-cubic: cubic-bezier(.215, .61, .355, 1);
  --ease-out-quart: cubic-bezier(.165, .84, .44, 1);
  --ease-out-quint: cubic-bezier(.23, 1, .32, 1);
  --ease-out-expo: cubic-bezier(.19, 1, .22, 1);
  --ease-out-circ: cubic-bezier(.075, .82, .165, 1);

  /* Ease-in-out */
  --ease-in-out-quad: cubic-bezier(.455, .03, .515, .955);
  --ease-in-out-cubic: cubic-bezier(.645, .045, .355, 1);
  --ease-in-out-quart: cubic-bezier(.77, 0, .175, 1);
  --ease-in-out-quint: cubic-bezier(.86, 0, .07, 1);
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
  --ease-in-out-circ: cubic-bezier(.785, .135, .15, .86);
}
```

---

## Quick Reference

| Scenario | Easing | Duration |
|----------|--------|----------|
| Button press feedback | `--ease-out-quad` | `--dur-1` |
| Dropdown open | `--ease-out-quart` | `--dur-2` |
| Modal enter | `--ease-out-quart` | `--dur-3` |
| Toast notification | `--ease-out-cubic` | `--dur-2` |
| Layout reflow | `--ease-in-out-cubic` | `--dur-3` |
| Accordion expand | `--ease-in-out-quart` | `--dur-3` |
| Hover color change | `ease` | `150ms` |
| Progress bar | `linear` | varies |
| Marketing hero | `--ease-out-expo` | `--dur-illustrative` |

---

## Performance

### Properties to Animate

Stick to `transform` and `opacity`—these run on the compositor and don't trigger layout.

```css
/* Good - compositor only */
transition: transform 200ms, opacity 200ms;

/* Avoid - triggers layout */
transition: width 200ms, height 200ms, top 200ms, left 200ms;
```

For width/height changes, use `transform: scale()` instead. For position changes, use `transform: translate()`.

### will-change

Use sparingly. It creates compositor layers which consume memory.

```css
/* Only when actively animating */
.element.is-animating {
  will-change: transform;
}
```

### Blur

`backdrop-filter: blur()` is expensive. Keep values under ~20px.

```css
/* Fine */
backdrop-filter: blur(12px);

/* Expensive */
backdrop-filter: blur(40px);
```
