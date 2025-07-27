import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { paddingProperties, zIndexProperties } from "../../../properties";
import { mediaQueries, varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const container = style({
  position: "relative",
  display: "flex",
  boxSizing: "border-box",
  overflow: "hidden",
});

const scrollArea = style({
  display: "flex",
  overflow: "auto",
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
    width: "30px",
    background: `linear-gradient(to right, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
  "horizontal-right": {
    right: 0,
    top: 0,
    bottom: 0,
    width: "30px",
    background: `linear-gradient(to left, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
  "vertical-top": {
    top: 0,
    left: 0,
    right: 0,
    height: "30px",
    background: `linear-gradient(to bottom, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
  "vertical-bottom": {
    bottom: 0,
    left: 0,
    right: 0,
    height: "30px",
    background: `linear-gradient(to top, ${varsThemeBase.colors.neutral.background}, transparent)`,
  },
});

const arrow = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  backgroundColor: varsThemeBase.colors.neutral.surface,
  border: `1px solid ${varsThemeBase.colors.neutral.textDisabled}`,
  borderRadius: varsThemeBase.shape.border.radius[2],
  cursor: "pointer",
  zIndex: varsThemeBase.zIndex[200],
  transition: `all ${varsThemeBase.motion.speed.base} ease`,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  ":hover": {
    backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
    borderColor: varsThemeBase.colors.neutral.textLow,
  },
  ":active": {
    backgroundColor: varsThemeBase.colors.neutral.interactivePressed,
  },
  ":focus": {
    outline: "none",
    boxShadow: varsThemeBase.utils.focus,
  },
});

const arrowVariants = styleVariants({
  "horizontal-left": {
    left: "8px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  "horizontal-right": {
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
  },
  "vertical-top": {
    top: "8px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  "vertical-bottom": {
    bottom: "8px",
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

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const defineProperties = defineRainbowProperties({
  conditions: {
    xs: {
      "@media": mediaQueries.xs(),
    },
    md: {
      "@media": mediaQueries.md(),
    },
    lg: {
      "@media": mediaQueries.lg(),
    },
    xl: {
      "@media": mediaQueries.xl(),
    },
    rest: {},
    active: { selector: "&:active" },
    hover: { selector: "&:hover" },
    focus: { selector: "&:focus" },
  },
  defaultCondition: "rest",
  staticProperties: {},
  dynamicProperties: {
    padding: paddingProperties,
    zIndex: zIndexProperties,
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

export const scrollPaneStyles = {
  classnames: {
    container,
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
  sprinkle,
}; 
