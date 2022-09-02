import { recipe } from "@vanilla-extract/recipes";

import { varsThemeBase } from "../../themes/base.css";
import { utils } from "../../utils";

export const style = recipe({
  base: {
    fontFamily: varsThemeBase.fontFamily.centranube,
    fontWeight: varsThemeBase.fontWeight.bold,
    margin: 0,
  },
  variants: {
    textAlign: utils.variantes.textAlign,
    as: {
      h1: {
        fontSize: varsThemeBase.fontSize.title.h1,
        lineHeight: varsThemeBase.lineWeight.title.h1,
      },
      h2: {
        fontSize: varsThemeBase.fontSize.title.h2,
        lineHeight: varsThemeBase.lineWeight.title.h2,
      },
      h3: {
        fontSize: varsThemeBase.fontSize.title.h3,
        lineHeight: varsThemeBase.lineWeight.title.h3,
      },
      h4: {
        fontSize: varsThemeBase.fontSize.title.h4,
        lineHeight: varsThemeBase.lineWeight.title.h4,
      },
      h5: {
        fontSize: varsThemeBase.fontSize.title.h5,
        lineHeight: varsThemeBase.lineWeight.title.h5,
      },
      h6: {
        fontSize: varsThemeBase.fontSize.title.h6,
        lineHeight: varsThemeBase.lineWeight.title.h6,
      },
    },
    defaultVariants: {
      as: "h1",
      textAlign: "left",
    },
  },
});
