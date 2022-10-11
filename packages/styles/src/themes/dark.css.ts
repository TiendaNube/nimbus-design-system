import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { varsThemeBase } from "./base.css";

const colors = tokens.color.sys.light;
const fontFamily = tokens.font.family;
const fontSize = tokens.font.size.sys;
const fontWeight = tokens.font.weight;
const lineWeight = tokens.line.height.sys;
const { motion, spacing, sizes, shadow, breakpoint } = tokens;

export const ThemeDark = createTheme(varsThemeBase, {
  colors: {
    primary: {
      surface: colors.primary.surface.value as string,
      surfaceHighlight: colors.primary["surface-highlight"].value as string,
      interactive: colors.primary.interactive.value as string,
      interactiveHover: colors.primary["interactive-hover"].value as string,
      interactivePressed: colors.primary["interactive-pressed"].value as string,
      textLow: "red",
      textHigh: "blue",
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
  fontFamily: {
    centranube: fontFamily.value as string,
  },
  fontSize: {
    body: {
      caption: fontSize.body.caption.value as string,
      base: fontSize.body.base.value as string,
      highlight: fontSize.body.highlight.value as string,
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
      caption: lineWeight.body.caption.value as string,
      base: lineWeight.body.base.value as string,
      highlight: lineWeight.body.highlight.value as string,
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
  shadow: {
    card: shadow.card.value,
    popover: shadow.popover.value,
    modal: shadow.modal.value,
  },
  spacing: {
    "0,5": spacing["0,5"].value,
    "1": spacing[1].value,
    "2": spacing[2].value,
    "4": spacing[4].value,
    "6": spacing[6].value,
    "8": spacing[8].value,
    "10": spacing[10].value,
    "12": spacing[12].value,
    "14": spacing[14].value,
    "16": spacing[16].value,
    "18": spacing[18].value,
    "20": spacing[20].value,
  },
  sizes: {
    "0,5": sizes["0,5"].value,
    "1": sizes[1].value,
    "1,5": sizes["1,5"].value,
    "2": sizes[2].value,
    "2,5": sizes["2,5"].value,
    "3": sizes[3].value,
    "3,5": sizes["3,5"].value,
    "4": sizes[4].value,
    "4,5": sizes["4,5"].value,
    "5": sizes[5].value,
    "6": sizes[6].value,
    "7": sizes[7].value,
    "8": sizes[8].value,
    "9": sizes[9].value,
    "10": sizes[10].value,
    "11": sizes[11].value,
    "12": sizes[12].value,
    "14": sizes[14].value,
    "16": sizes[16].value,
    "18": sizes[18].value,
    "20": sizes[20].value,
  },
  motion: {
    speed: {
      base: motion.speed.base.value as string,
      fast: motion.speed.fast.value as string,
      slow: motion.speed.slow.value as string,
      slower: motion.speed.slower.value as string,
    },
  },
  breakpoint: {
    xs: breakpoint.xs.value,
    md: breakpoint.md.value,
    lg: breakpoint.lg.value,
  },
});
