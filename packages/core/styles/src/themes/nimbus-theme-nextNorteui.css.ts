import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { vars } from "./contract.css";
import { globalTheme } from "./globals.css";
import { aiInteractiveBorder } from "./aiInteractiveBorder";
import {
  createAiGenerativeGradientsNorteui,
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
  textHigh: String(group["text-high"].value),
});

const primary = mapToneScale(colors.primary);
const { aiGenerative } = colors;
const aiSurfaceHighlight = String(aiGenerative["surface-highlight"].value);
const aiGenerativeGradients = createAiGenerativeGradientsNorteui({
  textLow: String(aiGenerative["text-low"].value),
  primaryInteractive: primary.interactive,
  overlay: String(colors.neutral["text-high"].value),
  purpleHigh: aiGradientNorteui.purpleHigh,
  purpleLight: aiGradientNorteui.purpleLight,
  pinkHigh: aiGradientNorteui.pinkHigh,
  pinkLight: aiGradientNorteui.pinkLight,
});

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
      textDisabled: String(colors.neutral["text-disabled"].value),
    },
    aiGenerative: {
      ...globalTheme.colors.aiGenerative,
      surface: String(aiGenerative.surface.value),
      surfaceDisabled: String(aiGenerative["surface-disabled"].value),
      surfaceHighlight: aiSurfaceHighlight,
      interactiveHover: String(aiGenerative["interactive-hover"].value),
      interactivePressed: String(aiGenerative["interactive-pressed"].value),
      textLow: String(aiGenerative["text-low"].value),
      textHigh: String(aiGenerative["text-high"].value),
    },
    aiGradient: aiGradientNorteui,
  },
  utils: {
    focus: `0 0 0 3px ${primary.surfaceHighlight}`,
    aiFocus: `0 0 0 3px ${aiSurfaceHighlight}`,
  },
  components: {
    thumbnail: {
      background: vars.colors.neutral.surfaceHighlight,
    },
    divider: {
      color: vars.colors.neutral.interactive,
    },
    tag: {
      neutral: {
        background: vars.colors.neutral.surfaceHighlight,
        borderColor: "transparent",
        color: vars.colors.neutral.textLow,
      },
      primary: {
        background: vars.colors.primary.surfaceDisabled,
        borderColor: "transparent",
      },
      success: {
        background: vars.colors.success.surfaceDisabled,
        borderColor: "transparent",
      },
      warning: {
        background: vars.colors.warning.surfaceDisabled,
        borderColor: "transparent",
      },
      danger: {
        background: vars.colors.danger.surfaceDisabled,
        borderColor: "transparent",
      },
      aiGenerative: {
        background: aiInteractiveBorder(
          vars.colors.aiGenerative.surfaceDisabled
        ),
        borderColor: "transparent",
        color: vars.colors.aiGenerative.textLow,
      },
    },
    chip: {
      borderRadius: vars.shape.border.radius[3],
      neutral: {
        background: vars.colors.neutral.surfaceHighlight,
        borderColor: "transparent",
        color: vars.colors.neutral.textHigh,
        hover: {
          background: vars.colors.neutral.interactive,
          borderColor: "transparent",
        },
        pressed: {
          background: vars.colors.neutral.interactiveHover,
          borderColor: "transparent",
        },
        focus: {
          borderColor: "transparent",
          boxShadow: `0 0 0 ${vars.shape.border.width[2]} ${vars.colors.neutral.textLow}`,
        },
      },
      aiGenerative: {
        background: aiInteractiveBorder(vars.colors.aiGenerative.surface),
        color: vars.colors.aiGenerative.textLow,
        boxShadow: "none",
        // Figma darkens the border gradient with the overlay/interactive-hover
        // (15%) and overlay/interactive-pressed (30%) layers of neutral.textHigh.
        hover: {
          background: aiInteractiveBorder(
            vars.colors.aiGenerative.surfaceDisabled,
            `color-mix(in srgb, ${vars.colors.neutral.textHigh} 15%, transparent)`
          ),
        },
        pressed: {
          background: aiInteractiveBorder(
            vars.colors.aiGenerative.surfaceHighlight,
            `color-mix(in srgb, ${vars.colors.neutral.textHigh} 30%, transparent)`
          ),
        },
        focus: {
          borderColor: "transparent",
          boxShadow: `0 0 0 ${vars.shape.border.width[2]} ${vars.colors.aiGenerative.surfaceHighlight}`,
        },
      },
    },
    badge: {
      surface: {
        neutral: {
          background: vars.colors.neutral.interactive,
          color: vars.colors.neutral.textHigh,
        },
        primary: {
          background: vars.colors.primary.interactive,
          color: vars.colors.neutral.background,
        },
        success: {
          background: vars.colors.success.interactivePressed,
          color: vars.colors.neutral.background,
        },
        warning: {
          background: vars.colors.warning.interactivePressed,
          color: vars.colors.neutral.background,
        },
        danger: {
          background: vars.colors.danger.interactivePressed,
          color: vars.colors.neutral.background,
        },
        aiGenerative: {
          background: vars.colors.aiGenerative.interactivePressed,
          color: vars.colors.neutral.background,
        },
      },
      light: {
        neutral: {
          background: vars.colors.neutral.surface,
          color: vars.colors.neutral.textLow,
        },
        primary: {
          background: vars.colors.primary.surface,
          color: vars.colors.primary.textLow,
        },
        success: {
          background: vars.colors.success.surface,
          color: vars.colors.success.textLow,
        },
        warning: {
          background: vars.colors.warning.surface,
          color: vars.colors.warning.textLow,
        },
        danger: {
          background: vars.colors.danger.surface,
          color: vars.colors.danger.textLow,
        },
        aiGenerative: {
          background: vars.colors.aiGenerative.surface,
          color: vars.colors.aiGenerative.textLow,
        },
      },
      dot: {
        neutral: { background: vars.colors.neutral.interactive },
        primary: { background: vars.colors.primary.interactive },
        success: { background: vars.colors.success.interactivePressed },
        warning: { background: vars.colors.warning.interactivePressed },
        danger: { background: vars.colors.danger.interactivePressed },
        aiGenerative: {
          background: vars.colors.aiGenerative.interactivePressed,
        },
      },
    },
  },
  gradients: {
    aiGenerative: aiGenerativeGradients,
    aiGenerativeLinear: aiGenerativeLinearNorteui,
  },
});

export default variables;
