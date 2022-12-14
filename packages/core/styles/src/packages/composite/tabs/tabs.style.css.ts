import { style as vanillaStyle, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const container = vanillaStyle({
  borderColor: varsThemeBase.colors.neutral.interactive,
  borderStyle: "none none solid",
  borderWidth: 2,

  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "flex",
});

export const tabElement = styleVariants({
  default: [],
  fullWidth: [
    {
      flex: "1 1 auto",
    },
  ],
});

const buttonBase = vanillaStyle({
  appearance: "none",
  background: "transparent",
  cursor: "pointer",
  position: "relative",
  border: 0,

  display: "block",
  margin: "0 auto",
  borderRadius: varsThemeBase.sizes[1],
  paddingBottom: varsThemeBase.spacing[2],
  paddingLeft: varsThemeBase.spacing[6],
  paddingRight: varsThemeBase.spacing[6],
  paddingTop: varsThemeBase.spacing[2],
  width: "100%",

  fontFamily: varsThemeBase.fontFamily.centranube,
  fontSize: varsThemeBase.fontSize.body.base,
  fontWeight: varsThemeBase.fontWeight.regular,
  textAlign: "center",
  color: varsThemeBase.colors.neutral.textHigh,

  transition: varsThemeBase.motion.speed.base,

  ":hover": {
    backgroundColor: varsThemeBase.colors.primary.surface,
  },

  ":focus": {
    boxShadow: `0px 0px 0px 3px ${varsThemeBase.colors.primary.surfaceHighlight}`,
  },
});

export const tabButton = styleVariants({
  default: [buttonBase],
  active: [
    buttonBase,
    {
      color: varsThemeBase.colors.primary.interactive,
      fontWeight: varsThemeBase.fontWeight.bold,

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

export const panel = vanillaStyle({
  paddingTop: varsThemeBase.spacing[4],

  ":focus": {
    boxShadow: `0px 0px 0px 3px ${varsThemeBase.colors.primary.surfaceHighlight}`,
  },
});
