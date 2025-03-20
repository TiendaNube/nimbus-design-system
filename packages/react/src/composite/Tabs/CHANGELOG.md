# Changelog

The Tabs component allows us to separate content from the same hierarchy into different tabs.

## 2025-03-18 `2.4.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2024-12-18 `2.3.0`

#### 🐛 Bug fixes

- We detected that the content of the Tabs, when set to full, was not centered but aligned to the left. ([#261](https://github.com/TiendaNube/nimbus-design-system/pull/261) by [@harrytiendanube](https://github.com/harrytiendanube) )

## 2024-01-18 `2.3.0`

### 🎉 New features

- Add `labelContent` prop to `Tabs.Item` subcomponent to include a child node on the tab button. ([#216](https://github.com/TiendaNube/nimbus-design-system/pull/216) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `2.2.0`

### 💡 Others

- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

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

## 2022-11-14 `1.0.0`

### 📚 3rd party library updates

- Added `@vanilla-extract/dynamic@2.0.2`. ([#55](https://github.com/TiendaNube/nimbus-design-system/pull/55) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@vanilla-extract/webpack-plugin@2.1.11`. ([#55](https://github.com/TiendaNube/nimbus-design-system/pull/55) by [@juanchigallego](https://github.com/juanchigallego))
- Added `terser-webpack-plugin@5.3.5`. ([#55](https://github.com/TiendaNube/nimbus-design-system/pull/55) by [@juanchigallego](https://github.com/juanchigallego))
- Added `ts-loader@9.3.1`. ([#55](https://github.com/TiendaNube/nimbus-design-system/pull/55) by [@juanchigallego](https://github.com/juanchigallego))
- Added `typescript@4.7.4`. ([#55](https://github.com/TiendaNube/nimbus-design-system/pull/55) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack@5.74.0`. ([#55](https://github.com/TiendaNube/nimbus-design-system/pull/55) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack-cli@4.10.0`. ([#55](https://github.com/TiendaNube/nimbus-design-system/pull/55) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added `children`, `preSelectedTab` and `fullWidth` properties to the component API. [#55](https://github.com/TiendaNube/nimbus-design-system/pull/#55) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories to the component. [#55](https://github.com/TiendaNube/nimbus-design-system/pull/#55) by [@juanchigallego](https://github.com/juanchigallego))
- Added `Tabs.Button` subcomponent. [#55](https://github.com/TiendaNube/nimbus-design-system/pull/#55) by [@juanchigallego](https://github.com/juanchigallego))
- Added `label`, `active`, `index`, `setActiveTab` and `fullWidth` properties to the `Tabs.Button` subcomponent. [#55](https://github.com/TiendaNube/nimbus-design-system/pull/#55) by [@juanchigallego](https://github.com/juanchigallego))
- Added `Tabs.Item` subcomponent. [#55](https://github.com/TiendaNube/nimbus-design-system/pull/#55) by [@juanchigallego](https://github.com/juanchigallego))
- Added `label` and `children` properties to the `Tabs.Item` subcomponent. [#55](https://github.com/TiendaNube/nimbus-design-system/pull/#55) by [@juanchigallego](https://github.com/juanchigallego))
