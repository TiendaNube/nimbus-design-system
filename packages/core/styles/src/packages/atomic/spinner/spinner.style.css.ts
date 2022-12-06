import {
  style as vanillaStyle,
  globalStyle,
  keyframes,
} from "@vanilla-extract/css";
import { utils } from "../../../utils";

const rotateAnimation = keyframes({
  "100%": {
    transform: "rotate(360deg)",
  },
});

const dashAnimation = keyframes({
  "0%": {
    strokeDasharray: "1, 150",
    strokeDashoffset: "0",
  },
  "50%": {
    strokeDasharray: "90, 150",
    strokeDashoffset: "-35",
  },
  "100%": {
    strokeDasharray: "90, 150",
    strokeDashoffset: "-124",
  },
});

export const style = vanillaStyle({
  animation: `${rotateAnimation} 2s linear infinite`,
  width: utils.vars.width,
  height: utils.vars.height,
});

globalStyle(`${style} circle`, {
  stroke: "currentcolor",
  animation: `${dashAnimation} 1.5s ease-in-out infinite`,
});
