---
# Nimbus Design System - Build Process Documentation

This document describes the current technical build process followed by Nimbus Design System.
---

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
