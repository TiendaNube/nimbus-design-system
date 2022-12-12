# `@nimbus-ds/button`

[![@nimbus-ds/button](https://img.shields.io/npm/v/@nimbus-ds/button?label=%40nimbus-ds%2Fbutton)](https://www.npmjs.com/package/@nimbus-ds/button)

The Button component allows us to initiate actions, make state or page changes.

## Installation

```sh
$ yarn add @nimbus-ds/button
# or
$ npm install @nimbus-ds/button
```

### Component Anatomy

The component is composed of a label with a stylized background that uses our tokens, in addition to optional elements such as icons, badge and spinner.

## Guidelines

We use this component to interact with applications and pages by performing an action, saving data or simply navigating between them.

### Primary Button

This variant is used to highlight the most relevant and primary actions on the page, so it should only be used once per context.
For example, on an edit page the main action, the primary CTA, should be "Save Changes".

Keep in mind that the presence of the Primary Button in the content does not preclude the use of another button of the same type in the sidebar or in the header of the application or page.

### Neutral Button

This is the variant used for neutral and complementary actions, it can accompany the Primary or Danger variant in cases where we have opposite actions.
For example: If the Primary Button is "Save" the Default Button must be "Cancel".

### Danger

This variant is used to highlight destructive or irreversible actions, it is usually accompanied by the Neutral variant.
For example: If the Danger Button is "Delete Product" the Neutral Button should be "Cancel".

### Icons

We use icons to reinforce the button's message, they can be applied before or after the label.

### Spinner

We use Spinner to represent loading or processing of information after tap or click.

### Badge

We use the Badge to represent the number of items tied to a button action.

### Content

- We use the infinitive to write the label of our buttons.
- The text must clearly describe the action that will take place.
- Button labels must be clear and short.
- We use a maximum of 2 words to describe the action.

### Button is recommended for:

- Save information from a form;
- Confirm destructive actions;
- Access settings in other instances.

### Related components

- Link - Can be used to make page changes employing a lower visual highlight than the Button.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/button).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
