import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

const base = vanillaStyle({
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

export const container = vanillaStyle({
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "100%",
});

export const container__icon_append = styleVariants({
  start: { position: "absolute", left: "8px" },
  end: { position: "absolute", right: "8px" },
});

export const container__input_append = styleVariants({
  start: {
    paddingLeft: "32px",
  },
  end: {
    paddingRight: "32px",
  },
});

export const container__button = vanillaStyle({
  padding: "0",
  cursor: "pointer",
  background: "transparent",
  border: "none",
});

export const appearance = styleVariants({
  neutral: [
    base,
    {
      background: varsThemeBase.colors.neutral.background,
      borderColor: varsThemeBase.colors.neutral.interactive,
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactiveHover,
      },
    },
  ],
  success: [
    base,
    {
      background: varsThemeBase.colors.success.surface,
      borderColor: varsThemeBase.colors.success.interactive,
      ":focus": {
        borderColor: varsThemeBase.colors.success.interactiveHover,
      },
    },
  ],
  warning: [
    base,
    {
      background: varsThemeBase.colors.warning.surface,
      borderColor: varsThemeBase.colors.warning.interactive,
      ":focus": {
        borderColor: varsThemeBase.colors.warning.interactiveHover,
      },
    },
  ],
  danger: [
    base,
    {
      background: varsThemeBase.colors.danger.surface,
      borderColor: varsThemeBase.colors.danger.interactive,
      ":focus": {
        borderColor: varsThemeBase.colors.danger.interactiveHover,
      },
    },
  ],
});
