# `@nimbus-ds/components`

[![@nimbus-ds/components](https://img.shields.io/npm/v/@nimbus-ds/components?label=%40nimbus-ds%2Fcomponents)](https://www.npmjs.com/package/@nimbus-ds/components)

Nimbus components is a component library built with [React](https://reactjs.org), designed to help our teams and ecosystem build better products for our merchants.

## 🚀 Getting started

Install `@nimbus-ds/components` using any package manager.

```sh
$ yarn add @nimbus-ds/webpack
# or
$ npm install @nimbus-ds/webpack
```

## 💻 Usage

```jsx
import { Button } from "@nimbus-ds/components";

const ComponentExample = () => <Button>Hello World</Button>;
```

For more information about our components, check out our [Storybook](https://tiendanube.github.io/nimbus-design-system/).

### Folder & file structures 📁 📄

- For best practices in structure files please read this [document](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-with-single-file-logic)
- When creating a new component, do so inside the **src/atomic** or **src/composite** directory

```
  ├─ 📁 src
  │  └─ 📁 atomic/composite
```

- Every directory must contain a 📄 **CHANGELOG.md** which serves to document all changes and changes made to each component.

```
  ├─ 📁 src
  │  ├─ 📁 atomic/composite
  │  │  ├─ 📁 ComponentExample
  │  │  │  ├─ 📁 src
  │  │  │  └─ CHANGELOG.md
```

- Every directory should contain a 📄 **README.md** which serves to document the installation steps and a brief summary of each component.

```
  ├─ 📁 src
  │  ├─ 📁 atomic/composite
  │  │  ├─ 📁 ComponentExample
  │  │  │  ├─ 📁 src
  │  │  │  ├─ CHANGELOG.md
  │  │  │  └─ README.md
```

- The directory should have the same name as the component. The component file should have the name of the component in Pascal Case format and the extension `.tsx`

```
  ├─ 📁 src
  │  ├─ 📁 atomic/composite
  │  │  ├─ 📁 ComponentExample
  │  │  │  ├─ 📁 src
  │  │  │  │  └─ ComponentExample.tsx
  │  │  │  ├─ CHANGELOG.md
  │  │  │  └─ README.md
```

- Every directory should contain a 📄 **index.ts** which serves as an entry point for the module, component, utils and/or hooks.

```
  ├─ 📁 src
  │  ├─ 📁 atomic/composite
  │  │  ├─ 📁 ComponentExample
  │  │  │  ├─ 📁 src
  │  │  │  │  ├─ index.ts
  │  │  │  │  └─ ComponentExample.tsx
  │  │  │  ├─ CHANGELOG.md
  │  │  │  └─ README.md
```

- Every component, utils and/or hooks should come with a test. The test must have the same name as the file being tested and the extension must be `.spec.tsx`

```
  ├─ 📁 src
  │  ├─ 📁 atomic/composite
  │  │  ├─ 📁 ComponentExample
  │  │  │  ├─ 📁 src
  │  │  │  │  ├─ index.ts
  │  │  │  │  ├─ ComponentExample.tsx
  │  │  │  │  └─ componentExample.spec.tsx
  │  │  │  ├─ CHANGELOG.md
  │  │  │  └─ README.md
```

- Every component must come with documentation. The documentation must have the same name as the file being documented and the extension must be `.stories.tsx`.

```
  ├─ 📁 src
  │  ├─ 📁 atomic/composite
  │  │  ├─ 📁 ComponentExample
  │  │  │  ├─ 📁 src
  │  │  │  │  ├─ index.ts
  │  │  │  │  ├─ ComponentExample.tsx
  │  │  │  │  ├─ componentExample.spec.tsx
  │  │  │  │  └─ componentExample.stories.tsx
  │  │  │  ├─ CHANGELOG.md
  │  │  │  └─ README.md
```

- Every component must come with a typing. The type must have the same name as the file being documented and the extension must be `.types.tsx`.

```
  ├─ 📁 src
  │  ├─ 📁 atomic/composite
  │  │  ├─ 📁 ComponentExample
  │  │  │  ├─ 📁 src
  │  │  │  │  ├─ index.ts
  │  │  │  │  ├─ ComponentExample.tsx
  │  │  │  │  ├─ componentExample.spec.tsx
  │  │  │  │  ├─ componentExample.stories.tsx
  │  │  │  │  └─ componentExample.types.ts
  │  │  │  ├─ CHANGELOG.md
  │  │  │  └─ README.md
```

- If a component has one or more children components, a subdirectory **📁 components** must be created inside de main directory of the component.

```
  ├─ 📁 src
  │  ├─ 📁 atomic/composite
  │  │  ├─ 📁 ComponentExample
  │  │  │  ├─ 📁 src
  │  │  │  │  ├─ 📁 components
  │  │  │  │  │  ├─ 📁 ComponentChild
  │  │  │  │  │  │  ├─ index.ts
  │  │  │  │  │  │  ├─ ComponentChild.tsx
  │  │  │  │  │  │  ├─ componentChild.spec.tsx
  │  │  │  │  │  │  └─ componentExample.types.ts
  │  │  │  │  │  └─ index.ts
  │  │  │  │  ├─ index.ts
  │  │  │  │  ├─ ComponentExample.tsx
  │  │  │  │  ├─ componentExample.spec.tsx
  │  │  │  │  ├─ componentExample.stories.tsx
  │  │  │  │  └─ componentExample.types.ts
  │  │  │  ├─ CHANGELOG.md
  │  │  │  └─ README.md
```

### Component coding 🤖 ⌨️

- The component should have the same name as the file using Pascal Case format. It should be declared in a Arrow Function, always typying the expected answer and making the default export at the end of the file.

  ```jsx
  // ComponentExample.tsx
  import React from "react";

  const ComponentExample: React.FC = () => <div>...</div>;

  export { ComponentExample };
  ```

- If the component has props, they will be imported from the corresponding `.definitions.ts` file adding initial prefix corresponding to their type. Example interface ` ILogin`, type `TLogin`, enum `ELogin`.

  ```jsx
  // ComponentExample.tsx
  import React from "react";
  import { ComponentExampleProps } from "./componentExampleProps.types";

  const ComponentExample: React.FC<ComponentExampleProps> = ({
    title,
    description,
  }) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );

  export { ComponentExample };
  ```

### Testing 🧪🔬

- For testing best practices, please read this [document](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library).
- To create a test is necessary to import from the testing library both the render and the screen.

```jsx
import { render, screen } from "@testing-library/react";
```

- The component to be tested should also be imported.

```jsx
import { render, screen } from "@testing-library/react";
import { ComponentExample } from "./ComponentExample";
```

- The heading of the tests must be written following the order Given-When-Then [Documentation](https://cucumber.io/docs/gherkin/reference/)
  - **Given** represents a precondition
  - **When** an action
  - **Then** a result or consequence of the action (user acceptance criteria).
  - **And** a result or consequence of other consequence (user acceptance criteria).
  - **But** a result which should not be possibly observable

```jsx
import { render, screen } from "@testing-library/react";
import { ComponentExample } from "./ComponentExample";

describe("GIVEN <ComponentExample />", () => {
  describe("WHEN rendered", () => {
      it("THEN should display the correct text", () => {
        ...
      });
  });
});
```

- In this first instance, we will verify the right rendering of the component by checking the text in each of the elements.

```jsx
import { render, screen } from "@testing-library/react";
import { ComponentExample } from "./ComponentExample";

describe("GIVEN <ComponentExample />", () => {
  describe("WHEN rendered", () => {
    it("THEN should display the correct text", () => {
      render(<ComponentExample title="title" description="description" />);
      expect(screen.getByText(/title/i)).toBeInTheDocument();
      expect(screen.getByText(/description/i)).toBeInTheDocument();
    });
  });
});
```
