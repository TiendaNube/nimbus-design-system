import React from "react";
import { themes } from "@storybook/theming";

import { base, darkExtend } from "./theme";
import ThemeProvider from "./ThemeProvider";
import theme from "./theme";
import "./style.css";

export const parameters = {
  darkMode: {
    current: "light",
    darkClass: "darkClass",
    lightClass: "lightClass",
    stylePreview: true,
    light: {
      ...themes.light,
      ...base,
    },
    dark: {
      ...darkExtend,
      ...base,
    },
  },
  backgrounds: {
    disable: true,
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: ["Atomic", "Composite", "Skeleton"],
    },
  },
  docs: {
    theme,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];
