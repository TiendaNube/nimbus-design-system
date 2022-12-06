import { style, styleVariants } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes/base.css";

export const content = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "17.5rem",
  minHeight: "2rem",
  filter: `drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2))`,
  borderRadius: varsThemeBase.spacing[2],
  boxSizing: "border-box",
  transition: `opacity ${varsThemeBase.motion.speed.fast} ease`,
});

export const baseArrow = style({
  "::after": {
    content: " ",
    position: "absolute",
    borderWidth: varsThemeBase.spacing[2],
    borderStyle: "solid",
  },
});

export const arrow = styleVariants({
  top: [
    baseArrow,
    {
      "::after": {
        top: "100%",
        borderColor: `currentColor transparent transparent transparent`,
        marginLeft: "-0.5rem",
        left: "50%",
      },
    },
  ],
  bottom: [
    baseArrow,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent transparent currentColor transparent`,
        marginLeft: "-0.5rem",
        left: "50%",
      },
    },
  ],
  left: [
    baseArrow,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent transparent transparent currentColor`,
        marginTop: "-0.5rem",
        top: "50%",
        left: "100%",
      },
    },
  ],
  right: [
    baseArrow,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent currentColor transparent transparent`,
        marginTop: "-0.5rem",
        top: "50%",
        right: "100%",
      },
    },
  ],
});

export const placement = styleVariants({
  top: {},
  right: {},
  bottom: {},
  left: {},
  "top-start": {},
  "top-end": {},
  "right-start": { "::after": { marginTop: 0 } },
  "right-end": { "::after": { marginTop: "-1rem" } },
  "bottom-start": {},
  "bottom-end": {},
  "left-start": { "::after": { marginTop: 0 } },
  "left-end": { "::after": { marginTop: "-1rem" } },
});
