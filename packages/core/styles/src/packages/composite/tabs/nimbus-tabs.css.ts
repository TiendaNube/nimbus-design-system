import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const container = vanillaStyle({
  borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
  borderStyle: "none none solid",
  borderWidth: varsThemeBase.shape.border.width[2],
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "flex",
  transition: varsThemeBase.motion.speed.base,
});

export const container__item = styleVariants({
  default: {},
  fullWidth: {
    flex: "1 1 auto",
  },
});

const button = vanillaStyle({
  alignItems: "center",
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  position: "relative",
  border: 0,
  display: "flex",
  gap: varsThemeBase.spacing[1],
  margin: "0 auto",
  maxHeight: "32px",
  borderRadius: varsThemeBase.shape.border.radius[1],
  paddingBottom: varsThemeBase.spacing[2],
  paddingLeft: varsThemeBase.spacing[6],
  paddingRight: varsThemeBase.spacing[6],
  paddingTop: varsThemeBase.spacing[2],
  width: "100%",
  fontFamily: varsThemeBase.fontFamily.sans,
  fontSize: varsThemeBase.fontSize.body.base,
  fontWeight: varsThemeBase.fontWeight.regular,
  textAlign: "center",
  color: varsThemeBase.colors.neutral.textHigh,
  transition: varsThemeBase.motion.speed.base,
  ":hover": {
    backgroundColor: varsThemeBase.colors.primary.surface,
  },
  ":active": {
    backgroundColor: varsThemeBase.colors.primary.surfaceHighlight,
  },
  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
  },
});

export const container__button = styleVariants({
  default: [button],
  active: [
    button,
    {
      color: varsThemeBase.colors.primary.interactive,
      ":before": {
        content: "",
        display: "block",
        position: "absolute",
        bottom: -2,
        left: 0,
        width: "100%",
        height: 2,
        backgroundColor: varsThemeBase.colors.primary.interactive,
      },
    },
  ],
});

export const container__panel = vanillaStyle({
  paddingTop: varsThemeBase.spacing[4],
});
