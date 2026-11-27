import tokens from "@nimbus-ds/tokens/dist/js/tokens";
import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";
import { vars } from "./contract.css";
import { withToneSurfaceDisabled } from "./toneSurfaceDisabled";
import { type ButtonThemeValues, type ButtonTone } from "./buttonNorteui";
import {
  aiInteractiveBorder,
  aiHoverBorder,
  aiLinearBorder,
} from "./aiInteractiveBorder";
import {
  aiGenerativeGradientsBase,
  aiGenerativeLinearBase,
} from "./aiGenerativeGradients";

const colors = tokens.color.light;

/**
 * success and warning Button values for base, dark, next and next-dark.
 * Same recipe as the danger Button those themes already have: light
 * surface, tone border and text-low label.
 */
const buttonToneBase = (
  tone: Exclude<ButtonTone, "danger">
): ButtonThemeValues["danger"] => ({
  background: vars.colors[tone].surface,
  border: vars.colors[tone].interactive,
  text: vars.colors[tone].textLow,
  hoverBackground: vars.colors[tone].surfaceHighlight,
  pressedBackground: vars.colors[tone].interactive,
  // text-low on the pressed fill is below 4.5:1, so the label goes to
  // text-high (8.3:1 success, 5.6:1 warning in base).
  pressedText: vars.colors[tone].textHigh,
  disabledBackground: vars.colors.neutral.surfaceDisabled,
  disabledBorder: vars.colors[tone].surfaceHighlight,
});

const surfaceDisabled = colors.neutral["surface-disabled"].value as string;
const fontFamily = tokens.font.family;
const fontSize = tokens.font.size;
const fontWeight = tokens.font.weight;
const lineWeight = tokens.line.height;
const { shape } = tokens;
const { motion, spacing, shadow, breakpoint, zIndex } = tokens;

// Focus of the native form fields (Select, Textarea) outside Norte UI: a
// pressed border on any focus and the theme focus ring only on keyboard focus.
const fieldFocus = {
  neutral: { focus: { borderColor: vars.colors.primary.interactivePressed } },
  success: { focus: { borderColor: vars.colors.success.interactivePressed } },
  warning: { focus: { borderColor: vars.colors.warning.interactivePressed } },
  danger: { focus: { borderColor: vars.colors.danger.interactivePressed } },
  focus: { boxShadow: "none" },
  focusVisible: { boxShadow: vars.utils.focus },
};

