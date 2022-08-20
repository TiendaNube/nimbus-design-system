import { createGlobalTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

const colors = tokens.color.sys.light;
const fontFamily = tokens.font.family;
const fontSize = tokens.font.size.sys;
const fontWeight = tokens.font.weight;
const lineWeight = tokens.line.height.sys;

export const varsThemeBase = createGlobalTheme(":root", {
  color: {
    primary: {
      bg: colors.primary.bg.value as string,
      surface: colors.primary.surface.value as string,
      surfaceHighlight: colors.primary["surface-highlight"].value as string,
      interactive: colors.primary.interactive.value as string,
      interactiveHover: colors.primary["interactive-hover"].value as string,
      interactivePressed: colors.primary["interactive-pressed"].value as string,
      low: colors.primary.low.value as string,
      high: colors.primary.high.value as string,
    },
  },
  fontFamily: {
    centranube: fontFamily.value as string,
  },
  fontSize: {
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
