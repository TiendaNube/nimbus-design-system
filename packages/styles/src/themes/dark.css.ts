import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { varsThemeBase } from "./base.css";

const colors = tokens.color.sys.light;
const fontFamily = tokens.font.family;
const fontSize = tokens.font.size.sys;
const fontWeight = tokens.font.weight;
const lineWeight = tokens.line.height.sys;

export const ThemeDark = createTheme(varsThemeBase, {
  colors: {
    primary: {
      background: colors.primary.background.value as string,
      surface: colors.primary.surface.value as string,
      surfaceHighlight: colors.primary["surface-highlight"].value as string,
      interactive: colors.primary.interactive.value as string,
      interactiveHover: colors.primary["interactive-hover"].value as string,
      interactivePressed: colors.primary["interactive-pressed"].value as string,
      textLow: "red",
      textHigh: "blue",
    },
    success: {
      background: colors.success.background.value as string,
      surface: colors.success.surface.value as string,
      surfaceHighlight: colors.success["surface-highlight"].value as string,
      interactive: colors.success.interactive.value as string,
      interactiveHover: colors.success["interactive-hover"].value as string,
      interactivePressed: colors.success["interactive-pressed"].value as string,
      textLow: colors.success["text-low"].value as string,
      textHigh: colors.success["text-high"].value as string,
    },
    warning: {
      background: colors.warning.background.value as string,
      surface: colors.warning.surface.value as string,
      surfaceHighlight: colors.warning["surface-highlight"].value as string,
      interactive: colors.warning.interactive.value as string,
      interactiveHover: colors.warning["interactive-hover"].value as string,
      interactivePressed: colors.warning["interactive-pressed"].value as string,
      textLow: colors.warning["text-low"].value as string,
      textHigh: colors.warning["text-high"].value as string,
    },
    danger: {
      background: colors.danger.background.value as string,
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
      surfaceHighlight: colors.neutral["surface-highlight"].value as string,
      interactive: colors.neutral.interactive.value as string,
      interactiveHover: colors.neutral["interactive-hover"].value as string,
      interactivePressed: colors.neutral["interactive-pressed"].value as string,
      textLow: colors.neutral["text-low"].value as string,
      textHigh: colors.neutral["text-high"].value as string,
    },
  },
  fontFamily: {
    centranube: fontFamily.value as string,
  },
  fontSize: {
    body: {
      small: fontSize.body.small.value as string,
      caption: fontSize.body.caption.value as string,
      base: fontSize.body.base.value as string,
    },
    title: {
      h1: fontSize.title.h1.value as string,
      h2: fontSize.title.h2.value as string,
      h3: fontSize.title.h3.value as string,
      h4: fontSize.title.h4.value as string,
      h5: fontSize.title.h5.value as string,
      h6: fontSize.title.h6.value as string,
    },
  },
  fontWeight: {
    regular: fontWeight.regular.value as string,
    medium: fontWeight.medium.value as string,
    bold: fontWeight.bold.value as string,
  },
  lineWeight: {
    body: {
      small: lineWeight.body.small.value as string,
      caption: lineWeight.body.caption.value as string,
      base: lineWeight.body.base.value as string,
    },
    title: {
      h1: lineWeight.title.h1.value as string,
      h2: lineWeight.title.h2.value as string,
      h3: lineWeight.title.h3.value as string,
      h4: lineWeight.title.h4.value as string,
      h5: lineWeight.title.h5.value as string,
      h6: lineWeight.title.h6.value as string,
    },
  },
});
