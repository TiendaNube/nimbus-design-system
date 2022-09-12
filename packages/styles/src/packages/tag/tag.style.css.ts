import { recipe } from "@vanilla-extract/recipes";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { varsThemeBase } from "../../themes/base.css";

const { spacing } = tokens;

export const style = recipe({
  base: {
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    height: "1.25rem",
    gap: spacing["05"].value,
    padding: `${spacing["025"].value} ${spacing["1"].value}`,
    boxSizing: "border-box",
    borderWidth: "0.063rem",
    borderStyle: "solid",
    borderRadius: "0.813rem",
    lineHeight: varsThemeBase.lineWeight.body.small,
    fontSize: varsThemeBase.fontSize.body.small,
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
