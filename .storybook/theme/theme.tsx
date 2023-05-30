import React, { useState, useEffect } from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME, useDarkMode } from "storybook-dark-mode";
import { ThemeProvider } from "@nimbus-ds/styles";

import light, { dark } from "./theme.definitions";

const channel = addons.getChannel();

export const ThemeDocsProvider: React.FC<any> = (props) => {
  const [isDark, setDark] = useState();
  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, [channel, setDark]);

  return <DocsContainer {...props} theme={isDark ? dark : light} />;
};

export const ThemeNimbusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={useDarkMode() ? "dark" : "base"}>
      {children}
    </ThemeProvider>
  );
};
