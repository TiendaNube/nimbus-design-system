# Changelog

Nimbus is an open-source Design System created by Tiendanube / Nuvemshop's team to empower and enhance more stories every day, with simplicity, accessibility, consistency and performance.

## 2025-08-21 `5.18.0`

#### 🎉 New features

- `Toast`: Added support for indefinite duration toasts using `duration: null` for async operations with unknown completion times. ([#335](https://github.com/TiendaNube/nimbus-design-system/pull/335) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-14 `5.17.3`

#### 💡 Others

- `Popover`: Added Storybook examples for controlled usage with `visible` and `onVisibility`, including a table pattern to ensure only one Popover is open at a time. Clarifies recommended approach related to [Issue #251](https://github.com/TiendaNube/nimbus-design-system/issues/251). ([#331](https://github.com/TiendaNube/nimbus-design-system/pull/331) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-12 `5.17.2`

#### 🐛 Bug fixes

- Added `disabled` state to `Toggle` component. ([#330](https://github.com/TiendaNube/nimbus-design-system/pull/330) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-04 `5.17.1`

#### 🐛 Bug fixes

- Rename `ai-interactive` to `ai-generative` in `Icon` component. ([#327](https://github.com/TiendaNube/nimbus-design-system/pull/327) by [@joacotornello](https://github.com/joacotornello))

## 2025-08-04 `5.17.0`

#### 🎉 New features

- Added `fullWidth` property to the `Button` component. ([#322](https://github.com/TiendaNube/nimbus-design-system/pull/322) by [@joacotornello](https://github.com/joacotornello))

## 2025-07-31 `5.16.0`

#### 🎉 New features

- Created new component ProgressBar. ([#323](https://github.com/TiendaNube/nimbus-design-system/pull/323) by [@joacotornello](https://github.com/joacotornello))

## 2025-07-30 `5.15.0`

#### 🎉 New features

- Added `ai-interactive` appearance to `Icon` component. ([#321](https://github.com/TiendaNube/nimbus-design-system/pull/321) by [@joacotornello](https://github.com/joacotornello))

## 2025-07-28 `5.14.0`

#### 🎉 New features

- Created `ScrollPane` new composite component with gradient overlays, optional navigation arrows, scroll-to-item functionality, support for both horizontal and vertical scrolling, scrollbar control, full accessibility support, and responsive design. ([#319](https://github.com/TiendaNube/nimbus-design-system/pull/319) by [@joacotornello](https://github.com/joacotornello))
- `SegmentedControl`: Improved scalability by adding a new context system without breaking the existing API. Enhanced internal architecture for better performance and maintainability. ([#319](https://github.com/TiendaNube/nimbus-design-system/pull/319) by [@joacotornello](https://github.com/joacotornello))

## 2025-07-24 `5.13.0`

#### 🎉 New features

- `Popover`: Added `renderOverlay` property to render an invisible overlay that prevents accidental clicks on elements behind the popover when enabled. This improves UX by providing click protection without visual interference. ([#316](https://github.com/TiendaNube/nimbus-design-system/pull/316) by [@harrytiendanube](https://github.com/harrytiendanube))

## 2025-07-10 `5.12.1`

#### 🐛 Bug fixes

- `Button`: Adjusted button height from `2.125rem` to `2rem` to match design specifications. ([#310](https://github.com/TiendaNube/nimbus-design-system/pull/310) by [@joacotornello](https://github.com/joacotornello))

## 2025-06-09 `5.12.0`

#### 🎉 New features

- Created `Stepper` new composite component. ([#297](https://github.com/TiendaNube/nimbus-design-system/pull/297) by [@joacotornello](https://github.com/joacotornello))

## 2025-06-04 `5.11.1`

#### 🎉 New features

- Mapped `component-props.json` bundle file to the build output in webpack configuration file. ([#296](https://github.com/TiendaNube/nimbus-design-system/pull/296) by [@joacotornello](https://github.com/joacotornello))

## 2025-05-12 `5.11.0`

#### 🎉 New features

- Created `SegmentedControl` new composite component. ([#290](https://github.com/TiendaNube/nimbus-design-system/pull/290) by [@joacotornello](https://github.com/joacotornello))

## 2025-05-09 `5.10.1`

#### 🐛 Bug fixes

- `Thumbnail.Skeleton`: `width` support is extended to include percentages and 100% is defined as default, just like `Thumbnail`. ([Issue](https://github.com/TiendaNube/nimbus-design-system/discussions/248)) ([#289](https://github.com/TiendaNube/nimbus-design-system/pull/289) by [@harrytiendanube](https://github.com/harrytiendanube))

## 2025-04-03 `5.10.0`

#### 🎉 New features

- `Tabs`: Adds Controlled component support, with the new `selected` and `onTabSelect` props. ([#282](https://github.com/TiendaNube/nimbus-design-system/pull/282) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-25 `5.9.0`

#### 🎉 New features

- Added `textDecoration` property to `Text` component. ([#279](https://github.com/TiendaNube/nimbus-design-system/pull/279) by [@guidobotta](https://github.com/guidobotta))
- Added `line-through` option to `textDecoration` property. ([#279](https://github.com/TiendaNube/nimbus-design-system/pull/279) by [@guidobotta](https://github.com/guidobotta))

## 2025-03-20 `5.8.1` and `5.8.2`

#### 🐛 Bug fixes

- Rebuild after failed release. ([#277](https://github.com/TiendaNube/nimbus-design-system/pull/277) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `5.8.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

- Implemented new webpack configuration to move useful files into the build output directory and inject the `use client` directive. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-07 `5.7.2`

#### 💡 Others

#### 🐛 Bug fixes

- Docgen process won't break if some of the builds fails in between ([#272](https://github.com/TiendaNube/nimbus-design-system/pull/272) by [@joacotornello](https://github.com/joacotornello))

#### 💡 Others

- Added docs. ([#272](https://github.com/TiendaNube/nimbus-design-system/pull/272) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-03 `5.7.1`

### 🎉 New features

- The `renderItem` property is added to the `Pagination` component, to be able to have the link functionality in the buttons. ([#269](https://github.com/TiendaNube/nimbus-design-system/pull/269) by [@hrchioest](https://github.com/hrchioest))

## 2025-02-27 `5.5.6`

#### 🐛 Bug fixes

- Fixed `Tooltip` overflow when screen size is small enough. ([#268](https://github.com/TiendaNube/nimbus-design-system/pull/268) by [@joacotornello](https://github.com/joacotornello))

#### 🐛 New features

- `Tooltip`: Adds support for maxWidth prop. ([#268](https://github.com/TiendaNube/nimbus-design-system/pull/268) by [@joacotornello](https://github.com/joacotornello))

## 2024-12-18 `5.5.5`

#### 🐛 Bug fixes

- We detected that the content of the Tabs, when set to full, was not centered but aligned to the left. ([#261](https://github.com/TiendaNube/nimbus-design-system/pull/261) by [@harrytiendanube](https://github.com/harrytiendanube) )
- Made `onDismiss` property optional for `Modal` component. If `onDismiss` is not provided, the modal can no longer be closed by clicking outside or pressing the close button
- Removed the close button (X) from `Modal` component when `onDismiss` is not provided. ([#246](https://github.com/TiendaNube/nimbus-design-system/pull/246) by [@dommirr](https://github.com/dommirr))

## 2024-04-22 `5.5.4`

### 💡 Others

- Trigger `onClick` only when close icon is pressed on `Chip` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/240) by [@nachozullo](https://github.com/nachozullo))
- Added `lockScroll` to prevent scroll outside of the body of `Sidebar` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/240) by [@nachozullo](https://github.com/nachozullo))

## 2024-03-18 `5.5.3`

### 🐛 Bug fixes

- Added `RemoveScroll` component from `react-remove-scroll` library to prevent scroll resetting on the body of the `Sidebar` component. ([#233](https://github.com/TiendaNube/nimbus-design-system/pull/233) by [@juanchigallego](https://github.com/juanchigallego))
- Added `needRemoveScroll` optional prop to `Sidebar` component. ([#233](https://github.com/TiendaNube/nimbus-design-system/pull/233) by [@juanchigallego](https://github.com/juanchigallego))
- Fixed type bug on expected icon and text color values on `Toast` component. ([#233](https://github.com/TiendaNube/nimbus-design-system/pull/233) by [@juanchigallego](https://github.com/juanchigallego))

### 📚 3rd party library updates

- Added `react-remove-scroll@2.5.7` to `Sidebar` component. ([#233](https://github.com/TiendaNube/nimbus-design-system/pull/233) by [@juanchigallego](https://github.com/juanchigallego))

## 2024-03-01 `5.4.2`

### 🎉 New features

- Add `neutral-background` option to `color` properties on `Title` component. ([#224](https://github.com/TiendaNube/nimbus-design-system/pull/224) by [@juanchigallego](https://github.com/juanchigallego))

## 2024-02-07 `5.4.1`

### 🐛 Bug fixes

- Added `lineClamp` and `wordBreak` properties to `Chip` Text to allow overflowing text to hide instead of breaking into lines. ([#220](https://github.com/TiendaNube/nimbus-design-system/pull/220) by [@juanchigallego](https://github.com/juanchigallego))

## 2024-01-18 `5.4.0`

### 🎉 New features

- Add `labelContent` prop to `Tabs.Item` subcomponent to include a child node on the tab button. ([#216](https://github.com/TiendaNube/nimbus-design-system/pull/216) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-12-22 `5.3.2`

#### 🎉 New features

- Update `Checkbox`, `Chip`, `IconButton`, `Radio`, `Toggle` and `Alert` packages with new color tokens from `@nimbus-ds/tokens` package. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))
- Changed default color to `neutral-textHigh` and default weight to `bold` on `Title` component. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))
- Changed default title size to `h4` on `CardHeader` and `ModalHeader` components. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))
- Changed default title size to `h2` on `SidebarHeader` component. ([#215](https://github.com/TiendaNube/nimbus-design-system/pull/215) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-12-15 `5.3.1`

#### 🐛 Bug fixes

- Fixed bug where value was not being updated.([#203](https://github.com/TiendaNube/nimbus-design-system/pull/212) by [@vrlopess](https://github.com/vrlopess))

## 2023-10-30 `5.3.0`

#### 🎉 New features

- Added new `MultiSelect` component. ([#203](https://github.com/TiendaNube/nimbus-design-system/pull/203) by [@juniorconquista](https://github.com/juniorconquista))

#### 🐛 Bug fixes

- Fixed bug where the theme change did not reflect the color change in the component `Popover`.([#203](https://github.com/TiendaNube/nimbus-design-system/pull/203) by [@juniorconquista](https://github.com/juniorconquista))
- Fixed bug where the theme change did not reflect the color change in the component `Tooltip`.([#203](https://github.com/TiendaNube/nimbus-design-system/pull/203) by [@juniorconquista](https://github.com/juniorconquista))
- Fixed bug where the theme change did not reflect the color change in the component `Modal`.([#203](https://github.com/TiendaNube/nimbus-design-system/pull/203) by [@juniorconquista](https://github.com/juniorconquista))
- Fixed bug where the theme change did not reflect the color change in the component `Sidebar`.([#203](https://github.com/TiendaNube/nimbus-design-system/pull/203) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-10-13 `5.2.1`

#### 🎉 New features

- Added `arrow` property to the Component `Tooltip` API. ([#196](https://github.com/TiendaNube/nimbus-design-system/pull/196) by [@juniorconquista](https://github.com/juniorconquista))
- Added `maxWidth` and `matchReferenceWidth` properties to the Component `Popover` API. ([#196](https://github.com/TiendaNube/nimbus-design-system/pull/196) by [@juniorconquista](https://github.com/juniorconquista))

#### 🐛 Bug fixes

- Fixed bug where the maximum width of the popover exceeded the maximum size of a screen to the Component `Popover`. ([#196](https://github.com/TiendaNube/nimbus-design-system/pull/196) by [@juniorconquista](https://github.com/juniorconquista))
- Removed fixed minimum width so that the minimum width respects the content of the popover to the Component `Popover`. ([#196](https://github.com/TiendaNube/nimbus-design-system/pull/196) by [@juniorconquista](https://github.com/juniorconquista))
- Fixed arrow positioning to the Component `Popover`. ([#196](https://github.com/TiendaNube/nimbus-design-system/pull/196) by [@juniorconquista](https://github.com/juniorconquista))
- Fixed the positioning of the popover so that if it does not fit in the chosen position, it automatically moves to a position that has positioning space to the Component `Popover`. ([#196](https://github.com/TiendaNube/nimbus-design-system/pull/196) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Updated `@floating-ui/react@0.26.0`. ([#195](https://github.com/TiendaNube/nimbus-design-system/pull/195) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-08-04 `5.2.0`

#### 🎉 New features

- Added `fontSize` property to the Component `Box` API. ([#184](https://github.com/TiendaNube/nimbus-design-system/pull/184) by [@juniorconquista](https://github.com/juniorconquista))
- Added `fontWeight` property to the Component `Box` API. ([#184](https://github.com/TiendaNube/nimbus-design-system/pull/184) by [@juniorconquista](https://github.com/juniorconquista))
- Added `lineHeight` property to the Component `Box` API. ([#184](https://github.com/TiendaNube/nimbus-design-system/pull/184) by [@juniorconquista](https://github.com/juniorconquista))
- Added `textAlign` property to the Component `Box` API. ([#184](https://github.com/TiendaNube/nimbus-design-system/pull/184) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-07-11 `5.1.1`

#### 🎉 New features

- Added `ref` property to `Select` component API. ([#180](https://github.com/TiendaNube/nimbus-design-system/pull/180) by [@juniorconquista](https://github.com/juniorconquista)).
- Added `ref` property to `Textarea` component API. ([#180](https://github.com/TiendaNube/nimbus-design-system/pull/180) by [@juniorconquista](https://github.com/juniorconquista)).

#### 🐛 Bug fixes

- Adding extra right padding to the modal title to prevent the title from getting overlaid by the close button. ([#179](https://github.com/TiendaNube/nimbus-design-system/pull/179) by [@juniorconquista](https://github.com/juniorconquista))

#### 📚 3rd party library updates

- Updated `@floating-ui/react@0.24.6`. ([#179](https://github.com/TiendaNube/nimbus-design-system/pull/179) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-06-13 `5.1.0`

### 🎉 New features

- Added `Padding` property to the Component `Card.Header`. ([#169](https://github.com/TiendaNube/nimbus-design-system/pull/169) by [@juniorconquista](https://github.com/juniorconquista))
- Added `Padding` property to the Component `Card.Footer`. ([#169](https://github.com/TiendaNube/nimbus-design-system/pull/169) by [@juniorconquista](https://github.com/juniorconquista))
- Added `Padding` property to the Component `Modal.Header`. ([#169](https://github.com/TiendaNube/nimbus-design-system/pull/169) by [@juniorconquista](https://github.com/juniorconquista))
- Added `Padding` property to the Component `Modal.Footer`. ([#169](https://github.com/TiendaNube/nimbus-design-system/pull/169) by [@juniorconquista](https://github.com/juniorconquista))
- Added `wordBreak` property to the Component `Text` API. ([#169](https://github.com/TiendaNube/nimbus-design-system/pull/169) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-23 `5.0.0`

#### 🛠 Breaking changes

- Changed the dynamic sending option of the `zIndex` property to use `zIndex` in the `Popover` component API. ([#162](https://github.com/TiendaNube/nimbus-design-system/pull/162) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-22 `4.4.0`

### 🎉 New features

- Added new `lineClamp` property on `Text` component. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))

### 🐛 Bug fixes

- Fixes a bug on `Modal` component where focus wasn't correctly moved to the modal dialog when pressing tab key. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))

### 📚 3rd party library updates

- Removed `@floating-ui/react-dom-interactions`. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))
- Added `@floating-ui/react`. ([#157](https://github.com/TiendaNube/nimbus-design-system/pull/157) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-05-08 `4.3.0`

### 🎉 New features

- Added `padding` property to the Component `Accordion.Body`. ([#156](https://github.com/TiendaNube/nimbus-design-system/pull/156) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-05-02 `4.2.1`

### 🎉 New features

- Added responsive conditions to `Title` component properties. ([#152](https://github.com/TiendaNube/nimbus-design-system/pull/152) by [@juanchigallego](https://github.com/juanchigallego))

#### 🐛 Bug fixes

- Omit `content` HTML prop on `Popover` API. ([#152](https://github.com/TiendaNube/nimbus-design-system/pull/152) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-04-24 `4.2.0`

#### 🎉 New features

- Added `ref` property to `Input` component API. ([#151](https://github.com/TiendaNube/nimbus-design-system/pull/151) by [@juniorconquista](https://github.com/juniorconquista)).
- Added `ref` property to `Input.Password` component API. ([#151](https://github.com/TiendaNube/nimbus-design-system/pull/151) by [@juniorconquista](https://github.com/juniorconquista)).
- Added `ref` property to `Input.Search` component API. ([#151](https://github.com/TiendaNube/nimbus-design-system/pull/151) by [@juniorconquista](https://github.com/juniorconquista)).

## 2023-04-13 `4.1.1`

#### 🎉 New features

- Added renderProps functionality to the component `Popover` so that it is possible to obtain the internal state of the popover in the component's children. ([#149](https://github.com/TiendaNube/nimbus-design-system/pull/149) by [@juniorconquista](https://github.com/juniorconquista))
- Added responsive conditions to `Text` component properties. ([#149](https://github.com/TiendaNube/nimbus-design-system/pull/149) by [@juniorconquista](https://github.com/juniorconquista))

#### 🐛 Bug fixes

- Removed additional margin generated in component `Card` when using subcomponent `Card.Header` without a `Card.Footer`. ([#149](https://github.com/TiendaNube/nimbus-design-system/pull/149) by [@juniorconquista](https://github.com/juniorconquista))
- Removed hover effect on `IconButton` component when disabled. ([#149](https://github.com/TiendaNube/nimbus-design-system/pull/149) by [@juniorconquista](https://github.com/juniorconquista))
- Added side spacing to `Modal` component. ([#149](https://github.com/TiendaNube/nimbus-design-system/pull/149) by [@juniorconquista](https://github.com/juniorconquista))
- Fixed bug in `Select` component where clicking on arrow icon didn't work. ([#149](https://github.com/TiendaNube/nimbus-design-system/pull/149) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-04-10 `4.1.0`

#### 💡 Others

- Changed `maxWidth` type description to reflect on prop documentation `Modal` component. ([#141](https://github.com/TiendaNube/nimbus-design-system/pull/141) by [@diegopsilverio](https://github.com/diegopsilverio))

## 2023-04-03 `4.0.0`

#### 🛠 Breaking changes

- Refactored shadow tokens in components. ([#139](https://github.com/TiendaNube/nimbus-design-system/pull/139) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-31 `3.2.0`

### 🎉 New features

- Added `textDecoration` property to `Box` component API. ([#136](https://github.com/TiendaNube/nimbus-design-system/pull/106) by

### 🐛 Bug fixes

- Add missing dependency for `@nimbus-ds/icon` external package on `Select` component. ([#136](https://github.com/TiendaNube/nimbus-design-system/pull/136) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-24 `3.1.0`

### 🐛 Bug fixes

- Adjusted internal spacing of components when the alert does not have the removal function. ([#134](https://github.com/TiendaNube/nimbus-design-system/pull/134) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Adjusted the `Box` component properties interface to use `ComponentPropsWithRef` and include the `as` prop in the output interface. ([#134](https://github.com/TiendaNube/nimbus-design-system/pull/134) by [@juniorconquista](https://github.com/juniorconquista))
- Adjusted the `Button` component properties interface to use `ComponentPropsWithRef` and include the `as` prop in the output interface. ([#134](https://github.com/TiendaNube/nimbus-design-system/pull/134) by [@juniorconquista](https://github.com/juniorconquista))
- Adjusted the `Link` component properties interface to use `ComponentPropsWithRef` and include the `as` prop in the output interface. ([#134](https://github.com/TiendaNube/nimbus-design-system/pull/134) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-03-27 `3.0.1`

### 🐛 Bug fixes

- Fixes bug where `Select.Option` subcomponent would not render the HTML option elements on IOS devices. ([#129](https://github.com/TiendaNube/nimbus-design-system/pull/129) by [@juanchigallego](https://github.com/juanchigallego))

## 2023-03-10 `3.0.0`

### 🛠 Breaking changes

- Changed the `backgroundColor` properties to `primary-interactive`, `primary-surface`, `primary-surfaceHighlight`, `primary-textLow`, `success-interactive`, `success-surface`, `success-surfaceHighlight`, `success-textLow`, `warning-interactive`, `warning-surface`, `warning-surfaceHighlight`, `warning-textLow`, `danger-interactive`, `danger-surface`, `danger-surfaceHighlight`, `danger-textLow`, `neutral-background`, `neutral-interactive`, `neutral-surface`, `neutral-surfaceHighlight`, `neutral-surfaceDisabled` and `neutral-textLow` on `Box` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `color` properties to `primary-interactive`, `primary-surface`, `primary-surfaceHighlight`, `primary-textLow`, `success-interactive`, `success-surface`, `success-surfaceHighlight`, `success-textLow`, `warning-interactive`, `warning-surface`, `warning-surfaceHighlight`, `warning-textLow`, `danger-interactive`, `danger-surface`, `danger-surfaceHighlight`, `danger-textLow`, `neutral-background`, `neutral-interactive`, `neutral-surface`, `neutral-surfaceHighlight`, `neutral-surfaceDisabled` and `neutral-textLow` on `Box` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `borderColor` properties to `primary-interactive`, `primary-surface`, `primary-surfaceHighlight`, `success-interactive`, `success-surface`, `success-surfaceHighlight`, `warning-interactive`, `warning-surface`, `warning-surfaceHighlight`, `danger-interactive`, `danger-surface`, `danger-surfaceHighlight`, `neutral-interactive`, `neutral-surface` and `neutral-surfaceHighlight` on `Box` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `color` properties to `primary-interactive`, `primary-surface`, `primary-textLow`, `success-textLow`, `success-surface`, `warning-interactive`, `warning-surface`, `warning-textLow`, `danger-interactive`, `danger-surface`, `danger-textLow`, `neutral-background`, `neutral-interactive`, `neutral-surface`, `neutral-textLow`, `currentColor`, `success-interactive`, `primary-textHigh`, `success-textHigh`, `warning-textHigh`, `danger-textHigh`, `neutral-textDisabled` and `neutral-textHigh` on `Icon` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `borderColor` properties to `neutral-surface`, `neutral-interactive` and `neutral-surfaceHighlight` on `IconButton` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `backgroundColor` properties to `neutral-interactive`, `neutral-interactiveHover`, `neutral-interactivePressed` and `primary-interactive` on `IconButton` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed appearance property from `neutral.background` to `neutral-background` on `Link` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `backgroundColor` properties to `primary-surfaceHighlight`, `primary-interactiveHover`, `success-surfaceHighlight`, `danger-surfaceHighlight`, `neutral-surfaceHighlight` and `warning-surfaceHighlight` on `Popover` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `color` properties to `primary-surfaceHighlight`, `primary-interactiveHover`, `success-surfaceHighlight`, `danger-surfaceHighlight`, `neutral-surfaceHighlight` and `warning-surfaceHighlight` on `Popover` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `color` properties to `primary-interactive`, `primary-surface`, `primary-textLow`, `success-textLow`, `success-surface`, `danger-interactive`, `danger-surface`, `danger-textLow`, `neutral-background`, `neutral-interactive`, `neutral-surface`, `neutral-textLow`, `currentColor` and `success-interactive` on `Spinner` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `color` properties to `primary-interactive`, `primary-surface`, `primary-textLow`, `success-textLow`, `success-surface`, `warning-interactive`, `warning-surface`, `warning-textLow`, `danger-interactive`, `danger-surface`, `danger-textLow`, `neutral-background`, `neutral-interactive`, `neutral-surface`, `neutral-textLow`, `success-interactive`, `primary-textHigh`, `success-textHigh`, `warning-textHigh`, `danger-textHigh`, `neutral-textDisabled` and `neutral-textHigh` on `Text` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `color` properties to `primary-textLow`,`success-textLow`,`warning-textLow`,`danger-textLow`,`neutral-textLow`,`primary-textHigh`,`success-textHigh`,`warning-textHigh`,`danger-textHigh` and `neutral-textHigh` on `Title` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `backgroundColor` properties to `primary-surface`, `primary-surfaceHighlight`, `success-surface`, `success-surfaceHighlight`, `warning-surface`, `warning-surfaceHighlight`, `danger-surface`, `danger-surfaceHighlight`, `neutral-background`, `neutral-surface` and `neutral-surfaceHighlight` on `Card` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `backgroundColor` properties to `neutral-background`, `neutral-surface`, `neutral-surfaceHighlight`, `primary-surface` and `primary-surfaceHighlight` on `Table.Cell` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Changed the `backgroundColor` properties to `neutral-background`, `neutral-surface`, `neutral-surfaceHighlight`, `primary-surface` and `primary-surfaceHighlight` on `Table.Row` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

### 💡 Others

- Refactored style classes to have more semantic names on `Checkbox` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Chip` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `FileUploader` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Icon` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `IconButton` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Input` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Link` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `List` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Popover` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Radio` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Select` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Spinner` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Skeleton` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Tag` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Text` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Thumbnail` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Title` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Toast` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Toggle` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Tooltip` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Accordion` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Alert` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Card` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Modal` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored style classes to have more semantic names on `Sidebar` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Checkbox` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Chip` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `FileUploader` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Input` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Select` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Thumbnail` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Toast` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Toggle` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Tooltip` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Accordion` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Alert` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Card` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Modal` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))
- Refactored use of `color tokens` in internal components by removing `.` per `-` on `Sidebar` component. ([#110](https://github.com/TiendaNube/nimbus-design-system/pull/110) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-24 `2.10.0`

### 🎉 New features

- Added `fontSize`, `fontWeight` and `lineHeight` properties to `Title` component API. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Changed `cursor` property default value to `inherit` on `Icon` component. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
- Added `zIndex`, `minHeight`, `minWidth`, `flexGrow`, `order` and `alignSelf` property to `Box` component API. ([#106](https://github.com/TiendaNube/nimbus-design-system/pull/106) by [@juanchigallego](https://github.com/juanchigallego))
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
