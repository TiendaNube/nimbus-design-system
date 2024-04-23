# Changelog

The Chip component is used to flag criteria or attributes related to searches or filters of a list of information.

## 2024-04-22 `2.3.3`

### 💡 Others

- Trigger `onClick` only when close icon is pressed. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/240) by [@nachozullo](https://github.com/nachozullo))

## 2024-02-07 `2.3.2`

### 🐛 Bug fixes

- Added `lineClamp` and `wordBreak` properties to `Chip` Text to allow overflowing text to hide instead of breaking into lines. ([#220](https://github.com/TiendaNube/nimbus-design-system/pull/220) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-12-22 `2.3.1`

- Update component with new color tokens from `@nimbus-ds/tokens` package. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-24 `2.3.0`

### 💡 Others

- Refactored use of `color tokens` in internal components by removing `.` per `-`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-24 `2.2.1`

### 💡 Others

- Reset color value on `Text` component to default value. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Add `lineHeight caption` property on `Text` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

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

## 2022-12-07 `1.2.0`

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

## 2022-09-27 `1.4.0`

### 💡 Others

- Adjusted component native typing for ButtonHTMLAttributes. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-24 `1.3.0`

### 💡 Others

- Adjusted `fontSize` size of internal `Text` component from `small` to `caption`. ([#29](https://github.com/TiendaNube/nimbus-design-system/pull/29) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-01 `1.0.0`

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `icon`, `removable` and `text` properties to the Component. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Chip.Skeleton` subcomponent. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added `width` and `height` properties to the Component `Chip.Skeleton`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `Chip.Skeleton`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
