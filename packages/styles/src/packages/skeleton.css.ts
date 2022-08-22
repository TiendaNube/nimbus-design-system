import { style, keyframes } from "@vanilla-extract/css";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { height, width, borderRadius } from "../commons";

const colors = tokens.color.ref.light.neutral;

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

export const skeleton = style({
  backgroundColor: colors[95].value,
  position: "relative",
  width,
  height,
  borderRadius,
  ":before": {
    content: "",
    position: "absolute",
    height: "100%",
    left: "0",
    top: "0",
    width: "0%",
    backgroundColor: colors[99].value,
    animationName: skeletonAnimation,
    animationDuration: "3000ms",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease",
  },
});
