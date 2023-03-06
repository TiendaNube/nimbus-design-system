import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

export const container = vanillaStyle({
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "100%",
});

export const baseAppend = vanillaStyle({
  position: "absolute",
});

export const append = styleVariants({
  start: [baseAppend, { left: "8px" }],
  end: [baseAppend, { right: "8px" }],
});

const baseInput = vanillaStyle({
  padding: varsThemeBase.spacing[2],
  height: "2rem",
  width: "100%",

  fontWeight: varsThemeBase.fontWeight.regular,
  fontSize: varsThemeBase.fontSize.body.base,
  fontFamily: varsThemeBase.fontFamily.centranube,

  color: varsThemeBase.colors.neutral.textLow,
  borderRadius: varsThemeBase.sizes[2],
  boxSizing: "border-box",

  borderWidth: "0.063rem",
  borderStyle: "solid",
  borderColor: varsThemeBase.colors.neutral.interactive,

  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":focus": {
    outline: "none",
    boxShadow: varsThemeBase.utils.focus,
  },
  ":disabled": {
    borderColor: varsThemeBase.colors.neutral.interactive,
    background: varsThemeBase.colors.neutral.surfaceDisabled,
    color: varsThemeBase.colors.neutral.textDisabled,
  },
});

export const inputAppearance = styleVariants({
  neutral: [
    baseInput,
    {
      background: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.neutral.interactive,
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
    },
  ],
  success: [
    baseInput,
    {
      background: varsThemeBase.colors.success.surface,
      borderColor: varsThemeBase.colors.success.interactive,
      ":focus": {
        borderColor: varsThemeBase.colors.success.interactiveHover,
      },
    },
  ],
  warning: [
    baseInput,
    {
      background: varsThemeBase.colors.warning.surface,
      borderColor: varsThemeBase.colors.warning.interactive,
      ":focus": {
        borderColor: varsThemeBase.colors.warning.interactiveHover,
      },
    },
  ],
  danger: [
    baseInput,
    {
      background: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.interactive,
      ":focus": {
        borderColor: varsThemeBase.colors.danger.interactiveHover,
      },
    },
  ],
});

export const inputAppend = styleVariants({
  start: {
    paddingLeft: "32px",
  },
  end: {
    paddingRight: "32px",
  },
});

export const password = vanillaStyle({
  padding: "0",
  cursor: "pointer",
  background: "transparent",
  border: "none",
});
