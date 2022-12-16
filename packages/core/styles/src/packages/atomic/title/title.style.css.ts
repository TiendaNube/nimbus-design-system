import { recipe } from "@vanilla-extract/recipes";
import { varsThemeBase } from "../../../themes";

export const container = recipe({
  base: {
    fontFamily: varsThemeBase.fontFamily.centranube,
    margin: 0,
  },
  variants: {
    as: {
      h1: {
        fontSize: varsThemeBase.fontSize.title.h1,
        lineHeight: varsThemeBase.lineWeight.title.h1,
        fontWeight: varsThemeBase.fontWeight.medium,
      },
      h2: {
        fontSize: varsThemeBase.fontSize.title.h2,
        lineHeight: varsThemeBase.lineWeight.title.h2,
        fontWeight: varsThemeBase.fontWeight.medium,
      },
      h3: {
        fontSize: varsThemeBase.fontSize.title.h3,
        lineHeight: varsThemeBase.lineWeight.title.h3,
        fontWeight: varsThemeBase.fontWeight.medium,
      },
      h4: {
        fontSize: varsThemeBase.fontSize.title.h4,
        lineHeight: varsThemeBase.lineWeight.title.h4,
        fontWeight: varsThemeBase.fontWeight.medium,
      },
      h5: {
        fontSize: varsThemeBase.fontSize.title.h5,
        lineHeight: varsThemeBase.lineWeight.title.h5,
        fontWeight: varsThemeBase.fontWeight.bold,
      },
      h6: {
        fontSize: varsThemeBase.fontSize.title.h6,
        lineHeight: varsThemeBase.lineWeight.title.h6,
        fontWeight: varsThemeBase.fontWeight.bold,
      },
    },
    defaultVariants: {
      as: "h1",
    },
  },
});
