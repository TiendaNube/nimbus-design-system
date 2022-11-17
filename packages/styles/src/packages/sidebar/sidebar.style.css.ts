import { style, styleVariants, keyframes } from "@vanilla-extract/css";

import { varsThemeBase } from "../../themes/base.css";

const overlayAnimation = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

export const overlay = style({
  position: "fixed",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  animation: `${overlayAnimation} 0.5s ease`,
});

export const container = style({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  backgroundColor: "#FFFFFF",
  height: "100%",
  minHeight: "100%",
  maxWidth: "375px",
  width: "100%",
  zIndex: 200,
  top: 0,
  opacity: 0,
  transition: `opacity ${varsThemeBase.motion.speed.base} ease, transform ${varsThemeBase.motion.speed.base} ease`,
  boxSizing: "border-box",
});

export const positions = styleVariants({
  left: {
    left: 0,
    transform: "translateX(-100%)",
  },
  right: {
    right: 0,
    transform: "translateX(100%)",
  },
});

export const isVisible = style({
  opacity: 1,
  transform: "translateX(0)",
});

export const header = style({
  marginBottom: "1rem",
});

export const footer = style({
  width: "100%",
  display: "flex",
  gap: varsThemeBase.spacing[2],
  marginTop: "1rem",
});
