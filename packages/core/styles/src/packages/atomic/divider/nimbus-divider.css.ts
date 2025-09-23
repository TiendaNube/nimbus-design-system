import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

const base = style({
  width: "100%",
  height: varsThemeBase.shape.border.width[1],
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  borderRadius: varsThemeBase.shape.border.radius.full,
});

export const orientation = styleVariants({
  horizontal: [base],
  vertical: [
    base,
    {
      width: varsThemeBase.shape.border.width[1],
      height: "100%",
    },
  ],
});

export const horizontalThickness = styleVariants({
  1: [base],
  2: [base, { height: varsThemeBase.shape.border.width[2] }],
  3: [base, { height: varsThemeBase.shape.border.width[3] }],
});

export const verticalThickness = styleVariants({
  1: [base],
  2: [base, { width: varsThemeBase.shape.border.width[2] }],
  3: [base, { width: varsThemeBase.shape.border.width[3] }],
});

export const appearance = styleVariants({
  neutral: [base],
});
