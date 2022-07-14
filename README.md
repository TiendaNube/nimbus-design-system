<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />

# ☁️ Nimbus Design System

> Nimbus is an open-source Design System created by Tiendanube / Nuvesmhop’s team to empower and enhance more stories every day, with simplicity, accessibility, consistency and performance.

![PRs](https://img.shields.io/badge/PRs-Welcome-0CA76B) ![Nimbus Design System](https://github.com/TiendaNube/nimbus-design-system/actions/workflows/pull-request.yml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

Check out our [documentation site](https://nimbus.nuvemshop.com.br) for detailed guidelines and resources.

We use [Storybook](https://storybook.js.org) as our front-end library to provide a full interactive playground for testing and building components.

You can browse through our [playground](https://tiendanube.github.io/design-system-nimbus) to test and see our components in action.

## 🚀 Installation

- **Install**

  ```shell
   TODO
  ```

## 💻 Start developing

- **Install dependencies**

  Get all dependencies installed by running

  ```shell
  $ yarn
  ```

- **Setting up the project**

  ```shell
  $ yarn prepare-husky
  ```

- **Start developing**

  Start the local environment with

  ```shell
   TODO
  ```

## 📚 General informations

To standardize our commits we use [Conventional Commits](https://www.conventionalcommits.org/) a specification for adding human and machine readable meaning to commit messages

- **Naming standards**

  ```shell
  # commit
  feat: description
  ```

- **Linter**

  ```shell
  # find problems
  $ yarn lint

  # find and fix problems automatically
  $ yarn lint:fix
  ```

- **Unit tests**

  ```shell
  # run all unit tests
  $ yarn test

  # run all the tests and watch for changes in related files
  $ yarn test:watch

  # run tests only on changed files
  $ yarn test:staged

  # run all unit tests generates the coverage report in the coverage folder in the project root
  $ yarn test:coverage

  # run all unit tests generates the coverage report in the coverage folder in the project root and watch changes in related files
  $ yarn test:watch:coverage
  ```

- **Hooks**

  This project has these hooks:

  - `pre-commit`: perform static code analysis with eslint
  - `commit-msg`: validates the commit message according to the convention adopted by the project
  - `pre-push`: perform unit testing of project components and integration tests

## 🔗 Useful links

- [Design Tokens](https://github.com/TiendaNube/design-tokens-nimbus). We use tokens to store all our primitives (colors, spacing values, grid system, etc.).
- [Nimbus Icons](https://github.com/TiendaNube/nimbus-icons). Our very own open-source icon library.

## 🤝 Contributing

We encourage all ideas, suggestions and feedback. If you want to collaborate with us, start by reading our [contribution guidelines](./CONTRIBUTING.md).

## 📄 License

Licensed under the MIT License, Copyright © 2022-present [Tiendanube](https://www.nuvemshop.com.br).

See [LICENSE](./LICENSE) for more information.
