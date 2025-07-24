import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";
import { gradients } from "../../../gradients";

const base = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "2rem",
  width: "fit-content",
  textDecoration: "none",
  cursor: "pointer",
  boxSizing: "border-box",
  padding: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[4]}`,
  gap: varsThemeBase.spacing[1],
  fontWeight: varsThemeBase.fontWeight.medium,
  lineHeight: varsThemeBase.lineWeight.body.base,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.sans,
  color: varsThemeBase.colors.neutral.textHigh,
  borderRadius: varsThemeBase.shape.border.radius[2],
  borderWidth: varsThemeBase.shape.border.width[1],
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":disabled": {
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "not-allowed",
  },
  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
  },
});

export const appearance = styleVariants({
  primary: [
    base,
    {
      background: varsThemeBase.colors.primary.interactive,
      borderColor: varsThemeBase.colors.primary.interactive,
      color: varsThemeBase.colors.neutral.background,
      ":hover": {
        background: varsThemeBase.colors.primary.interactiveHover,
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
      ":active": {
        background: varsThemeBase.colors.primary.interactivePressed,
        borderColor: varsThemeBase.colors.primary.interactivePressed,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.primary.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
    },
  ],
  danger: [
    base,
    {
      background: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.interactive,
      color: varsThemeBase.colors.danger.textLow,
      ":hover": {
        background: varsThemeBase.colors.danger.surfaceHighlight,
        borderColor: varsThemeBase.colors.danger.interactiveHover,
      },
      ":active": {
        background: varsThemeBase.colors.danger.interactive,
        borderColor: varsThemeBase.colors.danger.interactivePressed,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.danger.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.danger.interactive,
      },
    },
  ],
  neutral: [
    base,
    {
      background: varsThemeBase.colors.neutral.surface,
      borderColor: varsThemeBase.colors.neutral.interactive,
      color: varsThemeBase.colors.neutral.textHigh,
      ":hover": {
        backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":active": {
        backgroundColor: varsThemeBase.colors.neutral.interactive,
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactive,
      },
    },
  ],
  transparent: [
    base,
    {
      background: "transparent",
      borderColor: "transparent",
      color: varsThemeBase.colors.neutral.textHigh,
      ":hover": {
        backgroundColor: varsThemeBase.colors.neutral.surface,
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":active": {
        backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
      },
      ":disabled": {
        color: varsThemeBase.colors.neutral.textDisabled,
        background: "transparent",
        borderColor: "transparent",
      },
    },
  ],
  "ai-gradient": [
    base,
    {
      background: gradients.aiGradient,
      borderColor: varsThemeBase.colors.neutral.background,
      color: varsThemeBase.colors.neutral.background,
      ":hover": {
        opacity: "0.9",
      },
      ":active": {
        opacity: "0.8",
      },
      ":disabled": {
        background: varsThemeBase.colors.neutral.surfaceDisabled,
        borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
        color: varsThemeBase.colors.neutral.textDisabled,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
    },
  ],
});
