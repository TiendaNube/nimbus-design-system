import React, { useState, useEffect } from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { ThemeProvider, vars } from "@nimbus-ds/styles";

import light, { dark } from "./theme.definitions";

const channel = addons.getChannel();

export type NimbusThemeOption =
  | "auto"
  | "base"
  | "dark"
  | "next"
  | "next-dark";

export type ResolvedNimbusTheme = "base" | "dark" | "next" | "next-dark";

export const resolveNimbusTheme = (
  selectedTheme?: string,
  storyParameters?: { nimbusTheme?: string; fileName?: string },
  isDarkToggle?: boolean
): ResolvedNimbusTheme => {
  if (
    selectedTheme === "base" ||
    selectedTheme === "dark" ||
    selectedTheme === "next" ||
    selectedTheme === "next-dark"
  ) {
    return selectedTheme;
  }

  const parameterTheme = storyParameters?.nimbusTheme;
  if (
    parameterTheme === "base" ||
    parameterTheme === "dark" ||
    parameterTheme === "next" ||
    parameterTheme === "next-dark"
  ) {
    if (isDarkToggle) {
      return parameterTheme.startsWith("next") ? "next-dark" : "dark";
    }
    return parameterTheme;
  }

  const fileName = storyParameters?.fileName ?? "";
  const isNextStory =
    fileName.includes("/src/next/") || fileName.includes("\\src\\next\\");

  if (isNextStory) {
    return isDarkToggle ? "next-dark" : "next";
  }

  return isDarkToggle ? "dark" : "base";
};

export const ThemeDocsProvider: React.FC<any> = (props) => {
  const [isDark, setDark] = useState<boolean>(false);
  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, []);

  const selectedTheme = props?.context?.store?.userGlobals?.globals?.nimbusTheme;
  const resolvedTheme = resolveNimbusTheme(selectedTheme, undefined, isDark);
  const isDarkSurface =
    resolvedTheme === "dark" || resolvedTheme === "next-dark";

  return (
    <DocsContainer {...props} theme={isDarkSurface ? dark : light}>
      <ThemeProvider theme={resolvedTheme}>{props.children}</ThemeProvider>
    </DocsContainer>
  );
};

export interface ThemeNimbusProviderProps {
  children: React.ReactNode;
  selectedTheme?: string;
  storyParameters?: { nimbusTheme?: string; fileName?: string };
}

export const ThemeNimbusProvider: React.FC<ThemeNimbusProviderProps> = ({
  children,
  selectedTheme = "auto",
  storyParameters,
}) => {
  const [isDark, setDark] = useState<boolean>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("darkClass");
    }
    return false;
  });

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, []);

  const resolvedTheme = resolveNimbusTheme(
    selectedTheme,
    storyParameters,
    isDark
  );

  return (
    <ThemeProvider theme={resolvedTheme}>
      <div
        data-nimbus-theme={resolvedTheme}
        style={{
          backgroundColor: vars.colors.neutral.background,
          color: vars.colors.neutral.textHigh,
          minHeight: "100%",
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
};
