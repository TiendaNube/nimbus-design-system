import React from "react";
import { ThemeProvider as NimbusThemeProvider } from "@nimbus-ds/styles";
import { useDarkMode } from "storybook-dark-mode";

const ThemeProvider = ({ children }) => {
  return (
    <NimbusThemeProvider theme={useDarkMode() ? "dark" : ""}>
      {children}
    </NimbusThemeProvider>
  );
};

export default ThemeProvider;
