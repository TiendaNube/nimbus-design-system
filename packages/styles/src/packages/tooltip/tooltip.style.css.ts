import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../themes/base.css";

export const content = style({
  width: "fit-content",
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  padding: varsThemeBase.spacing[2],
  borderRadius: varsThemeBase.spacing[1],
  transition: `opacity ${varsThemeBase.motion.speed.fast} ease`,
});

export const base = style({
  "::after": {
    content: " ",
    position: "absolute",
    borderWidth: varsThemeBase.spacing[2],
    borderStyle: "solid",
  },
});

export const arrow = styleVariants({
  top: [
    base,
    {
      "::after": {
        top: "100%",
        borderColor: `${varsThemeBase.colors.neutral.surfaceHighlight} transparent transparent transparent`,
        marginLeft: "-0.5rem",
        left: "50%",
      },
    },
  ],
  bottom: [
    base,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent transparent ${varsThemeBase.colors.neutral.surfaceHighlight} transparent`,
        marginLeft: "-0.5rem",
        left: "50%",
      },
    },
  ],
  left: [
    base,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent transparent transparent ${varsThemeBase.colors.neutral.surfaceHighlight}`,
        marginTop: "-0.5rem",
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
        borderColor: `transparent ${varsThemeBase.colors.neutral.surfaceHighlight} transparent transparent`,
        marginTop: "-0.5rem",
        top: "50%",
        right: "100%",
      },
    },
  ],
});
