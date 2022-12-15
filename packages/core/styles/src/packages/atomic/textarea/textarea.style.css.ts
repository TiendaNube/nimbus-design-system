import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { select as field } from "../select";

const base = style({
  paddingRight: varsThemeBase.spacing[2],
});

export const appearance = styleVariants({
  neutral: [base, field.classnames.appearance.neutral],
  success: [base, field.classnames.appearance.success],
  warning: [base, field.classnames.appearance.warning],
  danger: [base, field.classnames.appearance.danger],
});
