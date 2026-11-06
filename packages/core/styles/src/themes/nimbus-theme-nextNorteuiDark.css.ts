import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { vars } from "./contract.css";
import { globalTheme } from "./globals.css";
import {
  aiGenerativeGradientsNorteui,
  aiGenerativeLinearNorteui,
} from "./aiGenerativeGradients";
import { withToneSurfaceDisabled } from "./toneSurfaceDisabled";
import { aiGradientNorteui } from "./aiGradientNorteui";

interface TokenLeaf {
  value: unknown;
}

type ToneTokenMap = Record<string, TokenLeaf>;

const mapToneScale = (group: ToneTokenMap) => ({
  surface: String(group.surface.value),
  surfaceHighlight: String(group["surface-highlight"].value),
  interactive: String(group.interactive.value),
  interactiveHover: String(group["interactive-hover"].value),
  interactivePressed: String(group["interactive-pressed"].value),
  textLow: String(group["text-low"].value),
  textHigh: String(group["text-high"].value)
});

const colorDict = tokens.color as Record<string, Record<string, ToneTokenMap>>;
const nextNorteuiColors =
  colorDict["next-norteui-dark"] ?? colorDict["next-dark"];
const darkColors = colorDict.dark;
const surfaceDisabled = String(darkColors.neutral["surface-disabled"].value);
const darkShadows = tokens.shadow.dark.level;
const readShadow = (level: "0" | "1" | "2" | "3" | "4" | "5"): string =>
  String(darkShadows[level].value);

const nextNorteuiDarkTheme = {
  ...globalTheme,
  fontWeight: {
    ...globalTheme.fontWeight,
    title: globalTheme.fontWeight.medium,
  },
  fontSize: {
    ...globalTheme.fontSize,
    body: {
      ...globalTheme.fontSize.body,
      base: tokens.font.size["3-25"].value as string,
    },
  },
  colors: withToneSurfaceDisabled(surfaceDisabled, {
    ...globalTheme.colors,
    primary: mapToneScale(nextNorteuiColors.primary),
    success: mapToneScale(darkColors.success),
    warning: mapToneScale(darkColors.warning),
    danger: mapToneScale(darkColors.danger),
    neutral: {
      ...mapToneScale(darkColors.neutral),
      background: String(darkColors.neutral.background.value),
      surfaceDisabled: String(darkColors.neutral["surface-disabled"].value),
      textDisabled: String(darkColors.neutral["text-disabled"].value)
    },
    aiGradient: aiGradientNorteui
  }),
  utils: {
    focus: `0 0 0 3px ${String(
      nextNorteuiColors.primary["surface-highlight"].value
    )}`,
    aiFocus: `0 0 0 3px ${globalTheme.colors.aiGenerative.surfaceHighlight}`
  },
  shadow: {
    level: {
      0: readShadow("0"),
      1: readShadow("1"),
      2: readShadow("2"),
      3: readShadow("3"),
      4: readShadow("4"),
      5: readShadow("5")
    }
  },
  components: {
    divider: {
      color: vars.colors.neutral.interactive
    }
  },
  gradients: {
    aiGenerative: aiGenerativeGradientsNorteui,
    aiGenerativeLinear: aiGenerativeLinearNorteui
  }
};

export const variables = createTheme(vars, nextNorteuiDarkTheme);

export default variables;
