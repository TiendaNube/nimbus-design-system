import { keyframes, style } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const body = style({
  width: "100%",
  display: "flex",
  boxSizing: "border-box",
  fontFamily: varsThemeBase.fontFamily.sans
});

const open = keyframes({
  from: { transform: "translateY(-10%)", opacity: 0 },
  to: { transform: "translateY(0%)", opacity: 1 }
});

const bodyAnimation = style({
  width: "100%",
  display: "flex",
  boxSizing: "border-box",
  fontFamily: varsThemeBase.fontFamily.sans,
  animation: `${open} .3s`
});

const openReversal = keyframes({
  from: { transform: "translateY(10%)", opacity: 0 },
  to: { transform: "translateY(0%)", opacity: 1 }
});

const bodyReversalAnimation = style({
  width: "100%",
  display: "flex",
  boxSizing: "border-box",
  fontFamily: varsThemeBase.fontFamily.sans,
  animation: `${openReversal} .3s`
});

export const styles = {
  body,
  bodyAnimation,
  bodyReversalAnimation
};
