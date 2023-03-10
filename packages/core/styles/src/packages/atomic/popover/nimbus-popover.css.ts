import { style, styleVariants } from "@vanilla-extract/css";
import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { mediaQueries } from "../../../themes";
import { varsThemeBase } from "../../../themes";
import {
  backgroundColorProperties,
  paddingProperties,
} from "../../../properties";

/* -------------------------------------------------------------------------------------------------
 * Styles
 * -----------------------------------------------------------------------------------------------*/

const content = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "17.5rem",
  minHeight: "2rem",
  filter: `drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2))`,
  borderRadius: varsThemeBase.spacing[2],
  boxSizing: "border-box",
  transition: `opacity ${varsThemeBase.motion.speed.fast} ease`,
});

const base = style({
  "::after": {
    content: " ",
    position: "absolute",
    borderWidth: varsThemeBase.spacing[2],
    borderStyle: "solid",
  },
});

const content__arrow = styleVariants({
  top: [
    base,
    {
      "::after": {
        top: "100%",
        color: "currentcolor",
        borderColor: `currentColor transparent transparent transparent`,
        marginLeft: "-0.5rem",
        left: "50%",
      },
    },
  ],
  bottom: [
    base,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent transparent currentColor transparent`,
        marginLeft: "-0.5rem",
        left: "50%",
      },
    },
  ],
  left: [
    base,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent transparent transparent currentColor`,
        marginTop: "-0.5rem",
        top: "50%",
        left: "100%",
      },
    },
  ],
  right: [
    base,
    {
      "::after": {
        bottom: "100%",
        borderColor: `transparent currentColor transparent transparent`,
        marginTop: "-0.5rem",
        top: "50%",
        right: "100%",
      },
    },
  ],
});

export const content__placement = styleVariants({
  top: {},
  right: {},
  bottom: {},
  left: {},
  "top-start": {},
  "top-end": {},
  "right-start": { "::after": { marginTop: 0 } },
  "right-end": { "::after": { marginTop: "-1rem" } },
  "bottom-start": {},
  "bottom-end": {},
  "left-start": { "::after": { marginTop: 0 } },
  "left-end": { "::after": { marginTop: "-1rem" } },
});

export const styles = {
  content,
  content__arrow,
  content__placement,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkles
 * -----------------------------------------------------------------------------------------------*/

const popoverBackgroundColorProperties = {
  "primary-surfaceHighlight":
    backgroundColorProperties["primary.surfaceHighlight"],
  "primary-interactiveHover":
    backgroundColorProperties["primary.interactiveHover"],
  "success-surfaceHighlight":
    backgroundColorProperties["success.surfaceHighlight"],
  "danger-surfaceHighlight":
    backgroundColorProperties["danger.surfaceHighlight"],
  "neutral-surfaceHighlight":
    backgroundColorProperties["neutral.surfaceHighlight"],
  "warning-surfaceHighlight":
    backgroundColorProperties["warning.surfaceHighlight"],
  "neutral-background": backgroundColorProperties["neutral.background"],
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
    height: true,
    zIndex: true,
  },
  staticProperties: {
    backgroundColor: popoverBackgroundColorProperties,
    padding: paddingProperties,
    color: popoverColorProperties,
  },
});

const properties = {
  backgroundColor: popoverBackgroundColorProperties,
  color: popoverColorProperties,
  padding: paddingProperties,
};

const sprinkle = createRainbowSprinkles(defineProperties);

export const popoverSprinkle = {
  sprinkle,
  properties,
};
