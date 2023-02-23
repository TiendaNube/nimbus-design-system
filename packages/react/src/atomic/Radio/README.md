# `@nimbus-ds/radio`

[![@nimbus-ds/radio](https://img.shields.io/npm/v/@nimbus-ds/radio?radio=%40nimbus-ds%2Fradio)](https://www.npmjs.com/package/@nimbus-ds/radio)

The Radio component allows us to choose a single option within a selection list.

## Installation

```sh
$ yarn add @nimbus-ds/radio
# or
$ npm install @nimbus-ds/radio
```

### Component Anatomy

The component is composed of a bullet or selection button with their respective states, in addition to a label that displays the content referring to the option.

## Guidelines

We use this component when we need the user to enter information in a form, checking a single option within a list of up to 7 items.

### Radio default

This variant has less visual prominence, so it can be used in vertical selection lists, such as in settings or registration forms.

### Radio button

This variant has more visual prominence, so it can be used in horizontal lists as criteria within a data filter.

### Possible states

The component has 3 states, which can be used according to the context and need of the application.

- Rest - is used to represent an unselected option
- Checked - is used to represent a selected option
- Disabled - is used to represent that an option is disabled, this state can be combined with the previous 2

### Labels

The component must always be accompanied by a label that clearly describes the option represented, always starting with the first capital letter, and sentences must never end in a semicolon. The options must be sorted using a specific logical criteria (alphabetic, numerical, temporal, etc.).

### Aria Label

To facilitate navigation for people with some kind of visual or cognitive limitation, this component has a tag (Aria Label) to inform the current status of the Radio.

### Recommendation for use

- Selection of items in lists where the choice is mandatory
- Select a single setting from a list of options

### Related components

- Select - Can be used to select a single option from a list of more than 7 items
- Toggle - Can be used to toggle binary options on and off
- Checkbox - Can be used to select multiple options from a list

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/radio).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
