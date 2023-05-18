# Changelog

Use Popovers to bring attention to specific user interface elements and suggest an action or to guide users through a new experience

## 2023-05-18 `4.0.0`

#### 🛠 Breaking changes

- Changed the dynamic sending option of the `zIndex` property to use `zIndex` in the component API. ([#162](https://github.com/TiendaNube/nimbus-design-system/pull/162) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-22 `3.2.2`

### 📚 3rd party library updates

- Removed `@floating-ui/react-dom-interactions`. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@floating-ui/react`. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-05-02 `3.1.1`

#### 🐛 Bug fixes

- Omit `content` HTML prop on `Popover` API. ([#152](https://github.com/TiendaNube/nimbus-design-system/pull/152) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-04-13 `3.1.0`

#### 🎉 New features

- Added renderProps functionality to the component so that it is possible to obtain the internal state of the popover in the component's children. ([#149](https://github.com/TiendaNube/nimbus-design-system/pull/149) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-13 `3.0.0`

### 🛠 Breaking changes

- Changed the `backgroundColor` properties to `primary-surfaceHighlight`, `primary-interactiveHover`, `success-surfaceHighlight`, `danger-surfaceHighlight`, `neutral-surfaceHighlight` and `warning-surfaceHighlight`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `color` properties to `primary-surfaceHighlight`, `primary-interactiveHover`, `success-surfaceHighlight`, `danger-surfaceHighlight`, `neutral-surfaceHighlight` and `warning-surfaceHighlight`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-24 `2.3.0`

### 🎉 New features

- Added `backgroundColor`, `color`, `zIndex`, `height` and `width` properties to the Component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-23 `2.2.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-01-27 `2.1.0`

### 🎉 New features

- Rename color properties to `neutral.background`, `primary.surfaceHighlight`, `success.surfaceHighlight`, `warning.surfaceHighlight`, `danger.surfaceHighlight` and `neutral.surfaceHighlight`. ([#76](https://github.com/TiendaNube/nimbus-design-system/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Add `primary.interactiveHover` option to `appearance` property. ([#76](https://github.com/TiendaNube/nimbus-design-system/pull/76) by [@juanchigallego](https://github.com/juanchigallego))

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

## 2022-10-24 `1.2.0`

### 🎉 New features

- Added `visible` e `onVisibility` properties to the component. ([#48](https://github.com/TiendaNube/nimbus-design-system/pull/48) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-21 `1.1.0`

### 🎉 New features

- Added `enabledHover`, `enabledClick`, `enabledDismiss` and `offset` properties to the component. ([#45](https://github.com/TiendaNube/nimbus-design-system/pull/45) by [@juniorconquista](https://github.com/juniorconquista))
- Added `top-start`, `top-end`, `right-start`, `right-end`, `bottom-start`, `bottom-end`, `left-start` and `left-end` position to the component property. ([#45](https://github.com/TiendaNube/nimbus-design-system/pull/45) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-14 `1.0.1`

### 🎉 New features

- Added box-shadow to popover arrow. ([#40](https://github.com/TiendaNube/nimbus-design-system/pull/40) by [@juniorconquista](https://github.com/juniorconquista))
- Added styles so that the popover container has a maximum width relative to the anchor size. ([#40](https://github.com/TiendaNube/nimbus-design-system/pull/40) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-06 `1.0.0`

### 📚 3rd party library updates

- Added `@floating-ui/react-dom-interactions@^0.10.1`. ([#37](https://github.com/TiendaNube/nimbus-design-system/pull/37) by [@juniorconquista](https://github.com/juniorconquista))
- Added `terser-webpack-plugin@5.3.5`. ([#37](https://github.com/TiendaNube/nimbus-design-system/pull/37) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#37](https://github.com/TiendaNube/nimbus-design-system/pull/37) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#37](https://github.com/TiendaNube/nimbus-design-system/pull/37) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#37](https://github.com/TiendaNube/nimbus-design-system/pull/37) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#37](https://github.com/TiendaNube/nimbus-design-system/pull/37) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `children`, `content`, `arrow`, `appearance`, `padding` and `position` properties to the Component. ([#37](https://github.com/TiendaNube/nimbus-design-system/pull/37) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#37](https://github.com/TiendaNube/nimbus-design-system/pull/37) by [@juniorconquista](https://github.com/juniorconquista))
