# Changelog

The Checkbox component allows us to choose one or several options from a selection list.

## 2025-03-18 `2.3.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2023-12-22 `2.2.1`

- Update component with new color tokens from `@nimbus-ds/tokens` package. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `2.2.0`

### 💡 Others

- Refactored use of `color tokens` in internal components by removing `.` per `-`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-24 `2.1.1`

### 💡 Others

- Reset font size and line height values on `Text` component to default values. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-23 `2.1.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-22 `2.0.0`

### 💡 Others

- Removed direct dependency on `nimbus-ds/styles` package from component build. ([#69](https://github.com/TiendaNube/nimbus-design-system/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-07 `1.3.0`

### 🎉 New features

- Changed build build to consume inner package `@nimbus-ds/webpack`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `terser-webpack-plugin@5.3.5`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `ts-loader@9.3.1`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack-cli@4.10.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack@5.74.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `typescript@4.7.4`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-02 `1.2.1`

### 🐛 Bug fixes

- Fixed minimum size of checkbox and lineHeight of label. ([#62](https://github.com/TiendaNube/nimbus-design-system/pull/62) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-29 `1.2.1`

### 🎉 New features

- Added displayName to component. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added displayName to component `Checkbox.Skeleton`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Adjusted color Icon check from `primary.background` to `neutral.background`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-27 `1.2.0`

### 💡 Others

- Adjusted component native typing for InputHTMLAttributes. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-24 `1.0.0`

### 💡 Others

- Renamed `CheckboxSkeleton` component to `Skeleton`. ([#29](https://github.com/TiendaNube/nimbus-design-system/pull/29) by [@juniorconquista](https://github.com/juniorconquista))
- Adjusted `fontSize` size of internal `Text` component from `caption` to `base`. ([#29](https://github.com/TiendaNube/nimbus-design-system/pull/29) by [@juniorconquista](https://github.com/juniorconquista))
- Adjusted `lineHeight` size of internal `Text` component from `small` to `highlight`. ([#29](https://github.com/TiendaNube/nimbus-design-system/pull/29) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `name`, `appearance`, `checked`, `disabled`, `indeterminate` and `label` properties to the Component. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Checkbox.Skeleton` subcomponent. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added `width` and `data-testid` properties to the Component `Checkbox.Skeleton`. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `Checkbox.Skeleton`. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
