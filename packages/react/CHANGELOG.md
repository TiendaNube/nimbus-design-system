# Changelog

This package is intended for internal use in generating builds of each design system package. It contains all the necessary settings and dependencies to optimize the creation of our builds.

## 2023-02-24 `2.10.0`

### 🎉 New features

- Added `fontSize`, `fontWeight` and `lineHeight` properties to `Title` component API. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Changed `cursor` property default value to `inherit` on `Icon` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Added `zIndex`, `minHeight` and `minWidth` property to `Box` component API. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Added `"border-box"` as default value for `boxSizing` property on `Box` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Added `backgroundImage`, `backgroundPosition`, `backgroundBlendMode`, `backgroundRepeat`, `backgroundSize`, `color`, `minWidth` and `minHeight` properties to `Box` component API. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Changed `fontSize` default value to `base` on `Text` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Changed `lineHeight` default value to `base` on `Text` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Changed `color` default value to `neutral.textLow` on `Text` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Added `as` prop on `Table.Cell` subcomponente API. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Replaced `size` property with `fontSize` on `Link` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Added `lineHeight` property to `Link` component API. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Added `backgroundColor`, `color`, `zIndex`, `height` and `width` property to `Popover` component API. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Replaced font size and line height on `Text` component on `Badge` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Reset font size and line height values on `Text` component to default values on `Checkbox` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Reset color value on `Text` component to default value on `Chip` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Add `lineHeight caption` property on `Text` component on `Chip` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Add `fontSize caption` property on `Text` component on `FileUploader` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust `fontSize` and `color` properties in `Text` component on stories documentation on `Link` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust `fontSize` and `lineHeight` properties in `Text` component on stories documentation on `Tag` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust `Text` component default values on `Toggle` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust `Text` component default values on `Accordion` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust `Text` component default values in stories documentation on `Accordion` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust `fontSize` and `lineHeight` properties in `Text` component on stories documentation on `Card` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust `fontSize` and `lineHeight` properties in `Text` component on stories documentation on `Modal` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Adjust `fontSize` and `lineHeight` properties in `Text` component on stories documentation on `Sidebar` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

### 🐛 Bug fixes

- Fixed a bug where `rest` condition selector sprinkle would not work in `Table` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Fixed a bug where `Pagination` component was not being exported in the package. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-23 `2.9.0`

### 🎉 New features

- Added server side-rendering support to component `Badge`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Box`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Button`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Checkbox`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Chip`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `FileUploader`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Icon`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `IconButton`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Input`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Label`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `List`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Popover`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Radio`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Select`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Skeleton`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Spinner`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Tag`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Text`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Textarea`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Thumbnail`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Tilte`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Toast`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Toggle`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Tooltip`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Accordion`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Alert`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Card`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Modal`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Pagination`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Sidebar`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Table`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))
- Added server side-rendering support to component `Tabs`. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-16 `2.8.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use inner package `@nimbus-ds/icons` in packages `@nimbus-ds/button`, `@nimbus-ds/chip`, `@nimbus-ds /file-uploader`, `@nimbus-ds/icon`, `@nimbus-ds/icon-button`, `@nimbus-ds/input`, `@nimbus-ds/label`, `@nimbus-ds/link`, `@nimbus-ds/tag`, `@nimbus-ds/thumbnail` and `@nimbus-ds/toast`. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `@tiendanube/icons@0.3.1`. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-13 `2.7.0`

### 🎉 New features

- Added polymorphic typing support to component `Button`. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))
- Added `as` property to the Component `Button`. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))
- Added polymorphic typing support to component `Lnk`. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))
- Added `as` property to the Component `Lnk`. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Removed subcomponent `Link.Button`. [#89](https://github.com/TiendaNube/nimbus-design-system/pull/#89) by [@juniorconquista](https://github.com/juniorconquista))
- Removed subcomponent `Button.Link`. [#89](https://github.com/TiendaNube/nimbus-design-system/pull/#89) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-09 `2.3.0`

### 🎉 New features

- Added properties present in the `@nimbus-ds/stack` package to the box component package. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Deprecated package `@nimbus-ds/stack`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-08 `2.2.0`

### 🎉 New features

- Added polymorphic typing support to component `Box`. ([#81](https://github.com/TiendaNube/nimbus-design-system/pull/81) by [@juniorconquista](https://github.com/juniorconquista))
- Added `as` property to the Component `Box`. ([#81](https://github.com/TiendaNube/nimbus-design-system/pull/81) by [@juniorconquista](https://github.com/juniorconquista))
- Added `auto` margin properties to the Component `Box`. ([#81](https://github.com/TiendaNube/nimbus-design-system/pull/81) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-07 `2.4.0`

### 🎉 New features

- Added new composite `Accordion` component. ([#80](https://github.com/TiendaNube/nimbus-design-system/pull/80) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-01 `2.3.0`

### 🎉 New features

- Added new composite `Modal` component. ([#77](https://github.com/TiendaNube/nimbus-design-system/pull/77) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-01-27 `2.2.0`

### 🎉 New features

- Added new options to `appearance` property on `Popover` component. ([#76](https://github.com/TiendaNube/nimbus-design-system/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Added new options to `appearance` property on `Link` component. ([#76](https://github.com/TiendaNube/nimbus-design-system/pull/76) by [@juanchigallego](https://github.com/juanchigallego))
- Added new properties to `Box` component. ([#76](https://github.com/TiendaNube/nimbus-design-system/pull/76) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-01-09 `2.1.0`

### 🎉 New features

- Added new composite `Table` component. ([#72](https://github.com/TiendaNube/nimbus-design-system/pull/72) by [@juanchigallego](https://github.com/juanchigallego))

## 2022-12-22 `2.0.0`

### 💡 Others

- Removed direct dependency on package 'nimbus-ds/styles' from compilation of all components. ([#69](https://github.com/TiendaNube/nimbus-design-system/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-20 `1.1.0`

### 🎉 New features

- Added new composite `Pagination` component. ([#68](https://github.com/TiendaNube/nimbus-design-system/pull/68) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-15 `1.0.2`

### 🐛 Bug fixes

- Fixed bug in the `textDecoration` property where the `none` option was not applied when the link contained the `href` property. ([#66](https://github.com/TiendaNube/nimbus-design-system/pull/66) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-07 `1.0.0`

### 📚 3rd party library updates

- Added `webpack@5.75.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
