---
name: nimbus-next-component-approximation
description: This skill should be used when a Designer + Agent pair asks to "create a Path C or Path D component approximation", "prototype a next component under packages/react/src/next/", "refine a Nimbus component for Norte UI", or "publish an Approximation Reference to a GitHub Issue".
---

# Nimbus Next Component Approximation (Path C & Path D)

This skill guides a **Designer + Agent** pair through authoring high-fidelity **Path C** (opt-in prop / visual refinement) and **Path D** (redesigned component under `packages/react/src/next/<Component>/src/`) approximations under the proposed Next-Generation Evolution Process (`processes/next-evolution/`, `status: draft`; Decisions `0081`, `0082`, `0083`, `status: proposed`), while respecting the accepted single-intake and human-gate governance rules (Decisions `0001` and `0014`, `status: accepted`).

> **Governance status notice:** `processes/next-evolution/` is `status: draft`, and Decisions `0081`, `0082`, and `0083` are `status: proposed`. Decisions `0001` (GitHub Issues as single intake) and `0014` (mandatory human validation gate) are `status: accepted`. An approximation is **input evidence to Discovery and Specification**, never a bypass around them.

---

## When to Use This Skill

Use this skill when a Designer + Agent pair wants to build a working code approximation in `nimbus-design-system` or `nimbus-patterns` for:
- **Path C (Opt-In Prop / Variant Refinement):** Adding a backward-compatible opt-in prop or visual refinement to an existing component where `base` and `dark` default behavior remains 100% invariant.
- **Path D (Coexisting `/next` Redesign):** Creating a structurally or behaviorally redesigned component under `packages/react/src/next/<Component>/src/` that will ship through the aggregate subpath export (`@nimbus-ds/components/next` or `@nimbus-ds/patterns/next`).

Do **not** use this skill for pure token value changes in `@nimbus-ds/tokens` / `@nimbus-ds/styles` (use `nimbus-next-token-studio`) or for adopting components inside `admin` (use `nimbus-next-admin-adoption`).

---

## Architectural & Styling Rules for Path D (`/next`)

### 1. Styling Rule: Compose `@nimbus-ds/styles` Primitives by Default
When building a Path D component under `packages/react/src/next/<Component>/src/`:
- **Default approach (no `.css.ts` needed):** Compose `@nimbus-ds/styles` primitives (`Box`, `Text`, `sprinkles`, and `vars.*` semantic tokens) directly in `.tsx`. Most layout, spacing, radius, color, and typography changes in Norte UI require **zero** custom `.css.ts` files.
- **Safety-net approach (local `<component>.css.ts`):** When pseudo-elements, complex selectors, keyframe animations, or layout rules cannot be expressed with `Box` or `sprinkles`, create a **component-local** Vanilla Extract stylesheet at `packages/react/src/next/<Component>/src/<component>.css.ts` importing `vars` from `@nimbus-ds/styles`.
- **Prohibited:** A Path D component approximation **must never** edit `packages/core/styles/**` to add component-specific styles (`subcomponents/`). Keeping styles local to `packages/react/src/next/<Component>/src/` prevents cross-package bottlenecks and merge conflicts across parallel component tracks.

### 2. Zero-Shared-Files Rule for Parallel Path D Tracks (Decision `0082`)
So that multiple Designers and Engineers can work on different `/next` components in parallel with **zero git merge conflicts**, a Path D worktree **must only create or edit files inside `packages/react/src/next/<Component>/**`**.

**Never hand-edit any of these shared aggregate files:**
- `packages/react/src/next/index.ts` (auto-generated at build time by `yarn generate:next-index`)
- `packages/react/src/index.ts`
- `packages/react/package.json`
- `packages/react/CHANGELOG.md` (if a changelog note is drafted, keep it local at `packages/react/src/next/<Component>/CHANGELOG.md`)
- `nimbus-source-map.yml`

Also, **never** create a per-component `packages/react/src/next/<Component>/package.json`. Next-generation components ship exclusively through the aggregate `@nimbus-ds/components/next` and `@nimbus-ds/patterns/next` subpath exports (Decision `0082`).

---

