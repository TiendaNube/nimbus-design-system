import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { vars } from "./contract.css";
import { globalTheme } from "./globals.css";

const nextColors = tokens.color["next-dark"];
const colors = tokens.color.dark;

const nextDarkTheme = {
  ...globalTheme,
  colors: {
    ...globalTheme.colors,
    primary: {
      surface: nextColors.primary.surface.value as string,
      surfaceDisabled: nextColors.primary["surface-disabled"].value as string,
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
      surfaceDisabled: colors.success["surface-disabled"].value as string,
      surfaceHighlight: colors.success["surface-highlight"].value as string,
      interactive: colors.success.interactive.value as string,
      interactiveHover: colors.success["interactive-hover"].value as string,
      interactivePressed: colors.success["interactive-pressed"].value as string,
      textLow: colors.success["text-low"].value as string,
      textHigh: colors.success["text-high"].value as string,
    },
    warning: {
      surface: colors.warning.surface.value as string,
      surfaceDisabled: colors.warning["surface-disabled"].value as string,
      surfaceHighlight: colors.warning["surface-highlight"].value as string,
      interactive: colors.warning.interactive.value as string,
      interactiveHover: colors.warning["interactive-hover"].value as string,
      interactivePressed: colors.warning["interactive-pressed"].value as string,
      textLow: colors.warning["text-low"].value as string,
      textHigh: colors.warning["text-high"].value as string,
    },
    danger: {
      surface: colors.danger.surface.value as string,
      surfaceDisabled: colors.danger["surface-disabled"].value as string,
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
      interactiveLow: colors.neutral["interactive-low"].value as string,
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
      0: "none",
      1: "0px 0px 8px 0px color-mix(in srgb, #000000 24%, transparent)",
      2: "0px 0px 2px 0px color-mix(in srgb, #000000 60%, transparent)",
      3: "0px 4px 8px 0px color-mix(in srgb, #000000 32%, transparent), 0px 0px 2px 0px color-mix(in srgb, #000000 16%, transparent)",
      4: "0px 12px 16px 0px color-mix(in srgb, #000000 40%, transparent), 0px 0px 4px 0px color-mix(in srgb, #000000 24%, transparent)",
      5: "0px 24px 32px 0px color-mix(in srgb, #000000 48%, transparent), 0px 0px 4px 0px color-mix(in srgb, #000000 24%, transparent)",
    },
  },
};

export const variables = createTheme(vars, nextDarkTheme);

export default variables;
