# Changelog

The Slider component allows users to select a range of values within a defined minimum and maximum.

## 2026-02-12 `1.1.0`

#### 🎉 New features

- Enabled `className` prop forwarding to allow consumers to pass custom CSS classes. ([#426](https://github.com/TiendaNube/nimbus-design-system/pull/426) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-21 `1.0.0`

#### 🎉 New features

- Added `min`, `max`, `minValue`, `maxValue`, `step` properties to control the slider range and values.
- Added `appearance` property with variants: primary, success, warning, danger, and neutral.
- Added `disabled` property to disable the slider.
- Added `showInputs` property to toggle the visibility of number inputs.
- Added `showRangeLabels` property to toggle the visibility of range labels.
- Added `minLabel` and `maxLabel` properties for input labels.
- Added `inputSeparator` property to customize the separator between inputs.
- Added `labelPrefix` property to display a prefix before range label values (e.g., "R$", "$").
- Added `labelSuffix` property to display a suffix after range label values (e.g., "kg", "%").
- Added `onChange`, `onMinChange`, `onMaxChange`, and `onChangeEnd` callback properties.
- Added keyboard navigation support (Arrow keys, Home, End).
- Added full accessibility support with ARIA attributes.
- Added stories for Storybook documentation.
