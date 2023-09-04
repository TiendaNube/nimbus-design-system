import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { vars } from "./contract.css";
import { globalTheme } from "./globals.css";

const colors = tokens.color.next;

const nextTheme = {
  ...globalTheme,
  colors: {
    ...globalTheme.colors,
    primary: {
      surface: colors.primary.surface.value as string,
      surfaceHighlight: colors.primary["surface-highlight"].value as string,
      interactive: colors.primary.interactive.value as string,
      interactiveHover: colors.primary["interactive-hover"].value as string,
      interactivePressed: colors.primary["interactive-pressed"].value as string,
      textLow: colors.primary["text-low"].value as string,
      textHigh: colors.primary["text-high"].value as string,
    },
  },
  utils: {
    focus: `0 0 0 3px ${colors.primary["surface-highlight"].value as string}`,
  },
};

export const variables = createTheme(vars, nextTheme);

export default variables;
