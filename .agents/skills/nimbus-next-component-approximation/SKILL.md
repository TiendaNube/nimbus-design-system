---
name: nimbus-next-component-approximation
description: This skill should be used when a Designer + Agent pair asks to "create a Path B, Path C, or Path D component approximation", "prototype a next component under packages/react/src/next/", "refine a Nimbus component for Norte UI", "create a Draft PR and GitHub Issue for a Nimbus update", "hand off a live Admin Nimbus slice to formal construction", or "publish an Approximation Reference to a GitHub Issue".
---

# Nimbus Next Component Approximation & Formal Construction Handoff (Paths B, C & D)

This skill guides a **Designer + Agent** pair through authoring high-fidelity **Path B** (internal morphology via `useTheme`), **Path C** (opt-in prop / variant refinement), and **Path D** (redesigned component under `packages/react/src/next/<Component>/src/`) approximations — including slices iterated live from `services-new-admin` (`NIMBUS_LOCAL=true`) — and packaging each completed slice into an **unmerged Draft Pull Request (`approx/next-<component>-<slug>`)** plus a **GitHub Issue** with a structured `### Approximation Reference` block under the proposed Next-Generation Evolution Process (`processes/next-evolution/`, `status: draft`; Decisions `0081`, `0082`, `0083`, `status: proposed`), while respecting the accepted single-intake and human-gate governance rules (Decisions `0001` and `0014`, `status: accepted`).

> **Governance status notice:** `processes/next-evolution/` is `status: draft`, and Decisions `0081`, `0082`, and `0083` are `status: proposed`. Decisions `0001` (GitHub Issues as single intake) and `0014` (mandatory human validation gate) are `status: accepted`. An approximation and its Draft PR are **input evidence and starting base for Discovery, Specification, and Construction**, never a bypass around them.

---

## When to Use This Skill

Use this skill when a Designer + Agent pair wants to:

1. Build or refine a working component/pattern approximation in `nimbus-design-system` or `nimbus-patterns` across:
   - **Path B (Internal Morphology via `useTheme`):** Keeping the exact same public API and DOM semantics while conditioning internal layout, density, or sub-element structure strictly under `next-norteui` and `next-norteui-dark`.
   - **Path C (Opt-In Prop / Variant Refinement):** Adding a backward-compatible optional prop or variant value to an existing component where `base`, `dark`, `next`, and `next-dark` default behavior remains 100% invariant.
   - **Path D (Coexisting `/next` Redesign):** Creating a structurally or behaviorally redesigned component under `packages/react/src/next/<Component>/src/` that ships through the aggregate subpath export (`@nimbus-ds/components/next` or `@nimbus-ds/patterns/next`).
2. **Package a completed slice from a live Admin preview session (`NIMBUS_LOCAL=true`) into a Draft PR + GitHub Issue** so the formal Nimbus contribution process (`nimbus-process`) uses the Draft PR as its base for formal construction.

Do **not** use this skill for pure token value changes in `@nimbus-ds/tokens` / `@nimbus-ds/styles` (use `nimbus-next-token-studio`) or for adopting components inside `services-new-admin` views (use `nimbus-next-admin-adoption`).

---

## Architectural & Styling Rules

### 1. Path Precedence & Exact Theme Matching for Path B

Always evaluate the lightest path first (**Path A → Path B → Path C → Path D**):

- If the visual change can be achieved purely by tokenizing a hardcoded CSS property in `packages/core/styles` with identical values on `base`/`dark`/`next`/`next-dark`, use **Path A** (`nimbus-next-token-studio`).
- If using **Path B** (`useTheme` inside an existing component), compare **exact theme identifiers**:
  ```tsx
  const { currentTheme } = useTheme();
  const isNorteUi =
    currentTheme === "next-norteui" || currentTheme === "next-norteui-dark";
  ```
  **Never** match `"next"` by prefix (`currentTheme.startsWith("next")`), because `next` and `next-dark` are active in production premium-plan navigation menus and must remain 100% invariant.

