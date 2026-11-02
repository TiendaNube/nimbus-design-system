import { useEffect } from "react";
import { useTheme } from "../useTheme";

const warnedComponents = new Set<string>();

export const resetNextThemeWarnings = (): void => {
  warnedComponents.clear();
};

/**
 * Emits a deduplicated development warning when a `/next` component is rendered
 * outside of `<ThemeProvider theme="next">` or `<ThemeProvider theme="next-dark">`.
 * Never throws or blocks rendering; `:root` (`base`) CSS variables act as fallback.
 */
export const useNextThemeWarning = (componentName: string): void => {
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    if (currentTheme !== "next" && currentTheme !== "next-dark") {
      const warningKey = `${componentName}:${currentTheme ?? "base"}`;
      if (!warnedComponents.has(warningKey)) {
        warnedComponents.add(warningKey);
        // eslint-disable-next-line no-console
        console.warn(
          `[@nimbus-ds/next] <${componentName} /> from "/next" was rendered under theme="${
            currentTheme ?? "base"
          }". Wrap your application or subtree in <ThemeProvider theme="next"> or <ThemeProvider theme="next-dark"> for the intended Norte UI tokens.`
        );
      }
    }
  }, [componentName, currentTheme]);
};
