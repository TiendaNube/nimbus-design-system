# `@nimbus-ds/tokens`

[![@nimbus-ds/tokens](https://img.shields.io/npm/v/@nimbus-ds/tokens?label=%40nimbus-ds%2Ftokens)](https://www.npmjs.com/package/@nimbus-ds/tokens)

## 📚 Documentation

Check out our [documentation site](https://nimbus.tiendanube.com/) for detailed guidelines and resources.

## 🚀 Installation

Install `@nimbus-ds/tokens` using any package manager.

```shell
$ npm install @nimbus-ds/tokens

// or

$ yarn add @nimbus-ds/tokens
```

## 💻 Usage

You can import our generated tokens in a variety of formats, such as `css, scss` and `js`.

**css**

```css
@import var("@nimbus-ds/tokens/dist/css/variables.css");
```

**scss**

```scss
@import "@nimbus-ds/tokens/dist/scss/_variables";
```

**js**

```javascript
import tokens from "@nimbus-ds/tokens/dist/js/tokens";
```

## 🛠 Building tokens

You can add, remove or modify existing tokens by editing the json files inside the `src` directory. Each category of tokens has it's own folder.

```
  ├─ 📁 src
  │  ├─ 📁 color
  │  │  ├─ 📄 ref.json
  │  │  ├─ 📄 sys.json
```

| Category                       | Description                                                                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Breakpoint](./src/breakpoint) | We use breakpoints to determine which screen sizes are relevant to make changes in the layout. With these tokens we can remain up to date with the most frequent device sizes. |
| [Color](./src/color)           | Our color system has specific functions and are used to visually guide the user, provide hierarchy, communicate states and add depth to our interfaces.                        |
| [Motion](./src/motion)         | We use motion values to generate micro-interactions and animate components when they have state changes or need to attract the user's attention.                               |
| [Spacing](./src/spacing)       | We use spacers to separate elements both grouped or not, to create spacing between blocks of content, fields in a form or padding in buttons.                                  |
| [typography](./src/typography) |  We use text styles to highlight information, provide titles for pages or blocks of content, featuring specific topics or text elements.                                       |

Once you finish making changes to our source tokens, you must generate a build to compile them into all different formats, by running our build command:

```shell
  $ yarn build
```

## 🔗 Useful links

- [Nimbus Design System](https://github.com/TiendaNube/nimbus-design-system). Our components library.
- [Nimbus Icons](https://github.com/TiendaNube/nimbus-icons). Our very own open-source icon library.

## 🤝 Contributing

We encourage all ideas, suggestions and feedback. If you want to collaborate with us, start by reading our [contribution guidelines](https://github.com/TiendaNube/nimbus-design-system/blob/master/docs/CONTRIBUTING.md).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
