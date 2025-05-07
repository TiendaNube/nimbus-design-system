# `@nimbus-ds/icons`

[![@nimbus-ds/icons](https://img.shields.io/npm/v/@nimbus-ds/icons?label=%40nimbus-ds%2Ficons)](https://www.npmjs.com/package/@nimbus-ds/icons)

Nimbus-icons is an open source icon system built by Nuvemshop / Tiendanube.

## 🚀 Getting started

Install `@nimbus-ds/icons` using any package manager.

```sh
$ yarn add @nimbus-ds/icons
# or
$ npm install @nimbus-ds/icons
```

## 💻 Usage

You can download the whole set of icons or just the icons that you need from the nimbus-icons.dev site.

You can also use them for react development, using `yarn` to install.

| Property   | Type                                                                                   |            |
| ---------- | -------------------------------------------------------------------------------------- | ---------- |
| aria-label | string                                                                                 | (optional) |
| size       | number<br/>'small' = 16px (default)<br/>'medium' = 24px<br/>'large' = 32px<br/>'fixed' | (optional) |

```jsx
import { CloudIcon, AlertIcon, StoreIcon } from "@nimbus-ds/icons";

<CloudIcon />
<AlertIcon size="large" />
<StoreIcon size="medium" aria-label="Store" />
```

For more information about our components, check out our [Storybook](https://tiendanube.github.io/nimbus-design-system/).

## Contributing

Do you want to contribute? **Excellent!** You have two ways to do it.

1. You can request a new icon through an [icon request](https://github.com/TiendaNube/nimbus-design-system/issues/new?assignees=&labels=&template=ICON_REQUEST.md&title=%5BIcon+request%5D "Nimbus Icons - Icon request")
2. Create and upload an icon following the instructions in our [🎨 Creating icons](https://github.com/TiendaNube/nimbus-design-system/blob/master/docs/CONTRIBUTING.md#-publishing-icons) contribution guide.

**Thanks for contributing! :heart:**
