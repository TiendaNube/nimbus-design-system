import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { paddingProperties } from "../../../properties";
import { mediaQueries } from "../../../themes";
import { varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Styles
 * -----------------------------------------------------------------------------------------------*/

const container = style({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  backgroundColor: varsThemeBase.colors.neutral.background,
  height: "100%",
  minHeight: "100%",
  width: "100%",
  zIndex: 200,
  top: 0,
  opacity: 0,
  overflowY: "auto",
  transition: `opacity ${varsThemeBase.motion.speed.base} ease, transform ${varsThemeBase.motion.speed.base} ease`,
  boxSizing: "border-box",
});

const position = styleVariants({
  left: {
    left: 0,
    transform: "translateX(-100%)",
  },
  right: {
    right: 0,
    transform: "translateX(100%)",
  },
});

const overlayAnimation = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

const overlay = style({
  position: "fixed",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  border: "none",
  animation: `${overlayAnimation} 0.5s ease`,
});

const isVisible = style({
  opacity: 1,
  transform: "translateX(0)",
});

const container__header = style({
  marginBottom: "1rem",
  boxSizing: "border-box",
});

const container__body = style({
  height: "100%",
  boxSizing: "border-box",
});

const container__footer = style({
  width: "100%",
  display: "flex",
  gap: varsThemeBase.spacing[2],
  marginTop: "1rem",
  boxSizing: "border-box",
  justifyContent: "flex-end",
});

export const styles = {
  overlay,
  container,
  container__header,
  container__body,
  container__footer,
  position,
  isVisible,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkles
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
  },
  defaultCondition: "xs",
  dynamicProperties: {
    maxWidth: true,
    zIndex: true,
  },
  staticProperties: {
    padding: paddingProperties,
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

export const sidebarSprinkle = {
  sprinkle,
  properties: {
    padding: paddingProperties,
  },
};
