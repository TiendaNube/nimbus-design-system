import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";

export const container = style({
  width: "fit-content",
});

export const content = style({
  width: "fit-content",
  backgroundColor: varsThemeBase.colors.neutral.textLow,
  padding: varsThemeBase.spacing[1],
  borderRadius: varsThemeBase.spacing[1],
  transition: `opacity ${varsThemeBase.motion.speed.fast} ease`,
});

export const base = style({
  "::after": {
    content: " ",
    position: "absolute",
    borderWidth: varsThemeBase.spacing[1],
    borderStyle: "solid",
  },
});

export const content__arrow = styleVariants({
  top: [
    base,
    {
      "::after": {
        top: "100%",
        borderColor: `${varsThemeBase.colors.neutral.textLow} transparent transparent transparent`,
        marginLeft: "-0.25rem",
        left: "50%",
      },
    },
  ],
  bottom: [
    base,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent transparent ${varsThemeBase.colors.neutral.textLow} transparent`,
        marginLeft: "-0.25rem",
        left: "50%",
      },
    },
  ],
  left: [
    base,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent transparent transparent ${varsThemeBase.colors.neutral.textLow}`,
        marginTop: "-0.25rem",
        top: "50%",
        left: "100%",
      },
    },
  ],
  right: [
    base,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent ${varsThemeBase.colors.neutral.textLow} transparent transparent`,
        marginTop: "-0.25rem",
        top: "50%",
        right: "100%",
      },
    },
  ],
});
