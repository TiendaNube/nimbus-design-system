# Changelog

Tilte is a basic component that allows you to give titles and more hierarchy to blocks of text for sections or header components.

## 2026-08-07 `3.3.0`

#### 🎉 New features

- `Title` now accepts the same flat color palette as `Text`, adding `currentColor`, `primary-surface`, `primary-interactive`, `success-surface`, `success-interactive`, `success-interactivePressed`, `warning-surface`, `warning-interactive`, `danger-surface`, `danger-interactive`, `neutral-surface`, `neutral-interactive` and `neutral-textDisabled` to the existing values. Both components now read from a single shared color map in `@nimbus-ds/styles`, so the palettes cannot drift apart again. The `ai-generative` gradient remains exclusive to `Text`, since it forces `display: inline` and `width: fit-content` and would break the block layout of a heading. Also corrected the documented default for `color`, which is `neutral-textHigh` (the docs previously stated `neutral-textLow`). ([#496](https://github.com/TiendaNube/nimbus-design-system/pull/496) by [@lichademarchi](https://github.com/lichademarchi))

## 2026-02-12 `3.2.0`

#### 🎉 New features

- Enabled `className` prop forwarding to allow consumers to pass custom CSS classes. ([#426](https://github.com/TiendaNube/nimbus-design-system/pull/426) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-13 `3.1.4`

#### 🎉 New features

- Adds support for React 19. ([#404](https://github.com/TiendaNube/nimbus-design-system/pull/404) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `3.1.3`

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2024-03-01 `3.1.2`

### 🎉 New features

- Add `neutral-background` option to `color` properties. ([#224](https://github.com/TiendaNube/nimbus-design-system/pull/224) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-12-22 `3.1.1`

### 🎉 New features

- Changed default color to `neutral-textHigh`. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))
- Changed default weight to `bold`. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-05-02 `3.1.0`

### 🎉 New features

- Added responsive conditions to `Title` component properties. ([#152](https://github.com/TiendaNube/nimbus-design-system/pull/152) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `3.0.0`

### 🛠 Breaking changes

- Changed the `color` properties to `primary-textLow`,`success-textLow`,`warning-textLow`,`danger-textLow`,`neutral-textLow`,`primary-textHigh`,`success-textHigh`,`warning-textHigh`,`danger-textHigh` and `neutral-textHigh`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-23 `2.2.0`

### 🎉 New features

- Added `fontSize`, `fontWeight` and `lineHeight` properties to component API. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-23 `2.1.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-22 `2.0.0`

### 💡 Others

- Removed direct dependency on `nimbus-ds/styles` package from component build. ([#69](https://github.com/TiendaNube/nimbus-design-system/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-07 `1.6.0`

### 🎉 New features

- Changed build build to consume inner package `@nimbus-ds/webpack`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `terser-webpack-plugin@5.3.5`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `ts-loader@9.3.1`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack-cli@4.10.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack@5.74.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `typescript@4.7.4`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-24 `1.5.0`

### 💡 Others

- Added displayName to component `Title.Skeleton` on subcomponent `Title.Skeleton`. ([#58](https://github.com/TiendaNube/nimbus-design-system/pull/58) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-02 `1.4.0`

### 🎉 New features

- Added displayName to component `Title.Skeleton`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-12 `1.3.0`

### 🎉 New features

- Added `textAlign` properties to the Component. ([#23](https://github.com/TiendaNube/nimbus-design-system/pull/23) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-01 `1.2.0`

### 📚 3rd party library updates

- Removed `@vanilla-extract/webpack-plugin@2.1.11`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `color` properties to the Component Title. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-22 `1.1.1`

### 📚 3rd party library updates

- Removed `@vanilla-extract/babel-plugin@1.1.7`. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@vanilla-extract/css@1.7.2`. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@vanilla-extract/recipes@0.2.5`. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Created new `Title.Skeleton` subcomponent. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))
- Added `as`, `width` and `height` properties to the Component `Title.Skeleton`. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `Title.Skeleton`. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-21 `1.1.0`

### 💡 Others

- Added new unit tests to ensure text align styles are applied. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-20 `1.1.0`

### 📚 3rd party library updates

- Added `@vanilla-extract/babel-plugin@1.1.7`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@vanilla-extract/css@1.7.2`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@vanilla-extract/recipes@0.2.5`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@vanilla-extract/webpack-plugin@2.1.11`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `terser-webpack-plugin@5.3.5`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-09 `1.0.2`

<!-- ### 📚 3rd party library updates -->

<!-- ### 🛠 Breaking changes -->

### 🎉 New features

- Added `children`, `as`, `textAlign` properties to the Component. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))

<!-- ### 🐛 Bug fixes -->

<!-- ### 💡 Others -->

<!-- ### ⚠️ Notices -->
