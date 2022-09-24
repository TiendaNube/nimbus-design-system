import { recipe } from "@vanilla-extract/recipes";

import { varsThemeBase } from "../../themes/base.css";

export const style = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    height: "1.25rem",
    width: "fit-content",

    padding: `${varsThemeBase.spacing[1]} ${varsThemeBase.spacing[2]}`,
    boxSizing: "border-box",
    borderRadius: varsThemeBase.sizes[3],

    lineHeight: varsThemeBase.lineWeight.body.caption,
    fontSize: varsThemeBase.fontSize.body.caption,
    fontFamily: varsThemeBase.fontFamily.centranube,
  },
  variants: {
    appearance: {
      neutral: {
        backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
      },
      primary: {
        backgroundColor: varsThemeBase.colors.primary.surfaceHighlight,
      },
      success: {
        backgroundColor: varsThemeBase.colors.success.surfaceHighlight,
      },
      warning: {
        backgroundColor: varsThemeBase.colors.warning.surfaceHighlight,
      },
      danger: {
        backgroundColor: varsThemeBase.colors.danger.surfaceHighlight,
      },
    },
    defaultVariants: {
      appearance: "neutral",
    },
  },
});
