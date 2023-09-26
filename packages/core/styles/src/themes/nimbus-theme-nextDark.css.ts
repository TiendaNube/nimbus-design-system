import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { vars } from "./contract.css";
import { globalTheme } from "./globals.css";

const nextColors = tokens.color["next-dark"];

const nextDarkTheme = {
  ...globalTheme,
  colors: {
    ...globalTheme.colors,
    primary: {
      surface: nextColors.primary.surface.value as string,
      surfaceHighlight: nextColors.primary["surface-highlight"].value as string,
      interactive: nextColors.primary.interactive.value as string,
      interactiveHover: nextColors.primary["interactive-hover"].value as string,
      interactivePressed: nextColors.primary["interactive-pressed"]
        .value as string,
      textLow: nextColors.primary["text-low"].value as string,
      textHigh: nextColors.primary["text-high"].value as string,
    },
  },
  utils: {
    focus: `0 0 0 3px ${
      nextColors.primary["surface-highlight"].value as string
    }`,
  },
};

export const variables = createTheme(vars, nextDarkTheme);

export default variables;
