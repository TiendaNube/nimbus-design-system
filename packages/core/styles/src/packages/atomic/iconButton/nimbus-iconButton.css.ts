import { style, styleVariants } from "@vanilla-extract/css";
import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import {
  backgroundColorProperties,
  borderColorProperties,
} from "../../../properties";
import { varsThemeBase, mediaQueries } from "../../../themes";
import {
  gradients,
  aiGenerativeHoverOverlay,
  aiGenerativePressedOverlay,
  aiGenerativeDisabled,
} from "../../../gradients";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const base = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderStyle: "solid",
  borderRadius: varsThemeBase.shape.border.radius["1-5"],
  borderWidth: varsThemeBase.shape.border.width[1],
  transition: `background-color ${varsThemeBase.motion.speed.fast} ease, border-color ${varsThemeBase.motion.speed.fast} ease, box-shadow ${varsThemeBase.motion.speed.fast} ease`,
  ":focus-visible": {
    boxShadow: `0 0 0 2px ${varsThemeBase.colors.neutral.interactive}`,
    outline: "none",
  },
  ":disabled": {
    backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
    borderColor: varsThemeBase.colors.neutral.interactive,
    pointerEvents: "none",
  },
});

export const styles = {
  base,
  appearance: styleVariants({
    transparent: [
      base,
      {
        background: "transparent",
        borderColor: "transparent",
        selectors: {
          "&:not(:disabled):hover": {
            backgroundColor: varsThemeBase.colors.neutral.surface,
            borderColor: "transparent",
          },
          "&:not(:disabled):active": {
            backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
            borderColor: "transparent",
          },
          "&:not(:disabled):focus-visible": {
            borderColor: varsThemeBase.colors.neutral.interactive,
            boxShadow: `0 0 0 2px ${varsThemeBase.colors.neutral.interactive}`,
          },
        },
        ":disabled": {
          background: varsThemeBase.colors.neutral.surfaceDisabled,
          borderColor: varsThemeBase.colors.neutral.surfaceDisabled,
        },
      },
    ],
    "ai-generative": [
      base,
      {
        background: gradients.aiGenerativeInteractive,
        border: "none",
        outline: "none",
        transition: `box-shadow ${varsThemeBase.motion.speed.fast} ease`,
        selectors: {
          "&:not(:disabled):hover": {
            background: aiGenerativeHoverOverlay,
          },
          "&:not(:disabled):active": {
            background: aiGenerativePressedOverlay,
            boxShadow: "none",
          },
          "&:not(:disabled):focus-visible": {
            boxShadow: `0 0 0 2px ${varsThemeBase.colors.neutral.interactive}`,
            outline: "none",
          },
        },
        ":disabled": {
          background: aiGenerativeDisabled,
          border: "none",
        },
      },
    ],
    "ai-secondary": [
      base,
      {
        background: varsThemeBase.colors.aiGenerative.surfaceDisabled,
        border: "none",
        outline: "none",
        selectors: {
          "&:not(:disabled):hover": {
            background: varsThemeBase.colors.aiGenerative.surface,
          },
          "&:not(:disabled):active": {
            background: varsThemeBase.colors.aiGenerative.surfaceHighlight,
          },
          "&:not(:disabled):focus-visible": {
            background: varsThemeBase.colors.aiGenerative.surfaceDisabled,
            boxShadow: `0 0 0 2px ${varsThemeBase.colors.neutral.interactive}`,
            outline: "none",
          },
        },
        ":disabled": {
          background: varsThemeBase.colors.aiGenerative.surfaceDisabled,
          border: "none",
        },
      },
    ],
  }),
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const iconButtonBackgroundColorProperties = {
  transparent: "transparent",
  "neutral-surface": backgroundColorProperties["neutral-surface"],
  "neutral-interactive": backgroundColorProperties["neutral-interactive"],
  "neutral-surfaceHighlight":
    backgroundColorProperties["neutral-surfaceHighlight"],
  "ai-generativeSurface": backgroundColorProperties["ai-generativeSurface"],
};

const iconButtonBorderColorProperties = {
  ...iconButtonBackgroundColorProperties,
  "neutral-interactive": borderColorProperties["neutral-interactive"],
  "neutral-interactiveHover": borderColorProperties["neutral-interactiveHover"],
  "neutral-interactivePressed":
    borderColorProperties["neutral-interactivePressed"],
};

const properties = {
  backgroundColor: iconButtonBackgroundColorProperties,
  borderColor: iconButtonBorderColorProperties,
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
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
    focus: { selector: "&:focus" },
  },
  defaultCondition: "xs",
  staticProperties: {},
  dynamicProperties: {
    width: true,
    height: true,
    ...properties,
  },
  shorthands: {
    size: ["width", "height"],
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

export const iconButtonSprinkle = {
  sprinkle,
  properties,
};
