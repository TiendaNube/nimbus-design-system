import { recipe } from "@vanilla-extract/recipes";

import { varsThemeBase } from "../../themes/base.css";

export const style = recipe({
  base: {
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    height: "1.25rem",
    gap: varsThemeBase.spacing[1],
    padding: `${varsThemeBase.spacing["0,5"]} ${varsThemeBase.spacing[2]}`,
    boxSizing: "border-box",
    borderWidth: "0.063rem",
    borderStyle: "solid",
    borderRadius: varsThemeBase.sizes[3],
    lineHeight: varsThemeBase.lineWeight.body.caption,
    fontSize: varsThemeBase.fontSize.body.caption,
    fontFamily: varsThemeBase.fontFamily.centranube,
  },
  variants: {
    appearance: {
      neutral: {
        color: varsThemeBase.colors.neutral.textLow,
        backgroundColor: varsThemeBase.colors.neutral.surface,
        borderColor: varsThemeBase.colors.neutral.surfaceHighlight,
      },
      primary: {
        color: varsThemeBase.colors.primary.textLow,
        backgroundColor: varsThemeBase.colors.primary.surface,
        borderColor: varsThemeBase.colors.primary.surfaceHighlight,
      },
      success: {
        color: varsThemeBase.colors.success.textLow,
        backgroundColor: varsThemeBase.colors.success.surface,
        borderColor: varsThemeBase.colors.success.surfaceHighlight,
      },
      warning: {
        color: varsThemeBase.colors.warning.textLow,
        backgroundColor: varsThemeBase.colors.warning.surface,
        borderColor: varsThemeBase.colors.warning.surfaceHighlight,
      },
      danger: {
        color: varsThemeBase.colors.danger.textLow,
        backgroundColor: varsThemeBase.colors.danger.surface,
        borderColor: varsThemeBase.colors.danger.surfaceHighlight,
      },
    },
    defaultVariants: {
      appearance: "neutral",
    },
  },
});
