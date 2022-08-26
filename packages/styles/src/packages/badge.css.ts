import { recipe } from "@vanilla-extract/recipes";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { varsThemeBase } from "../themes/base.css";
import { textAlign } from "../commons";

const colors = tokens.color.sys.light;
const fontSize = tokens.font.size.ref;
const { spacing } = tokens;

export const badge = recipe({
  base: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    height: "1.25rem",
    width: "fit-content",
    padding: `${spacing["025"].value} ${spacing["1"].value}`,
    borderRadius: "0.813rem",
    lineHeight: varsThemeBase.lineWeight.body.small,
    fontSize: fontSize["075"].value,
    fontFamily: varsThemeBase.fontFamily.centranube,
  },
  variants: {
    textAlign,
    appearance: {
      neutral: {
        color: colors.neutral.low.value,
        backgroundColor: colors.neutral.disabled.value,
      },
      primary: {
        color: colors.primary.low.value,
        backgroundColor: colors.primary["surface-highlight"].value,
      },
      success: {
        color: colors.success.low.value,
        backgroundColor: colors.success["surface-highlight"].value,
      },
      warning: {
        color: colors.warning.low.value,
        backgroundColor: colors.warning["surface-highlight"].value,
      },
      danger: {
        color: colors.danger.low.value,
        backgroundColor: colors.danger["surface-highlight"].value,
      },
    },
    defaultVariants: {
      appearance: "neutral",
    },
  },
});
