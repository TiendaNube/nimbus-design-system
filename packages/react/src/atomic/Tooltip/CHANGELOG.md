# Changelog

The Tooltip component allows us to display additional information in a non-intrusive way.

## 2026-04-10 `2.7.1`

#### 🐛 Bug fixes

- Fixed misalignment with trigger element by separating the floating position container (`floatingStyles`) from the animated content div, preventing `@floating-ui` positioning transforms from conflicting with CSS animation transforms.
- Added exit transition via `useTransitionStyles`: enter 180ms / exit 120ms with `out.quint` easing and dynamic `transform-origin` based on the placement side.

## 2026-02-12 `2.7.0`

#### 🎉 New features

- Enabled `className` prop forwarding to allow consumers to pass custom CSS classes. ([#426](https://github.com/TiendaNube/nimbus-design-system/pull/426) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-13 `2.6.2`

#### 🎉 New features

- Adds support for React 19. ([#404](https://github.com/TiendaNube/nimbus-design-system/pull/404) by [@joacotornello](https://github.com/joacotornello))

## 2025-10-22 `2.6.1`

#### 🐛 Bug fixes

- `Tooltip`: Fixed tooltip arrow color to match the design system ([#368](https://github.com/TiendaNube/nimbus-design-system/pull/368) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `2.6.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-07 `2.5.1`

#### 💡 Others

- Added docs. ([#272](https://github.com/TiendaNube/nimbus-design-system/pull/272) by [@joacotornello](https://github.com/joacotornello))

## 2025-02-27 `2.5.0`

#### 🐛 Bug fixes

- Fixed overflow when screen size is small enough. ([#268](https://github.com/TiendaNube/nimbus-design-system/pull/268) by [@joacotornello](https://github.com/joacotornello))

#### 🐛 New features

- Adds support for maxWidth prop. ([#268](https://github.com/TiendaNube/nimbus-design-system/pull/268) by [@joacotornello](https://github.com/joacotornello))

## 2023-10-13 `2.4.0`

#### 🎉 New features

- Added `arrow` property to the Component. ([#196](https://github.com/TiendaNube/nimbus-design-system/pull/196) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Updated `@floating-ui/react@0.26.0`. ([#196](https://github.com/TiendaNube/nimbus-design-system/pull/196) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-07-11 `2.3.0`

### 📚 3rd party library updates

- Updated `@floating-ui/react@0.24.6`. ([#179](https://github.com/TiendaNube/nimbus-design-system/pull/179) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-05-22 `2.2.1`

### 📚 3rd party library updates

- Removed `@floating-ui/react-dom-interactions`. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@floating-ui/react`. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-13 `2.2.0`

### 💡 Others

- Refactored use of `color tokens` in internal components by removing `.` per `-`. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
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

## 2022-10-14 `1.0.3`

### 🎉 New features

- Added styles so that the tooltip container has a maximum width relative to the anchor size. ([#40](https://github.com/TiendaNube/nimbus-design-system/pull/40) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-06 `1.0.1`

### 💡 Others

- Refactored tooltip package color scheme. ([#37](https://github.com/TiendaNube/nimbus-design-system/pull/37) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-01 `1.0.0`

### 📚 3rd party library updates

- Added `@floating-ui/react-dom-interactions@^0.10.1`. ([#34](https://github.com/TiendaNube/nimbus-design-system/pull/34) by [@juniorconquista](https://github.com/juniorconquista))
- Added `terser-webpack-plugin@5.3.5`. ([#34](https://github.com/TiendaNube/nimbus-design-system/pull/34) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-loader@9.3.1`. ([#34](https://github.com/TiendaNube/nimbus-design-system/pull/34) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#34](https://github.com/TiendaNube/nimbus-design-system/pull/34) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack@5.74.0`. ([#34](https://github.com/TiendaNube/nimbus-design-system/pull/34) by [@juniorconquista](https://github.com/juniorconquista))
- Added `webpack-cli@4.10.0`. ([#34](https://github.com/TiendaNube/nimbus-design-system/pull/34) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added `children`, `content` and `position` properties to the Component. ([#34](https://github.com/TiendaNube/nimbus-design-system/pull/34) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on Component. ([#34](https://github.com/TiendaNube/nimbus-design-system/pull/34) by [@juniorconquista](https://github.com/juniorconquista))
