import React from "react";
import type { Decorator, Preview } from "@storybook/react";

import { light, dark, ThemeDocsProvider, ThemeNimbusProvider } from "./theme";
import "./static/style.css";

const preview: Preview = {
  initialGlobals: {
    nimbusTheme: "auto",
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      current: "dark",
      darkClass: "darkClass",
      lightClass: "lightClass",
      stylePreview: true,
      light,
      dark,
    },
    docs: {
      container: ThemeDocsProvider,
      autodocs: true,
    },
    options: {
      storySort: {
        order: ["Atomic", "Composite", "Next", "Skeleton"],
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  globalTypes: {
    nimbusTheme: {
      name: "Nimbus Theme",
      description: "Active Nimbus theme generation and color mode",
      defaultValue: "auto",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "auto", title: "Auto (Base / Norte UI by story)" },
          { value: "base", title: "Base (Light)" },
          { value: "dark", title: "Dark (Base Dark)" },
          { value: "next", title: "Next (Premium Plan Light)" },
          { value: "next-dark", title: "Next Dark (Premium Plan Dark)" },
          { value: "next-norteui", title: "Next Norte UI (Light)" },
          { value: "next-norteui-dark", title: "Next Norte UI Dark" },
          {
            value: "side-by-side",
            title: "Side-by-Side (Base vs Next Norte UI)",
          },
          {
            value: "side-by-side-dark",
            title: "Side-by-Side (Dark vs Next Norte UI Dark)",
          },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

export const decorators: Decorator[] = [
  (renderStory, context) => (
    <ThemeNimbusProvider
      selectedTheme={context.globals?.nimbusTheme}
      storyParameters={context.parameters}
    >
      {renderStory()}
    </ThemeNimbusProvider>
  ),
];
