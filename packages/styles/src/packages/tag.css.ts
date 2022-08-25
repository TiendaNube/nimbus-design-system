import { recipe } from "@vanilla-extract/recipes";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { varsThemeBase } from "../themes/base.css";
import { textAlign } from "../commons";

const colors = tokens.color.ref.light;
const {spacing} = tokens;

export const tag = recipe({
  base: {
    margin: 0,
    display: "flex",
    flexDirection: "row",
    width: "fit-content",
    gap: spacing["5"].value,
    padding: `${spacing["025"].value} ${spacing["1"].value}`,
    borderWidth: "0.063rem",
    borderStyle: "solid",
    borderRadius: "0.813rem",
    lineHeight: varsThemeBase.lineWeight.body.small,
    fontSize: varsThemeBase.fontSize.body.small,
    fontFamily: varsThemeBase.fontFamily.centranube,
  },
  variants: {
    textAlign,
    appearance: {
      neutral: {
        color: colors.neutral[10].value,
        backgroundColor: colors.neutral[99].value,
        borderColor: colors.neutral[95].value,
      },
      primary: {
        color: colors.primary[10].value,
        backgroundColor: colors.primary[99].value,
        borderColor: colors.primary[95].value,
      },
      success: {
        color: colors.success[10].value,
        backgroundColor: colors.success[99].value,
        borderColor: colors.success[95].value,
      },
      warning: {
        color: colors.warning[10].value,
        backgroundColor: colors.warning[99].value,
        borderColor: colors.warning[95].value,
      },
      danger: {
        color: colors.danger[10].value,
        backgroundColor: colors.danger[99].value,
        borderColor: colors.danger[95].value,
      },
    },
    defaultVariants: {
      appearance: "neutral",
    },
  },
});
