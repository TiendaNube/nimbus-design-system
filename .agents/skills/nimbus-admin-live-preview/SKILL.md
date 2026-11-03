---
name: nimbus-admin-live-preview
description: This skill should be used when a Designer + Agent pair asks to "connect local Nimbus with Admin", "preview local Nimbus changes in Admin", "run Admin with local Nimbus", "test token or component changes live in Stratus", or "iterar en vivo entre Nimbus y el Admin".
---

# Nimbus ↔ Admin Live Local Preview (`NIMBUS_LOCAL=true`)

This skill guides a **Designer + Agent** pair (in **Claude Desktop**, **Codex Desktop**, Cursor, or CLI) through connecting local checkouts or git worktrees of `nimbus-design-system` and `nimbus-patterns` directly to `services-new-admin` (`packages/stratus`) so component, pattern, style, and token edits reflect live in the Admin browser without publishing RC packages or mutating `package.json` / `yarn.lock`.

> **Governance status notice:** `processes/next-evolution/` is `status: draft`, and Decisions `0081`, `0082`, and `0083` are `status: proposed`. Treat this skill as part of the proposed Next-Generation Evolution rollout, not agreed permanent policy.

---

## When to Use This Skill

Use this skill whenever a Designer or Engineer wants to:

- Preview local `nimbus-design-system` or `nimbus-patterns` changes (Base, Path A tokens, Path B styles, Path C props, or Path D `/next` components) directly inside the real `services-new-admin` (`stratus`) interface.
- Connect an isolated **Claude Desktop** (`.claude/worktrees/...`) or **Codex Desktop** (`~/.codex/worktrees/...`) worktree of Nimbus to a local Admin instance.
- Iterate dynamically on Norte UI (`next-norteui` / `next-norteui-dark`) tokens, styles, and components with live Vite HMR.

---

## Architecture & Safety Guarantees

1. **Zero `package.json` / `yarn.lock` mutations:**
   - Never run `yarn link` or edit `package.json` in `services-new-admin` to point to local file paths.
   - Instead, `packages/stratus/vite.nimbus-local.ts` activates only when `NIMBUS_LOCAL=true` is passed in the environment, keeping the git working tree in `services-new-admin` 100% clean.
2. **Direct TypeScript Source Resolution (< 200ms HMR):**
   - `vite-plugin-nimbus-local` reads all `@nimbus-ds/*` component and pattern paths from `<NIMBUS_CORE_PATH>/tsconfig.json` and `<NIMBUS_PATTERNS_PATH>/tsconfig.json` (including `@nimbus-ds/components/next` and `@nimbus-ds/patterns/next`) and compiles their `.tsx` sources on the fly.
   - Contextual `@common` imports resolve automatically to `nimbus-design-system` or `nimbus-patterns` depending on the importing file.
3. **Single React 18 Instance (No Hook Crashes in Worktrees):**
   - All bare runtime imports (`react`, `react-dom`, `@floating-ui/react`, `lexical`, `@dnd-kit/*`, etc.) inside external Nimbus files are resolved through `packages/stratus/node_modules`.
   - This prevents React 19 (Nimbus) vs. React 18 (Stratus) `Invalid hook call` errors and works even inside fresh Claude Desktop / Codex Desktop git worktrees.

---

## Step-by-Step Workflow

### Step 0 — Verify or Bootstrap Local Admin Environment (`./admin setup`)

If this is the Designer's first time running `services-new-admin` locally (i.e. `node_modules/`, `packages/stratus/.env`, or `packages/common/dist` does not exist yet in `<ADMIN_PATH>`), run the repository's setup script first:

```bash
cd "<ADMIN_PATH>"
./admin setup
```

What `./admin setup` automates:

- Checks/activates the required Node.js version (`v24`) via `nvm` (from `.nvmrc`).
- Verifies `yarn`, generates `packages/stratus/.env` and `packages/cirrus/.env`, runs `yarn install`, builds `@tiendanube/common`, and checks VPN connectivity.

### Step 1 — Discover Local Paths (Including Claude Desktop & Codex Desktop Worktrees)

Before starting any server, determine the absolute paths on disk for:

1. **`NIMBUS_CORE_PATH`**: The active `nimbus-design-system` checkout or worktree the designer is editing.
2. **`NIMBUS_PATTERNS_PATH`**: The active `nimbus-patterns` checkout or worktree (if applicable).
3. **`ADMIN_PATH`**: The local `services-new-admin` repository (typically `../services-new-admin` or `~/tiendanube/services-new-admin`).

