import { recipe } from "@vanilla-extract/recipes";

import { varsThemeBase } from "../../themes/base.css";
import { utils } from "../../utils";

export const style = recipe({
  base: {
    fontFamily: varsThemeBase.fontFamily.centranube,
    fontWeight: varsThemeBase.fontWeight.regular,
    margin: 0,
  },
  variants: {
    textAlign: utils.variantes.textAlign,
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
