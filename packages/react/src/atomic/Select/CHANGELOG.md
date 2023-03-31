# Changelog

Use a select box when a user needs to select one option from a list.

## 2023-04-03 `2.3.2`

### 🐛 Bug fixes

- Add missing dependency for `@nimbus-ds/icon` external package. ([#135](https://github.com/TiendaNube/nimbus-design-system/pull/135) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-27 `2.3.1`

### 🐛 Bug fixes

- Fixes bug where `Select.Option` subcomponent would not render the HTML option elements on IOS devices. ([#129](https://github.com/TiendaNube/nimbus-design-system/pull/129) by [@juanchigallego](https://github.com/juanchigallego))

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

## 2022-12-07 `1.2.0`

### 🎉 New features

- Changed build build to consume inner package `@nimbus-ds/webpack`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `terser-webpack-plugin@5.3.5`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `ts-loader@9.3.1`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack-cli@4.10.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack@5.74.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `typescript@4.7.4`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-14 `1.0.0`

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Added `ts-loader@9.3.1`. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Added `typescript@4.7.4`. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack@5.74.0`. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack-cli@4.10.0`. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added `name`, `id`, `appearance` and `children` properties to the component. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories on component. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Created new `Select.Group` subcomponent. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Added `label` and `children` properties to the component `Select.Group`. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Created new `Select.Option` subcomponent. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Added `label` and `value` properties to the component `Select.Option`. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Created new `Select.Skeleton` subcomponent. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Added `width` property to the component `Select.Skeleton`. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories on component `Select.Skeleton`. ([#39](https://github.com/TiendaNube/nimbus-design-system/pull/39) by [@juanchigallego](https://github.com/juanchigallego))
