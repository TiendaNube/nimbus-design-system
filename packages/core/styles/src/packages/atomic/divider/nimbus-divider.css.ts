import { style, styleVariants } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";
import { vars } from "../../../utils";

const base = style({
  width: "100%",
  height: varsThemeBase.shape.border.width[1],
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  margin: 0,
  outline: "none",
  border: "none",
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
  primary: [base, { backgroundColor: varsThemeBase.colors.primary.textLow }],
});

export const customWidth = style({
  width: vars.width,
});

export const customMarginLeft = style({
  marginLeft: vars.marginLeft,
});

export const customMarginRight = style({
  marginRight: vars.marginRight,
});
