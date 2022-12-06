import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { properties as colors } from "../../../sprinkles/colors.css";
import { varsThemeBase } from "../../../themes/base.css";
import { mediaQueries } from "../../../themes/mediaQueries";

type BorderStyle = "solid" | "none" | "hidden" | "dashed" | "dotted";
type BoxSizing = "border-box" | "content-box";
type Cursor = "auto" | "pointer";

export const backgroundColorProperties = {
  "primary.interactive": colors["primary.interactive"],
  "primary.surface": colors["primary.surface"],
  "primary.surfaceHighlight": colors["primary.surfaceHighlight"],
  "primary.textLow": colors["primary.textLow"],

  "success.interactive": colors["success.interactive"],
  "success.surface": colors["success.surface"],
  "success.surfaceHighlight": colors["success.surfaceHighlight"],
  "success.textLow": colors["success.textLow"],

  "warning.interactive": colors["warning.interactive"],
  "warning.surface": colors["warning.surface"],
  "warning.surfaceHighlight": colors["warning.surfaceHighlight"],
  "warning.textLow": colors["warning.textLow"],

  "danger.interactive": colors["danger.interactive"],
  "danger.surface": colors["danger.surface"],
  "danger.surfaceHighlight": colors["danger.surfaceHighlight"],
  "danger.textLow": colors["danger.textLow"],

  "neutral.background": colors["neutral.background"],
  "neutral.interactive": colors["neutral.interactive"],
  "neutral.surface": colors["neutral.surface"],
  "neutral.surfaceHighlight": colors["neutral.surfaceHighlight"],
  "neutral.textLow": colors["neutral.textLow"],
};

export const borderColorProperties = {
  "primary.interactive": colors["primary.interactive"],
  "primary.surface": colors["primary.surface"],
  "primary.surfaceHighlight": colors["primary.surfaceHighlight"],

  "success.interactive": colors["success.interactive"],
  "success.surface": colors["success.surface"],
  "success.surfaceHighlight": colors["success.surfaceHighlight"],

  "warning.interactive": colors["warning.interactive"],
  "warning.surface": colors["warning.surface"],
  "warning.surfaceHighlight": colors["warning.surfaceHighlight"],

  "danger.interactive": colors["danger.interactive"],
  "danger.surface": colors["danger.surface"],
  "danger.surfaceHighlight": colors["danger.surfaceHighlight"],

  "neutral.interactive": colors["neutral.interactive"],
  "neutral.surface": colors["neutral.surface"],
  "neutral.surfaceHighlight": colors["neutral.surfaceHighlight"],
};

export const borderStyleProperties: BorderStyle[] = [
  "solid",
  "none",
  "hidden",
  "dashed",
  "dotted",
];

export const boxSizingProperties: BoxSizing[] = ["border-box", "content-box"];

export const cursorProperties: Cursor[] = ["auto", "pointer"];

export const spaceProperties = {
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

const properties = defineProperties({
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
    borderRadius: true,
    borderWidth: true,
    backgroundColor: backgroundColorProperties,
    borderColor: borderColorProperties,
    padding: spaceProperties,
    paddingTop: spaceProperties,
    paddingBottom: spaceProperties,
    paddingLeft: spaceProperties,
    paddingRight: spaceProperties,
    margin: spaceProperties,
    marginTop: spaceProperties,
    marginBottom: spaceProperties,
    marginLeft: spaceProperties,
    marginRight: spaceProperties,
  },
  staticProperties: {
    borderStyle: borderStyleProperties,
    boxSizing: boxSizingProperties,
    cursor: cursorProperties,
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

export const sprinkle = createRainbowSprinkles(properties);
