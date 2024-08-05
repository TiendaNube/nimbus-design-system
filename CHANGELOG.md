# Changelog

This is the log of notable changes to the Design System Nimbus that are developer-facing.
Package-specific changes not released in any package will be added here just before the release. Until then, you can find them in changelogs of the individual packages (see [packages](./packages) directory).

## 2024-08-05

### 🐛 Bug fixes

- Made `onDismiss` property optional for `Modal` component. If `onDismiss` is not provided, the modal can no longer be closed by clicking outside or pressing the close button
- Removed the close button (X) from `Modal` component when `onDismiss` is not provided. ([#246](https://github.com/TiendaNube/nimbus-design-system/pull/246) by [@dommirr](https://github.com/dommirr))

## 2023-12-22

### 🎉 New features

- Changed `Geist-Bold` font to `SemiBold` variant. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-11-16

#### 📚 3rd party library updates

- Updated `turbo@1.10.16`. ([#207](https://github.com/TiendaNube/nimbus-design-system/pull/#207) by [@vrlopess](https://github.com/vrlopess))

#### 🐛 Bug fixes

- Updated `Fix bug MultiSelect document`. ([#207](https://github.com/TiendaNube/nimbus-design-system/pull/#207) by [@vrlopess](https://github.com/vrlopess))

## 2023-09-26

### 🎉 New features

- Updated storybook to new version. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated vanilla extract to new version. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Updated `@storybook/addon-essentials@7.4.5`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-interactions@7.4.5`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-links@7.4.5`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-mdx-gfm@7.4.5`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/blocks@7.4.5`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/react@7.4.5`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/react-webpack5@7.4.5`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/testing-library@0.2.1`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/testing-library@0.2.1`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `storybook@7.4.5`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `storybook-dark-mode@3.0.1`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `eslint-plugin-storybook@0.6.14`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@vanilla-extract/webpack-plugin@2.3.1`. ([#193](https://github.com/TiendaNube/nimbus-design-system/pull/#193) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-06-06

#### 🎉 New features

- Added new github action to comment quality checklist on every pull request. ([#167](https://github.com/TiendaNube/nimbus-design-system/pull/#167) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-30

### 🎉 New features

- Updated storybook version to new major. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Added `@babel/preset-env@7.21.5`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-storybook@0.6.12`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Added `prop-types@15.8.1`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Added `storybook@7.0.18`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/blocks@7.0.18`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/react-webpack5@7.0.18`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/testing-library@7.0.18`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-essentials@7.0.18`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-interactions@7.0.18`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-links@7.0.18`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/react@7.0.18`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `storybook-dark-mode@3.0.0`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@storybook/addon-a11y@6.5.16`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@storybook/addon-controls@6.5.16`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@storybook/addon-actions@6.5.16`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@storybook/builder-webpack5@6.5.16`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@storybook/manager-webpack5@6.5.16`. ([#166](https://github.com/TiendaNube/nimbus-design-system/pull/#166) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-19

### 🎉 New features

- Integrated sonarclound in the project. # by [@juniorconquista](https://github.com/juniorconquista)

## 2023-03-19

### 🎉 New features

- Creating a build script to build documentation for components and subcomponents. ([#126](https://github.com/TiendaNube/nimbus-design-system/pull/#126) by [@juniorconquista](https://github.com/juniorconquista))
- Configuring use of [turborepo](https://turbo.build/repo/docs/core-concepts/remote-caching) cache to publish artifacts generated from each package and share in local and pipeline environments. ([#126](https://github.com/TiendaNube/nimbus-design-system/pull/#126) by [@juniorconquista](https://github.com/juniorconquista))
- Restructured action build steps to create a cache of `node_modules` folders and therefore not unnecessarily perform package installs. ([#126](https://github.com/TiendaNube/nimbus-design-system/pull/#126) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-16

### 🎉 New features

- Added new template for request to create new icons. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/94) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Remove deprecated set-output usage in github actions. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/94) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-15

### 🎉 New features

- Adjust storybook dark mode colors to use Nimbus tokens. ([#95](https://github.com/TiendaNube/nimbus-design-system/pull/95) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-02-13

### 🎉 New features

- Added dark mode support to storybook documentation. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Added `storybook-dark-mode@2.0.6`. ([#89](https://github.com/TiendaNube/nimbus-design-system/pull/89) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-09

### 📚 3rd party library updates

- Updated `@storybook/addon-a11y@6.5.16`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-controls@6.5.16`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-actions@6.5.16`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-essentials@6.5.16`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-interactions@6.5.16`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-links@6.5.16`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/builder-webpack5@6.5.16`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/manager-webpack5@6.5.16`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/react@6.5.16`. ([#83](https://github.com/TiendaNube/nimbus-design-system/pull/83) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-20

### 🎉 New features

- Creating build script for building packages to parts of release versions. ([#68](https://github.com/TiendaNube/nimbus-design-system/pull/#68) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Updated `child_process@1.0.2`. ([#68](https://github.com/TiendaNube/nimbus-design-system/pull/#68) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-16

### 🎉 New features

- Added Centranube medium font to Storybook. ([#67](https://github.com/TiendaNube/nimbus-design-system/pull/67) by [@juanchigallego](https://github.com/juanchigallego))

## 2022-12-07

### 💡 Others

- Renamed babel file jest from `babel-jest.config` to `babel.config`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@vanilla-extract/webpack-plugin@^2.2.0`. ([#63](https://github.com/TiendaNube/nimbus-design-system/pull/63) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-05

### 💡 Others

- Restructuring folder and organizing the design system packages. ([#62](https://github.com/TiendaNube/nimbus-design-system/pull/62) by [@juniorconquista](https://github.com/juniorconquista))
- Renamed babel file jest from `babel.config` to `babel-jest.config`. ([#62](https://github.com/TiendaNube/nimbus-design-system/pull/62) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-18

## 2022-11-18

### 📚 3rd party library updates

- Added `mini-css-extract-plugin@2.7.0`. ([#56](https://github.com/TiendaNube/nimbus-design-system/pull/56) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-11-02

### 📚 3rd party library updates

- Updated `@storybook/addon-a11y@6.5.13`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/#52) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-controls@6.5.13`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/#52) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-actions@6.5.13`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/#52) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-essentials@6.5.13`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/#52) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-interactions@6.5.13`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/#52) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-links@6.5.13`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/#52) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/builder-webpack5@6.5.13`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/#52) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/manager-webpack5@6.5.13`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/#52) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/react@6.5.13`. ([#52](https://github.com/TiendaNube/nimbus-design-system/pull/#52) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-10-24

### 🎉 New features

- Added and configured turborepo to project. ([#46](https://github.com/TiendaNube/nimbus-design-system/pull/46) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Added `turbo@1.6.1`. ([#46](https://github.com/TiendaNube/nimbus-design-system/pull/46) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Fixed build generation and unit tests to correctly respect nop `tsconfig.js` paths. ([#46](https://github.com/TiendaNube/nimbus-design-system/pull/46) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-24

### 📚 3rd party library updates

- Added `@svgr/webpack@6.3.1`. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added `jest-svg-transformer@1.0.0`. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added global type declaration for using svg elements. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added `jest-svg-transformer` configuration to `jest` for using svgs in components. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))
- Added new rule to webpack modules to use svgs in components. ([#28](https://github.com/TiendaNube/nimbus-design-system/pull/28) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-21

### 📚 3rd party library updates

- Updated `@storybook/addon-a11y@6.5.12`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-controls@6.5.12`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-actions@6.5.12`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-essentials@6.5.12`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-interactions@6.5.12`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/addon-links@6.5.12`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/builder-webpack5@6.5.12`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/manager-webpack5@6.5.12`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))
- Updated `@storybook/react@6.5.12`. ([#27](https://github.com/TiendaNube/nimbus-design-system/pull/27) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-13

### 🎉 New features

- Added RELEASE_PROCESS.md. ([#25](https://github.com/TiendaNube/nimbus-design-system/pull/25) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-09-01

### 📚 3rd party library updates

- Added `@storybook/addon-controls@6.5.10`. ([#21](https://github.com/TiendaNube/nimbus-design-system/pull/21) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-26

### 📚 3rd party library updates

- Added `copy-webpack-plugin@11.0.0`. ([#19](https://github.com/TiendaNube/nimbus-design-system/pull/19) by [@juniorconquista](https://github.com/juniorconquista))

### 🎉 New features

- Added Centranube font in storybook. ([#19](https://github.com/TiendaNube/nimbus-design-system/pull/19) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-22

### 💡 Others

- Added new jog on github actions for publish storybook. ([#15](https://github.com/TiendaNube/nimbus-design-system/pull/15) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-20

### 📚 3rd party library updates

- Added `@babel/preset-typescript@7.18.6`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/builder-webpack5@6.5.10`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/manager-webpack5@6.5.10`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@vanilla-extract/babel-plugin@1.1.7`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Added `babel-jest@28.1.3`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `sass@1.54.3`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@storybook/builder-webpack4@6.5.10`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))
- Removed `@storybook/manager-webpack4@6.5.10`. ([#11](https://github.com/TiendaNube/nimbus-design-system/pull/11) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-11

### 💡 Others

- Added new jog on github actions for versions. ([#8](https://github.com/TiendaNube/nimbus-design-system/pull/8) by [@juniorconquista](https://github.com/juniorconquista))
- Added new jog on github actions for publish release candidate. ([#8](https://github.com/TiendaNube/nimbus-design-system/pull/8) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-09

### 📚 3rd party library updates

- Added `react@18.2.0`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `react-dom@18.2.0`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@babel/core@7.18.10`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@jest/types@28.1.3`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/addon-a11y@6.5.10`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/addon-actions@6.5.10`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/addon-essentials@6.5.10`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/addon-interactions@6.5.10`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/addon-links@6.5.10`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/builder-webpack4@6.5.10`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/manager-webpack4@6.5.10`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@storybook/react@6.5.10`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@testing-library/react@13.3.0`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@types/jest@28.1.6`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@types/react@18.0.15`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@types/react-dom@18.0.6`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `babel-loader@8.2.5`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `babel-plugin-module-resolver@4.1.0`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-import-resolver-babel-module@5.3.1`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-import-resolver-typescript@3.4.0`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-jest@26.8.1`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `jest@28.1.3`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `jest-environment-jsdom@28.1.3`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `jsdom@28.1.3`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `sass@1.54.3`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-jest@28.0.7`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Added `ts-node@10.9.1`. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Storybook configuration performed. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Yarn workspaces configuration performed. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Jest configuration performed. ([#6](https://github.com/TiendaNube/nimbus-design-system/pull/6) by [@juniorconquista](https://github.com/juniorconquista))
- Remove jog on github actions for pull requests. ([#5](https://github.com/TiendaNube/nimbus-design-system/pull/5) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-08-02

### 📚 3rd party library updates

- Added `@commitlint/cli@17.0.3`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@commitlint/config-conventional@17.0.3`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@tiendanube/eslint-config@0.3.2`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@typescript-eslint/eslint-plugin@5.30.6`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `@typescript-eslint/parser@5.30.6`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint@8.19.0`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-config-airbnb@19.0.4`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-config-prettier@8.5.0`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-babel@5.3.1`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-import@2.26.0`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-jsx-a11y@6.6.0`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-mdx@2.0.1`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-prettier@4.2.1`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-react@7.30.1`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-react-hooks@4.6.0`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-sonarjs@0.13.0`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-spellcheck@0.0.19`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `eslint-plugin-testing-library@5.5.1`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `husky@8.0.1`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `lint-staged@13.0.3`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `prettier@2.7.1`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added `typescript@4.7.4`. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))

<!-- ### 🛠 Breaking changes -->

<!-- ### 🎉 New features -->

<!-- ### 🐛 Bug fixes -->

### 💡 Others

- Eslint configuration performed. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Husky configuration performed. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Lint Staged configuration performed. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Commitlint configuration performed. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Editorconfig configuration performed. ([#1](https://github.com/TiendaNube/nimbus-design-system/pull/1) by [@juniorconquista](https://github.com/juniorconquista))
- Added CONTRIBUTING.md. ([#2](https://github.com/TiendaNube/nimbus-design-system/pull/2) by [@juniorconquista](https://github.com/juniorconquista))
- Added bug and new request issue templates. ([#2](https://github.com/TiendaNube/nimbus-design-system/pull/2) by [@juniorconquista](https://github.com/juniorconquista))
- Added new jog on github actions for pull requests. ([#4](https://github.com/TiendaNube/nimbus-design-system/pull/4) by [@juniorconquista](https://github.com/juniorconquista))
- Added README.md. ([#5](https://github.com/TiendaNube/nimbus-design-system/pull/5) by [@juniorconquista](https://github.com/juniorconquista))

<!-- ### ⚠️ Notices -->
