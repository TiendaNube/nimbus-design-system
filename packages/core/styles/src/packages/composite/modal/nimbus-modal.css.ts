import { style, keyframes } from "@vanilla-extract/css";
import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { paddingProperties } from "../../../properties";
import { mediaQueries, varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

export const container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "calc(100% - 2rem)",
  minHeight: "3rem",
  justifyContent: "center",
  flexWrap: "nowrap",
  height: "auto",

  backgroundColor: varsThemeBase.colors.neutral.background,
  borderRadius: varsThemeBase.shape.border.radius[2],
  boxSizing: "border-box",
  zIndex: varsThemeBase.zIndex[700],
});

const container__close = style({
  appearance: "none",
  borderStyle: "solid",
  borderColor: "transparent",
  borderWidth: varsThemeBase.shape.border.width[1],
  background: "transparent",
  cursor: "pointer",
  margin: 0,
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: varsThemeBase.spacing[4],
  borderRadius: varsThemeBase.shape.border.radius[2],
  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
  },
  ":hover": {
    backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  },
  ":active": {
    backgroundColor: varsThemeBase.colors.neutral.interactivePressed,
  },
});

const container__header = style({
  marginBottom: "1.125rem",
});

const container__body = style({
  marginBottom: "1rem",
});

const container__footer = style({
  display: "flex",
  gap: varsThemeBase.spacing[2],
  justifyContent: "flex-end",
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
  display: "flex",
  height: "100vh",
  width: "100vw",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: varsThemeBase.zIndex[600],
  animation: `${overlayAnimation} 0.5s ease`,
});

export const styles = {
  overlay,
  container,
  container__close,
  container__header,
  container__body,
  container__footer,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const properties = {
  padding: paddingProperties,
};

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
    padding: paddingProperties,
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

export const modalSprinkle = {
  sprinkle,
  properties,
};
