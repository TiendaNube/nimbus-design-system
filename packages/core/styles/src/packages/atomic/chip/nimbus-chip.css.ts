import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

const base = vanillaStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "default",

  padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.spacing[2]}`,
  gap: varsThemeBase.spacing[1],
  height: "1.5rem",
  width: "fit-content",
  boxSizing: "border-box",

  lineHeight: varsThemeBase.lineWeight.body.caption,
  fontSize: varsThemeBase.fontSize.body.caption,
  fontFamily: varsThemeBase.fontFamily.sans,

  borderStyle: "solid",
  borderRadius: varsThemeBase.shape.border.radius[1],
  borderWidth: varsThemeBase.shape.border.width[1],
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,

  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
  },
});

export const appearance = styleVariants({
  neutral: [
    base,
    {
      background: varsThemeBase.colors.neutral.surface,
      color: varsThemeBase.colors.neutral.textHigh,
      borderColor: varsThemeBase.colors.neutral.interactive,
      ":hover": {
        background: varsThemeBase.colors.neutral.surfaceHighlight,
        borderColor: varsThemeBase.colors.neutral.interactiveHover,
      },
      ":focus": {
        borderColor: varsThemeBase.colors.primary.interactive,
      },
      ":active": {
        background: varsThemeBase.colors.neutral.interactive,
        borderColor: varsThemeBase.colors.neutral.interactivePressed,
      },
    },
  ],
});

export const chip_close_icon_container = vanillaStyle({
  background: "transparent",
  border: "none",
  padding: 0,
  fontSize: 0,
  cursor: "pointer",
});
