# `@nimbus-ds/accordion`

[![@nimbus-ds/accordion](https://img.shields.io/npm/v/@nimbus-ds/accordion?label=%40nimbus-ds%2Faccordion)](https://www.npmjs.com/package/@nimbus-ds/accordion)

The Accordion component allows us to compress content into containers that can be opened or closed.

## Installation

```sh
$ yarn add @nimbus-ds/accordion
# or
$ npm install @nimbus-ds/accordion
```

### Component Anatomy

The component consists of a header and a container that can receive text or other components.

## Guidelines

We use Accordion to show large amounts of content in a small space through progressive spreading.
The header can carry a title for each block of content allowing the user to open the content that most interests him.

### Behavior

Whenever accordions are used in a group, when one is opened the other closes automatically.

### Recommendation for use

- Organize screens with lots of content
- Optimize space in contexts with a lot of information
- Group information of similar structure

### Related components

- Text - Can be used when we need to show a text that should not be hidden under any circumstances, or in conditions where the content is essential for a given context.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/composite-components/accordion).

### Props

#### Accordion.Item

| Property    | Type      | Default | Description                                                                                                                                |
| ----------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| index       | string    | -       | Unique identifier for the accordion item                                                                                                   |
| interactive | boolean   | true    | When false, the item renders as static (non-clickable) without hover effects or toggle icon. Useful for completed steps in a stepper flow. |
| testId      | string    | -       | Test identifier for the accordion item                                                                                                     |
| children    | ReactNode | -       | The content of the accordion item (typically AccordionHeader and AccordionBody)                                                            |

### Examples

#### Basic usage

```tsx
<Accordion>
  <Accordion.Item index="0">
    <Accordion.Header title="Title" />
    <Accordion.Body>Content</Accordion.Body>
  </Accordion.Item>
</Accordion>
```

#### Non-interactive items (for stepper flows)

```tsx
<Accordion>
  <Accordion.Item index="0" interactive={false}>
    <Accordion.Header title="Completed step" subtitle="This step is done" />
  </Accordion.Item>
  <Accordion.Item index="1">
    <Accordion.Header title="Current step" />
    <Accordion.Body>Step content</Accordion.Body>
  </Accordion.Item>
</Accordion>
```

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
