import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { select } from "../select";
import { varsThemeBase } from "../../../themes";

export const {container} = select.classnames;

export const {container__icon} = select.classnames;

const base = style({
  cursor: "pointer",
  position: "relative",
  fontFamily: varsThemeBase.fontFamily.centranube,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.caption,
  textAlign: "left",
  boxSizing: "border-box",
  color: varsThemeBase.colors.neutral.textHigh,
  borderRadius: varsThemeBase.shape.border.radius[2],
  margin: 0,
  paddingBottom: varsThemeBase.spacing[2],
  paddingLeft: varsThemeBase.spacing[2],
  paddingRight: varsThemeBase.spacing[8],
  paddingTop: varsThemeBase.spacing[2],
  width: "100%",
  appearance: "none",
  outline: "none",
  minHeight: "32px",
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  "::placeholder": {
    color: varsThemeBase.colors.neutral.textDisabled,
  },
  ":disabled": {
    border: `1px solid ${varsThemeBase.colors.neutral.interactive}`,
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
    color: varsThemeBase.colors.neutral.textDisabled,
    cursor: "not-allowed",
  },
  ":focus-visible": {
    boxShadow: varsThemeBase.utils.focus,
  },
});

export const appearance = styleVariants({
  neutral: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.neutral.interactive}`,
      backgroundColor: varsThemeBase.colors.neutral.background,
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactivePressed,
      },
    },
  ],
  success: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.success.interactive}`,
      backgroundColor: varsThemeBase.colors.success.surface,
      ":focus": {
        borderColor: varsThemeBase.colors.success.interactivePressed,
      },
    },
  ],
  warning: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.warning.interactive}`,
      backgroundColor: varsThemeBase.colors.warning.surface,
      ":focus": {
        borderColor: varsThemeBase.colors.warning.interactivePressed,
      },
    },
  ],
  danger: [
    base,
    {
      border: `1px solid ${varsThemeBase.colors.danger.interactive}`,
      backgroundColor: varsThemeBase.colors.danger.surface,
      ":focus": {
        borderColor: varsThemeBase.colors.danger.interactivePressed,
      },
    },
  ],
});

export const container__button = style({
  border: 0,
  backgroundColor: "transparent",
  textAlign: "left",
  cursor: "pointer",
  padding: `${varsThemeBase.spacing["1-5"]} ${varsThemeBase.spacing[3]}`,
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  color: varsThemeBase.colors.neutral.textLow,
  ":focus": {
    boxShadow: "none",
    backgroundColor: varsThemeBase.colors.neutral.surface,
    color: varsThemeBase.colors.neutral.textDisabled,
  },
  ":hover": {
    backgroundColor: varsThemeBase.colors.neutral.surface,
    color: varsThemeBase.colors.neutral.textDisabled,
  },
});

globalStyle(`${base} option`, {
  color: varsThemeBase.colors.neutral.textHigh,
});

globalStyle(`${base} option[value=""][disabled]`, {
  color: varsThemeBase.colors.neutral.textDisabled,
});
