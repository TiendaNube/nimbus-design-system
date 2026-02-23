# Changelog

The Textarea component allows the user to enter or edit information in long text format.

## 2026-02-12 `2.7.0`

#### 🎉 New features

- Enabled `className` prop forwarding to allow consumers to pass custom CSS classes. ([#426](https://github.com/TiendaNube/nimbus-design-system/pull/426) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-13 `2.6.1`

#### 🎉 New features

- Adds support for React 19. ([#404](https://github.com/TiendaNube/nimbus-design-system/pull/404) by [@joacotornello](https://github.com/joacotornello))

## 2025-10-02 `2.6.0`

#### 🎉 New features

- Added boolean prop `aiGenerated` to `Textarea` to highlight AI-filled values without changing APIs. It applies the AI generative border, white background and a pink focus ring. ([#364](https://github.com/TiendaNube/nimbus-design-system/pull/364) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-23 `2.5.0`

#### 🎉 New features

- Added `autoGrow` property to `Textarea` component, which allows the textarea to grow with content up to the new `maxLines` limit (if provided) and then scroll. Also added `minLines` property to set the minimum height of the textarea to the given number of lines. ([#357](https://github.com/TiendaNube/nimbus-design-system/pull/357) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-17 `2.4.1`

#### 🐛 Bug fixes

- Fixed `ai-generative` appearance to match Nimbus AI gradient style. ([#351](https://github.com/TiendaNube/nimbus-design-system/pull/351) by [@joacotornello](https://github.com/joacotornello))

## 2025-09-15 `2.4.0`

#### 🎉 New features

- Added `ai-generative` appearance to `Textarea` component. ([#351](https://github.com/TiendaNube/nimbus-design-system/pull/351) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `2.3.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2023-07-18 `2.2.0`

#### 🎉 New features

- Added `ref` property to `Textarea` component API. ([#180](https://github.com/TiendaNube/nimbus-design-system/pull/180) by [@juniorconquista](https://github.com/juniorconquista)).

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

## 2022-10-17 `1.0.0`

### 📚 3rd party library updates

- Added `terser-webpack-plugin@5.3.5`. ([#41](https://github.com/TiendaNube/nimbus-design-system/pull/41) by [@juanchigallego](https://github.com/juanchigallego))
- Added `ts-loader@9.3.1`. ([#41](https://github.com/TiendaNube/nimbus-design-system/pull/41) by [@juanchigallego](https://github.com/juanchigallego))
- Added `typescript@4.7.4`. ([#41](https://github.com/TiendaNube/nimbus-design-system/pull/41) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack@5.74.0`. ([#41](https://github.com/TiendaNube/nimbus-design-system/pull/41) by [@juanchigallego](https://github.com/juanchigallego))
- Added `webpack-cli@4.10.0`. ([#41](https://github.com/TiendaNube/nimbus-design-system/pull/41) by [@juanchigallego](https://github.com/juanchigallego))

### 🎉 New features

- Added `appearance`, `lines` and `id` properties to the component Textarea. ([#41](https://github.com/TiendaNube/nimbus-design-system/pull/41) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories on component. ([#41](https://github.com/TiendaNube/nimbus-design-system/pull/41) by [@juanchigallego](https://github.com/juanchigallego))
- Created new `Textarea.Skeleton` subcomponent. ([#41](https://github.com/TiendaNube/nimbus-design-system/pull/41) by [@juanchigallego](https://github.com/juanchigallego))
- Added `width` property to the subcomponent `Textarea.Skeleton`. ([#41](https://github.com/TiendaNube/nimbus-design-system/pull/41) by [@juanchigallego](https://github.com/juanchigallego))
- Added stories on subcomponent `Textarea.Skeleton`. ([#41](https://github.com/TiendaNube/nimbus-design-system/pull/41) by [@juanchigallego](https://github.com/juanchigallego))
