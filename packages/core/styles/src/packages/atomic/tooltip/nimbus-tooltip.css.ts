import { style } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const container = style({
  width: "fit-content",
});

export const content = style({
  width: "fit-content",
  backgroundColor: varsThemeBase.colors.neutral.textLow,
  padding: varsThemeBase.spacing[1],
  borderRadius: varsThemeBase.shape.border.radius[1],
  transition: `opacity ${varsThemeBase.motion.speed.fast} ease`,
  zIndex: varsThemeBase.zIndex[800],
});
