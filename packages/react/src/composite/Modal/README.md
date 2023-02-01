# `@nimbus-ds/modal`

[![@nimbus-ds/modal](https://img.shields.io/npm/v/@nimbus-ds/modal?label=%40nimbus-ds%2Fmodal)](https://www.npmjs.com/package/@nimbus-ds/modal)

The Modal component allows us to call the user's attention to a floating box that can have text, actions or forms to perform tasks by changing the focus from the background. It is an intrusive component as it interrupts the user's operation to present a message or content.

## Installation

```sh
$ yarn add @nimbus-ds/modal
# or
$ npm install @nimbus-ds/modal
```

### Component Anatomy

The component consists of a full-screen translucent background and a centered floating box with rounded corners and shadow with optional padding.

## Guidelines

We use the component to present dialogs or options to the user that must be completed before continuing the operation. They are intrusive as they completely interrupt browsing, but they should be used occasionally.

Modal must present actions to the user. Actions must form part of the footer of the modal, and must be located on the right side.

The Modal must be able to be closed using the X button in the header, clicking outside the container or pressing the ESC key on the keyboard.

Avoid its use for very long forms or screens with many options.

### Recommendations for use

- Confirm deletion of an element.
- Display options as filters in lists.
- Confirm an action before moving on to another instance.

### Related components

- Popover - It is a floating element that can be used to present information or actions in a non-intrusive way.
- Alert - It is a component that presents critical or sensitive information to the user in a non-intrusive way within the context of a screen.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/composite-components/modal).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
