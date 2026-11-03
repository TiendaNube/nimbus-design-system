# Nimbus Design System — agent instructions

Canonical agent brief for Claude Desktop, Claude Code, Codex Desktop, Cursor, and any other agent working in `nimbus-design-system`. `CLAUDE.md` points here so instructions do not drift apart.

## Project rules

Shared rules live in `.cursor/rules/*.mdc` and apply to every agent, not just Cursor.

Always read these two — they are `alwaysApply: true`:

| Rule file                  | Covers                |
| -------------------------- | --------------------- |
| `nimbus-design-system.mdc` | Repo-wide conventions |
| `code.mdc`                 | General code style    |

Read these when you touch the matching files, **before** editing:

| Rule file                    | Applies to                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `types.mdc`                  | `**/*.types.ts`                                                                           |
| `package-json.mdc`           | `**/package.json`                                                                         |
| `changelogs.mdc`             | `**/CHANGELOG.md`                                                                         |
| `components-base-config.mdc` | `**/react/**/webpack.config.ts`, `**/react/**/tsconfig.json`                              |
| `generated-files.mdc`        | `**/*.docs.json`                                                                          |
| `versioning.mdc`             | `.yarn/versions/*.yml`, component source under `packages/react/src/{atomic,composite}/**` |

Read these when the **task** matches, regardless of which files are open (they have no
globs — the trigger is what you are doing):

| Rule / Skill file                                             | Read it when                                                                                                                                                                       |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components.mdc`                                              | Creating or modifying a React component                                                                                                                                            |
| `icon-creation.mdc`                                           | Creating, renaming, editing or deleting **any** SVG icon. Mandatory: icons live only in `packages/icons/src/assets`, and the flow includes updating `packages/icons/CHANGELOG.md`. |
| `.agents/skills/nimbus-prototype/SKILL.md`                    | Creating, iterating, handing off, or closing a disposable Playground prototype.                                                                                                    |
| `.agents/skills/nimbus-admin-live-preview/SKILL.md`           | Connecting local `nimbus-design-system` / `nimbus-patterns` to `services-new-admin` (`NIMBUS_LOCAL=true`) for live preview of tokens, styles, and components.                      |
| `.agents/skills/nimbus-next-token-studio/SKILL.md`            | Adding or updating `next-norteui` / `next-norteui-dark` tokens in `@nimbus-ds/tokens` or `@nimbus-ds/styles` (Path A).                                                             |
| `.agents/skills/nimbus-next-component-approximation/SKILL.md` | Prototyping or refining a Path C or Path D (`packages/react/src/next/<Component>`) component for Norte UI.                                                                         |
| `.agents/skills/nimbus-next-admin-adoption/SKILL.md`          | Adopting Norte UI themes, Path C props, or `@nimbus-ds/components/next` inside `services-new-admin` (`stratus`).                                                                   |

Process docs: `docs/CONTRIBUTING.md`, `docs/BUILD_PROCESS.md`, `docs/RELEASE_PROCESS.md`.

## Live Local Preview with Admin (`services-new-admin`)

To see local Nimbus changes reflected immediately in `services-new-admin` (`packages/stratus`) without publishing RC packages or editing `package.json`:

1. **Component `.tsx` changes (`packages/react/src/**`, including `/next`):** Resolved directly from source by Stratus Vite when `NIMBUS_LOCAL=true` (< 200ms Fast Refresh, no build required).
2. **Token (`.json`), Style (`.css.ts`), or new `/next` directory changes:** Run `yarn watch:admin` in this repo so `@nimbus-ds/tokens`, `@nimbus-ds/styles`, and `packages/react/src/next/index.ts` rebuild incrementally.
3. **In `services-new-admin`:** Start with `NIMBUS_CORE_PATH="<abs-path-to-this-repo>" yarn start:front:nimbus` (or `yarn start:dev:nimbus`). Always pass `NIMBUS_CORE_PATH` explicitly when working inside a Claude Desktop (`.claude/worktrees/...`) or Codex Desktop (`~/.codex/worktrees/...`) worktree.

Full workflow in `.agents/skills/nimbus-admin-live-preview/SKILL.md`.

## Never hand-edit or commit generated files

`*.docs.json` files are generated by `yarn build:docs` (from `*.types.ts`, the component
`.tsx` and the package `version`), and CI is what commits them. If a local build leaves them
modified, revert before committing:

```bash
git restore --source=HEAD --staged --worktree -- '**/*.docs.json'
git clean -f -- '**/*.docs.json'
```

Both lines are needed: `restore` only handles tracked files, so a brand-new component's
freshly generated `*.docs.json` is untracked and would still be picked up by `git add -A`.

Full rationale in `.cursor/rules/generated-files.mdc`.

## Never bump versions manually

Versions come from `yarn version` deferred files in `.yarn/versions/*.yml`, applied by the
release pipeline. Do not edit `version` in any `package.json`. Document the change in the
package's `CHANGELOG.md`.

## A component change always releases `@nimbus-ds/components` too

If you change **published** component source under `packages/react/src/atomic/**` or
`packages/react/src/composite/**` — `*.ts`, `*.tsx`, `*.css.ts`, but **not** `*.spec.*`,
`*.stories.tsx` or `*.docs.json`, which are never published — the deferred version file must
declare the component package **and** `@nimbus-ds/components` (the aggregate at
`packages/react`) at the same or higher bump level:

```yaml
releases:
  "@nimbus-ds/title": minor
  "@nimbus-ds/components": minor # required — nothing infers this for you
```

`yarn bump:check` cannot detect this: `packages/react/package.json` does not depend on the
component workspaces, it bundles their sources via webpack, so Yarn has no dependency edge to
follow. Nothing in lint or the git hooks catches it either — the only guard is the
`Missing @nimbus-ds/components Release` CodeRabbit pre-merge check (`error` mode), and that
runs after you already opened the PR. Forgetting it publishes the component while
`@nimbus-ds/components` consumers get nothing. Also add the entry to
`packages/react/CHANGELOG.md`, not only the component's.

Full rationale in `.cursor/rules/versioning.mdc`.

Caveat worth remembering: `publish.yml` lists `**/package.json`, `.yarn/versions/**` and
`**/*.docs.json` under `paths-ignore`, so a push to `master` touching **only** those paths
never triggers `publish-release`. Pair a forgotten version file with a non-ignored change.

## Common commands

```bash
yarn build          # full build (tokens, icons, components, packages, docs)
yarn build:docs     # regenerate *.docs.json only
yarn watch:admin    # watch tokens, styles & /next index for live Admin preview
yarn lint           # eslint over packages
yarn test           # jest
yarn types:check    # tsc --noEmit
yarn storybook      # local storybook on :6006
```
