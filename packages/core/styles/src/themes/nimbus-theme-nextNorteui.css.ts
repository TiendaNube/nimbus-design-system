import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { vars } from "./contract.css";
import { globalTheme } from "./globals.css";
import {
  aiGenerativeGradientsNorteui,
  aiGenerativeLinearNorteui,
} from "./aiGenerativeGradients";
import { aiGradientNorteui } from "./aiGradientNorteui";

interface TokenLeaf {
  value: unknown;
}

type ToneTokenMap = Record<string, TokenLeaf>;

const colorDict = tokens.color as Record<string, Record<string, ToneTokenMap>>;
const colors = colorDict["next-norteui"];

const mapToneScale = (group: ToneTokenMap) => ({
  surface: String(group.surface.value),
  surfaceDisabled: String(group["surface-disabled"].value),
  surfaceHighlight: String(group["surface-highlight"].value),
  interactive: String(group.interactive.value),
  interactiveHover: String(group["interactive-hover"].value),
  interactivePressed: String(group["interactive-pressed"].value),
  textLow: String(group["text-low"].value),
  textHigh: String(group["text-high"].value)
});

const primary = mapToneScale(colors.primary);
const { aiGenerative } = colors;
const aiSurfaceHighlight = String(aiGenerative["surface-highlight"].value);

export const variables = createTheme(vars, {
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
  colors: {
    ...globalTheme.colors,
    primary,
    success: mapToneScale(colors.success),
    warning: mapToneScale(colors.warning),
    danger: mapToneScale(colors.danger),
    neutral: {
      ...mapToneScale(colors.neutral),
      background: String(colors.neutral.background.value),
      surfaceDisabled: String(colors.neutral["surface-disabled"].value),
      textDisabled: String(colors.neutral["text-disabled"].value)
    },
    aiGenerative: {
      ...globalTheme.colors.aiGenerative,
      surface: String(aiGenerative.surface.value),
      surfaceDisabled: String(aiGenerative["surface-disabled"].value),
      surfaceHighlight: aiSurfaceHighlight,
      interactiveHover: String(aiGenerative["interactive-hover"].value),
      interactivePressed: String(aiGenerative["interactive-pressed"].value),
      textLow: String(aiGenerative["text-low"].value),
      textHigh: String(aiGenerative["text-high"].value)
    },
    aiGradient: aiGradientNorteui
  },
  utils: {
    focus: `0 0 0 3px ${primary.surfaceHighlight}`,
    aiFocus: `0 0 0 3px ${aiSurfaceHighlight}`
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
});

export default variables;
