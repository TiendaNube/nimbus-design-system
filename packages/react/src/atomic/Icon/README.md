# `@nimbus-ds/icon`

[![@nimbus-ds/icon](https://img.shields.io/npm/v/@nimbus-ds/icon?label=%40nimbus-ds%2Ficon)](https://www.npmjs.com/package/@nimbus-ds/icon)

The Icon component is used when we need to illustrate an action, state or text inside or outside another component.

## Installation

```sh
$ yarn add @nimbus-ds/icon
# or
$ npm install @nimbus-ds/icon
```

### Component Anatomy

The component consists of a vector shape, which uses our Nimbus icons library.

## Guidelines

We use this component to reinforce, through an icon, a message, state or action that requires greater emphasis in relation to a text, for example.

### Sizes

Icon has 3 predefined sizes large, medium and small and must be used taking into account the component and context in which they will be applied.

### Figma (Norte UI) mapping

The Figma `Icon` properties map to the existing API without new props:

| Figma `Appearance` | `Mode=surface` → `color` | `Mode=light` → `color` |
| ------------------ | ------------------------ | ---------------------- |
| neutral            | `neutral-textHigh`       | `neutral-textLow`      |
| primary            | `primary-textLow`        | `primary-interactive`  |
| success            | `success-textLow`        | —                      |
| warning            | `warning-textLow`        | —                      |
| danger             | `danger-textLow`         | —                      |
| AI                 | `ai-generativeTextLow`   | `ai-generative`        |
| background         | —                        | `neutral-background`   |

Figma `Size` maps to the `size` prop of the `@nimbus-ds/icons` SVG passed as `source` (`small` 16px, `medium` 24px, `large` 32px). For `Icon.Skeleton`, use `width` / `height` (`1rem`, `1.5rem`, `2rem`).

### AriaLabel

This component does not have text, but it has a tag (Aria Label) to facilitate its identification by people with some type of visual or cognitive limitation. That's why we need to add a description that makes the icon's function clear.

### Recommendation for use

- Illustrate states of an order
- Illustrate actions inside a button
- Illustrate a section of the application

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/icon).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
