import { style } from "@vanilla-extract/css";
import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { mediaQueries, varsThemeBase } from "../../../themes";
import {
  backgroundColorProperties,
  paddingProperties,
  zIndexProperties,
  overflowProperties,
} from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const content = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "2rem",
  filter: `drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2))`,
  boxSizing: "border-box",
  borderRadius: varsThemeBase.shape.border.radius[2],
  transition: `opacity ${varsThemeBase.motion.speed.fast} ease`,
  zIndex: varsThemeBase.zIndex[800],
});

const overlay = style({
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "transparent",
  zIndex: varsThemeBase.zIndex[600],
  cursor: "default",
});

export const styles = {
  content,
  overlay,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const popoverBackgroundColorProperties = {
  "primary-surfaceHighlight":
    backgroundColorProperties["primary-surfaceHighlight"],
  "primary-interactiveHover":
    backgroundColorProperties["primary-interactiveHover"],
  "success-surfaceHighlight":
    backgroundColorProperties["success-surfaceHighlight"],
  "danger-surfaceHighlight":
    backgroundColorProperties["danger-surfaceHighlight"],
  "neutral-surfaceHighlight":
    backgroundColorProperties["neutral-surfaceHighlight"],
  "warning-surfaceHighlight":
    backgroundColorProperties["warning-surfaceHighlight"],
  "neutral-background": backgroundColorProperties["neutral-background"],
};

const popoverColorProperties = popoverBackgroundColorProperties;

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
    width: true,
    maxWidth: true,
    height: true,
  },
  staticProperties: {
    backgroundColor: popoverBackgroundColorProperties,
    padding: paddingProperties,
    color: popoverColorProperties,
    zIndex: zIndexProperties,
    overflow: overflowProperties,
  },
});

const properties = {
  backgroundColor: popoverBackgroundColorProperties,
  color: popoverColorProperties,
  padding: paddingProperties,
  zIndex: zIndexProperties,
  overflow: overflowProperties,
};

const sprinkle = createRainbowSprinkles(defineProperties);

export const popoverSprinkle = {
  sprinkle,
  properties,
};
