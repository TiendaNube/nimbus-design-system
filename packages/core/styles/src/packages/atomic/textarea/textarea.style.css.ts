import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes/base.css";
import { select as field } from "../select";

const base = style({
  paddingRight: varsThemeBase.spacing[2],
});

export const appearance = styleVariants({
  neutral: [base, field.style.appearance.neutral],
  success: [base, field.style.appearance.success],
  warning: [base, field.style.appearance.warning],
  danger: [base, field.style.appearance.danger],
});