export const globalTheme = {
  colors: withToneSurfaceDisabled(surfaceDisabled, {
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
  }),
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
    title: fontWeight.bold.value as string,
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
    1000: zIndex[1000].value,
    1100: zIndex[1100].value,
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
    xxl: breakpoint.xxl.value,
  },
  utils: {
    focus: `0 0 0 3px ${colors.primary["surface-highlight"].value as string}`,
    aiFocus: `0 0 0 3px ${
      colors.aiGenerative["surface-highlight"].value as string
    }`,
  },
  components: {
    thumbnail: {
      // Keeps the exact Thumbnail background base, dark, next and next-dark had.
      // Norte UI overrides it.
      background: vars.colors.neutral.surfaceDisabled,
    },
    divider: {
      // References the theme's own neutral surfaceHighlight so base, dark, next
      // and next-dark keep the exact Divider color they had. Norte UI overrides it.
      color: vars.colors.neutral.surfaceHighlight,
    },
    // Every Button value references what the Button used before, so base, dark,
    // next and next-dark keep the exact same Button. Norte UI overrides them.
    button: {
      small: {
        height: "1.75rem",
        padding: `${vars.spacing["1-5"]} ${vars.spacing[2]}`,
        radius: vars.shape.border.radius[2],
      },
      medium: {
        height: "2rem",
        padding: `${vars.spacing["1-5"]} ${vars.spacing[3]}`,
        radius: vars.shape.border.radius[2],
      },
      large: {
        height: "2.75rem",
        padding: `${vars.spacing[3]} ${vars.spacing[4]}`,
        radius: vars.shape.border.radius[3],
        gap: vars.spacing[2],
      },
      focus: vars.utils.focus,
      primary: {
        disabledBackground: vars.colors.neutral.surfaceDisabled,
        disabledBorder: vars.colors.primary.surfaceHighlight,
      },
      neutral: {
        disabledBackground: vars.colors.neutral.surfaceDisabled,
        disabledBorder: vars.colors.neutral.surfaceHighlight,
        focusBorder: vars.colors.primary.interactive,
      },
      transparent: {
        hoverBorder: vars.colors.neutral.interactiveHover,
        pressedBorder: vars.colors.neutral.interactivePressed,
        hoverBackground: vars.colors.neutral.surface,
        pressedBackground: vars.colors.neutral.surfaceHighlight,
      },
      danger: {
        background: vars.colors.danger.surface,
        border: vars.colors.danger.interactive,
        text: vars.colors.danger.textLow,
        hoverBackground: vars.colors.danger.surfaceHighlight,
        pressedBackground: vars.colors.danger.interactive,
        pressedText: vars.colors.danger.textLow,
        disabledBackground: vars.colors.neutral.surfaceDisabled,
        disabledBorder: vars.colors.danger.surfaceHighlight,
      },
      // success and warning are new: same recipe as danger, with their tone.
      success: buttonToneBase("success"),
      warning: buttonToneBase("warning"),
      aiSecondary: {
        text: vars.colors.neutral.textHigh,
        background: vars.colors.neutral.background,
        hoverBackground: vars.colors.neutral.surface,
        hoverGlow: vars.colors.aiGenerative.interactiveHover,
        disabledBackground: vars.colors.neutral.surfaceDisabled,
      },
    },
    tag: {
      // References the theme's own tone colors so base, dark, next and next-dark
      // keep the exact Tag look they had. Norte UI overrides them.
      neutral: {
        background: vars.colors.neutral.surface,
        borderColor: vars.colors.neutral.surfaceHighlight,
        color: vars.colors.neutral.textHigh,
      },
      primary: {
        background: vars.colors.primary.surface,
        borderColor: vars.colors.primary.surfaceHighlight,
      },
      success: {
        background: vars.colors.success.surface,
        borderColor: vars.colors.success.surfaceHighlight,
      },
      warning: {
        background: vars.colors.warning.surface,
        borderColor: vars.colors.warning.surfaceHighlight,
      },
      danger: {
        background: vars.colors.danger.surface,
        borderColor: vars.colors.danger.surfaceHighlight,
      },
      aiGenerative: {
        background: aiInteractiveBorder(vars.colors.neutral.surface),
        borderColor: "transparent",
        color: vars.colors.neutral.textHigh,
      },
    },
    chip: {
      // References the theme's own values so base, dark, next and next-dark
      // keep the exact Chip look they had. Norte UI overrides them.
      borderRadius: vars.shape.border.radius[1],
      neutral: {
        background: vars.colors.neutral.surface,
        borderColor: vars.colors.neutral.interactive,
        color: vars.colors.neutral.textHigh,
        hover: {
          background: vars.colors.neutral.surfaceHighlight,
          borderColor: vars.colors.neutral.interactiveHover,
        },
        pressed: {
          background: vars.colors.neutral.interactive,
          borderColor: vars.colors.neutral.interactivePressed,
        },
        focus: {
          borderColor: vars.colors.primary.interactive,
          boxShadow: vars.utils.focus,
        },
      },
      aiGenerative: {
        background: aiInteractiveBorder(vars.colors.neutral.surface),
        color: vars.colors.neutral.textHigh,
        boxShadow: vars.utils.aiFocus,
        hover: {
          background: aiHoverBorder(vars.colors.neutral.surface),
        },
        pressed: {
          background: aiHoverBorder(vars.colors.aiGenerative.surfaceHighlight),
        },
        focus: {
          borderColor: vars.colors.primary.interactive,
          boxShadow: vars.utils.focus,
        },
      },
    },
    progressBar: {
      // Default track (backgroundColor="neutral-surfaceDisabled"). Same color
      // as before it was theme-driven, so base, dark, next and next-dark keep
      // their look. Norte UI overrides it.
      background: vars.colors.neutral.surfaceDisabled,
    },
    list: {
      // Numbers and bullets. Same color as before it was theme-driven, so
      // base, dark, next and next-dark keep their look. Norte UI overrides it.
      markerColor: vars.colors.neutral.surfaceHighlight,
    },
    popover: {
      // Same radius and base padding the Popover had before they were
      // theme-driven, so base, dark, next and next-dark keep their look.
      // Norte UI overrides them.
      borderRadius: vars.shape.border.radius[3],
      filter: "drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2))",
      padding: { base: vars.spacing[4] },
    },
    fileUploader: {
      // Same values the FileUploader had before they were theme-driven, so
      // base, dark, next and next-dark keep their look: no padding and hover
      // keeps the rest colors. Norte UI overrides them.
      borderWidth: vars.shape.border.width[2],
      padding: "0",
      background: vars.colors.primary.surface,
      borderColor: vars.colors.primary.interactive,
      hover: {
        background: vars.colors.primary.surface,
        borderColor: vars.colors.primary.interactive,
      },
      dragging: {
        background: vars.colors.primary.surfaceHighlight,
        borderColor: vars.colors.primary.textHigh,
      },
      disabled: {
        background: vars.colors.neutral.surfaceDisabled,
        borderColor: vars.colors.neutral.interactive,
      },
      overlay: { borderWidth: vars.shape.border.width[2] },
    },
    input: {
      // References the theme's own values so base, dark, next and next-dark
      // keep the exact Input look they had: hover keeps the rest border and the
      // AI hover overlay is transparent. Norte UI overrides them.
      height: "2rem",
      padding: vars.spacing[2],
      borderRadius: vars.shape.border.radius[2],
      neutral: {
        background: vars.colors.neutral.background,
        borderColor: vars.colors.neutral.interactive,
        hover: { borderColor: vars.colors.neutral.interactive },
        focus: {
          borderColor: vars.colors.primary.interactiveHover,
          boxShadow: vars.utils.focus,
        },
      },
      success: {
        background: vars.colors.success.surface,
        borderColor: vars.colors.success.interactive,
        hover: { borderColor: vars.colors.success.interactive },
        focus: {
          borderColor: vars.colors.success.interactiveHover,
          boxShadow: vars.utils.focus,
        },
      },
      warning: {
        background: vars.colors.warning.surface,
        borderColor: vars.colors.warning.interactive,
        hover: { borderColor: vars.colors.warning.interactive },
        focus: {
          borderColor: vars.colors.warning.interactiveHover,
          boxShadow: vars.utils.focus,
        },
      },
      danger: {
        background: vars.colors.danger.surface,
        borderColor: vars.colors.danger.interactive,
        hover: { borderColor: vars.colors.danger.interactive },
        focus: {
          borderColor: vars.colors.danger.interactiveHover,
          boxShadow: vars.utils.focus,
        },
      },
      aiGenerative: {
        hover: { overlay: "transparent" },
        focus: { boxShadow: vars.utils.focus },
      },
      aiGenerated: { boxShadow: vars.utils.aiFocus },
      disabled: { borderColor: vars.colors.neutral.surfaceHighlight },
      skeleton: { height: "2rem", borderRadius: "0.5rem" },
    },
    select: {
      // Same sizes the Select had before they were theme-driven: medium keeps
      // its content height (`auto`). Rest, hover and disabled colors come from
      // `components.input`; only the focus differs from Input outside Norte UI.
      medium: {
        height: "auto",
        paddingY: vars.spacing[2],
        borderRadius: vars.shape.border.radius[2],
      },
      small: {
        height: "1.75rem",
        paddingY: vars.spacing[1],
        borderRadius: vars.shape.border.radius.base,
      },
      ...fieldFocus,
      skeleton: {
        medium: { height: "2.25rem", borderRadius: "0.5rem" },
        small: { height: "1.75rem", borderRadius: "0.375rem" },
      },
    },
    textarea: {
      // Same padding, line height and skeleton the Textarea had before they
      // were theme-driven. Radius, rest, hover and disabled colors come from
      // `components.input`; the focus is the same as Select.
      paddingY: vars.spacing[2],
      paddingX: vars.spacing[2],
      lineHeight: vars.lineWeight.body.caption,
      ...fieldFocus,
      skeleton: { height: "3.375rem", borderRadius: "0.5rem" },
    },
    checkbox: {
      // References what the Checkbox used before, so base, dark, next and
      // next-dark keep the exact look: hover and pressed keep the rest colors.
      // Norte UI overrides them.
      label: { fontSize: vars.fontSize.body.base },
      focus: {
        boxShadow: vars.utils.focus,
        borderColor: {
          neutral: vars.colors.neutral.interactive,
          danger: vars.colors.danger.interactive,
          primary: vars.colors.primary.interactive,
        },
      },
      hover: {
        background: vars.colors.neutral.background,
        borderColor: {
          neutral: vars.colors.neutral.interactive,
          danger: vars.colors.danger.interactive,
          primary: vars.colors.primary.interactive,
        },
      },
      pressed: {
        background: vars.colors.neutral.background,
        borderColor: {
          neutral: vars.colors.neutral.interactive,
          danger: vars.colors.danger.interactive,
          primary: vars.colors.primary.interactive,
        },
      },
      checked: {
        hover: { background: vars.colors.primary.interactive },
        pressed: { background: vars.colors.primary.interactive },
      },
      indeterminate: {
        color: vars.colors.neutral.textLow,
        hoverColor: vars.colors.neutral.textLow,
        pressedColor: vars.colors.neutral.textLow,
      },
      disabled: {
        background: vars.colors.neutral.surfaceDisabled,
        borderColor: vars.colors.neutral.interactive,
        indeterminateColor: vars.colors.neutral.textLow,
      },
      // AI-generated: hover and pressed repeat the rest border, and disabled
      // keeps the interactive gradient over neutral.surfaceDisabled.
      aiGenerated: {
        hover: { background: aiLinearBorder(vars.colors.neutral.background) },
        pressed: {
          background: aiLinearBorder(vars.colors.neutral.background),
        },
        focus: { background: aiLinearBorder(vars.colors.neutral.background) },
        checked: {
          hover: {
            background: aiLinearBorder(vars.colors.primary.interactive),
          },
          pressed: {
            background: aiLinearBorder(vars.colors.primary.interactive),
          },
          focus: {
            background: aiLinearBorder(vars.colors.primary.interactive),
          },
        },
        disabled: {
          background: aiLinearBorder(vars.colors.neutral.surfaceDisabled),
        },
      },
    },
    radio: {
      // References what the Radio used before, so base, dark, next and
      // next-dark keep the exact look. The button pressed values match its
      // hover, which already won over :active. Norte UI overrides them.
      dotSize: "0.5rem",
      label: { fontSize: vars.fontSize.body.base },
      // borderColor repeats the rest border of the unchecked radio.
      focus: {
        boxShadow: vars.utils.focus,
        borderColor: vars.colors.neutral.interactive,
      },
      hover: {
        background: vars.colors.neutral.background,
        borderColor: vars.colors.neutral.interactive,
      },
      pressed: {
        background: vars.colors.neutral.background,
        borderColor: vars.colors.neutral.interactive,
      },
      checked: {
        hover: { color: vars.colors.primary.interactive },
        pressed: { color: vars.colors.primary.interactive },
      },
      disabled: {
        background: vars.colors.neutral.surfaceDisabled,
        borderColor: vars.colors.neutral.interactive,
      },
      checkedDisabled: {
        background: vars.colors.neutral.surfaceDisabled,
        borderColor: vars.colors.neutral.interactive,
        dotColor: vars.colors.neutral.textDisabled,
      },
      button: {
        background: vars.colors.neutral.surface,
        // Repeats the rest border of the unchecked button.
        focus: { borderColor: vars.colors.neutral.interactive },
        hover: {
          background: vars.colors.neutral.surfaceHighlight,
          borderColor: vars.colors.neutral.interactivePressed,
        },
        pressed: {
          background: vars.colors.neutral.surfaceHighlight,
          borderColor: vars.colors.neutral.interactivePressed,
        },
        checked: {
          hover: { background: vars.colors.primary.interactive },
          pressed: { background: vars.colors.primary.interactive },
        },
        disabled: {
          background: vars.colors.neutral.surfaceDisabled,
          borderColor: vars.colors.neutral.surfaceHighlight,
        },
        checkedDisabled: {
          background: vars.colors.neutral.textDisabled,
          borderColor: vars.colors.neutral.surfaceHighlight,
          color: vars.colors.neutral.background,
        },
      },
    },
    toggle: {
      // References what the Toggle used before, so base, dark, next and
      // next-dark keep the exact look. Norte UI overrides them.
      label: { fontSize: vars.fontSize.body.base },
      // borderColor repeats the rest border of the off track.
      focus: {
        boxShadow: vars.utils.focus,
        borderColor: vars.colors.neutral.interactive,
      },
      pressed: {
        background: vars.colors.neutral.interactiveHover,
        borderColor: vars.colors.neutral.interactivePressed,
      },
      disabled: {
        background: vars.colors.neutral.surfaceDisabled,
        thumb: vars.colors.neutral.surfaceHighlight,
      },
      checkedDisabled: {
        background: vars.colors.neutral.surfaceDisabled,
        thumb: vars.colors.neutral.surfaceHighlight,
      },
    },
    badge: {
      // References the theme's own tone colors so base, dark, next and next-dark
      // keep the exact Badge look they had. Norte UI overrides them.
      surface: {
        neutral: {
          background: vars.colors.neutral.textLow,
          color: vars.colors.neutral.background,
        },
        primary: {
          background: vars.colors.primary.textLow,
          color: vars.colors.neutral.background,
        },
        success: {
          background: vars.colors.success.textLow,
          color: vars.colors.neutral.background,
        },
        warning: {
          background: vars.colors.warning.textLow,
          color: vars.colors.neutral.background,
        },
        danger: {
          background: vars.colors.danger.textLow,
          color: vars.colors.neutral.background,
        },
        aiGenerative: {
          background: vars.colors.aiGenerative.textLow,
          color: vars.colors.neutral.background,
        },
      },
      light: {
        neutral: {
          background: vars.colors.neutral.background,
          color: vars.colors.neutral.textLow,
        },
        primary: {
          background: vars.colors.neutral.background,
          color: vars.colors.primary.textLow,
        },
        success: {
          background: vars.colors.neutral.background,
          color: vars.colors.success.textLow,
        },
        warning: {
          background: vars.colors.neutral.background,
          color: vars.colors.warning.textLow,
        },
        danger: {
          background: vars.colors.neutral.background,
          color: vars.colors.danger.textLow,
        },
        aiGenerative: {
          background: vars.colors.neutral.background,
          color: vars.colors.aiGenerative.textLow,
        },
      },
      dot: {
        neutral: { background: vars.colors.neutral.interactive },
        primary: { background: vars.colors.primary.interactive },
        success: { background: vars.colors.success.interactive },
        warning: { background: vars.colors.warning.interactive },
        danger: { background: vars.colors.danger.interactive },
        // aiGenerative has no `interactive` color, so it uses interactivePressed.
        aiGenerative: {
          background: vars.colors.aiGenerative.interactivePressed,
        },
      },
    },
    toast: {
      // Keeps the exact Toast shape and colors base, dark, next and next-dark
      // had. Norte UI overrides them.
      borderRadius: vars.shape.border.radius[2],
      gap: vars.spacing[1],
      paddingInlineEnd: vars.spacing[2],
      boxShadow: "none",
      primary: { background: vars.colors.primary.textLow },
    },
    link: {
      // References the theme's own neutral textDisabled so base, dark, next and
      // next-dark keep the exact neutral Link hover they had. Norte UI overrides it.
      neutral: { hoverColor: vars.colors.neutral.textDisabled },
    },
  },
  gradients: {
    aiGenerative: aiGenerativeGradientsBase,
    aiGenerativeLinear: aiGenerativeLinearBase,
  },
};

createGlobalTheme(":root", vars, globalTheme);

/**
 * Button values for dark and next-dark. The dark pressed fills are light,
 * so success and warning use the dark tone surface as the pressed label
 * (7.7:1 and 5.9:1). Everything else matches `globalTheme`.
 */
export const buttonDark = {
  ...globalTheme.components.button,
  success: {
    ...globalTheme.components.button.success,
    pressedText: vars.colors.success.surface,
  },
  warning: {
    ...globalTheme.components.button.warning,
    pressedText: vars.colors.warning.surface,
  },
};

// Matches Figma's text rendering on macOS: without this, WebKit/Blink/Gecko
// rasterize the same Geist weight visibly heavier than the design tool does.
globalStyle("html", {
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

export const varsThemeBase = vars;
