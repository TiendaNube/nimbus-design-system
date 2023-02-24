# Changelog

A low-level utility component that accepts styled system props to enable custom theme-aware styling

## 2023-02-24 `2.8.0`

### 🎉 New features

- Added `zIndex` property to component sprinkles. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Added `"border-box"` as default value for `boxSizing` property. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-23 `2.7.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-13 `2.6.0`

### 💡 Others

- Adjusted component typing and documentation. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-10 `2.5.0`

### 🎉 New features

- Added `none` as option in `display` sprinkles type. ([#88](https://github.com/TiendaNube/nimbus-design-system/pull/88) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-10 `2.4.0`

### 🎉 New features

- Added `boxShadow`, `transitionDuration`, `transitionDelay`, `transitionTimingFunction` and `transitionProperty` to component sprinkles. ([#87](https://github.com/TiendaNube/nimbus-design-system/pull/87) by [@juanchigallego](https://github.com/juanchigallego))
- Added `not-allowed` and `grab` options to `cursor` property. ([#87](https://github.com/TiendaNube/nimbus-design-system/pull/87) by [@juanchigallego](https://github.com/juanchigallego))
- Added `disabled` state to conditions. ([#87](https://github.com/TiendaNube/nimbus-design-system/pull/87) by [@juanchigallego](https://github.com/juanchigallego))
- Added `transparent` option to `backgroundColor` and `borderColor` sprinkles. ([#87](https://github.com/TiendaNube/nimbus-design-system/pull/87) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-09 `2.3.0`

### 🎉 New features

- Added properties present in the `@nimbus-ds/stack` package to the component because `Stack` has been deprecated. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-08 `2.2.0`

### 🎉 New features

- Added polymorphic typing support to component. ([#81](https://github.com/TiendaNube/nimbus-design-system/pull/81) by [@juniorconquista](https://github.com/juniorconquista))
- Added `as` property to the Component. ([#81](https://github.com/TiendaNube/nimbus-design-system/pull/81) by [@juniorconquista](https://github.com/juniorconquista))
- Added `auto` margin properties to the Component. ([#81](https://github.com/TiendaNube/nimbus-design-system/pull/81) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-01-31 `2.1.0`

### 🎉 New features

- Add new sprinkles properties `overflow`, `position`, `maxHeight`, `maxWidth`, `top`, `bottom`, `left` and `right` to Component Story. ([#76](https://github.com/TiendaNube/nimbus-design-system/pull/76) by [@juanchigallego](https://github.com/juanchigallego))

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
- Removed `typescript@4.7.4`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-24 `1.1.0`

### 🎉 New features

- Added `boxSizing` property to the Component. ([#58](https://github.com/TiendaNube/nimbus-design-system/pull/#58) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Fixed component documentation and typing. ([#58](https://github.com/TiendaNube/nimbus-design-system/pull/#58) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-16 `1.0.2`

### 🐛 Bug fixes

- Added `box-sizing` to component styling. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/#56) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-09 `1.0.1`

### 🐛 Bug fixes

- Fixed component property typing. ([#53](https://github.com/TiendaNube/nimbus-design-system/pull/#53) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-11 `1.0.0`

### 📚 3rd party library updates

- Added `@vanilla-extract/dynamic@2.0.2`. ([#38](https://github.com/TiendaNube/nimbus-design-system/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@vanilla-extract/webpack-plugin@2.1.11`. ([#38](https://github.com/TiendaNube/nimbus-design-system/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added `terser-webpack-plugin@5.3.5`. ([#38](https://github.com/TiendaNube/nimbus-design-system/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#38](https://github.com/TiendaNube/nimbus-design-system/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#38](https://github.com/TiendaNube/nimbus-design-system/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#38](https://github.com/TiendaNube/nimbus-design-system/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#38](https://github.com/TiendaNube/nimbus-design-system/pull/38) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `width`, `height`, `borderRadius`, `borderWidth`, `backgroundColor`, `borderColor`, `paddings`and `margins` properties to the Component. ([#38](https://github.com/TiendaNube/nimbus-design-system/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#38](https://github.com/TiendaNube/nimbus-design-system/pull/38) by [@juniorconquista](https://github.com/juniorconquista))
