import OpenInV0 from "../v0-registry/components/OpenInV0";

const REGISTRY_BASE = window.location.origin;

import React from "react";
import type { Preview } from "@storybook/react";

import { light, dark, ThemeDocsProvider, ThemeNimbusProvider } from "./theme";
import "./static/style.css";

const preview: Preview = {
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
        order: ["Atomic", "Composite", "Skeleton"],
      },
    },
    backgrounds: {
      disable: true,
    },
  },
};

export default preview;

export const decorators = [
  (Story, context) => {
    console.log();
    return (
      <div>
        <ThemeNimbusProvider>
          <Story />
        </ThemeNimbusProvider>
        <div style={{ marginTop: 12 }}>
          <OpenInV0
            registryBaseUrl={REGISTRY_BASE}
            itemName={context.component.displayName.toLowerCase()}
          />
        </div>
      </div>
    );
  },
];
