# Changelog
## 2025-08-13 `1.7.0`

#### 🎉 New features

- Add optional `root` prop to scope portal and backdrop rendering to a provided element. Defaults preserve current behavior. ([#XXX](https://github.com/TiendaNube/nimbus-design-system/pull/XXX) by [@joacotornello](https://github.com/joacotornello))


The Modal component allows us to call the user's attention to a floating box that can have text, actions or forms to perform tasks by changing the focus from the background. It is an intrusive component as it interrupts the user's operation to present a message or content.

## 2025-03-18 `1.6.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2024-08-05 `1.5.3`

### 🐛 Bug fixes

- Made `onDismiss` property optional for `Modal` component. If `onDismiss` is not provided, the modal can no longer be closed by clicking outside or pressing the close button
- Removed the close button (X) from `Modal` component when `onDismiss` is not provided. ([#246](https://github.com/TiendaNube/nimbus-design-system/pull/246) by [@dommirr](https://github.com/dommirr))

## 2023-12-22 `1.5.1`

#### 🎉 New features

- Changed default title size to `h4` on `ModalHeader` subcomponent. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-10-13 `1.5.0`

#### 📚 3rd party library updates

- Updated `@floating-ui/react@0.26.0`. ([#195](https://github.com/TiendaNube/nimbus-design-system/pull/195) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-07-11 `1.4.1`

### 🐛 Bug fixes

- Adding extra right padding to the modal title to prevent the title from getting overlaid by the close button. ([#179](https://github.com/TiendaNube/nimbus-design-system/pull/179) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-06-13 `1.4.0`

#### 🎉 New features

- Added `Padding` property to the Component `Modal.Header`. ([#169](https://github.com/TiendaNube/nimbus-design-system/pull/169) by [@juniorconquista](https://github.com/juniorconquista))
- Added `Padding` property to the Component `Modal.Footer`. ([#169](https://github.com/TiendaNube/nimbus-design-system/pull/169) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-22 `1.3.1`

### 🐛 Bug fixes

- Fixes a bug where focus wasn't correctly moved to the modal dialog when pressing tab key. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))

### 📚 3rd party library updates

- Removed `@floating-ui/react-dom-interactions`. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@floating-ui/react`. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `1.3.0`

### 💡 Others

- Refactored use of `color tokens` in internal components by removing `.` per `-`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-24 `1.2.1`

### 💡 Others

- Adjust `fontSize` and `lineHeight` properties in `Text` component on stories documentation. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-23 `1.2.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-16 `1.1.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `@tiendanube/icons@0.3.1`. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-01-22 `1.0.0`

### 🎉 New features

- Added `children`, `open`, `onDismiss`, `portalId` and `padding` properties to the Component. ([#77](https://github.com/TiendaNube/nimbus-design-system/pull/77) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#77](https://github.com/TiendaNube/nimbus-design-system/pull/77) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Modal.Header` subcomponent. ([#77](https://github.com/TiendaNube/nimbus-design-system/pull/77) by [@juniorconquista](https://github.com/juniorconquista))
- Added `children` and `title` properties to the Component `Modal.Header`. ([#77](https://github.com/TiendaNube/nimbus-design-system/pull/77) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Modal.Body` subcomponent. ([#77](https://github.com/TiendaNube/nimbus-design-system/pull/77) by [@juniorconquista](https://github.com/juniorconquista))
- Added `children` and `padding` properties to the Component `Modal.Body`. ([#77](https://github.com/TiendaNube/nimbus-design-system/pull/77) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Modal.Footer` subcomponent. ([#77](https://github.com/TiendaNube/nimbus-design-system/pull/77) by [@juniorconquista](https://github.com/juniorconquista))
- Added `children` properties to the Component `Modal.Footer`. ([#77](https://github.com/TiendaNube/nimbus-design-system/pull/77) by [@juniorconquista](https://github.com/juniorconquista))