### 2. Styling Rule for Path D (`/next`): Compose `@nimbus-ds/styles` Primitives by Default

When building a Path D component under `packages/react/src/next/<Component>/src/`:

- **Default approach (no `.css.ts` needed):** Compose `@nimbus-ds/styles` primitives (`Box`, `Text`, `sprinkles`, and `vars.*` semantic tokens) directly in `.tsx`. Most layout, spacing, radius, color, and typography changes in Norte UI require **zero** custom `.css.ts` files.
- **Safety-net approach (local `<component>.css.ts`):** When pseudo-elements, complex selectors, keyframe animations, or layout rules cannot be expressed with `Box` or `sprinkles`, create a **component-local** Vanilla Extract stylesheet at `packages/react/src/next/<Component>/src/<component>.css.ts` importing `vars` from `@nimbus-ds/styles`.
- **Prohibited:** A Path D component approximation **must never** edit `packages/core/styles/**` to add component-specific styles (`subcomponents/`). Keeping styles local to `packages/react/src/next/<Component>/src/` prevents cross-package bottlenecks and merge conflicts across parallel component tracks.

### 3. Zero-Shared-Files Rule for Parallel Tracks (Decision `0082`)

So that multiple Designers and Engineers can work on different components in parallel with **zero git merge conflicts**, an `approx/*` branch **must only stage files inside the target component's folder** (`packages/react/src/next/<Component>/**` for Path D, or `packages/react/src/{atomic,composite}/<Component>/**` for Paths B/C).

**Never hand-edit or commit any of these shared aggregate or generated files on an `approx/*` branch:**

- `packages/react/src/next/index.ts` (auto-generated by `yarn generate:next-index`)
- `packages/react/src/index.ts`
- `packages/react/package.json`
- `packages/react/CHANGELOG.md` (if a changelog note is drafted, keep it local at `packages/react/src/next/<Component>/CHANGELOG.md`)
- `nimbus-source-map.yml`
- `**/*.docs.json`

Also, **never** create a per-component `packages/react/src/next/<Component>/package.json`. Next-generation components ship exclusively through the aggregate `@nimbus-ds/components/next` and `@nimbus-ds/patterns/next` subpath exports (Decision `0082`).

---

## Execution Modes

