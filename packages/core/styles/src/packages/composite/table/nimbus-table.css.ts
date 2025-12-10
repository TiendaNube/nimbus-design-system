import { style, globalStyle } from "@vanilla-extract/css";
import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import {
  paddingProperties,
  backgroundColorProperties,
} from "../../../properties";
import { mediaQueries, varsThemeBase } from "../../../themes";

/* -------------------------------------------------------------------------------------------------
 * Style
 * -----------------------------------------------------------------------------------------------*/

const container = style({
  backgroundColor: varsThemeBase.colors.neutral.background,
  borderColor: varsThemeBase.colors.neutral.surface,
  color: varsThemeBase.colors.neutral.textHigh,
  boxShadow: varsThemeBase.shadow.level[2],
  borderCollapse: "collapse",
  borderRadius: varsThemeBase.shape.border.radius[2],
  borderSpacing: 0,
  fontFamily: varsThemeBase.fontFamily.sans,
  overflow: "hidden",
  width: "100%",
  // tableLayout: "fixed",
});

const container__head = style({
  fontWeight: varsThemeBase.fontWeight.medium,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.base,
});

const container__body = style({
  fontWeight: varsThemeBase.fontWeight.regular,
  fontSize: varsThemeBase.fontSize.body.base,
  lineHeight: varsThemeBase.lineWeight.body.base,
});

const container__row = style({
  borderColor: varsThemeBase.colors.neutral.surface,
  borderStyle: "solid",
  borderWidth: `${varsThemeBase.shape.border.width[1]} 0 ${varsThemeBase.shape.border.width[1]} 0`,
  transition: `background-color ${varsThemeBase.motion.speed.fast} ease-in-out`,
});

const container__cell = style({
  verticalAlign: "top",
  boxSizing: "content-box",
});

globalStyle(`${container} th`, {
  fontWeight: "unset",
  textAlign: "unset",
});

export const styles = {
  container,
  container__head,
  container__body,
  container__row,
  container__cell,
};

/* -------------------------------------------------------------------------------------------------
 * Sprinkle
 * -----------------------------------------------------------------------------------------------*/

const tableRowBackgroundColorProperties = {
  transparent: "transparent",
  "neutral-background": backgroundColorProperties["neutral-background"],
  "neutral-surface": backgroundColorProperties["neutral-surface"],
  "neutral-surfaceHighlight":
    backgroundColorProperties["neutral-surfaceHighlight"],
  "primary-surface": backgroundColorProperties["primary-surface"],
  "primary-surfaceHighlight":
    backgroundColorProperties["primary-surfaceHighlight"],
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
    rest: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
    focus: { selector: "&:focus" },
  },
  defaultCondition: "rest",
  staticProperties: {},
  dynamicProperties: {
    width: true,
    maxWidth: true,
    minWidth: true,
    backgroundColor: tableRowBackgroundColorProperties,
    padding: paddingProperties,
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

const properties = {
  backgroundColor: tableRowBackgroundColorProperties,
  padding: paddingProperties,
};

export const tableSprinkle = {
  sprinkle,
  properties,
};
