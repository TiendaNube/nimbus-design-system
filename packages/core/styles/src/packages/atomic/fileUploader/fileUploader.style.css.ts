import { style } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { vars } from "../../../utils";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: varsThemeBase.sizes[1],
  width: vars.width,
  height: vars.height,

  background: varsThemeBase.colors.primary.surface,
  borderRadius: varsThemeBase.spacing[2],
  borderWidth: varsThemeBase.sizes["0,5"],
  borderStyle: "dashed",
  borderColor: varsThemeBase.colors.primary.interactive,
  cursor: "pointer",
});

export const disabled = style({
  background: varsThemeBase.colors.neutral.surfaceDisabled,
  borderColor: varsThemeBase.colors.neutral.interactive,
});

export const input = style({
  display: "none",
});

export const skeleton = style({
  display: "flex",
});
