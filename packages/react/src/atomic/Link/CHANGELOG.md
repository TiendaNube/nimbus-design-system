# Changelog

The Link component allows us to navigate to external addresses.

## 2025-03-18 `4.2.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2023-03-24 `4.1.0`

### 💡 Others

- Adjusted the component properties interface to use `ComponentPropsWithRef` and include the `as` prop in the output interface. ([#134](https://github.com/TiendaNube/nimbus-design-system/pull/134) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-13 `4.0.0`

### 🛠 Breaking changes

- Changed appearance property from `neutral.background` to `neutral-background`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-24 `3.6.0`

### 🎉 New features

- Replaced `size` property with `fontSize`. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Added `lineHeight` property to component API. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

### 💡 Others

- Adjust `fontSize` and `color` properties in `Text` component on stories documentation. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-23 `3.5.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-16 `3.4.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `@tiendanube/icons@0.3.1`. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-13 `3.3.0`

### 🎉 New features

- Added polymorphic typing support to component. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))
- Added `as` property to the Component. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Removed subcomponent `Link.Button`. [#89](https://github.com/TiendaNube/nimbus-design-system/pull/#89) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-06 `3.2.0`

### 🎉 New features

- Added new `Link.Button` subcomponent. [#78](https://github.com/TiendaNube/nimbus-design-system/pull/#78) by [@juanchigallego](https://github.com/juanchigallego))
- Added `Link.Button` stories documentation to `Link` stories. [#78](https://github.com/TiendaNube/nimbus-design-system/pull/#78) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-01-27 `3.1.0`

### 🎉 New features

- Add `neutral.background` option to `appearance` property. ([#76](https://github.com/TiendaNube/nimbus-design-system/pull/76) by [@juanchigallego](https://github.com/juanchigallego))

## 2022-12-22 `3.0.0`

### 💡 Others

- Removed direct dependency on `nimbus-ds/styles` package from component build. ([#69](https://github.com/TiendaNube/nimbus-design-system/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-15 `2.1.3`

### 🐛 Bug fixes

- Fixed bug in the `textDecoration` property where the `none` option was not applied when the link contained the `href` property. ([#66](https://github.com/TiendaNube/nimbus-design-system/pull/66) by [@juniorconquista](https://github.com/juniorconquista))

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

### 💡 Others

- Removed `as` property to the component. ([#61](https://github.com/TiendaNube/nimbus-design-system/pull/61) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored component style pack. ([#61](https://github.com/TiendaNube/nimbus-design-system/pull/61) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-18 `1.1.0`

### 📚 3rd party library updates

- Updated `@tiendanube/icons@0.3.1`. ([#57](https://github.com/TiendaNube/nimbus-design-system/pull/#57) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-30 `1.0.0`

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#35](https://github.com/TiendaNube/nimbus-design-system/pull/35) by [@juanchigallego](https://github.com/juanchigallego))
- Added `ts-loader@9.3.1`. ([#35](https://github.com/TiendaNube/nimbus-design-system/pull/35) by [@juanchigallego](https://github.com/juanchigallego))
- Added `typescript@4.7.4`. ([#35](https://github.com/TiendaNube/nimbus-design-system/pull/35) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack@5.74.0`. ([#35](https://github.com/TiendaNube/nimbus-design-system/pull/35) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack-cli@4.10.0`. ([#35](https://github.com/TiendaNube/nimbus-design-system/pull/35) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added `appearance`, `as`, `textDecoration`, `children` and `size` properties to the component. ([#35](https://github.com/TiendaNube/nimbus-design-system/pull/35) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories to component. ([#35](https://github.com/TiendaNube/nimbus-design-system/pull/35) by [@juanchigallego](https://github.com/juanchigallego))
- Created new `Link.Skeleton` subcomponent. ([#35](https://github.com/TiendaNube/nimbus-design-system/pull/35) by [@juanchigallego](https://github.com/juanchigallego))
- Added `width`, `height` and `borderRadius` properties to the component `Link.Skeleton`. ([#35](https://github.com/TiendaNube/nimbus-design-system/pull/35) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories to the component `Link.Skeleton`. ([#35](https://github.com/TiendaNube/nimbus-design-system/pull/35) by [@juanchigallego](https://github.com/juanchigallego))
