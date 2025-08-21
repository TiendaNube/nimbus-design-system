# Changelog

Icons are used to visually communicate core parts of the product and available actions. They can act as wayfinding tools to help merchants more easily understand where they are in the product, and common interaction patterns that are available.

## 2025-08-21 `4.2.0`

#### 🎉 New features

- Added optional `color` prop to `IconButton` (defaults to `neutral-textHigh`) to allow customizing the inner `Icon` color. ([#000](https://github.com/TiendaNube/nimbus-design-system/pull/000) by [@your-username](https://github.com/your-username))

## 2025-03-18 `4.1.2`

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2023-12-22 `4.1.1`

- Update component with new color tokens from `@nimbus-ds/tokens` package. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-04-13 `4.1.0`

#### 🎉 New features

- Added `width` and `height` properties to the `IconButton.Skeleton` subcomponent api. ([#149](https://github.com/TiendaNube/nimbus-design-system/pull/149) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-13 `4.0.0`

### 🛠 Breaking changes

- Changed the `borderColor` properties to `neutral-surface`, `neutral-interactive` and `neutral-surfaceHighlight`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `backgroundColor` properties to `neutral-surface`, `neutral-surfaceHighlight`, `neutral-interactive`, `neutral-interactiveHover`, `neutral-interactivePressed` and `primary-interactive`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-23 `3.2.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-16 `3.1.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `@tiendanube/icons@0.3.1`. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-22 `3.0.0`

### 💡 Others

- Removed direct dependency on `nimbus-ds/styles` package from component build. ([#69](https://github.com/TiendaNube/nimbus-design-system/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-16 `2.1.1`

### 🎉 New features

- Update color rules. ([#67](https://github.com/TiendaNube/nimbus-design-system/pull/67) by [@juanchigallego](https://github.com/juanchigallego))

## 2022-12-07 `2.1.0`

### 🎉 New features

- Changed build build to consume inner package `@nimbus-ds/webpack`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `terser-webpack-plugin@5.3.5`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `ts-loader@9.3.1`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack-cli@4.10.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack@5.74.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `typescript@4.7.4`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-01 `2.0.0`

### 🎉 New features

- Added `size`, `backgroundColor` and `borderColor` properties to the component. ([#61](https://github.com/TiendaNube/nimbus-design-system/pull/61) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Changed component base typing to extends to native button types. ([#61](https://github.com/TiendaNube/nimbus-design-system/pull/61) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

## 2022-11-18 `1.1.0`

### 📚 3rd party library updates

- Updated `@tiendanube/icons@0.3.1`. ([#57](https://github.com/TiendaNube/nimbus-design-system/pull/#57) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-16 `1.0.1`

### 🐛 Bug fixes

- Updating internal version of `@nimbus-ds/icon` package. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-27 `1.0.0`

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `source` and `as` properties to the Component. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `IconButton.Skeleton` subcomponent. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `IconButton.Skeleton`. ([#30](https://github.com/TiendaNube/nimbus-design-system/pull/30) by [@juniorconquista](https://github.com/juniorconquista))
