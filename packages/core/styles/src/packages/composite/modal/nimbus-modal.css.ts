import { style, keyframes } from "@vanilla-extract/css";
import {
  defineProperties as defineSprinkleProperties,
  createSprinkles,
} from "@vanilla-extract/sprinkles";
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

  gap: varsThemeBase.spacing[4],
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
  container__footer,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const modalProperties = {
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

export const modalSprinkle = {
  sprinkle: createRainbowSprinkles(defineProperties),
  properties: modalProperties,
};

const modalHeaderProperties = {
  padding: {
    base: `${varsThemeBase.spacing[4]} ${varsThemeBase.spacing[8]} 0 ${varsThemeBase.spacing[4]}`,
    small: `${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[8]} 0 ${varsThemeBase.spacing[2]}`,
    none: `0 ${varsThemeBase.spacing[8]} 0 0`,
  },
};

export const modalHeaderSprinkle = {
  sprinkle: createSprinkles(
    defineSprinkleProperties({
      properties: modalHeaderProperties,
    })
  ),
  properties: modalHeaderProperties,
};

const modalBodyProperties = {
  padding: {
    base: `0 ${varsThemeBase.spacing[4]}`,
    small: `0 ${varsThemeBase.spacing[2]}`,
    none: "0",
  },
};

export const modalBodySprinkle = {
  sprinkle: createSprinkles(
    defineSprinkleProperties({
      properties: modalBodyProperties,
    })
  ),
  properties: modalBodyProperties,
};

const modalFooterProperties = {
  padding: {
    base: `0 ${varsThemeBase.spacing[4]} ${varsThemeBase.spacing[4]} ${varsThemeBase.spacing[4]}`,
    small: `0 ${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[2]} ${varsThemeBase.spacing[2]}`,
    none: "0",
  },
};

export const modalFooterSprinkle = {
  sprinkle: createSprinkles(
    defineSprinkleProperties({
      properties: modalFooterProperties,
    })
  ),
  properties: modalFooterProperties,
};
