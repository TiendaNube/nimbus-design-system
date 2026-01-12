import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { vars } from "./contract.css";
import { globalTheme } from "./globals.css";

const nextColors = tokens.color["next-dark"];
const colors = tokens.color.dark;
const { shadow } = tokens;

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
    success: {
      surface: colors.success.surface.value as string,
      surfaceHighlight: colors.success["surface-highlight"].value as string,
      interactive: colors.success.interactive.value as string,
      interactiveHover: colors.success["interactive-hover"].value as string,
      interactivePressed: colors.success["interactive-pressed"].value as string,
      textLow: colors.success["text-low"].value as string,
      textHigh: colors.success["text-high"].value as string,
    },
    warning: {
      surface: colors.warning.surface.value as string,
      surfaceHighlight: colors.warning["surface-highlight"].value as string,
      interactive: colors.warning.interactive.value as string,
      interactiveHover: colors.warning["interactive-hover"].value as string,
      interactivePressed: colors.warning["interactive-pressed"].value as string,
      textLow: colors.warning["text-low"].value as string,
      textHigh: colors.warning["text-high"].value as string,
    },
    danger: {
      surface: colors.danger.surface.value as string,
      surfaceHighlight: colors.danger["surface-highlight"].value as string,
      interactive: colors.danger.interactive.value as string,
      interactiveHover: colors.danger["interactive-hover"].value as string,
      interactivePressed: colors.danger["interactive-pressed"].value as string,
      textLow: colors.danger["text-low"].value as string,
      textHigh: colors.danger["text-high"].value as string,
    },
    neutral: {
      background: colors.neutral.background.value as string,
      surface: colors.neutral.surface.value as string,
      surfaceDisabled: colors.neutral["surface-disabled"].value as string,
      surfaceHighlight: colors.neutral["surface-highlight"].value as string,
      interactive: colors.neutral.interactive.value as string,
      interactiveHover: colors.neutral["interactive-hover"].value as string,
      interactivePressed: colors.neutral["interactive-pressed"].value as string,
      textDisabled: colors.neutral["text-disabled"].value as string,
      textLow: colors.neutral["text-low"].value as string,
      textHigh: colors.neutral["text-high"].value as string,
    },
  },
  utils: {
    focus: `0 0 0 3px ${
      nextColors.primary["surface-highlight"].value as string
    }`,
    aiFocus: `0 0 0 3px ${globalTheme.colors.aiGenerative.surfaceHighlight}`,
  },
  shadow: {
    level: {
      0: shadow.dark.level[0].value,
      1: shadow.dark.level[1].value,
      2: shadow.dark.level[2].value,
      3: shadow.dark.level[3].value,
      4: shadow.dark.level[4].value,
      5: shadow.dark.level[5].value,
    },
  },
};

export const variables = createTheme(vars, nextDarkTheme);

export default variables;
