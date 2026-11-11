---
name: nimbus-next-admin-adoption
description: This skill should be used when a Designer + Agent pair asks to "adopt Norte UI in admin", "wire the NORTE_UI_NEXT feature flag in stratus", "create a next/<View>.tsx view in admin", or "audit admin CSS overrides for next-norteui theme compatibility".
---

# Nimbus Next Admin Adoption (`services-new-admin` / `stratus`)

This skill guides a **Designer + Agent** pair through adopting Norte UI (`next-norteui` theme, Path C opt-in props, and Path D `/next` components) inside the `admin` host application (`services-new-admin/packages/stratus`) behind the single feature flag (`NORTE_UI_NEXT`), as defined in the proposed Next-Generation Evolution Process (`processes/next-evolution/`, `status: draft`; Decision `0083`, `status: proposed`).

> **Governance status notice:** `processes/next-evolution/` is `status: draft`, and Decisions `0081`, `0082`, and `0083` are `status: proposed`. Treat this skill as part of the proposed Next-Generation Evolution rollout, not agreed permanent policy.

---

## When to Use This Skill

Use this skill when adopting already-published `@nimbus-ds/styles`, `@nimbus-ds/components`, and `@nimbus-ds/patterns` Norte UI capabilities in `admin` (`services-new-admin/packages/stratus`):

- Wiring or reading the single `NORTE_UI_NEXT` feature flag in `stratus` views.
- Toggling Path C opt-in props based on `NORTE_UI_NEXT`.
- Creating a coexisting `next/<View>.tsx` file for a view that adopts Path D components from `@nimbus-ds/components/next` and `@nimbus-ds/patterns/next`.
- Auditing and removing hardcoded hex colors or fragile class-name CSS overrides in `admin` that conflict with `next-norteui` / `next-norteui-dark`.

Do **not** use this skill to modify Nimbus packages themselves (use `nimbus-next-token-studio` or `nimbus-next-component-approximation` in the Nimbus repositories).

---

## Non-Negotiable Safety Rules in `admin`

### 1. Single Feature Flag (`NORTE_UI_NEXT`)

All new Norte UI adoption in `admin` is gated behind the single store-tag feature flag `NORTE_UI_NEXT` (defined in `packages/stratus/src/App/featuresFlags.ts` and read via `useHasTags([NORTE_UI_NEXT])`, with the sole pre-existing production exceptions documented in Rule 2 below):

- **Flag OFF (`NORTE_UI_NEXT = false`):** The shell (`packages/stratus/src/App/App.tsx`) renders under the legacy `base` / `dark` theme and mounts the untouched legacy `<View>.tsx` components (while the pre-existing `MenuWithSpotlight` and `ProfileMenu` subtrees continue using their local `<ThemeProvider theme="next">` providers for `isPremiumPlan` stores as they already do in production). Visual and behavioral output with the flag OFF must remain **100% identical** to current production.
- **Flag ON (`NORTE_UI_NEXT = true`):** The shell activates `<ThemeProvider theme="next-norteui">` (from `@nimbus-ds/styles`, or `next-norteui-dark`) and routes adopted views to their `next` variant or Path C opt-in props.

### 2. Protect Existing `theme="next"` Consumers in `stratus`

Two components in `services-new-admin/packages/stratus` are pre-existing production exceptions that already consume a local `<ThemeProvider theme="next">` today when `isPremiumPlan` (`isNext || isEvolucion` in `packages/stratus/src/App/components/Menu/hooks/useMenuTheme.ts`) is true (even when `NORTE_UI_NEXT = false`):

- `MenuWithSpotlight` (`packages/stratus/src/App/components/Menu/components/MainMenu/components/MenuWithSpotlight/MenuWithSpotlight.tsx` — used across `MainMenu.tsx`, `BillingMenu.tsx`, `HelpMenu.tsx`, `AccountMenu.tsx`, and `SettingsMenu.tsx`)
- `ProfileMenu` (`packages/stratus/src/App/components/Topbar/components/ProfileMenu/ProfileMenu.tsx`)

Never break, remove, or regress these existing `theme="next"` integrations when wiring the global `NORTE_UI_NEXT` shell provider, and never switch them to `next-norteui`. With `NORTE_UI_NEXT = true` their local `theme="next"` provider still applies inside the `next-norteui` shell; how they should look then is not defined, so report what you see instead of changing it. Verify both components visually with `NORTE_UI_NEXT` both OFF and ON.

### 3. Legacy `<View>.tsx` Invariance & `FAST_REFRESH_SAFE` Rules for Path D View Duplication

When a view adopts Path D components (`@nimbus-ds/components/next` or `@nimbus-ds/patterns/next`) whose prop contracts differ from legacy Nimbus:

