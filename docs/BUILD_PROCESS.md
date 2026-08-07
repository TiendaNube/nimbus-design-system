![Nimbus](https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png)

# Build Process

## Overview

The Nimbus Design System utilizes a modular build architecture powered by Webpack and Yarn. Our build script is responsible for generating optimized distribution files for multiple projects, including:

- `@nimbus-ds/tokens`
- `@nimbus-ds/icons`
- Components (`atomic` and `composite`)
- Core packages (`@nimbus-ds/react`, `@nimbus-ds/styles`, `@nimbus-ds/webpack`, etc.)

## Build Process Steps

### 1. Run the build command

Initiate the build process by running:

```bash
yarn build
```

This command will sequentially execute the build process for each Nimbus project.

---

### 2. Project builds

The build process iteratively compiles the following types of projects:

- **Tokens and Icons**: Exports the fundamental design assets.
- **Components**: Generates distributable files (`.js`, `.d.ts`, `.css`) for each atomic and composite component, ensuring they are modular, tree-shakeable, and framework-agnostic.
- **Packages**: Creates reusable packages that provide core functionality and utilities, such as React integration, shared styles, and Webpack configurations.

---

### 3. Generated documentation artifacts

`yarn build:docs` (`.scripts/json-documentation.ts`) runs the `Docgen` from
`@nimbus-ds/scripts` over every `*.types.ts` under `packages/react/src/*/*/src/` and writes:

- `<componentId>.docs.json` next to each component (e.g.
  `packages/react/src/atomic/Title/src/title.docs.json`) — tracked in git
- the bundle `packages/react/dist/components-props.json` — under the gitignored `dist`, so
  it is only ever a local/CI build output

These files are **generated, never hand-written**. Each `*.docs.json` is assembled from three
inputs, which is worth knowing when a diff surprises you:

| Field in the JSON                                       | Comes from                                                     |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| `props`, `totalProps`                                   | the `ComponentNameProperties` interface in `*.types.ts`        |
| polymorphic entries in `props`                          | the `PolymorphicForwardRefComponent<…>` signature in `*.tsx`   |
| `version`                                               | the `version` field of that component package's `package.json` |
| `id`, `name`, `packageName`, `docLink`, `subComponents` | the component's path and folder layout                         |

Note the `version` input: a release bump changes every affected `*.docs.json` without any
type change at all. That is why the release PR carries both.

The tracked `*.docs.json` files are committed to the repo, but CI owns those commits:

| Workflow                     | What it does with `*.docs.json`                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| `pull-request.yml`           | Runs `yarn build:docs` to validate docgen succeeds. The diff is discarded.         |
| `publish.yml`                | Regenerates on `master` and includes `**/*.docs.json` in the automated release PR. |
| `generate-documentation.yml` | Manual dispatch: regenerates and commits directly to `master`.                     |

Therefore **do not commit `*.docs.json` in a feature PR**. If a local `yarn build` leaves
them dirty, revert before committing:

```bash
git restore --source=HEAD --staged --worktree -- '**/*.docs.json'
git clean -f -- '**/*.docs.json'
```

The second line matters when you added a **new** component: its `*.docs.json` did not exist
before, so it is untracked and `restore` alone leaves it behind for `git add -A` to pick up.

Committing them by hand conflicts with the release PR that touches the same paths, and
`publish.yml` lists `**/*.docs.json` under `paths-ignore` — a push touching only ignored
paths never triggers `publish-release` (see `RELEASE_PROCESS.md`).

---

## Webpack Configuration

The Nimbus build architecture heavily relies on a centralized and extendable Webpack configuration package (`@nimbus-ds/webpack`). This package provides common logic, plugins, rules, and utilities that serve as the base for all other Nimbus projects and external repositories (like `@nimbus-ds/patterns`).

### Key Plugins and Utilities

Apart from standard minification utilities (TerserJS, CSS minifiers/extractors), the following plugins play a crucial role in the Nimbus build process:

#### 1. `dtsBundleGeneratorPlugin`

Utilizes [dts-bundle-generator](https://github.com/timocov/dts-bundle-generator) to bundle TypeScript declaration files:

- Iteratively processes input `.ts` files.
- Outputs unified `.d.ts` files (`index.d.ts`), simplifying TypeScript type distribution.

#### 2. `MoveFilesIntoDistFolderPlugin`

Webpack plugin to relocate and optionally transform files into the output (`dist`) folder after the build:

- Moves important metadata files such as:
  - `README.md`
  - `CHANGELOG.md`
- Optionally transforms `package.json` content before outputting (by default, transforms are performed in-place).

#### 3. `UseClientInjectionPlugin`

Specialized Webpack plugin for client-side component hydration:

- Checks if the component’s main `index.ts` file includes a non-comment `'use client'` directive.
- Automatically injects `'use client';` directive into the beginning of the compiled asset.
- Recommended usage:
  - If your component requires browser APIs, explicitly include `'use client'` at the top of the main component file (`index.ts`).

---

## Modular Component Export and Tree Shaking

To maximize compatibility, efficiency, and tree shaking, Nimbus components export modular builds alongside traditional package-level entry points:

- **Example:**

If you have a component located at:

```
src/atomic/Box
```

The build process generates the following outputs:

```
dist/index.js              # Common entry for importing multiple components
dist/Box/index.js          # Modular import entry
```

- **Usage:**

This enables direct imports for better tree shaking in client-side libraries:

```typescript
import Box from "@nimbus-ds/components/Box"; // Recommended
```

and also:

```typescript
import { Box } from "@nimbus-ds/components";
```

- **Configuration:**

This modular export pattern is enabled and controlled within `webpack.config.ts` located in package-specific folders, such as `packages/react`.

---

## Customizability and Extensibility

All plugins and configurations mentioned above are highly customizable and extensible through the base `@nimbus-ds/webpack` configuration. Projects can easily extend or override these defaults as per specific needs.

---

## External Repositories Integration

Nimbus Design System is structured to support integration with external repositories, like `@nimbus-ds/patterns`. Such repositories typically use Nimbus's Webpack setup (`@nimbus-ds/webpack`) as their foundational configuration.

---
