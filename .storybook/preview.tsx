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
          { value: "auto", title: "Auto (Base / Next by story)" },
          { value: "base", title: "Base (Light)" },
          { value: "dark", title: "Dark (Base Dark)" },
          { value: "next", title: "Next (Norte UI Light)" },
          { value: "next-dark", title: "Next Dark (Norte UI Dark)" },
          { value: "side-by-side", title: "Side-by-Side (Base vs Next)" },
          {
            value: "side-by-side-dark",
            title: "Side-by-Side (Dark vs Next Dark)",
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
