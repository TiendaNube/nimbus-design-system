# Changelog

The ProgressBar component allows us to display the progress of an operation or task in a visual format.

## 2026-04-14 `1.2.1`

#### 🐛 Bug fixes

- Changed transition easing from ease to linear for time-accurate progress animation. Styles live in `@nimbus-ds/styles`.

## 2026-03-04 `1.2.0`

#### 🎉 New features

- Added `boxShadow` prop to apply a glow effect to the progress bar fill. ([#441](https://github.com/TiendaNube/nimbus-design-system/pull/441) by [@joacotornello](https://github.com/joacotornello))
- Added `height` prop to allow custom progress bar height. ([#441](https://github.com/TiendaNube/nimbus-design-system/pull/441) by [@joacotornello](https://github.com/joacotornello))
- Added `backgroundColor` prop to change the track background color. ([#441](https://github.com/TiendaNube/nimbus-design-system/pull/441) by [@joacotornello](https://github.com/joacotornello))

## 2026-02-12 `1.1.0`

#### 🎉 New features

- Enabled `className` prop forwarding to allow consumers to pass custom CSS classes. ([#426](https://github.com/TiendaNube/nimbus-design-system/pull/426) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-13 `1.0.1`

#### 🎉 New features

- Adds support for React 19. ([#404](https://github.com/TiendaNube/nimbus-design-system/pull/404) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-01 `1.0.0`

### 🎉 New features

- Added ProgressBar component. ([#325](https://github.com/TiendaNube/nimbus-design-system/pull/325))
- Added `value` prop to control progress from 0 to 100.
- Added `appearance` prop with variants: primary, success, warning, danger, neutral and ai-generative.
- Included ProgressBar skeleton component for loading states.
- Implemented accessibility support with ARIA attributes.
- Provided comprehensive TypeScript types and documentation.
