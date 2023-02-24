# Changelog

Text is a basic component that allows us to write blocks of text and give it formatting to use within other components, sections and pages of our application or website.

## 2023-02-23 `5.1.0`

### 🎉 New features

- Changed `fontSize` default value to `base`. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Changed `color` default value to `neutral.textLow`. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

## 2022-12-22 `5.0.0`

### 💡 Others

- Removed direct dependency on `nimbus-ds/styles` package from component build. ([#69](https://github.com/TiendaNube/nimbus-design-system/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-07 `4.3.0`

### 🎉 New features

- Changed build build to consume inner package `@nimbus-ds/webpack`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `terser-webpack-plugin@5.3.5`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `ts-loader@9.3.1`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack-cli@4.10.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `typescript@4.7.4`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-29 `4.1.0`

### 🎉 New features

- Added `currentColor` color properties. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added displayName to component. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added displayName to component `Text.Skeleton`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Removed `primary.background`, `danger.background`, `success.background`, `waring.background` color properties. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-24 `4.0.0`

### 💡 Others

- Refactored `fontSize` properties for `caption`, `base` and `highlight`. ([#29](https://github.com/TiendaNube/nimbus-design-system/pull/29) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored `lineHeight` properties for `caption`, `base` and `highlight`. ([#29](https://github.com/TiendaNube/nimbus-design-system/pull/29) by [@juniorconquista](https://github.com/juniorconquista))
- Renamed `Skeleton` component to `TextSkeleton`. ([#29](https://github.com/TiendaNube/nimbus-design-system/pull/29) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-12 `3.0.0`

### 🎉 New features

- Added `fontWeight` property to the Component Text. ([#23](https://github.com/TiendaNube/nimbus-design-system/pull/23) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Renamed `size` property for `fontSize` to the Component Text. ([#23](https://github.com/TiendaNube/nimbus-design-system/pull/23) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `bold` property to the Component Text. ([#23](https://github.com/TiendaNube/nimbus-design-system/pull/23) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-01 `2.0.0`

### 📚 3rd party library updates

- Removed `@vanilla-extract/webpack-plugin@2.1.11`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `color` properties to the Component Text. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Removed `appearance` properties to the Component Text. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-22 `1.1.0`

### 📚 3rd party library updates

- Removed `@vanilla-extract/babel-plugin@1.1.7`. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@vanilla-extract/css@1.7.2`. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@vanilla-extract/recipes@0.2.5`. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Created new `Text.Skeleton` subcomponent. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))
- Added `size`, `width` and `height` properties to the Component `Text.Skeleton`. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `Text.Skeleton`. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-21 `1.0.0`

### 📚 3rd party library updates

- Added `@vanilla-extract/babel-plugin@1.1.7`. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@vanilla-extract/css@1.7.2`. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@vanilla-extract/recipes@0.2.5`. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@vanilla-extract/webpack-plugin@2.1.11`. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))
- Added `terser-webpack-plugin@5.3.5`. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `children`, `as`, `textAlign`, `bold`, `size`, `appearance` and `lineHeight` properties to the Component. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#13](https://github.com/TiendaNube/nimbus-design-system/pull/13) by [@juniorconquista](https://github.com/juniorconquista))
