# `@nimbus-ds/card`

[![@nimbus-ds/card](https://img.shields.io/npm/v/@nimbus-ds/card?label=%40nimbus-ds%2Fcard)](https://www.npmjs.com/package/@nimbus-ds/card)

The Card component allows us to group contents and related actions, making it easier to identify groups of information.

## Installation

```sh
$ yarn add @nimbus-ds/card
# or
$ npm install @nimbus-ds/card
```

### Component Anatomy

The component consists of a box with shadow and rounded corners, plus an optional padding.

## Guidelines

We use the component to group components and similar subjects, separating themes and creating groups that facilitate the reading and understanding of information.

### Structure

The component is basically a container that can receive other Nimbus components, local components or stylized texts.

### Positioning elements

The order of the elements must respect the visual hierarchy, always in a descending way, buttons and links should preferably be at the bottom of the card, title and elements that communicate status and context about the card at the top.

### Background

The component has 10 distinct color variants, each with specific functions.

- Background - Standard neutral variant, used to group contents without highlighting them.
- Neutral/Primary Surface and Surface Highlight - Used to highlight neutral content that requires greater visual highlight.
- Success Surface/Surface Highlight - Used to highlight normality or success status.
- Warning Surface/Surface Highlight - Used to highlight attention or checking status.
- Danger Surface/Surface Highlight - Used to highlight error or danger status.

### Contents

We may use components or any combination of these in the content of a Card. In all cases, it is important that the title and any Labels or actions we use in the header are correctly linked to the information and represent it clearly.

There cannot be a Card with more than one topic or type of information within it, all content must be related to help the user easily navigate a group of Cards.

### Usage recommendation

- Group information from an order or customer
- Separate settings of different types
- Group information about a status

### Related components

- Box - Can be used to group and separate multiple elements within a card.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/composite-components/card).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
