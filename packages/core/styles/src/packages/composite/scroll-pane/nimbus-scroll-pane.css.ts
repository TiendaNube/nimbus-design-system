import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const scrollArea = style({
  display: "flex",
  overflow: "hidden",
  scrollBehavior: "smooth",
  boxSizing: "border-box",
  flex: 1,
});

const scrollAreaHidden = style({
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

const direction = styleVariants({
  horizontal: {
    flexDirection: "row",
    overflowX: "auto",
    overflowY: "hidden",
  },
  vertical: {
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "auto",
  },
});

const gradient = style({
  position: "absolute",
  pointerEvents: "none",
  zIndex: varsThemeBase.zIndex[100],
  transition: `opacity ${varsThemeBase.motion.speed.base} ease`,
});

const gradientVariants = styleVariants({
  "horizontal-left": {
    left: 0,
    top: 0,
    bottom: 0,
    width: varsThemeBase.spacing[8],
    background: `linear-gradient(to right, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
  "horizontal-right": {
    right: 0,
    top: 0,
    bottom: 0,
    width: varsThemeBase.spacing[8],
    background: `linear-gradient(to left, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
  "vertical-top": {
    top: 0,
    left: 0,
    right: 0,
    height: varsThemeBase.spacing[8],
    background: `linear-gradient(to bottom, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
  "vertical-bottom": {
    bottom: 0,
    left: 0,
    right: 0,
    height: varsThemeBase.spacing[8],
    background: `linear-gradient(to top, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
});

const arrow = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: varsThemeBase.zIndex[200],
});

const arrowVariants = styleVariants({
  "horizontal-left": {
    left: varsThemeBase.spacing[2],
    top: "50%",
    transform: "translateY(-50%)",
  },
  "horizontal-right": {
    right: varsThemeBase.spacing[2],
    top: "50%",
    transform: "translateY(-50%)",
  },
  "vertical-top": {
    top: varsThemeBase.spacing[2],
    left: "50%",
    transform: "translateX(-50%)",
  },
  "vertical-bottom": {
    bottom: varsThemeBase.spacing[2],
    left: "50%",
    transform: "translateX(-50%)",
  },
});

const fadeIn = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

const fadeOut = keyframes({
  "0%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0,
  },
});

const gradientVisible = style({
  opacity: 1,
  animation: `${fadeIn} ${varsThemeBase.motion.speed.fast} ease`,
});

const gradientHidden = style({
  opacity: 0,
  animation: `${fadeOut} ${varsThemeBase.motion.speed.fast} ease`,
});

export const scrollPaneStyles = {
  classnames: {
    scrollArea,
    scrollAreaHidden,
    direction,
    gradient,
    gradientVariants,
    gradientVisible,
    gradientHidden,
    arrow,
    arrowVariants,
  },
};
