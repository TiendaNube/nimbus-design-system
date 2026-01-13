# Changelog

This package is intended for internal use in generating custom script builds at design system build time.

## 2026-01-13 `1.8.1`

#### 🐛 Bug fixes

- Fixed `typescript-json-schema` to skip lib check and adds better error handling. ([#350](https://github.com/TiendaNube/nimbus-design-system/pull/350) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-05 `1.8.0`

#### 🎉 New features

- Added `publish-rc` script to publish Release Candidate versions of Nimbus packages. ([#328](https://github.com/TiendaNube/nimbus-design-system/pull/328) by [@joacotornello](https://github.com/joacotornello))

## 2025-06-04 `1.7.0`

#### 🎉 New features

- Added `generateBundle` function to `Docgen` class to generate a .json bundle file of all components and subcomponents documentation. ([#296](https://github.com/TiendaNube/nimbus-design-system/pull/296) by [@joacotornello](https://github.com/joacotornello))

- Added `GeneratedDoc` type and improved logging. ([#296](https://github.com/TiendaNube/nimbus-design-system/pull/296) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-20 `1.6.1` and `1.6.2`

#### 🐛 Bug fixes

- Rebuild after failed release. ([#277](https://github.com/TiendaNube/nimbus-design-system/pull/277) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `1.6.0`

#### 🎉 New features

- Improved ComponentBuilder flexibility to support generic usage, including Nimbus Patterns. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-07 `1.5.0`

#### 🐛 Bug fixes

- Docgen process won't break if some of the builds fails in between ([#272](https://github.com/TiendaNube/nimbus-design-system/pull/272) by [@joacotornello](https://github.com/joacotornello))

## 2023-07-07 `1.4.0`

#### 🎉 New features

- Added new script to run builds on npm packages and github actions. ([#172](https://github.com/TiendaNube/nimbus-design-system/pull/172) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-24 `1.3.0`

#### 🎉 New features

- Added the `packageName` and `version` props to the documentation generation script. ([#165](https://github.com/TiendaNube/nimbus-design-system/pull/165) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-11 `1.2.1`

#### 🐛 Bug fixes

- Fixed regex creating list of subcomponents of a component. ([#142](https://github.com/TiendaNube/nimbus-design-system/pull/142) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-24 `1.1.0`

### 💡 Others

- Added feature to generate as property on polymorphic components. ([#134](https://github.com/TiendaNube/nimbus-design-system/pull/134) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-19 `1.0.0`

### 🎉 New features

- Added Docgen class for generating documentation from typing components and subcomponents. ([#126](https://github.com/TiendaNube/nimbus-design-system/pull/126) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Added `change-case@4.1.2`. ([#126](https://github.com/TiendaNube/nimbus-design-system/pull/126) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript-json-schema@0.55.0`. ([#126](https://github.com/TiendaNube/nimbus-design-system/pull/126) by [@juniorconquista](https://github.com/juniorconquista))
