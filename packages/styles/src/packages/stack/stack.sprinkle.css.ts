import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { varsThemeBase } from "../../themes/base.css";
import { mediaQueries } from "../../themes/mediaQueries";

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const displayProperties = [
  "block",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
];
export const flexDirectionProperties: FlexDirection[] = [
  "row",
  "row-reverse",
  "column",
  "column-reverse",
];

export const flexWrapProperties: FlexWrap[] = [
  "nowrap",
  "wrap",
  "wrap-reverse",
];

export const justifyContentProperties = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
];

export const alignItemsProperties = [
  "stretch",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
];

export const spaceProperties = {
  none: "0",
  "0,5": varsThemeBase.spacing["0,5"],
  "1": varsThemeBase.spacing[1],
  "2": varsThemeBase.spacing[2],
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
    gap: spaceProperties,
    gridGap: spaceProperties,
  },
  staticProperties: {
    display: displayProperties,
    flexDirection: flexDirectionProperties,
    flexWrap: flexWrapProperties,
    justifyContent: justifyContentProperties,
    alignItems: alignItemsProperties,
  },
  shorthands: {},
});

export const sprinkle = createRainbowSprinkles(properties);
