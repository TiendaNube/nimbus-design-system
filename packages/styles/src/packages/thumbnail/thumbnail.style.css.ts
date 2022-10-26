import { style as vanillaStyle } from "@vanilla-extract/css";

import { varsThemeBase } from "../../themes/base.css";
import { utils } from "../../utils";

export const container = vanillaStyle({
  display: "flex",
  background: varsThemeBase.colors.neutral.surfaceDisabled,
  borderRadius: varsThemeBase.spacing[2],
  width: utils.vars.width,
  overflow: "hidden",
});

export const image = vanillaStyle({
  width: "100%",
  objectFit: "cover",
});

export const placeholder = vanillaStyle({
  width: "100%",
  objectFit: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const skeleton = vanillaStyle({
  display: "flex",
});
