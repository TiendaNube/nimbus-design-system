# `@nimbus-ds/pagination`

[![@nimbus-ds/pagination](https://img.shields.io/npm/v/@nimbus-ds/pagination?label=%40nimbus-ds%2Fpagination)](https://www.npmjs.com/package/@nimbus-ds/pagination)

The Pagination component allows us to navigate between a very large list of entries.

## Installation

```sh
$ yarn add @nimbus-ds/pagination
# or
$ npm install @nimbus-ds/pagination
```

### Component Anatomy

The component consists of a selector with optional numbers and arrows.

## Guidelines

We use the component when we have a very large list of entries, to navigate within the same context, allowing quick access between the first or last page of the list, in addition to giving visibility to the total number of existing pages.

### Pagination on desktop

On the desktop, its use is recommended on pages with a high number of entries, where vertical navigation becomes very dense and difficult.

### Pagination on mobile

It is recommended that its use on mobile be avoided, in which case it is preferable to use InfinteScroll, which allows us to load content on demand as the user reaches the end of the page, making navigation more fluid and uninterrupted. In case this alternative is technically unfeasible or the number of entries is too large, we can use pagination, but the component must respect the minimum resolution width of 360 pixels.

### Use of numerators

The use of numerators is optional, in contexts where we don't have enough space and the number of pages is not that big, we can only use the arrows to navigate between pages.

### Recommendation for use

- Browse a sales list
- Browse a list of products
- Browse a list of contacts

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/pagination).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
