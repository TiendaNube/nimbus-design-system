# `@nimbus-ds/avatar`

[![@nimbus-ds/avatar](https://img.shields.io/npm/v/@nimbus-ds/avatar?label=%40nimbus-ds%2Favatar)](https://www.npmjs.com/package/@nimbus-ds/avatar)

The Avatar component shows the identity of a store, a person or an AI assistant with an initial or an icon inside a circle.

## Installation

```sh
$ yarn add @nimbus-ds/avatar
# or
$ npm install @nimbus-ds/avatar
```

## Component Anatomy

A circle with a background color and a single initial or an icon centered inside it. Sizes and colors come from the theme, so the same component follows the current themes and Norte UI.

## Guidelines

### Sizes

- `small` (20px): inside a medium Button or next to a line of text, such as the store account button of the global bar or a list of stores.
- `medium` (24px, default): next to the name of who a block of content belongs to, such as the answers of an AI assistant in a chat.
- `large` (40px): at the top of a header or a welcome screen, such as the welcome screen of an AI assistant chat. It does not fit inside a Button.

### Appearances

- `neutral` (default): a store or a person.
- `ai`: an AI assistant. Use it with an `Icon` in the `ai-generative` color.

## Usage recommendations

- Show one initial, not a full name or several letters.
- Keep the name visible next to the avatar whenever possible. The avatar is decorative by default and hidden from assistive technologies; when no name is visible next to it, pass `aria-label`.

## Usage

```jsx
import { Avatar } from "@nimbus-ds/avatar";

<Avatar size="small">R</Avatar>;
```

## Related components

Thumbnail - Used to show an image of a product or a file.

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
