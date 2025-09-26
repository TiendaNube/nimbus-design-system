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
import { gradients, createBorderGradient } from "../../../gradients";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const base = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderStyle: "solid",
  borderRadius: varsThemeBase.shape.border.radius.full,
  borderWidth: varsThemeBase.shape.border.width[1],
  transition: `all ${varsThemeBase.motion.speed.fast} ease`,
  ":active": {
    backgroundColor: varsThemeBase.colors.neutral.interactive,
    borderColor: varsThemeBase.colors.neutral.interactivePressed,
  },
  ":focus": {
    boxShadow: varsThemeBase.utils.focus,
  },
  ":focus-visible": {
    boxShadow: varsThemeBase.utils.focus,
  },
  ":disabled": {
    backgroundColor: `${varsThemeBase.colors.neutral.surfaceDisabled}`,
    borderColor: `${varsThemeBase.colors.neutral.surfaceHighlight}`,
    pointerEvents: "none",
  },
});

export const styles = {
  base,
  appearance: styleVariants({
    "ai-generative": [
      base,
      {
        background: gradients.aiGenerativeInteractive,
        border: "none",
        outline: "none",
        transition: `box-shadow ${varsThemeBase.motion.speed.fast} ease`,
        ":hover": {
          background: gradients.aiGenerativeHover,
        },
        ":active": {
          background: varsThemeBase.colors.aiGenerative.textLow,
          boxShadow: "none",
        },
        ":focus": {
          boxShadow: "none",
        },
        ":focus-visible": {
          boxShadow: varsThemeBase.utils.focus,
          outline: "none",
        },
        ":disabled": {
          background: createBorderGradient(
            gradients.aiGenerativeDisabled,
            varsThemeBase.colors.neutral.surfaceDisabled
          ),
          border: `${varsThemeBase.shape.border.width[1]} solid transparent`,
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
  "ai-generativeSurface": backgroundColorProperties["aiGenerative-surface"],
};

const iconButtonBorderColorProperties = {
  ...iconButtonBackgroundColorProperties,
  "neutral-interactive": borderColorProperties["neutral-interactive"],
  "neutral-interactiveHover": borderColorProperties["neutral-interactiveHover"],
  "neutral-interactivePressed":
    borderColorProperties["neutral-interactivePressed"],
  "primary-interactive": borderColorProperties["primary-interactive"],
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
    active: { selector: "&:active" },
    hover: { selector: "&:hover" },
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
