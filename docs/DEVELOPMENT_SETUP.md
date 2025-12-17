# Development Setup Guide

This guide explains how to get the Nimbus Design System development environment running smoothly.

## Quick Start (New Contributors)

For new contributors or fresh clones, simply run:

```bash
yarn start:dev
```

**That's it!** The development setup is now intelligent and will:

1. 🔍 **Auto-detect** if foundational packages need building
2. 🔨 **Auto-build** missing packages (`@nimbus-ds/tokens`, `@nimbus-ds/icons`)
3. 🚀 **Start** the Storybook development server on `http://localhost:6006`

## Available Scripts

### `yarn start:dev`

**Recommended for development** - Intelligent setup that builds dependencies as needed and starts Storybook.

### `yarn setup:foundations`

**Build foundational packages only** - Useful for CI/CD or when you just want to ensure dependencies are built without starting the dev server.

### `yarn storybook`

**Direct Storybook start** - Only use this if you're sure all foundational packages are already built.

## Foundational Packages

The following packages must be built before development can begin:

- **`@nimbus-ds/tokens`** - Design tokens (colors, spacing, typography, etc.)
- **`@nimbus-ds/icons`** - Icon components and SVG assets

These are now handled automatically by the development setup scripts.

## Troubleshooting

### "Module not found" errors for `@nimbus-ds/tokens` or `@nimbus-ds/icons`

This typically means foundational packages haven't been built. Solutions:

1. **Automatic**: Run `yarn start:dev` (will detect and build missing packages)
2. **Manual**: Run `yarn setup:foundations` then `yarn storybook`
3. **Full rebuild**: Run `yarn build:all` for a complete build

### Fresh clone setup

After cloning the repository:

```bash
# Install dependencies
yarn install

# Start development (auto-builds what's needed)
yarn start:dev
```

The smart setup will handle the rest!
