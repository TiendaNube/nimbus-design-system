# `@nimbus-ds/breadcrumb`

[![@nimbus-ds/breadcrumb](https://img.shields.io/npm/v/@nimbus-ds/breadcrumb?label=%40nimbus-ds%2Fbreadcrumb)](https://www.npmjs.com/package/@nimbus-ds/breadcrumb)

The Breadcrumb component shows the user's current position in a multi-level navigation hierarchy and lets them navigate back to any ancestor level.

## Installation

```sh
$ yarn add @nimbus-ds/breadcrumb
# or
$ npm install @nimbus-ds/breadcrumb
```

### Component Anatomy

A navigation region with an ordered list of levels: ancestor links, separators, an overflow trigger that appears only when ancestors are hidden, and the current level as non-interactive text.

## Guidelines

Use Breadcrumb when a product experience has a multi-level navigation hierarchy and users need location context and a way back to previous levels.

Do not use it to switch between views of equal hierarchy (use Nav Tabs), to step through a long list (use Pagination), or as a single link to another destination (use Link).

### Collapsing

The collapse depends only on the available width. The current level is always visible, then the overflow trigger, then the first level, then the nearest ancestors. Hidden ancestors are listed in the panel opened by the trigger. Only the current level is truncated.

### Router links

Ancestors render as native anchors by default. Pass `as` with a router link component and `linkProps` per item to use client-side navigation. Breadcrumb does not depend on any router.

### Accessibility

`label` and `hiddenLevelsLabel` are required and must be localized by the consumer. Keyboard access follows the Tab order: there is no arrow-key navigation. Opening the panel moves focus to its first link; dismissing it returns focus to the trigger.

The complete behavioral contract is in [`src/breadcrumb.spec.md`](./src/breadcrumb.spec.md).
