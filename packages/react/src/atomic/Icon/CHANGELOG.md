# Changelog

Icons are used to visually communicate core parts of the product and available actions. They can act as wayfinding tools to help merchants more easily understand where they are in the product, and common interaction patterns that are available.

## 2026-04-06 `3.5.2`

#### 🐛 Bug fixes

- Fixed linear AI generative gradient to use the `aiGenerativeIconGradient` token instead of `aiGenerativeInteractive`. ([#455](https://github.com/TiendaNube/nimbus-design-system/pull/455) by [@noecondoleo](https://github.com/noecondoleo))

## 2026-02-23 `1.34.0`

#### 🎉 New features

- Added `success-interactivePressed` color property to `Icon` component. ([`#433`](https://github.com/TiendaNube/nimbus-design-system/pull/433) by [`@jetchart-tiendanube`](https://github.com/jetchart-tiendanube))

## 2026-02-12 `1.33.0`

#### 🎉 New features

- Enabled `className` prop forwarding to allow consumers to pass custom CSS classes. ([#426](https://github.com/TiendaNube/nimbus-design-system/pull/426) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-13 `1.32.1`

#### 🎉 New features

- Adds support for React 19. ([#404](https://github.com/TiendaNube/nimbus-design-system/pull/404) by [@joacotornello](https://github.com/joacotornello))

## 2025-11-10 `1.32.0`

#### 🎉 New features

- Added `ai-gradientPurpleHigh` color to the colors. ([#373](https://github.com/TiendaNube/nimbus-design-system/pull/373) by [@jffs](https://github.com/jffs))

## 2025-09-17 `1.13.1`

#### 🐛 Bug fixes

- Adjusted `css-parser` to support new Nimbus AI gradient tokens. ([#353](https://github.com/TiendaNube/nimbus-design-system/pull/353) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-01 `3.2.1`

### 🐛 Bug fixes

- Rename `ai-interactive` to `ai-generative` in `Icon` component. ([#327](https://github.com/TiendaNube/nimbus-design-system/pull/327) by [@joacotornello](https://github.com/joacotornello))

## 2025-07-30 `3.2.0`

### 🎉 New features

- Added `ai-interactive` appearance to `Icon` component. ([#321](https://github.com/TiendaNube/nimbus-design-system/pull/321) by [@joacotornello](https://github.com/joacotornello))

## 2025-06-27 `3.1.0`

### 🎉 New features

- Introduced a new Storybook story that displays a list of all available icons with consistent styling and layout for easy browsing. ([#302](https://github.com/TiendaNube/nimbus-design-system/pull/302) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `3.0.1`

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2023-03-13 `3.0.0`

### 🛠 Breaking changes

- Changed the `color` properties to `primary-interactive`, `primary-surface`, `primary-textLow`, `success-textLow`, `success-surface`, `warning-interactive`, `warning-surface`, `warning-textLow`, `danger-interactive`, `danger-surface`, `danger-textLow`, `neutral-background`, `neutral-interactive`, `neutral-surface`, `neutral-textLow`, `currentColor`, `success-interactive`, `primary-textHigh`, `success-textHigh`, `warning-textHigh`, `danger-textHigh`, `neutral-textDisabled` and `neutral-textHigh`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-24 `2.2.1`

### 🎉 New features

- Changed `cursor` property default value to `inherit`. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-23 `2.2.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-16 `2.1.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `@tiendanube/icons@0.3.1`. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-22 `2.0.0`

### 💡 Others

- Removed direct dependency on `nimbus-ds/styles` package from component build. ([#69](https://github.com/TiendaNube/nimbus-design-system/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-07 `1.6.0`

### 🎉 New features

- Changed build build to consume inner package `@nimbus-ds/webpack`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `terser-webpack-plugin@5.3.5`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `ts-loader@9.3.1`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack-cli@4.10.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack@5.74.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `typescript@4.7.4`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-18 `1.5.0`

### 📚 3rd party library updates

- Updated `@tiendanube/icons@0.3.1`. ([#57](https://github.com/TiendaNube/nimbus-design-system/pull/#57) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-09 `1.4.0`

### 🎉 New features

- Added `cursor` property to the Component. ([#53](https://github.com/TiendaNube/nimbus-design-system/pull/53) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-20 `1.3.0`

### 🎉 New features

- Added `neutral.textDisabled` color to the component property . ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-29 `1.2.1`

### 🎉 New features

- Added displayName to component. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added displayName to component `Icon.Skeleton`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-01 `1.0.0`

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `source` and `color` properties to the Component. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Icon.Skeleton` subcomponent. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added `width` and `height` properties to the Component `Icon.Skeleton`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `Icon.Skeleton`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
