# `@nimbus-ds/icon-button`

[![@nimbus-ds/icon-button](https://img.shields.io/npm/v/@nimbus-ds/icon-button?label=%40nimbus-ds%2Ficon-button)](https://www.npmjs.com/package/@nimbus-ds/icon-button)

Icons are used to visually communicate core parts of the product and available actions. They can act as wayfinding tools to help merchants more easily understand where they are in the product, and common interaction patterns that are available.

## Installation

```sh
$ yarn add @nimbus-ds/icon-button
# or
$ npm install @nimbus-ds/icon-button
```

### Component Anatomy

The component consists of a circular shape and an icon.

## Guidelines

We use the Icon Button when we have a space limitation or an action can be perfectly represented by an icon, its use can be combined with the Tooltip, showing a brief description of the action to be performed.

### Icon choice

The icon must make it clear what the Icon Button action is without the need for text, if it is not possible to summarize the action in an icon, we should consider using another component.

### AriaLabel

This component does not have visible text, however it has a tag to facilitate its identification by people with some kind of visual or cognitive limitation. That's why we need to add a description that makes it clear what action is behind the chosen icon.

### Related components

Button component - It is used for changes to state or page changes, in contexts where there is no space limitation or where only an icon is not able to communicate its action.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/icon-button).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
