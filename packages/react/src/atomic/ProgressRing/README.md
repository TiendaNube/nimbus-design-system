# `@nimbus-ds/progress-ring`

[![@nimbus-ds/progress-ring](https://img.shields.io/npm/v/@nimbus-ds/progress-ring?label=%40nimbus-ds%2Fprogress-ring)](https://www.npmjs.com/package/@nimbus-ds/progress-ring)

The ProgressRing component displays measurable, determinate progress as a circular ring, with a visible, programmatically exposed value.

## Installation

```sh
$ yarn add @nimbus-ds/progress-ring
# or
$ npm install @nimbus-ds/progress-ring
```

## Guidelines

Use this component when progress is measurable and should be shown in a compact, circular format — for example, a step-completion indicator in a dashboard card. Use [ProgressBar](https://nimbus.nuvemshop.com.br/documentation/atomic-components/progress-bar) instead when a linear track fits the layout better, and [Spinner](https://nimbus.nuvemshop.com.br/documentation/atomic-components/spinner) instead when no measurable value is available.

### Sizes

ProgressRing has 3 predefined sizes — large, medium, and small — and must be used taking into account the component and context in which it will be applied.

### Accessible name

This component has no visible label of its own: `aria-label` is a required prop.

### What is not yet defined

This component's initial version implements only its functional contract (value, accessibility semantics, size). Visual detail — stroke width, whether a background track is always visible, and a color/appearance token set — is not yet part of its contract: no Nimbus Figma design exists for this component yet. Do not rely on the current stroke width or `currentColor` styling as a guarantee; both may change once that design work happens.

### Related components

- [ProgressBar](https://nimbus.nuvemshop.com.br/documentation/atomic-components/progress-bar) — for linear, measurable progress.
- [Spinner](https://nimbus.nuvemshop.com.br/documentation/atomic-components/spinner) — for indeterminate loading.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/progress-ring).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
