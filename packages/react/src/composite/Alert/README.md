# `@nimbus-ds/alert`

[![@nimbus-ds/alert](https://img.shields.io/npm/v/@nimbus-ds/alert?label=%40nimbus-ds%2Falert)](https://www.npmjs.com/package/@nimbus-ds/alert)

The Alert component allows us to communicate about changes or special conditions in pages or sections.

## Installation

```sh
$ yarn add @nimbus-ds/alert
# or
$ npm install @nimbus-ds/alert
```

### Component Anatomy

The component consists of a box with rounded corners, plus an icon, an optional close button, and a slot that can hold other components.

## Guidelines

We use the component when we need to notify the user about an important event, or that requires an action to solve a problem, to complete some data or to wait for an asynchronous confirmation.

### Variants

The component has 5 different variants that can be used according to the message we need to communicate.

### Neutral

This variant has a neutral connotation, it can be used to communicate useful information without visual emphasis, which helps the user to understand a resource about its operation.

### Primary

This variant has a neutral connotation, it can be used to communicate useful information with visual emphasis, which helps the user to understand a resource about its operation.

### Success

This variant has a positive connotation, it can be used to inform that an action performed by the user was successfully performed.

### Warning

This variant has an intermediate connotation, it can be used to show relevant information to the user but that does not block its operation, nor does it require immediate attention.

### Danger

This variant has a negative connotation, it can be used to show critical information that is affecting the user's operation and requires their attention to solve the problem.

### Recommendation for use

- Notify that there is unfilled information or settings in another instance
- Notify that there are pending payments in another instance
- Notify that some process is running asynchronously

### Related components

- Toast - Can be used to notify users in an informational tone, that is, it just describes that something has happened or is happening.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/composite-components/alert).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
