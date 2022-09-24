# `@nimbus-ds/checkbox`

[![@nimbus-ds/checkbox](https://img.shields.io/npm/v/@nimbus-ds/checkbox?checkbox=%40nimbus-ds%2Fcheckbox)](https://www.npmjs.com/package/@nimbus-ds/checkbox)

The Checkbox component allows us to choose one or several options from a selection list.

## Installation

```sh
$ yarn add @nimbus-ds/checkbox
# or
$ npm install @nimbus-ds/checkbox
```

## Component Anatomy

The component is composed of a selection box with its respective states, in addition to a label for the content referring to the option.

## Guidelines

We use this component to select options in multiple choice forms, settings options, input lists or tables to perform massive or data filtering actions.

## Possible states

The Chip component has 4 configuration possibilities, which can be used according to the context and need of the application.

- Unchecked - is used to represent an unselected checkbox;
- Checked - is used to represent a selected checkbox;
- Indeterminate - is used to represent other checkboxes with different statuses;
- Disabled - is used to represent that a checkbox is disabled, this state can be combined with the previous 3.

## Labels

The component must always be accompanied by a label that clearly describes the option represented, always starting with the first capital letter, and sentences must never end in a semicolon. Options must be sorted using specific logical criteria (alphabetical, numerical, temporal, etc.).

## Aria Label

To facilitate navigation for people with some kind of visual or cognitive limitation, this component has a tag (Aria Label) to inform the Checkbox status.

## Usage recommendations

- Select optional items in data lists
- Select multiple data at once
- Select attributes from a filter or search
- Select multiple rows from a table

## Related components

Radio Button - Can be used to select options in settings or filters, where only a single choice is allowed.

## Implementation

**Install** the component via terminal.

```bash
npm install @nimbus-ds/checkbox
```

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/checkbox).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
