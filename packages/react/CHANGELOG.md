# Changelog

This package is intended for internal use in generating builds of each design system package. It contains all the necessary settings and dependencies to optimize the creation of our builds.

## 2023-02-16 `2.8.0`

### 🎉 New features

- Removed external dependency of `@tiendanube/icons` package to now use `@nimbus-ds/icons` internal package in `@nimbus-ds/button`, `@nimbus-ds/chip`, `@nimbus-ds` packages /file-uploader`, `@nimbus-ds/icon`, `@nimbus-ds/icon-button`, `@nimbus-ds/input`, `@nimbus-ds/label`, `@nimbus-ds/ link`, `@nimbus-ds/tag`, `@nimbus-ds/thumbnail`and`@nimbus-ds/toast`. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `@tiendanube/icons@0.3.1`. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-13 `2.7.0`

### 🎉 New features

- Added polymorphic typing support to component `Button`. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))
- Added `as` property to the Component `Button`. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))
- Added polymorphic typing support to component `Lnk`. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))
- Added `as` property to the Component `Lnk`. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Removed subcomponent `Link.Button`. [#89](https://github.com/TiendaNube/nimbus-design-system/pull/#89) by [@juniorconquista](https://github.com/juniorconquista))
- Removed subcomponent `Button.Link`. [#89](https://github.com/TiendaNube/nimbus-design-system/pull/#89) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-09 `2.3.0`

### 🎉 New features

- Added properties present in the `@nimbus-ds/stack` package to the box component package. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Deprecated package `@nimbus-ds/stack`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-08 `2.2.0`

### 🎉 New features

- Added polymorphic typing support to component `Box`. ([#81](https://github.com/TiendaNube/nimbus-design-system/pull/81) by [@juniorconquista](https://github.com/juniorconquista))
- Added `as` property to the Component `Box`. ([#81](https://github.com/TiendaNube/nimbus-design-system/pull/81) by [@juniorconquista](https://github.com/juniorconquista))
- Added `auto` margin properties to the Component `Box`. ([#81](https://github.com/TiendaNube/nimbus-design-system/pull/81) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-07 `2.4.0`

### 🎉 New features

- Added new composite `Accordion` component. ([#80](https://github.com/TiendaNube/nimbus-design-system/pull/80) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-01 `2.3.0`

### 🎉 New features

- Added new composite `Modal` component. ([#77](https://github.com/TiendaNube/nimbus-design-system/pull/77) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-01-27 `2.2.0`

### 🎉 New features

- Added new options to `appearance` property on `Popover` component. ([#76](https://github.com/TiendaNube/nimbus-design-system/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Added new options to `appearance` property on `Link` component. ([#76](https://github.com/TiendaNube/nimbus-design-system/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Added new properties to `Box` component. ([#76](https://github.com/TiendaNube/nimbus-design-system/pull/76) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-01-09 `2.1.0`

### 🎉 New features

- Added new composite `Table` component. ([#72](https://github.com/TiendaNube/nimbus-design-system/pull/72) by [@juanchigallego](https://github.com/juanchigallego))

## 2022-12-22 `2.0.0`

### 💡 Others

- Removed direct dependency on package 'nimbus-ds/styles' from compilation of all components. ([#69](https://github.com/TiendaNube/nimbus-design-system/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-20 `1.1.0`

### 🎉 New features

- Added new composite `Pagination` component. ([#68](https://github.com/TiendaNube/nimbus-design-system/pull/68) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-15 `1.0.2`

### 🐛 Bug fixes

- Fixed bug in the `textDecoration` property where the `none` option was not applied when the link contained the `href` property. ([#66](https://github.com/TiendaNube/nimbus-design-system/pull/66) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-07 `1.0.0`

### 📚 3rd party library updates

- Added `webpack@5.75.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
