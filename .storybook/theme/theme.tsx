import React, { useState, useEffect } from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { ThemeProvider, themeVars } from "@nimbus-ds/styles";

import light, { dark } from "./theme.definitions";

const getStorybookChannel = () => {
  try {
    return addons.getChannel();
  } catch {
    return null;
  }
};

export type NimbusThemeOption =
  | "auto"
  | "base"
  | "dark"
  | "next"
  | "next-dark"
  | "side-by-side"
  | "side-by-side-dark";

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
    const channel = getStorybookChannel();
    if (!channel) {
      return undefined;
    }
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, []);

  const selectedTheme = props?.context?.store?.userGlobals?.globals?.nimbusTheme;
  const resolvedTheme = resolveNimbusTheme(selectedTheme, undefined, isDark);
  const isDarkSurface =
    selectedTheme === "side-by-side-dark" ||
    resolvedTheme === "dark" ||
    resolvedTheme === "next-dark";

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
    const channel = getStorybookChannel();
    if (!channel) {
      return undefined;
    }
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, []);

  if (
    selectedTheme === "side-by-side" ||
    selectedTheme === "side-by-side-dark"
  ) {
    const isDarkComparison =
      selectedTheme === "side-by-side-dark" ||
      (selectedTheme === "side-by-side" && isDark);
    const leftTheme: ResolvedNimbusTheme = isDarkComparison ? "dark" : "base";
    const rightTheme: ResolvedNimbusTheme = isDarkComparison
      ? "next-dark"
      : "next";

    return (
      <div
        data-nimbus-theme={selectedTheme}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          width: "100%",
        }}
      >
        <ThemeProvider
          theme={leftTheme}
          data-nimbus-theme={leftTheme}
          style={{
            backgroundColor: themeVars.colors.neutral.background,
            color: themeVars.colors.neutral.textHigh,
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          {children}
        </ThemeProvider>
        <ThemeProvider
          theme={rightTheme}
          data-nimbus-theme={rightTheme}
          style={{
            backgroundColor: themeVars.colors.neutral.background,
            color: themeVars.colors.neutral.textHigh,
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          {children}
        </ThemeProvider>
      </div>
    );
  }

  const resolvedTheme = resolveNimbusTheme(
    selectedTheme,
    storyParameters,
    isDark
  );

  return (
    <ThemeProvider theme={resolvedTheme} data-nimbus-theme={resolvedTheme}>
      {children}
    </ThemeProvider>
  );
};
