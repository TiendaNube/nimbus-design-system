import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { varsThemeBase } from "../../../themes/base.css";
import { mediaQueries } from "../../../themes/mediaQueries";

type StackDisplay = "block" | "flex" | "inline-flex" | "grid" | "inline-grid";
type StackFlexWrap = "nowrap" | "wrap" | "wrap-reverse";
type StackFlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type StackJustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type StackAlignItems =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline";

export const stackDisplayProperties: StackDisplay[] = [
  "block",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
];

export const stackFlexDirectionProperties: StackFlexDirection[] = [
  "row",
  "row-reverse",
  "column",
  "column-reverse",
];

export const stackFlexWrapProperties: StackFlexWrap[] = [
  "nowrap",
  "wrap",
  "wrap-reverse",
];

export const stackJustifyContentProperties: StackJustifyContent[] = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
];

export const stackAlignItemsProperties: StackAlignItems[] = [
  "stretch",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
];

export const stackSpaceProperties = {
  none: "0",
  "0,5": varsThemeBase.spacing["0,5"],
  "1": varsThemeBase.spacing[1],
  "1,5": varsThemeBase.sizes["1,5"],
  "2": varsThemeBase.spacing[2],
  "2,5": varsThemeBase.sizes["2,5"],
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
    flex: true,
    gridTemplateAreas: true,
    gridTemplateColumns: true,
    gridTemplateRows: true,
    gap: stackSpaceProperties,
    gridGap: stackSpaceProperties,
  },
  staticProperties: {
    display: stackDisplayProperties,
    flexDirection: stackFlexDirectionProperties,
    flexWrap: stackFlexWrapProperties,
    justifyContent: stackJustifyContentProperties,
    alignItems: stackAlignItemsProperties,
  },
  shorthands: {},
});

export const sprinkle = createRainbowSprinkles(properties);
