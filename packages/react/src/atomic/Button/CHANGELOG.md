# Changelog

The Button component allows us to initiate actions, make state or page changes.

## 2026-11-24 `2.13.0`

#### 🎉 New features

- Adds `appearance="success"` and `appearance="warning"`. The default stays `neutral`, so Buttons that use the default appearance are unchanged. In `next-norteui` and `next-norteui-dark` they are filled buttons like `danger` (`interactive` background, tone hover and pressed, `surfaceDisabled` when disabled), as in the Norte UI Figma, with a `textHigh` label in `next-norteui` and a dark tone `surface` label in `next-norteui-dark`; in `base`, `dark`, `next` and `next-dark` they follow the danger Button of that theme with their own tone, and the pressed label changes to `textHigh` (`base`, `next`) or the tone `surface` (`dark`, `next-dark`). The label stays at or above 4.5:1 (WCAG AA) at rest, on hover and when pressed in every theme. ([#673](https://github.com/TiendaNube/nimbus-design-system/pull/673) by [@noecondoleo](https://github.com/noecondoleo))
- Visual change for screens rendered with `next-norteui` or `next-norteui-dark`: the `transparent` Button hover goes from `neutral.surface` to `neutral.surfaceHighlight`, and pressed from `neutral.surfaceHighlight` to `neutral.interactive`, as in the Norte UI Figma. Not a breaking change under Decision 0081: Norte UI ships as `minor` because both themes are opt-in, and `base`, `dark`, `next` and `next-dark` keep the exact previous Button (verified by `yarn check:base-invariance`). ([#673](https://github.com/TiendaNube/nimbus-design-system/pull/673) by [@noecondoleo](https://github.com/noecondoleo))

#### 🐛 Bug fixes

- The pressed `danger` label now reaches at least 4.5:1 (WCAG AA) in every theme. It goes white in `base` and `next` (2.53:1 → 6.07:1) and in `dark` and `next-dark` (3.18:1 → 5.10:1), and to the dark danger `surface` in `next-norteui-dark` (2.62:1 → 7.00:1). `next-norteui` was already 5.40:1. Intended visual change, approved by design, limited to the pressed state: rest and hover are unchanged. ([#PR](https://github.com/TiendaNube/nimbus-design-system/pull/PR) by [@noecondoleo](https://github.com/noecondoleo))

## 2026-11-11 `2.12.0`

#### 🎉 New features

- `Button` and `Button.Skeleton` read their sizes and colors from the theme and follow the Norte UI design in `next-norteui` and `next-norteui-dark`. The props are unchanged. Visual change for screens rendered with `next-norteui` or `next-norteui-dark`: heights go from `1.75rem` / `2rem` / `2.75rem` to `1.5rem` / `1.75rem` / `2rem` (small / medium / large); radius goes from `8px` (`12px` in large) to `6px`; padding goes to `4px 8px` (small) and `4px 12px` (medium and large); the large gap goes from `8px` to `4px`; danger becomes a filled button (`danger.interactive` background, `danger.textHigh` text); the focus ring becomes `2px` `neutral.textLow`; primary and neutral disabled colors change; transparent loses its hover and pressed border; ai-secondary uses AI text and surface colors and a lighter hover glow. `Button.Skeleton` follows the medium Button in the same themes: height `2rem` → `1.75rem`, radius `0.5rem` → `6px`. Pressed `ai-primary` and `ai-secondary` use the `aiGenerativePressed` gradient (unchanged look outside Norte UI). Not a breaking change under Decision 0081: Norte UI ships as `minor` because both themes are opt-in, and `base`, `dark`, `next` and `next-dark` keep the exact previous Button (verified by `yarn check:base-invariance`). ([#628](https://github.com/TiendaNube/nimbus-design-system/pull/628) by [@noecondoleo](https://github.com/noecondoleo))

## 2026-02-12 `2.11.0`

#### 🎉 New features

- Enabled `className` prop forwarding to allow consumers to pass custom CSS classes. ([#426](https://github.com/TiendaNube/nimbus-design-system/pull/426) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-13 `2.10.1`

#### 🎉 New features

- Adds support for React 19. ([#404](https://github.com/TiendaNube/nimbus-design-system/pull/404) by [@joacotornello](https://github.com/joacotornello))

## 2025-11-13 `2.10.0`

#### 🎉 New features

- Added `large` size to `Button` component. ([#383](https://github.com/TiendaNube/nimbus-design-system/pull/383) by [@joacotornello](https://github.com/joacotornello))

## 2025-10-17 `2.9.0`

#### 🎉 New features

- Added `size` property to `Button` component with support for `small` and `medium` sizes. ([365](https://github.com/TiendaNube/nimbus-design-system/pull/PR) by [@usuario](https://github.com/usuario))

## 2025-09-17 `2.8.0`

#### 🎉 New features

- New `ai-primary` and `ai-secondary` appearances to `Button` component to match Nimbus AI gradient style. ([#353](https://github.com/TiendaNube/nimbus-design-system/pull/353) by [@joacotornello](https://github.com/joacotornello))
- Added `:hover` and `:active` properties to `Button` component AI State to improve hover and active states. ([#353](https://github.com/TiendaNube/nimbus-design-system/pull/353) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-04 `2.7.0`

#### 🎉 New features

- Added `fullWidth` property to the component. ([#322](https://github.com/TiendaNube/nimbus-design-system/pull/322) by [@joacotornello](https://github.com/joacotornello))

## 2025-07-10 `2.6.1`

#### 🐛 Bug fixes

- Adjusted button height from `2.125rem` to `2rem` to match design specifications. ([#310](https://github.com/TiendaNube/nimbus-design-system/pull/310) by [@joacotornello](https://github.com/joacotornello))

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
