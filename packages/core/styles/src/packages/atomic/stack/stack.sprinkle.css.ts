import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import { mediaQueries } from "../../../themes";
import {
  alignItemsProperties,
  displayProperties,
  flexDirectionProperties,
  flexWrapProperties,
  gapProperties,
  gridGapProperties,
  justifyContentProperties,
} from "../../../properties";

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
    flex: true,
    gridTemplateAreas: true,
    gridTemplateColumns: true,
    gridTemplateRows: true,
    gridArea: true,
    gap: gapProperties,
    gridGap: gridGapProperties,
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

const properties = {
  gap: gapProperties,
  gridGap: gridGapProperties,
  display: displayProperties,
  flexDirection: flexDirectionProperties,
  flexWrap: flexWrapProperties,
  justifyContent: justifyContentProperties,
  alignItems: alignItemsProperties,
};

const sprinkle = createRainbowSprinkles(defineProperties);

export const stackSprinkle = {
  sprinkle,
  properties,
};
