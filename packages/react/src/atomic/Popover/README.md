# `@nimbus-ds/popover`

[![@nimbus-ds/popover](https://img.shields.io/npm/v/@nimbus-ds/popover?label=%40nimbus-ds%2Fpopover)](https://www.npmjs.com/package/@nimbus-ds/popover)

The Popover component allows us to show more elements inside a floating box.

## Installation

```sh
$ yarn add @nimbus-ds/popover
# or
$ npm install @nimbus-ds/popover
```

### Component Anatomy

The component consists of a floating box with indicative arrows and optional paddings.

## Guidelines

We use this component when we need to show additional components to provide more information or context within a visualization without using visible space.

This information should be secondary and non-essential, as it will remain hidden until the user interacts with the popover.

We can also use it when we need to provide a list of actions for a certain component and we don't have space to include them in it.

### Indicator arrows

The use of arrows is recommended to make a reference between the Popover and the component that displays it, and should be used when this link is not clear at first glance.

### Padding

We can configure the padding according to the component chosen to be inside the Popover, for example if the inserted element already has padding we can deactivate this functionality.

### Recommendation for use

- View list of products within an order
- View lists of complementary actions
- Display content related to new features

### Related components

- Tooltip - Can be used to give the user quick tips related to some element on the screen.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/popover).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
