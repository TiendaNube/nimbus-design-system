# `@nimbus-ds/timeline`

[![@nimbus-ds/timeline](https://img.shields.io/npm/v/@nimbus-ds/timeline?label=%40nimbus-ds%2Ftimeline)](https://www.npmjs.com/package/@nimbus-ds/timeline)

The Timeline component allows us to show a list of transaction state changes with icons, colors and time details.

## Installation

```sh
$ yarn add @nimbus-ds/timeline
# or
$ npm install @nimbus-ds/timeline
```

### Component Anatomy

The component consists of a list transaction state changes.

### Structure

The component receives a `timelineData` Array JSON property to render all the items in place. The component sorts this data using the happenedAt property.

```typescript
export interface TimelineItemData {
  happenedAt: string;
  type: "order-fulfillment" | "order-payment" | "transaction-event";
  action: "fulfilled" | "unfulfilled" | "paid" | "pending";
  userName: string | null;
}
```

### Related components

- Box - Can be used to group and separate multiple elements within a card.
- Text - Can be used when we need to show a text that should not be hidden under any circumstances, or in conditions where the content is essential for a given context.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/composite-components/card).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
