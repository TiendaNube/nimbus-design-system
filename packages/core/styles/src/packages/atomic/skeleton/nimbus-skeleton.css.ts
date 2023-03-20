import { style, keyframes } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes";
import { vars } from "../../../utils";

const skeletonAnimation = keyframes({
  "0%": {
    left: 0,
    opacity: 0,
    right: "initial",
    width: "0%",
  },
  "40%": {
    left: 0,
    opacity: 0.5,
    right: "initial",
    width: "100%",
  },
  "50%": {
    left: "initial",
    right: 0,
    width: "100%",
  },
  "90%": {
    left: "initial",
    opacity: 0,
    right: 0,
    width: "0%",
  },
  "100%": {
    left: 0,
    right: "initial",
  },
});

export const base = style({
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  position: "relative",
  overflow: "hidden",
  width: vars.width,
  height: vars.height,
  borderRadius: vars.borderRadius,
  ":before": {
    content: "",
    position: "absolute",
    height: "100%",
    left: "0",
    top: "0",
    width: "0%",
    backgroundColor: varsThemeBase.colors.neutral.surface,
    animationName: skeletonAnimation,
    animationDuration: "3000ms",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease",
  },
});
