# Changelog

Use a multi-select box when a user needs to select more than one option from a list.

## 2026-04-14 `1.2.3`

#### 🐛 Bug fixes

- Reduced container padding to `spacing[1]` (4px) on all sides and added `display: flex; align-items: center` to vertically center placeholder and chips within the container.

## 2026-04-06 `1.2.2`

#### 🐛 Bug fixes

- Trigger border radius matches `Select` (`radius.base`, 6px) via `@nimbus-ds/styles`. ([#455](https://github.com/TiendaNube/nimbus-design-system/pull/455) by [@noecondoleo](https://github.com/noecondoleo))

## 2026-02-12 `1.2.0`

#### 🎉 New features

- Enabled `className` prop forwarding to allow consumers to pass custom CSS classes. ([#426](https://github.com/TiendaNube/nimbus-design-system/pull/426) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-13 `1.1.1`

#### 🎉 New features

- Adds support for React 19. ([#404](https://github.com/TiendaNube/nimbus-design-system/pull/404) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `1.1.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2023-12-15 `1.0.1`

#### 🐛 Bug fixes

- Fixed bug where value was not being updated.([#203](https://github.com/TiendaNube/nimbus-design-system/pull/212) by [@vrlopess](https://github.com/vrlopess))

## 2023-10-30 `1.0.0`

#### 🎉 New features

- Added `name`, `id`, `appearance`, `options` and `onChange` properties to the component. ([#203](https://github.com/TiendaNube/nimbus-design-system/pull/203) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on component. ([#203](https://github.com/TiendaNube/nimbus-design-system/pull/203) by [@juniorconquista](https://github.com/juniorconquista))
- Added `width` property to the component `Select.Skeleton`. ([#203](https://github.com/TiendaNube/nimbus-design-system/pull/203) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories on component `Select.Skeleton`. ([#203](https://github.com/TiendaNube/nimbus-design-system/pull/203) by [@juniorconquista](https://github.com/juniorconquista))
