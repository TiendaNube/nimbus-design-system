# Changelog

The File Uploader component is used to upload files.

## 2025-12-12 `2.8.2`

#### 🐛 Bug fixes

- Fixes `FileUploaderOverlay` component to use the correct text alignment. ([#392](https://github.com/TiendaNube/nimbus-design-system/pull/392) by [@joacotornello](https://github.com/joacotornello))

## 2025-12-11 `2.8.1`

#### 🐛 Bug fixes

- Fixes `FileUploaderOverlay` component to use the correct background color and border color. ([#388](https://github.com/TiendaNube/nimbus-design-system/pull/388) by [@joacotornello](https://github.com/joacotornello))
- Fixes `FileUploader` to use `asOverlay` property to render a custom overlay when dragging files over the uploader. Better API usage. ([#388](https://github.com/TiendaNube/nimbus-design-system/pull/388) by [@joacotornello](https://github.com/joacotornello))

## 2025-12-09 `2.8.0`

#### 🎉 New features

- Adds `dragOverlay` property to render a custom overlay when dragging files over the uploader. ([#387](https://github.com/TiendaNube/nimbus-design-system/pull/387) by [@joacotornello](https://github.com/joacotornello))

## 2025-11-11 `2.7.0`

#### 🎉 New features

- Adds drag and drop support to the component. ([#378](https://github.com/TiendaNube/nimbus-design-system/pull/378) by [@joacotornello](https://github.com/joacotornello))
- Adds `onDrop`, `onDropReject` and `onDropSuccess` callbacks to the component. ([#378](https://github.com/TiendaNube/nimbus-design-system/pull/378) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `2.6.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2023-03-13 `2.5.0`

### 💡 Others

- Refactored use of `color tokens` in internal components by removing `.` per `-`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-24 `2.4.1`

### 💡 Others

- Add `fontSize caption` property on `Text` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

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

- Removed `@vanilla-extract/webpack-plugin@2.1.11`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `terser-webpack-plugin@5.3.5`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `ts-loader@9.3.1`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack-cli@4.10.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `webpack@5.74.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `typescript@4.7.4`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-18 `1.1.0`

### 📚 3rd party library updates

- Updated `@tiendanube/icons@0.3.1`. ([#57](https://github.com/TiendaNube/nimbus-design-system/pull/#57) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-28 `1.0.0`

### 📚 3rd party library updates

- Added `@vanilla-extract/dynamic@2.0.2`. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@vanilla-extract/webpack-plugin@2.1.11`. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
- Added `terser-webpack-plugin@5.3.5`. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `children`, `aspectRatio`, `width`, `placeholder`, `accept`, `height` and `flexDirection` properties to the Component. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `FileUploader.Skeleton` subcomponent. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
- Added `width`, `aspectRatio` and `height` properties to the Component `FileUploader.Skeleton`. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component `FileUploader.Skeleton`. ([#51](https://github.com/TiendaNube/nimbus-design-system/pull/51) by [@juniorconquista](https://github.com/juniorconquista))
