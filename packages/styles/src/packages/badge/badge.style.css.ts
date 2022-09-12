import { recipe } from "@vanilla-extract/recipes";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { varsThemeBase } from "../../themes/base.css";

const { spacing } = tokens;

export const style = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    height: "1.25rem",
    width: "fit-content",

    padding: `${spacing["025"].value} ${spacing["1"].value}`,
    boxSizing: "border-box",
    borderRadius: "0.813rem",

    lineHeight: varsThemeBase.lineWeight.body.small,
    fontSize: varsThemeBase.fontSize.body.small,
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
