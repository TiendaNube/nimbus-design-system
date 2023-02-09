import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import {
  backgroundColorProperties,
  borderColorProperties,
  borderStyleProperties,
  boxSizingProperties,
  cursorProperties,
  positionProperties,
  overflowProperties,
} from "../../../properties";
import { varsThemeBase, mediaQueries } from "../../../themes";

const boxBackgroundColorProperties = {
  "primary.interactive": backgroundColorProperties["primary.interactive"],
  "primary.surface": backgroundColorProperties["primary.surface"],
  "primary.surfaceHighlight":
    backgroundColorProperties["primary.surfaceHighlight"],
  "primary.textLow": backgroundColorProperties["primary.textLow"],

  "success.interactive": backgroundColorProperties["success.interactive"],
  "success.surface": backgroundColorProperties["success.surface"],
  "success.surfaceHighlight":
    backgroundColorProperties["success.surfaceHighlight"],
  "success.textLow": backgroundColorProperties["success.textLow"],

  "warning.interactive": backgroundColorProperties["warning.interactive"],
  "warning.surface": backgroundColorProperties["warning.surface"],
  "warning.surfaceHighlight":
    backgroundColorProperties["warning.surfaceHighlight"],
  "warning.textLow": backgroundColorProperties["warning.textLow"],

  "danger.interactive": backgroundColorProperties["danger.interactive"],
  "danger.surface": backgroundColorProperties["danger.surface"],
  "danger.surfaceHighlight":
    backgroundColorProperties["danger.surfaceHighlight"],
  "danger.textLow": backgroundColorProperties["danger.textLow"],

  "neutral.background": backgroundColorProperties["neutral.background"],
  "neutral.interactive": backgroundColorProperties["neutral.interactive"],
  "neutral.surface": backgroundColorProperties["neutral.surface"],
  "neutral.surfaceHighlight":
    backgroundColorProperties["neutral.surfaceHighlight"],
  "neutral.textLow": backgroundColorProperties["neutral.textLow"],
};

const boxBorderColorProperties = {
  "primary.interactive": borderColorProperties["primary.interactive"],
  "primary.surface": borderColorProperties["primary.surface"],
  "primary.surfaceHighlight": borderColorProperties["primary.surfaceHighlight"],

  "success.interactive": borderColorProperties["success.interactive"],
  "success.surface": borderColorProperties["success.surface"],
  "success.surfaceHighlight": borderColorProperties["success.surfaceHighlight"],

  "warning.interactive": borderColorProperties["warning.interactive"],
  "warning.surface": borderColorProperties["warning.surface"],
  "warning.surfaceHighlight": borderColorProperties["warning.surfaceHighlight"],

  "danger.interactive": borderColorProperties["danger.interactive"],
  "danger.surface": borderColorProperties["danger.surface"],
  "danger.surfaceHighlight": borderColorProperties["danger.surfaceHighlight"],

  "neutral.interactive": borderColorProperties["neutral.interactive"],
  "neutral.surface": borderColorProperties["neutral.surface"],
  "neutral.surfaceHighlight": borderColorProperties["neutral.surfaceHighlight"],
};

const boxSpaceProperties = {
  none: "0",
  "0,5": varsThemeBase.spacing["0,5"],
  "1": varsThemeBase.spacing[1],
  "2": varsThemeBase.spacing[2],
  "2,5": varsThemeBase.spacing[2],
  "4": varsThemeBase.spacing[4],
  "6": varsThemeBase.spacing[6],
  "8": varsThemeBase.spacing[8],
  "10": varsThemeBase.spacing[10],
  "12": varsThemeBase.spacing[12],
  "14": varsThemeBase.spacing[14],
  "16": varsThemeBase.spacing[16],
  "18": varsThemeBase.spacing[18],
  "20": varsThemeBase.spacing[20],
};

const marginProperties = {
  auto: "auto",
  ...boxSpaceProperties,
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
  },
  defaultCondition: "xs",
  dynamicProperties: {
    width: true,
    height: true,
    maxWidth: true,
    maxHeight: true,
    borderRadius: true,
    borderWidth: true,
    backgroundColor: boxBackgroundColorProperties,
    borderColor: boxBorderColorProperties,
    padding: boxSpaceProperties,
    paddingTop: boxSpaceProperties,
    paddingBottom: boxSpaceProperties,
    paddingLeft: boxSpaceProperties,
    paddingRight: boxSpaceProperties,
    margin: marginProperties,
    marginTop: marginProperties,
    marginBottom: marginProperties,
    marginLeft: marginProperties,
    marginRight: marginProperties,
    bottom: true,
    left: true,
    right: true,
    top: true,
  },
  staticProperties: {
    borderStyle: borderStyleProperties,
    boxSizing: boxSizingProperties,
    cursor: cursorProperties,
    position: positionProperties,
    overflow: overflowProperties,
    overflowX: overflowProperties,
    overflowY: overflowProperties,
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    p: ["padding"],
    pl: ["paddingLeft"],
    pr: ["paddingRight"],
    pt: ["paddingTop"],
    pb: ["paddingBottom"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    m: ["margin"],
    mr: ["marginRight"],
    ml: ["marginLeft"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
  },
});

const properties = {
  backgroundColor: boxBackgroundColorProperties,
  borderColor: boxBorderColorProperties,
  borderStyle: borderStyleProperties,
  boxSizing: boxSizingProperties,
  cursor: cursorProperties,
  space: boxSpaceProperties,
  margin: marginProperties,
  position: positionProperties,
  overflow: overflowProperties,
  overflowX: overflowProperties,
  overflowY: overflowProperties,
};

const sprinkle = createRainbowSprinkles(defineProperties);

export const boxSprinkle = {
  sprinkle,
  properties,
};
