# `@nimbus-ds/chip`

[![@nimbus-ds/chip](https://img.shields.io/npm/v/@nimbus-ds/chip?label=%40nimbus-ds%2Fchip)](https://www.npmjs.com/package/@nimbus-ds/chip)

The Chip component is used to flag criteria or attributes related to searches or filters of a list of information.

## Installation

```sh
$ yarn add @nimbus-ds/chip
# or
$ npm install @nimbus-ds/chip
```

## Component Anatomy

The component is composed of a stylized text that uses our tokens, in addition to two optional icons that can be used together.

## Guidelines

The Chip component has 4 configuration possibilities, which can be used according to the context and need of the application.

- Customizable icon with text and close icon;
- Customizable icon with text and no close icon;
- Text with close icon;
- Text only.

### Customizable icon choice

The use of the icon is optional and must be directly related to the criterion or context that the component is selecting, thus facilitating the understanding of the search term or filter.

### close icon

The close icon must be visible whenever it is possible to override the filter or search criteria.

### Contents

The component text should clearly explain the information that represents it in a few words. Although it is interactive, it does not describe an action and therefore should not be a verb.

### Usage recommendations

We use the Chip to represent the criteria applied to a list of data, being able to add several to the same context.

## Related components

Component Tag - Used to categorize information, organize or indicate status of elements or components using keywords, icons or colors.

Badge Component - Used to report pending item quantities or actions.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/chip).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
