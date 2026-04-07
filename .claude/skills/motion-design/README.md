# Motion Design Skill

Designs intentional, purposeful motion for product UI. Evaluates animation needs and recommends specific easing curves, durations, and implementation approaches based on interaction type and frequency.

## Quick Start

1. Open a component or page you want to animate
2. Ask: "How should I animate this dropdown?", "This animation feels too slow", or "Make this feel more alive"
3. The skill evaluates purpose, frequency, and pattern type
4. Returns specific tokens and implementation code

## What It Does

- Evaluates animations based on purpose, frequency, and pattern type
- Recommends specific easing curves from a curated token set
- Provides duration guidance matched to interaction frequency
- Identifies transform-origin for origin-aware animations
- Decides between spring vs bezier, bounce vs no-bounce
- Refines existing animations that feel off (too fast, too slow, unnatural)

## Evaluation Process

The skill follows this process for each animation request:

1. **Identifies the purpose** - Responsiveness, spatial continuity, understanding, or delight
2. **Assesses frequency** - High (keyboard), medium (common), or low (rare/illustrative)
3. **Determines pattern type** - Enter/exit, morph, time-based, hover, or keyboard
4. **Recommends tokens** - Specific easing curve and duration from the reference set
5. **Provides implementation** - Code example ready to use

## Core Principles

- **Every animation needs a job.** If it has no job, don't animate.
- **Easing is the biggest lever.** It affects perceived speed more than duration.
- **Frequency controls everything.** High-frequency = less or no animation.
- **Fast start, gentle settle.** That's why ease-out dominates product UI.

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Main skill instructions and evaluation workflow |
| `references/decision-tree.md` | Flowchart for choosing easing type, scale values, transform-origin, hover/touch, accessibility |
| `references/easing-tokens.md` | Curated curves, duration values, CSS custom properties, performance guidelines |

## Tips for Best Results

- **Be specific**: "Animate this dropdown" vs. "add some animation"
- **Mention the trigger**: Click, hover, keyboard, scroll
- **Share context**: "This is a productivity app" vs. "marketing landing page"
- **Specify framework**: CSS, Framer Motion, GSAP, React Spring
