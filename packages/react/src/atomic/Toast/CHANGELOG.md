# Changelog

The Toast component allows us to notify users in an informational tone, describing that something has happened or is happening, without interrupting navigation.

## 2026-02-03 `2.5.0`

#### 🎉 New features

- Added `offset` prop to `ToastProvider` to control vertical positioning from the bottom. Use `"high"` for mobile apps with bottom navigation bars. ([#416](https://github.com/TiendaNube/nimbus-design-system/pull/416) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-13 `2.4.1`

#### 🎉 New features

- Adds support for React 19. ([#404](https://github.com/TiendaNube/nimbus-design-system/pull/404) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `2.4.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2024-03-18 `2.3.1`

### 🐛 Bug fixes

- Fixed type bug on expected icon and text color values. ([#233](https://github.com/TiendaNube/nimbus-design-system/pull/233) by [@juanchigallego](https://github.com/juanchigallego))

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

## 2022-12-16 `1.5.1`

### 🎉 New features

- Update color rules. ([#67](https://github.com/TiendaNube/nimbus-design-system/pull/67) by [@juanchigallego](https://github.com/juanchigallego))

## 2022-12-07 `1.5.0`

### 🎉 New features

- Changed build build to consume inner package `@nimbus-ds/webpack`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `terser-webpack-plugin@5.3.5`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `ts-loader@9.3.1`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack-cli@4.10.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack@5.74.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `typescript@4.7.4`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-18 `1.3.0`

### 📚 3rd party library updates

- Updated `@tiendanube/icons@0.3.1`. ([#57](https://github.com/TiendaNube/nimbus-design-system/pull/#57) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-01 `1.2.0`

### 🎉 New features

- Added displayName to component `Toast`. ([#34](https://github.com/TiendaNube/nimbus-design-system/pull/34) by [@juniorconquista](https://github.com/juniorconquista))
- Added displayName to component `ToastProvider`. ([#34](https://github.com/TiendaNube/nimbus-design-system/pull/34) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-24 `1.1.0`

### 💡 Others

- Adjusted `fontSize` size of internal `Text` component from `small` to `caption`. ([#29](https://github.com/TiendaNube/nimbus-design-system/pull/29) by [@juniorconquista](https://github.com/juniorconquista))
- Adjusted `lineHeight` size of internal `Text` component from `small` to `caption`. ([#29](https://github.com/TiendaNube/nimbus-design-system/pull/29) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-21 `1.0.0`

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `id`, `type`, `text`, `duration`, `autoClose` and `position` properties to the Component. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `ToastProvider` subcomponent. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `ToastContext` context to use `ToastProvider`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `useToast` hook. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
