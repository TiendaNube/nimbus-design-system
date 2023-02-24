# `@nimbus-ds/select`

[![@nimbus-ds/select](https://img.shields.io/npm/v/@nimbus-ds/select?select=%40nimbus-ds%2Fselect)](https://www.npmjs.com/package/@nimbus-ds/select)

The Select component allows the user to select an option from a list.

## Installation

```sh
$ yarn add @nimbus-ds/select
# or
$ npm install @nimbus-ds/select
```

### Component Anatomy

The component consists of a field with a dropdown list.

## Guidelines

We use this component when we need the user to enter information in a form, selecting a single option from a dropdown list.

### Select native

This component is dependent on each browser's native select, so the look of the list of options will depend directly on the operating system and browser used.

### Content

Given that Select is a component that interacts directly with the user of an application or page, it is important that the information shown is clear and correct and helps guide you when filling out a form.

In the first place, we must always accompany the Select with a Label component, which properly informs the data that must be inserted. This label must be visible at all times, as it helps the user to understand the information being requested.

Within the list of options, the text of each item should be brief so as not to overload with information. In addition, if there are many items, we can use groups to divide the options into categories.

### Recommendation for use

- Select options in lists with more than 7 items
- Select a configuration
- Select a massive action

### Related components

- Radio - Can be used to select a single option from a list of less than 7 items.
- Toggle - Can be used to toggle binary options on and off.
- Checkbox - Can be used to select multiple options from a list.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/select).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
