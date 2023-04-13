# Changelog

The Card component allows us to group contents and related actions, making it easier to identify groups of information.

## 2023-04-13 `3.0.1`

#### 🐛 Bug fixes

- Removed additional margin generated in component `Card` when using subcomponent `Card.Header` without a `Card.Footer`. ([#144](https://github.com/TiendaNube/nimbus-design-system/pull/144) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-13 `3.0.0`

### 🛠 Breaking changes

- Changed the `backgroundColor` properties to `primary-surface`, `primary-surfaceHighlight`, `success-surface`, `success-surfaceHighlight`, `warning-surface`, `warning-surfaceHighlight`, `danger-surface`, `danger-surfaceHighlight`, `neutral-background`, `neutral-surface` and `neutral-surfaceHighlight`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Refactored use of `color tokens` in internal components by removing `.` per `-`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-24 `2.1.1`

### 💡 Others

- Adjust `fontSize` and `lineHeight` properties in `Text` component on stories documentation. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-23 `2.1.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

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

## 2022-11-02 `1.0.0`

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `children`, `padding` and `backgroundColor` properties to the Component. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Card.Header` subcomponent. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Added `children` and `title` properties to the Component `Card.Header`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Card.Body` subcomponent. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Added `children` and `padding` properties to the Component `Card.Body`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Card.Footer` subcomponent. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
- Added `children` properties to the Component `Card.Footer`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/52) by [@juniorconquista](https://github.com/juniorconquista))
