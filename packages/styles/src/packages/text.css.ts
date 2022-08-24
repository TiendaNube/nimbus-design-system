import { recipe } from "@vanilla-extract/recipes";

import { varsThemeBase } from "../themes/base.css";
import { textAlign } from "../commons";

export const text = recipe({
  base: {
    color: varsThemeBase.color.primary.high,
    fontFamily: varsThemeBase.fontFamily.centranube,
    fontWeight: varsThemeBase.fontWeight.regular,
    margin: 0,
  },
  variants: {
    textAlign,
    appearance: {
      primary: {
        color: varsThemeBase.color.primary.low,
      },
      success: {
        color: varsThemeBase.color.success.low,
      },
      warning: {
        color: varsThemeBase.color.warning.low,
      },
      danger: {
        color: varsThemeBase.color.danger.low,
      },
      neutral: {
        color: varsThemeBase.color.neutral.low,
      },
    },
    size: {
      small: {
        fontSize: varsThemeBase.fontSize.body.small,
      },
      caption: {
        fontSize: varsThemeBase.fontSize.body.caption,
      },
      base: {
        fontSize: varsThemeBase.fontSize.body.base,
      },
    },
    lineHeight: {
      small: {
        lineHeight: varsThemeBase.lineWeight.body.small,
      },
      caption: {
        lineHeight: varsThemeBase.lineWeight.body.caption,
      },
      base: {
        lineHeight: varsThemeBase.lineWeight.body.base,
      },
    },
    bold: {
      true: { fontWeight: varsThemeBase.fontWeight.bold },
    },
    defaultVariants: {
      size: "caption",
      lineHeight: "caption",
    },
  },
});
