import { recipe } from "@vanilla-extract/recipes";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { varsThemeBase } from "../../themes/base.css";

const { spacing } = tokens;

export const style = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: spacing["05"].value,

    lineHeight: varsThemeBase.lineWeight.body.small,
    fontSize: varsThemeBase.fontSize.body.small,
    fontFamily: varsThemeBase.fontFamily.centranube,

    color: varsThemeBase.colors.neutral.textLow,
  },
  variants: {
    hidden: {
      true: {
        border: "0",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px",
      },
    },
    defaultVariants: {
      hidden: "false",
    },
  },
});