## Step-by-Step Workflow

### Step 1 — Classify the Evolution Path (Path C vs. Path D)
Before writing code, classify the change:
- Choose **Path C** if all existing props keep their exact types, defaults, and DOM semantics, and the new Norte UI behavior is either purely additive or behind an opt-in prop with zero change to default `base`/`dark` rendering.
- Choose **Path D** if any existing prop is removed, renamed, or has a new default; if DOM structure or keyboard/focus behavior changes incompatibly; or if the component is a clean-slate redesign for `next`.

### Step 2 — Author the Component Approximation
- **For Path C:** Edit the component inside its existing directory (`packages/react/src/atomic/<Component>` or `packages/react/src/composite/<Component>`), ensuring all new props are optional and default to the exact current `base`/`dark` behavior.
- **For Path D:** Create or update files strictly inside `packages/react/src/next/<Component>/src/`:
  - `packages/react/src/next/<Component>/src/<Component>.tsx` (calling `useNextThemeWarning("<Component>")` from `@nimbus-ds/styles`)
  - `packages/react/src/next/<Component>/src/<component>.types.ts`
  - `packages/react/src/next/<Component>/src/<component>.stories.tsx` (titled `Next/<Component>`)
  - Optional local `packages/react/src/next/<Component>/src/<component>.css.ts`
  - `packages/react/src/next/<Component>/src/index.ts`

### Step 3 — Run Barrel Generation, Base-Invariance, and 4-Theme Storybook Check
1. If working on Path D, run `yarn generate:next-index` locally to test compilation (`packages/react/src/next/index.ts` is git-ignored and auto-generated).
2. Run base-invariance verification:
   ```bash
   yarn check:base-invariance
   ```
   Confirm `0` diffs on `base` and `dark`.
3. Inspect the component in Storybook across all **4 themes** (`base`, `dark`, `next`, `next-dark`) and capture visual evidence (screenshots or Chromatic/Storybook preview links).

### Step 4 — Terminal Output Rule: Push `approx/*` Branch & Record `### Approximation Reference` on the GitHub Issue
Per Decisions `0001`, `0014`, and `0083`, `nimbus-next-component-approximation` **must never open a direct release Pull Request to `master`**.

Instead, complete the skill by performing these two actions:
1. **Commit and push the approximation branch:**
   - Branch naming convention: `approx/next-<component-kebab>-<short-slug>` (for example, `approx/next-button-norte-density`).
   - Verify via `git status` that no prohibited shared files (`packages/react/src/next/index.ts`, `packages/react/package.json`, `packages/react/CHANGELOG.md`, `nimbus-source-map.yml`) are staged.
   - Record the immutable 40-character `git rev-parse HEAD` commit SHA.
2. **Create or update the GitHub Issue (Single Intake — Decision `0001`):**
   Include the canonical `### Approximation Reference` section in the Issue body so the automated Discovery and Specification runtime (`stage_context.py`) can extract it as structured context:

```markdown
### Approximation Reference
- **Repository**: `TiendaNube/nimbus-design-system`
- **Branch**: `approx/next-<component>-<slug>`
- **Commit SHA**: `<40-char-immutable-sha>`
- **Classification Path**: `Path C` | `Path D`
- **Target Surface**: `packages/react/src/next/<Component>`
- **Visual Evidence**: <4-theme Storybook screenshots or links covering `base`, `dark`, `next`, `next-dark`>
- **Proposed Contract Delta**: <Summary of added/removed/changed props, DOM changes, and keyboard/accessibility notes>
```

---

## Explicit Handoff to Engineering

Once the `### Approximation Reference` block is posted to the GitHub Issue, **hand off to Nimbus Engineering**. Engineering owns production hardening through the formal contribution stages (Discovery -> Specification -> Construction -> Validation -> Publication, Decisions `0001` and `0014`), including:
- `forwardRef` and polymorphic ref stability
- Full keyboard navigation, focus management, and WAI-ARIA compliance
- SSR / hydration safety and event handler contracts
- Complete `.spec.md` contract authoring and `.spec.tsx` unit/acceptance test suite
- Final Draft/Ready PR publication and human validation gate approval
