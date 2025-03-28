# 🤖 Cursor Prompt Template

This document provides a template for creating new components in the Nimbus Design System using Cursor AI. Follow this template to ensure consistency and completeness when requesting new component implementations.

## 📝 Instructions

How to use: - Replace [ComponentName] with the name of the component - Depending on the component, replace [atomic/composite] with the correct folder name - Add more information in the Component specifications, Usage example and Component props sections - Attach the component screenshot to the Cursor prompt chat.

PROMPT:

Build me a new [ComponentName] package component in the Nimbus Design System monorepo. It should be located in packages/react/src/[atomic/composite]/[component-name].
It should be a new npm package in the Nimbus Design System monorepo, with the specific structure following the project conventions specified in the docs/CONTRIBUTING.md file.

/// Component specifications
The ComponentName component should be a [component-description], with a [component-description], composted of [component-description].

The use of the component, from the client side, should be in the following format:
/// Usage example

```tsx
    <ComponentName [propName]="[propValue]" [propName]="[propValue]" />
```

/// Component props
The props should be:

- [propName]: [propType] - [propDescription]

It is extremely important to follow the coding standards and guidelines set in the docs/CONTRIBUTING.md document!

The component should follow these requirements:

1. Component Structure:

- Create appropriate folder structure following project conventions
- Implement as a React functional component
- Define and export proper TypeScript types/interfaces for props
- Follow accessibility best practices

2. Styling:

- Use sprinkle CSS defined in @nimbus-ds/styles internal package
- Create component-specific styles in packages/core/styles/src/packages
- Place in appropriate atomic/composite folder
- Export types in packages/core/styles/src/index.ts

3. Documentation & Testing:

- Include comprehensive Storybook stories
- Write Jest unit tests with good coverage
- Update CHANGELOG.md following project conventions
- Ensure docs are generated correctly after build:docs

4. Dependencies:

- Avoid duplicating devDependencies from root package.json
- Only include dependencies needed for individual package installation

Please provide:

- Component implementation
- Types definition
- Tests
- Stories
- Style definitions
- Updated CHANGELOG