> **Important for Claude Desktop / Codex Desktop worktrees:** If your current working directory is inside `.claude/worktrees/<id>`, `~/.codex/worktrees/<id>`, or `~/orca/workspaces/...`, always pass `NIMBUS_CORE_PATH="$(pwd)"` (or the worktree's absolute path) explicitly when launching Admin so Vite resolves the exact worktree being edited rather than the default `~/tiendanube/nimbus-design-system` clone.

### Step 2 — Start `yarn watch:admin` in `nimbus-design-system` (When Editing Tokens, `.css.ts` Styles, or Adding `/next` Folders)

- **If only editing existing `.tsx` files** in `packages/react/src/**`: **No build or watcher is required in Nimbus.** Vite compiles `.tsx` files directly with instant Fast Refresh.
- **If editing tokens (`.json`), Vanilla Extract styles (`.css.ts`), or creating new `/next` component folders:** Start the lightweight Admin watcher in `nimbus-design-system`:

```bash
cd "<NIMBUS_CORE_PATH>"
yarn watch:admin
```

What `yarn watch:admin` does:

- Ensures `packages/core/tokens/dist/index.js` and `packages/core/styles/dist/index.js` exist on startup.
- Watches `packages/core/styles/src/**/*` and runs a fast incremental `@nimbus-ds/styles` build (`NIMBUS_SKIP_DTS=true` + `transpileOnly`) when `.css.ts` files change.
- Watches `packages/core/tokens/src/**/*.json` and rebuilds `@nimbus-ds/tokens` + `@nimbus-ds/styles` when token JSON files change.
- Watches `packages/react/src/next` and auto-updates `packages/react/src/next/index.ts` when new `/next` components are added.

_(If adding new `/next` pattern folders in `nimbus-patterns`, you can also run `yarn watch:admin` in `<NIMBUS_PATTERNS_PATH>`.)_

### Step 3 — Start Admin (`services-new-admin`) with `NIMBUS_LOCAL=true`

In `services-new-admin` (`<ADMIN_PATH>`), run:

```bash
# If Cirrus BFF is already running (or only restarting Stratus frontend):
cd "<ADMIN_PATH>"
NIMBUS_CORE_PATH="<NIMBUS_CORE_PATH>" \
NIMBUS_PATTERNS_PATH="<NIMBUS_PATTERNS_PATH>" \
yarn start:front:nimbus

# Or to start the full stack (common + cirrus + stratus) from scratch:
cd "<ADMIN_PATH>"
NIMBUS_CORE_PATH="<NIMBUS_CORE_PATH>" \
NIMBUS_PATTERNS_PATH="<NIMBUS_PATTERNS_PATH>" \
yarn start:dev:nimbus
```

Confirm that the Vite startup output shows the live bridge banner pointing to the expected directories:

```text
🔗 [nimbus-local] Live local Nimbus bridge enabled:
   • nimbus-design-system: /abs/path/to/nimbus-design-system
   • nimbus-patterns:      /abs/path/to/nimbus-patterns
```

### Step 4 — Verify Theme & Iterate Live

| Layer edited in local Nimbus                                            | How Admin updates                                                                    | Typical latency |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------- |
| Component `.tsx` / `.ts` (`nimbus-design-system/packages/react/src/**`) | Direct Vite Fast Refresh (no Nimbus build)                                           | **< 200ms**     |
| Pattern `.tsx` / `.ts` (`nimbus-patterns/packages/react/src/**`)        | Direct Vite Fast Refresh (no Nimbus build)                                           | **< 200ms**     |
| Style `.css.ts` (`nimbus-design-system/packages/core/styles/src/**`)    | `yarn watch:admin` rebuilds `@nimbus-ds/styles` → Vite CSS HMR                       | **~5–8s**       |
| Token `.json` (`nimbus-design-system/packages/core/tokens/src/**`)      | `yarn watch:admin` rebuilds `@nimbus-ds/tokens` + `@nimbus-ds/styles` → Vite CSS HMR | **~8–10s**      |

To preview **Norte UI (`next-norteui` / `next-norteui-dark`)** in Admin:

- Ensure the active store in Admin has the `norte-ui` tag (`NORTE_UI_NEXT` feature flag in `packages/stratus/src/App/featuresFlags.ts`) so `ThemeManager` activates `<ThemeProvider theme="next-norteui">`.

### Step 5 — Formal Handoff When a Slice Is Complete (Draft PR + GitHub Issue)

When the Designer + Agent pair finishes iterating on a slice of their Nimbus update in the live Admin preview and wants to formalize it:

1. **Separate mixed changes first** (if both tokens and components were edited in the same session):
   - Keep `packages/core/{tokens,styles}` (Path A) separate from `packages/react/src/**` (Paths B, C, and D).
2. **For Path B, Path C, or Path D component/pattern updates (`nimbus-next-component-approximation`):**
   - Run `yarn check:base-invariance` in the Nimbus repository (`0` diffs on `base`, `dark`, `next`, `next-dark`).
   - Push the component approximation branch `approx/next-<component-kebab>-<short-slug>` (staging only the component directory, never shared aggregate files like `packages/react/src/next/index.ts` or `nimbus-source-map.yml`).
   - Open an **unmerged Draft Pull Request** (`gh pr create --draft`) on `approx/next-<component-kebab>-<short-slug>` so the formal construction agent has the exact diff and Storybook Preview as its starting base.
   - Open the intake **GitHub Issue** (`gh issue create`) containing the `### Approximation Reference` block (with `Repository`, `Branch`, `Commit SHA`, `Draft PR`, `Classification Path`, `Target Surface`, `Visual Evidence`, and `Proposed Contract Delta`).
   - Follow the complete step-by-step templates in [`nimbus-next-component-approximation`](../nimbus-next-component-approximation/SKILL.md).
3. **For Path A token/theme updates (`nimbus-next-token-studio`):**
   - Follow [`nimbus-next-token-studio`](../nimbus-next-token-studio/SKILL.md) to verify `yarn check:base-invariance` and commit on `feat/next-norteui-tokens-<short-slug>`.

### Step 6 — Disconnect Cleanly When Finished

To return Admin to its standard `node_modules` dependencies:

1. Stop the Admin dev server (`yarn stop` or `Ctrl+C`).
2. Run `yarn clean:front-cache && yarn start:front` in `services-new-admin`.
