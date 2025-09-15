# Changelog

## 2025-09-15 `3.5.1`

#### 🐛 Bug fixes

- Restored `FloatingOverlay` to be a sibling of the content, to avoid breaking consumers that were modifying the component via custom styling. This will be reverted in the next major version, or when consumers fix their custom styling. ([#349](https://github.com/TiendaNube/nimbus-design-system/pull/349) by [@joacotornello](https://github.com/joacotornello))
## 2025-08-25 `3.5.0`

#### 🎉 New features

- Add optional `root` prop to scope portal and backdrop rendering to a provided elements. ([#336](https://github.com/TiendaNube/nimbus-design-system/pull/336) by [@joacotornello](https://github.com/joacotornello))

The Sidebar component is a large floating container that goes into the page from the corners. It allows us to present actions, forms or sections with a lot of information about the context of the page.

## 2025-03-18 `3.4.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2024-04-22 `3.3.1`

#### 🐛 Bug fixes

- Added `lockScroll` to prevent scroll outside of the body of `Sidebar` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/240) by [@nachozullo](https://github.com/nachozullo))

## 2024-04-15 `3.3.0`

#### 🐛 Bug fixes

- Added `RemoveScroll` component from `react-remove-scroll` library to prevent scroll resetting on the body of the `Sidebar` component. ([#233](https://github.com/TiendaNube/nimbus-design-system/pull/233) by [@juanchigallego](https://github.com/juanchigallego))

#### 📚 3rd party library updates

- Added `react-remove-scroll@2.5.7`. ([#233](https://github.com/TiendaNube/nimbus-design-system/pull/233) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-12-22 `3.2.1`

#### 🎉 New features

- Changed default title size to `h2` on `SidebarHeader` subcomponent. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-10-13 `3.2.0`

#### 📚 3rd party library updates

- Updated `@floating-ui/react@0.26.0`. ([#195](https://github.com/TiendaNube/nimbus-design-system/pull/195) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-07-11 `3.1.0`

#### 📚 3rd party library updates

- Updated `@floating-ui/react@0.24.6`. ([#179](https://github.com/TiendaNube/nimbus-design-system/pull/179) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-05-18 `3.0.0`

#### 🛠 Breaking changes

- Changed the dynamic sending option of the `zIndex` property to use `zIndex` in the component API. ([#162](https://github.com/TiendaNube/nimbus-design-system/pull/162) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-22 `2.2.1`

### 📚 3rd party library updates

- Removed `@floating-ui/react-dom-interactions`. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@floating-ui/react`. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `2.2.0`

### 💡 Others

- Refactored use of `color tokens` in internal components by removing `.` per `-`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-24 `2.1.1`

### 💡 Others

- Adjust `fontSize` and `lineHeight` properties in `Text` component on stories documentation. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-23 `2.1.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

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

## 2022-12-01 `1.2.0`

### 🎉 New features

- Added `zIndex` property to the component. ([#61](https://github.com/TiendaNube/nimbus-design-system/pull/61) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-24 `1.1.0`

### 🎉 New features

- Added `maxWidth` property to the Component. ([#58](https://github.com/TiendaNube/nimbus-design-system/pull/58) by [@juniorconquista](https://github.com/juniorconquista))
- Added `padding` properties to the Component `Sidebar.Header`. ([#58](https://github.com/TiendaNube/nimbus-design-system/pull/58) by [@juniorconquista](https://github.com/juniorconquista))
- Added `padding` properties to the Component `Sidebar.Footer`. ([#58](https://github.com/TiendaNube/nimbus-design-system/pull/58) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-16 `1.0.0`

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juanchigallego](https://github.com/juanchigallego))
- Added `ts-loader@9.3.1`. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juanchigallego](https://github.com/juanchigallego))
- Added `typescript@4.7.4`. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack@5.74.0`. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack-cli@4.10.0`. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added `position`, `padding`, `children`, `onRemove` and `open` properties to the Component. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Sidebar.Header` subcomponent. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juniorconquista](https://github.com/juniorconquista))
- Added `children` and `title` properties to the Component `Sidebar.Header`. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Sidebar.Body` subcomponent. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juniorconquista](https://github.com/juniorconquista))
- Added `children` and `padding` properties to the Component `Sidebar.Body`. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `Sidebar.Footer` subcomponent. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juniorconquista](https://github.com/juniorconquista))
- Added `children` properties to the Component `Sidebar.Footer`. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juniorconquista](https://github.com/juniorconquista))
