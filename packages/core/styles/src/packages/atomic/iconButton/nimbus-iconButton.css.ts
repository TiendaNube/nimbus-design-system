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
  ":focus-visible": {
    boxShadow: varsThemeBase.utils.focus,
  },
  ":disabled": {
    backgroundColor: `${varsThemeBase.colors.neutral.surfaceDisabled}`,
    borderColor: `${varsThemeBase.colors.neutral.surfaceHighlight}`,
    pointerEvents: "none",
  },
});

const appearance = styleVariants({
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
        // Flat aiGenerative.textLow in base, dark, next and next-dark; the
        // darkened radial gradient in Norte UI, like the Button.
        background: gradients.aiGenerativePressed,
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
});

/* -------------------------------------------------------------------------------------------------
 * Norte UI (next-norteui / next-norteui-dark)
 *
 * The IconButton applies these classes only when the active theme is Norte UI,
 * so base, dark, next and next-dark never receive them. They are declared after
 * `base` and `appearance` so they win over those rules at the same specificity.
 * Colors reference theme variables, so the dark theme resolves its own palette.
 * -----------------------------------------------------------------------------------------------*/

/** Shape and focus ring shared by every Norte UI IconButton. */
const norteui = style({
  borderRadius: varsThemeBase.shape.border.radius.base,
  ":focus-visible": {
    boxShadow: `0 0 0 ${varsThemeBase.shape.border.width[2]} ${varsThemeBase.colors.neutral.interactive}`,
  },
});

/**
 * No border for a Norte UI IconButton with its own backgroundColor and no
 * borderColor. With an explicit borderColor this class is not applied, so
 * base's 1px border shows in that color.
 */
const norteuiNoBorder = style({
  borderWidth: 0,
});

/** Default fill, used when no backgroundColor is passed. */
const norteuiNeutral = style({
  backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  borderWidth: 0,
  ":hover": {
    backgroundColor: varsThemeBase.colors.neutral.interactive,
  },
  ":active": {
    backgroundColor: varsThemeBase.colors.neutral.interactiveHover,
  },
  ":disabled": {
    backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  },
});

/** Used when backgroundColor="transparent" is passed. */
const norteuiTransparent = style({
  backgroundColor: "transparent",
  borderWidth: 0,
  ":hover": {
    backgroundColor: varsThemeBase.colors.neutral.surfaceHighlight,
  },
  ":active": {
    backgroundColor: varsThemeBase.colors.neutral.interactive,
  },
  ":focus-visible": {
    boxShadow: `inset 0 0 0 ${varsThemeBase.shape.border.width[2]} ${varsThemeBase.colors.neutral.textLow}`,
  },
  ":disabled": {
    backgroundColor: varsThemeBase.colors.neutral.surfaceDisabled,
  },
});

/**
 * Used when backgroundColor="ai-generativeSurface" is passed: the Figma
 * "AI generative secondary" IconButton (AI surface fill with the AI gradient
 * as a 1px border), matching the Norte UI ai-secondary Button.
 */
const norteuiAiSurface = style({
  background: createBorderGradient(
    gradients.aiGenerativeInteractive,
    varsThemeBase.colors.aiGenerative.surface
  ),
  border: `${varsThemeBase.shape.border.width[1]} solid transparent`,
  ":hover": {
    background: createBorderGradient(
      gradients.aiGenerativeHover,
      varsThemeBase.colors.aiGenerative.surfaceDisabled
    ),
  },
  ":active": {
    background: createBorderGradient(
      gradients.aiGenerativePressed,
      varsThemeBase.colors.aiGenerative.surfaceHighlight
    ),
    // base sets an opaque :active border; keep it transparent so the AI
    // gradient border stays visible.
    borderColor: "transparent",
  },
  ":focus-visible": {
    boxShadow: `0 0 0 ${varsThemeBase.shape.border.width[2]} ${varsThemeBase.colors.aiGenerative.surfaceHighlight}`,
  },
  ":disabled": {
    background: createBorderGradient(
      gradients.aiGenerativeDisabled,
      varsThemeBase.colors.aiGenerative.surface
    ),
    borderColor: "transparent",
  },
});

/** Focus ring for the ai-generative appearance. */
const norteuiAiGenerative = style({
  ":focus-visible": {
    boxShadow: `0 0 0 ${varsThemeBase.shape.border.width[2]} ${varsThemeBase.colors.aiGenerative.surfaceHighlight}`,
  },
});

export const styles = {
  base,
  appearance,
  norteui,
  norteuiNoBorder,
  norteuiNeutral,
  norteuiTransparent,
  norteuiAiSurface,
  norteuiAiGenerative,
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
