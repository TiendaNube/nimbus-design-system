# `@nimbus-ds/link`

[![@nimbus-ds/link](https://img.shields.io/npm/v/@nimbus-ds/link?label=%40nimbus-ds%2Flink)](https://www.npmjs.com/package/@nimbus-ds/link)

The Link component allows us to navigate between internal or external pages of a website.

## Installation

```sh
$ yarn add @nimbus-ds/link
# or
$ npm install @nimbus-ds/link
```

### Component Anatomy

The component consists of text, as well as optional icons.

## Guidelines

We use this component independently, within other components or within the text. Link currently has 3 variants with different uses, in addition to the possibility of including an icon.

### Primary Link

This variant is used to highlight important links for the user's navigation, as it is blue in color and the use of the underline is optional. The repetition of this type of link on the same page is allowed, but not more than once per element.

### Neutral Link

This is the variant used for neutral and complementary actions, it can accompany the Primary or Danger variant in cases where we have opposite actions.
For example: If the Primary Link is "Save" the Default Link must be "Cancel".

### DangerLink

This variant is used to highlight links with destructive action, where the use of the Button Danger component has a visual role beyond what is necessary.

### Icons

We use the icons to reinforce the message of the link or to inform that your address is external, they can be applied before or after the text.

### Content

The Link text must clearly describe the action by referring to it using colloquial language and addressed directly to the user. For example: we use "Edit categories" and not "Categories".

External links must always be accompanied by an icon that helps to illustrate what will happen when you click on it, with the aim of reinforcing the message and providing more visual resources.

For example, when the link performs a navigation action to an external link, we must use an icon to indicate that the user will be directed to another application or external page.

The exception to this rule is when the Link is within the context of a paragraph or sentence, where we can avoid using the icon to maintain the visual structure of the text block.

### Recommendation for use

- Navigate to another section within the app or website
- Navigate to another app or external page
- Perform minor actions

### Related component

- Button - Can be used to initiate actions, make state or page changes that require greater visual prominence.

### Polymorphic support

This component can be rendered as a `<button>` or `<link>` HTML element, using the `as` property, which allows it to inherit all native properties of HTML elements for different implementations.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/link).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
