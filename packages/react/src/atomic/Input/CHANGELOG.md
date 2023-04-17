# Changelog

The Input component allows the user to enter or edit information in text format.

## 2023-04-13 `2.3.1`

#### 🐛 Bug fixes

- Fixed bug in input component where Icon sent was overlapping text. ([#144](https://github.com/TiendaNube/nimbus-design-system/pull/144) by [@juniorconquista](https://github.com/juniorconquista)).

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

## 2022-11-18 `1.1.0`

### 📚 3rd party library updates

- Updated `@tiendanube/icons@0.3.1`. ([#57](https://github.com/TiendaNube/nimbus-design-system/pull/#57) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-20 `1.0.0`

### 📚 3rd party library updates

- Added `@tiendanube/icons@0.2.8`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added `terser-webpack-plugin@5.3.5`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `appearance`, `disabled`, `appendPosition` and `append` properties to the Component. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Input.Skeleton` subcomponent. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `Input.Skeleton`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added `width` and `data-testid` properties to the Component `Input.Skeleton`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Input.Password` subcomponent. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `Input.Password`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added `appearance` and `disabled` properties to the Component `Input.Password`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Input.Search` subcomponent. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `Input.Search`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
- Added `appearance` and `disabled` properties to the Component `Input.Search`. ([#42](https://github.com/TiendaNube/nimbus-design-system/pull/42) by [@juniorconquista](https://github.com/juniorconquista))
