# `@nimbus-ds/file-uploader`

[![@nimbus-ds/file-uploader](https://img.shields.io/npm/v/@nimbus-ds/file-uploader?label=%40nimbus-ds%2Ffile-uploader)](https://www.npmjs.com/package/@nimbus-ds/file-uploader)

The File Uploader component is used to upload files.

## Installation

```sh
$ yarn add @nimbus-ds/file-uploader
# or
$ npm install @nimbus-ds/file-uploader
```

### Component Anatomy

The component consists of a box with a plus icon and an optional label.

## Guidelines

We use this component to receive files through an upload.

### Proportions

The component does not have fixed sizes, ie its height or width can be defined, however there are recommended proportions that follow the same pattern as the Thumbnail component. It is also possible to use flexible aspect ratio according to the need of the files.

- Square - 1:1
- Rectangular - 4:3 and 3:4
- Rectangular Wide - 16:9 and 9:16
- Extra Wide Rectangular - 2:1 and 1:2
- Flexible - free proportion

### Helper text position

The component has two orientation options for the text and icon helper, they are horizontal and vertical, which can be chosen according to the size and proportion used.

### Usage recommendations

- Receive payment receipts
- Receive product images
- Receive spreadsheets with product data

### Related components

- Thumbnail - Can be used to display product images in a gallery.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/file-uploader).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
