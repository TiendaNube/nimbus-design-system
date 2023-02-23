# `@nimbus-ds/sidebar`

[![@nimbus-ds/sidebar](https://img.shields.io/npm/v/@nimbus-ds/sidebar?label=%40nimbus-ds%2Fsidebar)](https://www.npmjs.com/package/@nimbus-ds/sidebar)

The Sidebar component is a large floating container that goes into the page from the corners. It allows us to present actions, forms or sections with a lot of information about the context of the page.

## Installation

```sh
$ yarn add @nimbus-ds/sidebar
# or
$ npm install @nimbus-ds/sidebar
```

### Component Anatomy

The component consists of a full-screen translucent background and a floating container that occupies the full height of the screen and a fixed width, with shadow and optional padding.

On desktop it has a fixed width and occupies the entire top, on mobile it occupies the entire screen.

## Guidelines

We use the Sidebar to present actions, dialogs or forms that open over the context of the page, when they are too long to use in a Modal, but the information is relevant enough not to navigate to another page.

Despite being a floating component, it partially blocks the background view, but should be used sparingly.

### Recommendations for use

- Create a menu for an app
- Display a list of filters with many options
- Present an interactive list with many entries and a search engine

### Related components

- Modal - It is a floating element that allows us to present actions or brief confirmation messages to the user.
- Popover - It is a floating element that can be used to present information or actions in a non-intrusive way.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/sidebar).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
