# `@nimbus-ds/input`

[![@nimbus-ds/input](https://img.shields.io/npm/v/@nimbus-ds/input?label=%40nimbus-ds%2Finput)](https://www.npmjs.com/package/@nimbus-ds/input)

The Input component allows the user to enter or edit information in text format.

## Implementation

**Install** the component via terminal.

```bash
$ yarn add @nimbus-ds/input
# or
$ npm install @nimbus-ds/input
```

## Component Anatomy

The component consists of a one-line bordered text field.

## Guidelines

We use the Input component when we need the user to enter some short textual or numeric information that occupies only one line.

## Variants

The component has 3 variants that can be used according to context and application.

- Text - Used to receive texts that need validation or not.
- Search - Used for search fields, this is the only variant that does not require the use of the Label component as it has an icon by default.
- Password - Used to receive passwords or sensitive data.

## AI-generated highlight

- Use `aiGenerated` when the field value was filled by a Generative AI to highlight it visually. This applies the Nimbus AI gradient border, white background and a subtle pink focus ring.

## Additional elements

The component has some elements that can be used together to highlight or add context to the inputs.

- Label component - It is used together to guide the user on what type of information should be entered.
- Prefix or Sufix - Can be used to condition the insertion of information according to a criterion, such as unit of measure or weight.

## Validations

The Inputs have the possibility to visually validate the information entered, whether it is correct or not.

To do this, the component's border changes color as information is entered, and is accompanied by an icon and help text that can reinforce the message.

Remember that it is important not to rely solely on color to convey a state, as some users may have difficulty seeing colors correctly.

## Contents

Since Inputs are components that interact directly with the user of an application or page, it is therefore important that labels and placeholders are clear and help guide you in filling out the form.

Firstly, we must always accompany the Input of a label, which adequately informs the data that must be inserted. The label must be visible at all times, as it helps the user to always understand the information being requested.

In addition, we may use the placeholder to provide more context or an example to help the user better understand what information is being requested. This placeholder should not be conditioned to the type of information that must be entered, as it disappears after typing.

When validating the information, we have the possibility of showing an error message to indicate to the user that the data entered is incorrect. In addition to the message, we also have an icon that appears automatically to give a visual clue of what is happening.

## Usage recommendation

- Insert data into registration forms
- Insert sensitive data into a login form
- Insert data about quantities and or values
- Insert criteria into a search field

## Related component

- Textarea - Can be used when we need the amount of text to be inserted to be greater than one line.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/input).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
