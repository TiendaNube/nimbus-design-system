# Changelog

The Slider component allows users to select a range of values within a defined minimum and maximum.

## 2026-02-04 `1.1.0`

#### 🎉 New features

- Added `showLabels` property to toggle the visibility of min/max labels below the slider. ([#417](https://github.com/TiendaNube/nimbus-design-system/pull/417) by [@noecondoleo](https://github.com/noecondoleo))
- Added `minLabel` and `maxLabel` properties to customize the min/max labels text. ([#417](https://github.com/TiendaNube/nimbus-design-system/pull/417) by [@noecondoleo](https://github.com/noecondoleo))
- Added `SliderLabels` component to render min/max labels. ([#417](https://github.com/TiendaNube/nimbus-design-system/pull/417) by [@noecondoleo](https://github.com/noecondoleo))

#### 🎨 Visual changes

- Updated track height from 8px to 4px according to Figma specs. ([#417](https://github.com/TiendaNube/nimbus-design-system/pull/417) by [@noecondoleo](https://github.com/noecondoleo))
- Updated thumb design to white background with 2px blue border (was solid blue). ([#417](https://github.com/TiendaNube/nimbus-design-system/pull/417) by [@noecondoleo](https://github.com/noecondoleo))
- Updated disabled thumb to white background with 2px gray border. ([#417](https://github.com/TiendaNube/nimbus-design-system/pull/417) by [@noecondoleo](https://github.com/noecondoleo))
- Updated disabled fill color to neutral.surfaceHighlight for better contrast. ([#417](https://github.com/TiendaNube/nimbus-design-system/pull/417) by [@noecondoleo](https://github.com/noecondoleo))
- Updated spacing between slider track and bottom labels to 12px. ([#417](https://github.com/TiendaNube/nimbus-design-system/pull/417) by [@noecondoleo](https://github.com/noecondoleo))

#### 🐛 Bug fixes

- Fixed disabled fill not rendering correctly by properly extending baseFill styles. ([#417](https://github.com/TiendaNube/nimbus-design-system/pull/417) by [@noecondoleo](https://github.com/noecondoleo))

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