During interactive exploration in a live preview (`NIMBUS_LOCAL=true`), follow [Visual Iteration vs. Formal Closure](../nimbus-admin-live-preview/SKILL.md#visual-iteration-vs-formal-closure): apply the smallest component source change, let Vite Fast Refresh update the preview, and return control for manual visual confirmation by the designer (inspecting the browser automatically only on explicit request). Run Steps 3–4 (base-invariance check, 6-theme visual evidence, Draft PR, and GitHub Issue creation) at **formal closure** when the user asks to formalize or hand off the slice.

---

## Step-by-Step Workflow

### Step 1 — Inspect Working Tree & Separate Mixed Live-Admin Session Changes

When transitioning from a live Admin preview session (`NIMBUS_LOCAL=true`) to formal submission, inspect the git working tree in `nimbus-design-system` (and/or `nimbus-patterns`):

```bash
git status --short
```

1. **Separate Path A tokens from Path B/C/D component changes:**
   - If the session modified **both** token/theme files (`packages/core/tokens/**`, `packages/core/styles/**`) and component files (`packages/react/src/**`), do **not** bundle them into the same branch.
   - Commit and hand off the Path A token/theme updates on their own branch using `nimbus-next-token-studio`, and keep each component approximation isolated on its own `approx/next-<component-kebab>-<short-slug>` branch (one component slice per Draft PR + Issue).
2. **Clean up generated or shared files before staging:**
   ```bash
   git checkout -- packages/react/src/next/index.ts nimbus-source-map.yml 2>/dev/null || true
   git restore --source=HEAD --staged --worktree -- '**/*.docs.json' 2>/dev/null || true
   git clean -f -- '**/*.docs.json' 2>/dev/null || true
   ```

### Step 2 — Classify & Author/Verify the Component Approximation (Path B, C, or D)

- **Choose Path B** if all existing props, types, defaults, and DOM semantics stay identical and the component only adjusts internal rendering under `currentTheme === "next-norteui" || currentTheme === "next-norteui-dark"`.
- **Choose Path C** if all existing props keep their exact types, defaults, and DOM semantics, and the new Norte UI behavior is behind an optional prop or new variant value with zero change to default `base`/`dark`/`next`/`next-dark` rendering.
- **Choose Path D** if any existing prop is removed, renamed, or has a new default; if DOM structure or keyboard/focus behavior changes incompatibly; or if the component is a clean-slate redesign under `packages/react/src/next/<Component>/src/`:
  - `packages/react/src/next/<Component>/src/<Component>.tsx` (calling `useNextThemeWarning("<Component>")` from `@nimbus-ds/styles`)
  - `packages/react/src/next/<Component>/src/<component>.types.ts`
  - `packages/react/src/next/<Component>/src/<component>.stories.tsx` (titled `Next/<Component>`)
  - Optional local `packages/react/src/next/<Component>/src/<component>.css.ts`
  - `packages/react/src/next/<Component>/src/index.ts`

### Step 3 — Run Barrel Generation, Base-Invariance Gate, and Visual Evidence Check

1. If working on Path D, run `yarn generate:next-index` locally to test compilation (then restore `packages/react/src/next/index.ts` before committing if tracked).
2. Run base-invariance verification:
   ```bash
   yarn check:base-invariance
   ```
   Confirm `0` diffs on `base`, `dark`, `next`, and `next-dark`.
3. Capture visual evidence across all **6 themes** in Storybook (`base`, `dark`, `next`, `next-dark`, `next-norteui`, and `next-norteui-dark`) and/or screenshots from the live Admin preview (`services-new-admin` with `NIMBUS_LOCAL=true`).

### Step 4 — Formal Handoff: Push `approx/*` Branch, Open Draft PR & Create GitHub Issue

Per Decisions `0001`, `0014`, and `0083`, `nimbus-next-component-approximation` **must never merge directly to `master`**. Instead, it opens an **unmerged Draft Pull Request** on the `approx/*` branch and records it inside a **GitHub Issue** so the formal contribution agent uses the Draft PR as its starting base:

#### 1. Commit and push the `approx/*` branch

- Branch naming convention: `approx/next-<component-kebab>-<short-slug>` (for example, `approx/next-button-norte-density`).
- Stage only the target component files and verify via `git status` that no prohibited shared files (`packages/react/src/next/index.ts`, `packages/react/package.json`, `packages/react/CHANGELOG.md`, `nimbus-source-map.yml`, `*.docs.json`) are staged:
  ```bash
  git checkout -b approx/next-<component-kebab>-<short-slug>
  git add <target-component-directory>
  git commit -m "approx(next): <Component> <short-summary>"
  git push -u origin approx/next-<component-kebab>-<short-slug>
  COMMIT_SHA=$(git rev-parse HEAD)
  ```

#### 2. Open the Draft Pull Request (`gh pr create --draft`)

Open a **Draft PR** against `master` so CI and Storybook Preview run and the formal construction agent has the exact diff and branch as its base:

```bash
gh pr create --draft \
  --base master \
  --head "approx/next-<component-kebab>-<short-slug>" \
  --title "approx(next): <Component> — <short summary> [Approximation Base]" \
  --body "$(cat <<'EOF'
> [!IMPORTANT]
> **Unmerged Designer + Agent Approximation Base (`Decision 0083`)**
> This Draft PR was created from a Norte UI approximation session to serve as the **code and Storybook Preview base** for the formal Nimbus contribution process. **Do not mark Ready or merge directly** — the formal Construction stage will produce the hardened implementation, `.spec.md` contract, and `.spec.tsx` acceptance tests from the linked Issue.

## Summary
- **Component / Pattern**: `<Component>`
- **Classification Path**: `Path B` | `Path C` | `Path D`
- **Target Surface**: `<packages/react/src/...>`
- **Commit SHA**: `<40-char-immutable-sha>`

## Proposed Contract Delta
- <Summary of visual/morphological adjustments, added/removed/changed props, or DOM structure>

## Visual Evidence
- <6-theme Storybook verification and/or live Admin (`NIMBUS_LOCAL=true`) screenshots>
EOF
)"
```

#### 3. Create (or update) the GitHub Issue with `## Nimbus evolution` and `### Approximation Reference` (`gh issue create`)

Create the intake GitHub Issue on the target repository (`TiendaNube/nimbus-design-system` or `TiendaNube/nimbus-patterns`) containing both the `## Nimbus evolution` context section (`ONB-1497`, `.github/aw/runtime/next_context.py`) and the canonical `### Approximation Reference` block so the automated Intake, Discovery, Specification, and Construction runtime (`.github/aw/runtime/stage_context.py`) extracts the evolution metadata and `approximation-reference.json` automatically:

```markdown
## Problem & Context

<Describe the Norte UI visual/interaction goal and the Admin screens where it was validated>

## Proposed Solution

<High-level summary of the component approximation>

## Nimbus evolution

- **Target generation**:
  - [ ] Current generation (`current`)
  - [x] Norte UI (`norte-ui`)
- **Proposed evolution paths**:
  - [ ] Not evaluated — help me choose (`not-evaluated`)
  - [ ] Path A — Style values only; same API and structure (`A`)
  - [ ] Path B — Internal structure changes under Norte UI; same API (`B`)
  - [ ] Path C — New optional prop or variant; existing defaults unchanged (`C`)
  - [ ] Path D — Incompatible API; separate /next component (`D`)
- **Approximation link**: <pr-url>

### Approximation Reference

- **Repository**: `<repository-owner>/<repository-name>` (e.g., `TiendaNube/nimbus-design-system` or `TiendaNube/nimbus-patterns`)
- **Branch**: `approx/next-<component>-<slug>`
- **Commit SHA**: `<40-char-immutable-sha>`
- **Draft PR**: `#<pr-number> (<pr-url>)`
- **Classification Path**: `Path B` | `Path C` | `Path D`
- **Target Surface**: `packages/react/src/next/<Component>` (or `packages/react/src/{atomic,composite}/<Component>`)
- **Visual Evidence**: <6-theme Storybook screenshots/Preview links covering `base`, `dark`, `next`, `next-dark`, `next-norteui`, `next-norteui-dark` and/or live Admin screenshots>
- **Proposed Contract Delta**: <Summary of added/removed/changed props, internal `useTheme` morphology, DOM changes, and keyboard/accessibility notes>
```

#### 4. Cross-link the Issue in the Draft PR

After `gh issue create` returns the Issue URL/number, append or comment `Intake Issue: #<issue-number>` on the Draft PR so both artifacts reference each other bidirectionally.

---

## Explicit Handoff to Formal Construction & Engineering

Once the Draft PR is open and the `### Approximation Reference` block is posted to the GitHub Issue, **hand off to the formal Nimbus Contribution Process / Nimbus Engineering**. Using the `approx/*` Draft PR and commit SHA as base evidence, the formal process (Discovery -> Specification -> Construction -> Validation -> Publication, Decisions `0001` and `0014`) owns:

- Reviewing and approving the `.spec.md` contract in the Issue before formal building
- `forwardRef` and polymorphic ref stability
- Full keyboard navigation, focus management, and WAI-ARIA compliance
- SSR / hydration safety and event handler contracts
- Complete `.spec.md` contract authoring and `.spec.tsx` unit/acceptance test suite
- Final PR publication and human validation gate approval
