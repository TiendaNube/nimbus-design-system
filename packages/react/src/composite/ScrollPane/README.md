# `@nimbus-ds/scroll-pane`

[![@nimbus-ds/scroll-pane](https://img.shields.io/npm/v/@nimbus-ds/scroll-pane?label=%40nimbus-ds%2Fscroll-pane)](https://www.npmjs.com/package/@nimbus-ds/scroll-pane)

The ScrollPane component handles responsive scrolls in lists that are overflowing inside a container. It provides gradient overlays to indicate more content, optional navigation arrows for desktop scrolling, and scroll-to-item functionality.

## Installation

```sh
$ yarn add @nimbus-ds/scroll-pane
# or
$ npm install @nimbus-ds/scroll-pane
```

### Component Anatomy

The component consists of a container with a scrollable area, optional gradient overlays, and navigation arrows. It can handle both horizontal and vertical scrolling directions.

## Guidelines

We use the ScrollPane component to handle content that overflows its container, providing visual cues and navigation controls to improve user experience. It's especially useful for lists, card collections, or any content that needs to be scrollable within a constrained space.

### Structure

The ScrollPane component consists of:

- **ScrollPane** - The main container that manages scrolling behavior and visual elements
- **ScrollPane.Item** - Individual items within the scroll pane that can be clicked to scroll into view

### Features

- **Gradient Overlays** - Visual indicators showing there's more content to scroll
- **Navigation Arrows** - Optional clickable arrows for precise scrolling control (especially useful on desktop)
- **Scroll-to-Item** - Automatically scrolls items into view when clicked
- **Grab Scroll** - Click and drag to scroll functionality (like mobile touch scrolling on desktop)
- **Direction Support** - Handles both horizontal and vertical scrolling
- **Scrollbar Control** - Option to show or hide the scrollbar
- **Responsive** - Works on both desktop and mobile devices

### Accessibility

The component includes proper ARIA labels for navigation arrows and supports keyboard navigation. The scroll-to-item functionality ensures content remains accessible when partially hidden.

### Usage Recommendations

- Use for horizontal lists of cards or items
- Implement in navigation menus with many options
- Apply to content that might overflow on smaller screens
- Enable arrows for desktop users who need precise control
- Use gradients to indicate additional content availability
- Enable grab scroll for a more intuitive drag-to-scroll experience (similar to mobile touch scrolling)
- Combine grab scroll with arrows and gradients for maximum usability

### Related Components

- Box - Can be used to structure content within ScrollPane.Item
- Card - Commonly used as children of ScrollPane for lists
- List - Can be used within ScrollPane for structured content

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/composite-components/scroll-pane).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
