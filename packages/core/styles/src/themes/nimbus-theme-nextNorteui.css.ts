import { createTheme } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { vars } from "./contract.css";
import { buttonNorteui } from "./buttonNorteui";
import { globalTheme } from "./globals.css";
import {
  aiInteractiveBorder,
  aiLinearBorder,
  aiLinearDisabledBorder,
} from "./aiInteractiveBorder";
import {
  createAiGenerativeGradientsNorteui,
  aiGenerativeLinearNorteui,
  fade,
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

// overlay/interactive-hover (15%) and overlay/interactive-pressed (30%) layers
// of neutral.textHigh, as rgba() because color-mix() needs Chrome 111 and the
// Admin supports Chrome 103.
const neutralTextHigh = String(colors.neutral["text-high"].value);
const overlayHover = fade(neutralTextHigh, "15%");
const overlayPressed = fade(neutralTextHigh, "30%");

// Fills the padding box with `fill` and paints a solid aiGenerative.textLow
// border, in the same layered background the AI gradient borders use.
const solidBorder = (fill: string) =>
  `linear-gradient(${fill}, ${fill}) padding-box, linear-gradient(${vars.colors.aiGenerative.textLow}, ${vars.colors.aiGenerative.textLow}) border-box`;

// 2px ring in neutral.interactiveHover, one step darker than the Figma
// neutral/interactive spread for stronger contrast.
const inputFocusRing = `0 0 0 ${vars.shape.border.width[2]} ${vars.colors.neutral.interactiveHover}`;

// Select and Textarea reuse the Input focus: its border and ring on any focus.
const { input } = vars.components;
const fieldFocusNorteui = {
  neutral: { focus: { borderColor: input.neutral.focus.borderColor } },
  success: { focus: { borderColor: input.success.focus.borderColor } },
  warning: { focus: { borderColor: input.warning.focus.borderColor } },
  danger: { focus: { borderColor: input.danger.focus.borderColor } },
  focus: { boxShadow: input.neutral.focus.boxShadow },
  focusVisible: { boxShadow: input.neutral.focus.boxShadow },
};

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
    // Same sizes and color roles as the other themes, resolved to the Norte UI
    // palette. The medium initial keeps 14px instead of the 13px Norte UI
    // body base.
    avatar: {
      ...globalTheme.components.avatar,
      medium: {
        ...globalTheme.components.avatar.medium,
        fontSize: globalTheme.fontSize.body.base,
      },
    },
    progressBar: {
      background: vars.colors.neutral.surfaceHighlight,
    },
    list: {
      markerColor: vars.colors.neutral.textDisabled,
    },
    popover: {
      borderRadius: vars.shape.border.radius[2],
      // Shadow level 2 written as drop-shadow so the arrow gets it too.
      filter: `drop-shadow(0px 0px 2px ${vars.colors.neutral.interactiveHover})`,
      padding: { base: vars.spacing[3] },
    },
    fileUploader: {
      borderWidth: vars.shape.border.width[1],
      padding: vars.spacing[2],
      background: vars.colors.neutral.surface,
      // Same rest and disabled borders as the Input.
      borderColor: vars.components.input.neutral.borderColor,
      hover: {
        background: vars.colors.primary.surface,
        borderColor: vars.colors.primary.interactiveHover,
      },
      // No dragging state in Figma: it looks like hover.
      dragging: {
        background: vars.colors.primary.surface,
        borderColor: vars.colors.primary.interactiveHover,
      },
      disabled: {
        background: vars.colors.neutral.surfaceDisabled,
        borderColor: vars.components.input.disabled.borderColor,
      },
      overlay: { borderWidth: vars.shape.border.width[1] },
    },
    thumbnail: {
      background: vars.colors.neutral.surfaceHighlight,
    },
    divider: {
      color: vars.colors.neutral.interactive,
    },
    input: {
      // 28px in total: a 26px field inside the 1px border.
      height: "1.625rem",
      padding: `${vars.spacing[1]} ${vars.spacing[2]}`,
      borderRadius: vars.shape.border.radius.base,
      neutral: {
        background: vars.colors.neutral.background,
        // One step darker than the base for stronger contrast.
        borderColor: vars.colors.neutral.interactiveHover,
        hover: { borderColor: vars.colors.neutral.interactivePressed },
        focus: {
          borderColor: vars.colors.neutral.interactivePressed,
          boxShadow: inputFocusRing,
        },
      },
      success: {
        background: vars.colors.neutral.background,
        // Rest uses interactive-pressed; hover and focus use text-low for stronger contrast.
        borderColor: vars.colors.success.interactivePressed,
        hover: { borderColor: vars.colors.success.textLow },
        focus: {
          borderColor: vars.colors.success.textLow,
          boxShadow: inputFocusRing,
        },
      },
      warning: {
        background: vars.colors.neutral.background,
        // Rest uses interactive-pressed; hover and focus use text-low for stronger contrast.
        borderColor: vars.colors.warning.interactivePressed,
        hover: { borderColor: vars.colors.warning.textLow },
        focus: {
          borderColor: vars.colors.warning.textLow,
          boxShadow: inputFocusRing,
        },
      },
      danger: {
        background: vars.colors.neutral.background,
        // Rest uses interactive-pressed; hover and focus use text-low for stronger contrast.
        borderColor: vars.colors.danger.interactivePressed,
        hover: { borderColor: vars.colors.danger.textLow },
        focus: {
          borderColor: vars.colors.danger.textLow,
          boxShadow: inputFocusRing,
        },
      },
      aiGenerative: {
        // Figma darkens the border gradient with the overlay/interactive-hover
        // (15%) layer of neutral.textHigh, like Chip. Select and Textarea reuse
        // it. rgba() instead of color-mix(): without color-mix() support the
        // whole hover background is dropped and the border turns transparent.
        hover: { overlay: overlayHover },
        focus: { boxShadow: inputFocusRing },
      },
      aiGenerated: {
        boxShadow: `0 0 0 ${vars.shape.border.width[2]} ${vars.colors.aiGenerative.surfaceHighlight}`,
      },
      disabled: { borderColor: vars.colors.neutral.interactive },
      skeleton: {
        height: "1.75rem",
        borderRadius: vars.shape.border.radius.base,
      },
    },
    select: {
      // Medium matches Input (28px) and small is 24px, both with the border.
      medium: {
        height: "1.75rem",
        paddingY: vars.spacing[1],
        borderRadius: input.borderRadius,
      },
      small: {
        height: "1.5rem",
        paddingY: vars.spacing["0-5"],
        borderRadius: input.borderRadius,
      },
      ...fieldFocusNorteui,
      skeleton: {
        medium: input.skeleton,
        small: { height: "1.5rem", borderRadius: input.borderRadius },
      },
    },
    textarea: {
      // 6px by 8px padding and 20px lines, as in Figma.
      paddingY: vars.spacing["1-5"],
      paddingX: vars.spacing[2],
      lineHeight: vars.lineWeight.body.base,
      ...fieldFocusNorteui,
      skeleton: { height: "3.375rem", borderRadius: input.borderRadius },
    },
    checkbox: {
      label: { fontSize: vars.fontSize.body.caption },
      // Focus darkens the unchecked border to text-low, as the Input does.
      // Indeterminate keeps its primary.interactive border.
      focus: {
        boxShadow: inputFocusRing,
        borderColor: {
          neutral: vars.colors.neutral.textLow,
          danger: vars.colors.danger.textLow,
          primary: vars.colors.primary.interactive,
        },
      },
      hover: {
        background: vars.colors.neutral.surface,
        borderColor: {
          neutral: vars.colors.neutral.interactiveHover,
          danger: vars.colors.danger.interactiveHover,
          primary: vars.colors.primary.interactiveHover,
        },
      },
      pressed: {
        background: vars.colors.neutral.surface,
        borderColor: {
          neutral: vars.colors.neutral.interactivePressed,
          danger: vars.colors.danger.interactivePressed,
          primary: vars.colors.primary.interactivePressed,
        },
      },
      checked: {
        hover: { background: vars.colors.primary.interactiveHover },
        pressed: { background: vars.colors.primary.interactivePressed },
      },
      indeterminate: {
        color: vars.colors.primary.interactive,
        hoverColor: vars.colors.primary.interactiveHover,
        pressedColor: vars.colors.primary.interactivePressed,
      },
      disabled: {
        background: vars.colors.neutral.surfaceHighlight,
        borderColor: vars.colors.neutral.interactive,
        indeterminateColor: vars.colors.neutral.textDisabled,
      },
      // Figma darkens the AI border gradient with the overlay/interactive-hover
      // (15%) and overlay/interactive-pressed (30%) layers of neutral.textHigh,
      // like Chip, and fills the unchecked box with aiGenerative.surface.
      // Disabled uses the disabled gradient over aiGenerative.surfaceDisabled.
      aiGenerated: {
        hover: {
          background: aiLinearBorder(
            vars.colors.aiGenerative.surface,
            overlayHover
          ),
        },
        pressed: {
          background: aiLinearBorder(
            vars.colors.aiGenerative.surface,
            overlayPressed
          ),
        },
        // Focus swaps the gradient for a solid aiGenerative.textLow border.
        focus: { background: solidBorder(vars.colors.neutral.background) },
        checked: {
          focus: { background: solidBorder(vars.colors.primary.interactive) },
          hover: {
            background: aiLinearBorder(
              vars.colors.primary.interactiveHover,
              overlayHover
            ),
          },
          pressed: {
            background: aiLinearBorder(
              vars.colors.primary.interactivePressed,
              overlayPressed
            ),
          },
        },
        disabled: {
          background: aiLinearDisabledBorder(
            vars.colors.aiGenerative.surfaceDisabled
          ),
        },
      },
    },
    radio: {
      dotSize: globalTheme.components.radio.dotSize,
      label: { fontSize: vars.fontSize.body.caption },
      // Focus darkens the unchecked radio border to text-low, as the Input
      // does for stronger contrast.
      focus: {
        boxShadow: inputFocusRing,
        borderColor: vars.colors.neutral.textLow,
      },
      hover: {
        background: vars.colors.neutral.surface,
        borderColor: vars.colors.neutral.interactiveHover,
      },
      pressed: {
        background: vars.colors.neutral.surfaceHighlight,
        borderColor: vars.colors.neutral.interactivePressed,
      },
      checked: {
        hover: { color: vars.colors.primary.interactiveHover },
        pressed: { color: vars.colors.primary.interactivePressed },
      },
      disabled: {
        background: vars.colors.neutral.surfaceHighlight,
        borderColor: vars.colors.neutral.interactive,
      },
      checkedDisabled: {
        background: vars.colors.neutral.surfaceDisabled,
        borderColor: vars.colors.primary.surfaceDisabled,
        dotColor: vars.colors.primary.surfaceDisabled,
      },
      button: {
        background: vars.colors.neutral.background,
        // Focus darkens the unchecked border to text-low, as the Input does.
        focus: { borderColor: vars.colors.neutral.textLow },
        hover: {
          background: vars.colors.neutral.surface,
          borderColor: vars.colors.neutral.interactiveHover,
        },
        pressed: {
          background: vars.colors.neutral.surfaceHighlight,
          borderColor: vars.colors.neutral.interactivePressed,
        },
        checked: {
          hover: { background: vars.colors.primary.interactiveHover },
          pressed: { background: vars.colors.primary.interactivePressed },
        },
        disabled: {
          background: vars.colors.neutral.surfaceHighlight,
          borderColor: vars.colors.neutral.interactive,
        },
        checkedDisabled: {
          background: vars.colors.primary.surfaceDisabled,
          borderColor: vars.colors.primary.surfaceDisabled,
          color: vars.colors.neutral.textDisabled,
        },
      },
    },
    toggle: {
      label: { fontSize: vars.fontSize.body.caption },
      // Focus darkens the off track border to text-low, as the Input does.
      focus: {
        boxShadow: inputFocusRing,
        borderColor: vars.colors.neutral.textLow,
      },
      pressed: {
        background: vars.colors.neutral.interactivePressed,
        borderColor: vars.colors.neutral.interactivePressed,
      },
      disabled: {
        background: vars.colors.neutral.interactive,
        thumb: vars.colors.neutral.interactivePressed,
      },
      checkedDisabled: {
        background: vars.colors.neutral.textDisabled,
        thumb: vars.colors.neutral.interactive,
      },
    },
    // AI interactive is lighter than interactiveHover, so the glow stays soft.
    button: buttonNorteui(String(aiGenerative.interactive.value)),
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
    toast: {
      borderRadius: vars.shape.border.radius.full,
      gap: vars.spacing["1-5"],
      paddingInlineEnd: vars.spacing[3],
      // Figma shadow-light/level-3 built from Norte UI neutrals.
      boxShadow: `0px 3px 6px 0px ${vars.colors.neutral.surfaceHighlight}, 0px 0px 1px 0px ${vars.colors.neutral.interactiveHover}`,
      primary: { background: vars.colors.primary.interactiveHover },
    },
    link: {
      // Hover darkens toward textHigh so it no longer reads as disabled.
      neutral: { hoverColor: vars.colors.neutral.textHigh },
    },
  },
  gradients: {
    aiGenerative: aiGenerativeGradients,
    aiGenerativeLinear: aiGenerativeLinearNorteui,
  },
});

export default variables;
