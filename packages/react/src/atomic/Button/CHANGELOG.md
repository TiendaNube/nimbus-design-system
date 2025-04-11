# Changelog

The Button component allows us to initiate actions, make state or page changes.

## 2025-03-18 `2.6.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2023-03-24 `2.5.0`

### 💡 Others

- Adjusted the component properties interface to use `ComponentPropsWithRef` and include the `as` prop in the output interface. ([#134](https://github.com/TiendaNube/nimbus-design-system/pull/134) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-23 `2.4.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-16 `2.3.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `@tiendanube/icons@0.3.1`. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-13 `2.2.0`

### 🎉 New features

- Added polymorphic typing support to component. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))
- Added `as` property to the Component. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Removed subcomponent `Button.Link`. [#89](https://github.com/TiendaNube/nimbus-design-system/pull/#89) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-06 `2.1.0`

### 🎉 New features

- Added new `Button.Link` subcomponent. [#78](https://github.com/TiendaNube/nimbus-design-system/pull/#78) by [@juanchigallego](https://github.com/juanchigallego))
- Added `Button.Link` stories documentation to `Button` stories. [#78](https://github.com/TiendaNube/nimbus-design-system/pull/#78) by [@juanchigallego](https://github.com/juanchigallego))

## 2022-12-22 `2.0.0`

### 💡 Others

- Removed direct dependency on `nimbus-ds/styles` package from component build. ([#69](https://github.com/TiendaNube/nimbus-design-system/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-14 `1.6.0`

- Add new `transparent` appearance. ([#67](https://github.com/TiendaNube/nimbus-design-system/pull/67) by [@juanchigallego](https://github.com/juanchigallego))

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

## 2022-09-28 `1.0.0`

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `children`, `appearance` and `disabled` properties to the Component. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Button.Skeleton` subcomponent. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added `width` properties to the Component `Button.Skeleton`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `Button.Skeleton`. ([#32](https://github.com/TiendaNube/nimbus-design-system/pull/32) by [@juniorconquista](https://github.com/juniorconquista))
