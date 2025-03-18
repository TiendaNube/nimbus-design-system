# Changelog

The Alert component allows us to communicate about changes or special conditions in pages or sections.

## 2025-03-18 `2.4.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#-PULL_REQUEST_NUMBER](https://github.com/TiendaNube/nimbus-design-system/pull/-PULL_REQUEST_NUMBER) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#-PULL_REQUEST_NUMBER](https://github.com/TiendaNube/nimbus-design-system/pull/-PULL_REQUEST_NUMBER) by [@joacotornello](https://github.com/joacotornello))

## 2023-12-22 `2.3.2`

- Update component with new color tokens from `@nimbus-ds/tokens` package. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-27 `2.3.1`

### 🐛 Bug fixes

- Adjusted internal spacing of components when the alert does not have the removal function. ([#134](https://github.com/TiendaNube/nimbus-design-system/pull/134) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-13 `2.3.0`

### 💡 Others

- Refactored use of `color tokens` in internal components by removing `.` per `-`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

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

## 2022-12-07 `1.1.0`

### 🎉 New features

- Changed build build to consume inner package `@nimbus-ds/webpack`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `terser-webpack-plugin@5.3.5`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `ts-loader@9.3.1`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack-cli@4.10.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack@5.74.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `typescript@4.7.4`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-16 `1.0.1`

### 🐛 Bug fixes

- Externalizing component build style pack. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/#56) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-26 `1.0.0`

### 📚 3rd party library updates

- Added `@vanilla-extract/webpack-plugin@2.1.11`. ([#50](https://github.com/TiendaNube/nimbus-design-system/pull/50) by [@juanchigallego](https://github.com/juanchigallego))
- Added `terser-webpack-plugin@5.3.5`. ([#50](https://github.com/TiendaNube/nimbus-design-system/pull/50) by [@juanchigallego](https://github.com/juanchigallego))
- Added `ts-loader@9.3.1`. ([#50](https://github.com/TiendaNube/nimbus-design-system/pull/50) by [@juanchigallego](https://github.com/juanchigallego))
- Added `typescript@4.7.4`. ([#50](https://github.com/TiendaNube/nimbus-design-system/pull/50) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack@5.74.0`. ([#50](https://github.com/TiendaNube/nimbus-design-system/pull/50) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack-cli@4.10.0`. ([#50](https://github.com/TiendaNube/nimbus-design-system/pull/50) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added `title`, `appearance`, `children`, `onRemove` and `show` properties to the component API. ([#50](https://github.com/TiendaNube/nimbus-design-system/pull/50) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories to the component. ([#50](https://github.com/TiendaNube/nimbus-design-system/pull/50) by [@juanchigallego](https://github.com/juanchigallego))
- Created new `Alert.Skeleton` subcomponent. ([#50](https://github.com/TiendaNube/nimbus-design-system/pull/50) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories to the subcomponent `Alert.Skeleton`. ([#50](https://github.com/TiendaNube/nimbus-design-system/pull/50) by [@juanchigallego](https://github.com/juanchigallego))
