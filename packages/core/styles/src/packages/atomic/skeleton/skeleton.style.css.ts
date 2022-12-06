import { style as vanillaStyle, keyframes } from "@vanilla-extract/css";

import { varsThemeBase } from "../../../themes/base.css";
import { utils } from "../../../utils";

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

export const style = vanillaStyle({
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  position: "relative",
  width: utils.vars.width,
  height: utils.vars.height,
  borderRadius: utils.vars.borderRadius,
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
