# Changelog

The Pagination component allows us to navigate between a very large list of entries.

## 2026-10-05 `2.6.0`

#### 🎉 New features

- Adds the `showInput` prop to show a "go to page" input next to the navigation (available when `pageCount` is 6 or more). The input only accepts digits, submits on Enter or blur, and takes a number outside the range to the nearest page (above `pageCount` to the last page, `0` to the first) without showing an error. Page changes are announced to screen readers. ([#585](https://github.com/TiendaNube/nimbus-design-system/pull/585) by [@claude[bot]](https://github.com/apps/claude))
- Adds a compact first / previous / go-to-page / next / last layout below the `md` breakpoint (672px) when `pageCount` is 6 or more. **Existing consumers with a `pageCount` of 6 or more will see this compact layout, instead of the page numbers, on screens narrower than 672px**, without any code change. ([#585](https://github.com/TiendaNube/nimbus-design-system/pull/585) by [@claude[bot]](https://github.com/apps/claude))
- Adds the `labels` prop to translate every text the component renders (`navigation`, `previousPage`, `nextPage`, `firstPage`, `lastPage`, `goToPage`, `goTo`, `of` and `pageAnnouncement`). Omitted keys keep their English default. ([#585](https://github.com/TiendaNube/nimbus-design-system/pull/585) by [@claude[bot]](https://github.com/apps/claude))
- Wraps the list in a `<nav>` landmark named "Pagination", names the previous, next, first and last buttons, and marks the current page with `aria-current="page"`. ([#585](https://github.com/TiendaNube/nimbus-design-system/pull/585) by [@claude[bot]](https://github.com/apps/claude))

#### 🐛 Bug fixes

- The "go to page" input no longer overwrites what the user is typing when `activePage` changes externally; the value resyncs when the input loses focus. ([#585](https://github.com/TiendaNube/nimbus-design-system/pull/585) by [@claude[bot]](https://github.com/apps/claude))

## 2026-02-12 `2.5.0`

#### 🎉 New features

- Enabled `className` prop forwarding to allow consumers to pass custom CSS classes. ([#426](https://github.com/TiendaNube/nimbus-design-system/pull/426) by [@joacotornello](https://github.com/joacotornello))

## 2026-01-13 `2.4.1`

#### 🎉 New features

- Adds support for React 19. ([#404](https://github.com/TiendaNube/nimbus-design-system/pull/404) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-18 `2.4.0`

#### 🎉 New features

- Adds `use-client` directive to the build output in order to support NextJS applications. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

### 💡 Others

- Rebuild after build process changes to add support for modular imports and Server Components. ([#276](https://github.com/TiendaNube/nimbus-design-system/pull/276) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-07 `2.3.1`

#### 💡 Others

- Added docs. ([#272](https://github.com/TiendaNube/nimbus-design-system/pull/272) by [@joacotornello](https://github.com/joacotornello))

## 2025-03-03 `2.3.0`

### 🎉 New features

- The `renderItem` property is added to the component, to be able to have the link functionality in the buttons. ([#269](https://github.com/TiendaNube/nimbus-design-system/pull/269) by [@hrchioest](https://github.com/hrchioest))

## 2023-02-23 `2.2.0`

### 🎉 New features

- Added server side-rendering support to component. ([#105](https://github.com/TiendaNube/nimbus-design-system/pull/105) by [@juniorconquista](https://github.com/juniorconquista))

## 2023-02-16 `2.1.0`

### 🎉 New features

- Removed external dependency from `@tiendanube/icons` package to now use internal `@nimbus-ds/icons` package. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

### 📚 3rd party library updates

- Removed `@tiendanube/icons@0.3.1`. ([#94](https://github.com/TiendaNube/nimbus-design-system/pull/#94) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-22 `2.0.0`

### 💡 Others

- Removed direct dependency on `nimbus-ds/styles` package from component build. ([#69](https://github.com/TiendaNube/nimbus-design-system/pull/69) by [@juniorconquista](https://github.com/juniorconquista))

## 2022-12-20 `1.0.0`

### 🎉 New features

- Added `activePage`, `pageCount`, `showNumbers` and `onPageChange` properties to the component API. ([#68](https://github.com/TiendaNube/nimbus-design-system/pull/68) by [@juniorconquista](https://github.com/juniorconquista))
- Added stories to the component. ([#68](https://github.com/TiendaNube/nimbus-design-system/pull/68) by [@juniorconquista](https://github.com/juniorconquista))
- Created new `usePagination` hook. ([#68](https://github.com/TiendaNube/nimbus-design-system/pull/68) by [@juniorconquista](https://github.com/juniorconquista))
- Added `activePage`, `pageCount` and `siblingCount` properties to the hook `usePagination`.([#68](https://github.com/TiendaNube/nimbus-design-system/pull/68) by [@juniorconquista](https://github.com/juniorconquista))