- Keep the existing `<View>.tsx` **untouched** for `NORTE_UI_NEXT = false` (`base` / `dark`).
- Create a coexisting `next/<View>.tsx` file for `NORTE_UI_NEXT = true` (`next-norteui` / `next-norteui-dark`) that imports redesigned components from `@nimbus-ds/components/next` and `@nimbus-ds/patterns/next`.
- Follow `packages/stratus/agents/skills/stratus-fast-refresh.md` (`FAST_REFRESH_SAFE`): export **React components only** from `next/<View>.tsx` (`COMPONENT_ONLY_EXPORTS`), use **direct imports** (`DIRECT_IMPORTS_ONLY`), and never add `export *` (`NO_EXPORT_STAR`) or barrel `index.ts` files (`NO_BARRELS`).
- Switch between `<View>` and `next/<View>` at the route (`RoutesWeb.tsx` AND `RoutesMobile.tsx`) or view entry point using `useHasTags([NORTE_UI_NEXT])`.
- Why: duplicating the view file keeps legacy `base` completely safe from regressions and makes later cleanup a trivial file move + flag removal once `NORTE_UI_NEXT` reaches 100% rollout.

---

## Step-by-Step Workflow

### Step 1 — Audit the Target View in `stratus`

1. Inspect the target view in `services-new-admin/packages/stratus/src/`.
2. List every Nimbus component and pattern imported by the view and check whether each uses:
   - **Path A / Path B:** Automatic when `NimbusThemeProvider theme="next-norteui"` is active at the shell level.
   - **Path C:** Same import (`@nimbus-ds/components` or `@nimbus-ds/patterns`), opt-in prop toggled by `NORTE_UI_NEXT`.
   - **Path D:** Redesigned import (`@nimbus-ds/components/next` or `@nimbus-ds/patterns/next`), requiring `next/<View>.tsx`.
3. Audit any local `.css.ts`, `.scss`, or inline `style` overrides in the `stratus` view for hardcoded hex colors, pixel magic numbers, or internal `.nimbus-*` class selectors.

### Step 2 — Apply Path C Prop Toggling or Path D View Duplication

- **If the view only uses Path A/B/C changes:**
  - Read the `NORTE_UI_NEXT` flag via the `stratus` feature-flag hook.
  - Pass Path C opt-in props conditionally only when `isNorteUiNextEnabled` is `true`, leaving the `false` branch identical to current production.
- **If the view adopts Path D (`/next`) components:**
  - Leave `<View>.tsx` untouched.
  - Create `next/<View>.tsx` alongside `<View>.tsx`.
  - In `next/<View>.tsx`, import Path D components from `@nimbus-ds/components/next` and `@nimbus-ds/patterns/next` (and unchanged components from `@nimbus-ds/components` / `@nimbus-ds/patterns`).
  - Keep all business callbacks, data hooks, analytics events, and permission checks identical to `<View>.tsx` — change only the UI presentation and Nimbus prop mapping.

### Step 3 — Clean Up Fragile Local CSS Overrides

In `next/<View>.tsx` (or token-based styles):

- Replace hardcoded colors and spacing overrides with `Box` / `Text` props (imported from `@nimbus-ds/components`) or `themeVars.*` semantic tokens (imported from `@nimbus-ds/styles >= 9.71.0` or under `NIMBUS_LOCAL=true`; when targeting `@nimbus-ds/styles <= 9.70.0`, retain `Box` / `Text` props or `--nimbus-*` CSS custom properties until `@nimbus-ds/styles` is upgraded) so the view adapts cleanly to both `next-norteui` and `next-norteui-dark`.
- Check global overrides in `packages/stratus/src/styles/_nimbus_temp.scss` (e.g., hardcoded `white` / `#fafafa` table/input backgrounds or `[class^='nimbus-']` selectors) to ensure they do not bleed over `next-norteui` / `next-norteui-dark` surfaces when `NORTE_UI_NEXT = true`.
- Do not alter stylesheets used by the legacy `<View>.tsx` when `NORTE_UI_NEXT = false`.

### Step 4 — Verify Flag OFF vs. Flag ON

1. Test the view with **`NORTE_UI_NEXT = false`**:
   - Confirm zero visual or functional diff on `base` and `dark`.
   - Confirm `MenuWithSpotlight` and `ProfileMenu` still render properly.
2. Test the view with **`NORTE_UI_NEXT = true`**:
   - Confirm the view renders with `next-norteui` and `next-norteui-dark` themes and the intended Norte UI components/props.
   - Run the view's existing unit/integration tests in `stratus`.

---

## Explicit Handoff Triggers to Engineering

The Designer + Agent envelope in `admin` covers **presentation-layer wiring, view duplication (`next/<View>.tsx`), and CSS override cleanup**. Stop and hand off to **Admin / Frontend Engineering** whenever the adoption requires:

1. **Business logic or state mutations:** Changing form validation rules, Redux/Zustand/context state machines, or domain calculations.
2. **GraphQL / REST data wiring:** Modifying API queries, mutations, payload shapes, pagination cursors, or error-recovery flows.
3. **Permissions, billing, or routing guards:** Altering merchant plan checks, role-based access control, or navigation guards.
4. **Lockstep dependency upgrades:** Resolving version conflicts or updating lockstep `@nimbus-ds/styles`, `@nimbus-ds/components`, and `@nimbus-ds/patterns` versions across `services-new-admin` workspaces.
5. **Test suite failures in business flows:** Fixing or rewriting complex behavioral integration or Cypress/Playwright end-to-end tests beyond presentation selectors.
