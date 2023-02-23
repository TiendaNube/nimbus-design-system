# `@nimbus-ds/textarea`

[![@nimbus-ds/textarea](https://img.shields.io/npm/v/@nimbus-ds/textarea?label=%40nimbus-ds%2Ftextarea)](https://www.npmjs.com/package/@nimbus-ds/textarea)

The Textarea component allows the user to enter or edit information in long text format.

## Implementation

**Install** the component via terminal.

```bash
$ yarn add @nimbus-ds/textarea
# or
$ npm install @nimbus-ds/textarea
```

### Component Anatomy

The component consists of a text field of two or more lines with a border.

## Guidelines

We use the Textarea component when we need the user to enter information in text or numeric format that occupies more than one line.

### Validation

Textareas have the possibility of visually validating the information entered, whether they are correct or not.

For this, the component's border changes color as information is entered, and comes with an icon and help text that can reinforce the message.

Keep in mind that it's important not to rely solely on color to convey a state, as some users may have difficulty seeing colors correctly.

### Content

Textareas have the possibility to visually validate the information entered, whether they are correct or not.

Firstly, we must always accompany the Textarea with a label, which properly informs the data that must be inserted. The label must be visible at all times, as it helps the user to always understand the information being requested.

Additionally, we may use the placeholder to provide more context or an example to help the user better understand what information is being requested. This placeholder must not be conditioned to the type of information that must be inserted, since it disappears after typing.

When validating the information, we have the possibility of showing an error message to indicate to the user that the entered data is incorrect. In addition to the message, we also have an icon that appears automatically to give a visual clue of what is happening.

### Recommendation for use

- Insert long texts into a form
- Insert texts with more than one line in forms
- Insert product descriptions

## Related Components

- Input - Can be used when the information to be inserted fits in a single line.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/textarea).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
