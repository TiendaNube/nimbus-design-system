# Changelog

Toast allows us to send short messages to the user in a non-intrusive way to communicate component or feedback resulting from some action.
It is a component that appears and disappears after a few seconds. By default, we set the user detection time to 4 seconds, which should be enough for the user to read the message and interfere with its operation.

## 2022-12-07 `1.5.0`

### 🎉 New features

- Changed build build to consume inner package `@nimbus-ds/webpack`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `terser-webpack-plugin@5.3.5`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `ts-loader@9.3.1`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

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
