import tokens from "@nimbus-ds/tokens/dist/js/tokens";
import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "./contract.css";

const colors = tokens.color.light;
const fontFamily = tokens.font.family;
const fontSize = tokens.font.size;
const fontWeight = tokens.font.weight;
const lineWeight = tokens.line.height;
const { shape } = tokens;
const { motion, spacing, shadow, breakpoint, zIndex } = tokens;

export const globalTheme = {
  colors: {
    primary: {
      surface: colors.primary.surface.value as string,
      surfaceHighlight: colors.primary["surface-highlight"].value as string,
      interactive: colors.primary.interactive.value as string,
      interactiveHover: colors.primary["interactive-hover"].value as string,
      interactivePressed: colors.primary["interactive-pressed"].value as string,
      textLow: colors.primary["text-low"].value as string,
      textHigh: colors.primary["text-high"].value as string,
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
    aiGenerative: {
      interactiveHover: colors.aiGenerative["interactive-hover"]
        .value as string,
      textLow: colors.aiGenerative["text-low"].value as string,
      interactivePressed: colors.aiGenerative["interactive-pressed"]
        .value as string,
      surface: colors.aiGenerative.surface.value as string,
      background: colors.aiGenerative.background.value as string,
      textHigh: colors.aiGenerative["text-high"].value as string,
      surfaceHighlight: colors.aiGenerative["surface-highlight"]
        .value as string,
    },
    aiGradient: {
      blueHigh: colors.aiGradient["blue-high"].value as string,
      blueLight: colors.aiGradient["blue-light"].value as string,
      purpleHigh: colors.aiGradient["purple-high"].value as string,
      purpleLight: colors.aiGradient["purple-light"].value as string,
      pinkHigh: colors.aiGradient["pink-high"].value as string,
      pinkLight: colors.aiGradient["pink-light"].value as string,
    },
  },
  fontFamily: {
    sans: fontFamily.sans.value as string,
    mono: fontFamily.mono.value as string,
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
    level: {
      0: shadow.light.level[0].value,
      1: shadow.light.level[1].value,
      2: shadow.light.level[2].value,
      3: shadow.light.level[3].value,
      4: shadow.light.level[4].value,
      5: shadow.light.level[5].value,
    },
  },
  shape: {
    border: {
      radius: {
        "0-5": shape.border.radius["0-5"].value,
        "1": shape.border.radius[1].value,
        "2": shape.border.radius[2].value,
        "3": shape.border.radius[3].value,
        "4": shape.border.radius[4].value,
        "5": shape.border.radius[5].value,
        "6": shape.border.radius[6].value,
        full: shape.border.radius.full.value,
        base: shape.border.radius.base.value,
        half: shape.border.radius.half.value,
      },
      width: {
        "1": shape.border.width[1].value,
        "2": shape.border.width[2].value,
        "3": shape.border.width[3].value,
        "4": shape.border.width[4].value,
        "5": shape.border.width[5].value,
      },
    },
  },
  spacing: {
    "0-5": spacing["0-5"].value,
    "1": spacing["1"].value,
    "1-5": spacing["1-5"].value,
    "2": spacing["2"].value,
    "2-5": spacing["2-5"].value,
    "3": spacing["3"].value,
    "3-5": spacing["3-5"].value,
    "4": spacing["4"].value,
    "4-5": spacing["4-5"].value,
    "5": spacing["5"].value,
    "6": spacing["6"].value,
    "7": spacing["7"].value,
    "8": spacing["8"].value,
    "9": spacing["9"].value,
    "10": spacing["10"].value,
    "11": spacing["11"].value,
    "12": spacing["12"].value,
    "14": spacing["14"].value,
    "16": spacing["16"].value,
    "18": spacing["18"].value,
    "20": spacing["20"].value,
  },
  zIndex: {
    100: zIndex[100].value,
    200: zIndex[200].value,
    300: zIndex[300].value,
    400: zIndex[400].value,
    500: zIndex[500].value,
    600: zIndex[600].value,
    700: zIndex[700].value,
    800: zIndex[800].value,
    900: zIndex[900].value,
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
    xl: breakpoint.xl.value,
  },
  utils: {
    focus: `0 0 0 3px ${colors.primary["surface-highlight"].value as string}`,
    aiFocus: `0 0 0 3px ${
      colors.aiGenerative["surface-highlight"].value as string
    }`,
  },
};

createGlobalTheme(":root", vars, globalTheme);

export const varsThemeBase = vars;
