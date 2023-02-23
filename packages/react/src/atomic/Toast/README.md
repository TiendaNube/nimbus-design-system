# `@nimbus-ds/toast`

[![@nimbus-ds/toast](https://img.shields.io/npm/v/@nimbus-ds/toast?label=%40nimbus-ds%2Ftoast)](https://www.npmjs.com/package/@nimbus-ds/toast)

The Toast component allows us to notify users in an informational tone, describing that something has happened or is happening, without interrupting navigation.

## Installation

```sh
$ yarn add @nimbus-ds/toast
# or
$ npm install @nimbus-ds/toast
```

### Component Anatomy

The component consists of an icon and text, inside a box with a background and border stylized according to the possible states.

## Guidelines

We use this component to show informative, short and temporary notifications related to actions that have just taken place or are taking place, when there is no need to interrupt navigation or require interactions on other screens.

### Variants

- Primary - Used in neutral contexts, not associated with a positive or negative action;
- Success - Used in positive contexts, associated with actions performed successfully;
- Danger - Used in negative contexts, associated with processing or filling errors;
- Progress - Used in neutral contexts, associated with an action that is still in process and has no defined success or error status.

### Content

This component's text is limited to a maximum of 30 characters and its message should be short and concise, informing the user about something that just happened, right after the action was performed or while it was being processed.

The message must be written in the infinitive and with the following structure:
The action we just took (example: creating a product)
The result of the action (example: with success / with error)

### Presentation time

The presentation time can be customized according to the context in which the toast is applied, we must always take into account the number of characters following the suggestions below.

- 4 seconds - For messages with up to 10 characters;
- 8 seconds - For message with more than 10 characters;
- 16 seconds - For messages with more than 20 characters;
- Custom - Use restricted to toast progress.

### Recommendation for use

- Inform about unfilled fields in a form
- Inform about filling errors in forms
- Inform that there is a processing or upload taking place
- Inform what information was saved
- Inform that a systemic error has occurred

### Related components

- Alert - Can be used to notify the user in a timely manner about an important event that requires their action.
- Modal - Can be used to notify the user in an intrusive way, giving the possibility to make a decision based on something that just happened.

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/toast).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
