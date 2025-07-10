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

### Overlay

The overlay feature provides a completely transparent and invisible layer that prevents accidental clicks on elements behind the popover. This is particularly useful when the popover is positioned over clickable elements and you want to ensure that clicking outside the popover to close it doesn't unintentionally trigger actions on underlying elements.

When `overlay` is enabled:

- A transparent backdrop covers the entire viewport (completely invisible to users)
- Clicking outside the popover will close it without triggering underlying elements
- The overlay doesn't change the visual appearance, unlike Modal which uses a semi-transparent background
- The popover maintains its correct positioning relative to the trigger element

### Technical Implementation

The overlay implementation uses a custom transparent backdrop instead of the standard `FloatingOverlay` component. This ensures that:

- The popover maintains its correct positioning calculated by floating-ui
- The overlay doesn't interfere with the popover's placement logic
- Click prevention works seamlessly without affecting visual positioning

### Recommendation for use

- View list of products within an order
- View lists of complementary actions
- Display content related to new features
- Use overlay when popover appears over interactive elements to prevent accidental clicks

### Related components

- Tooltip - Can be used to give the user quick tips related to some element on the screen.
- Modal - Provides a more intrusive way to display content with built-in overlay functionality.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/popover).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
