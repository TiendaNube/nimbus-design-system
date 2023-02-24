import {
  createRainbowSprinkles,
  defineProperties as defineRainbowProperties,
} from "rainbow-sprinkles";
import {
  paddingProperties,
  backgroundColorProperties,
} from "../../../properties";

const tableRowBackgroundColorProperties = {
  transparent: "transparent",
  "neutral.background": backgroundColorProperties["neutral.background"],
  "neutral.surface": backgroundColorProperties["neutral.surface"],
  "neutral.surfaceHighlight":
    backgroundColorProperties["neutral.surfaceHighlight"],
  "primary.surface": backgroundColorProperties["primary.surface"],
  "primary.surfaceHighlight":
    backgroundColorProperties["primary.surfaceHighlight"],
};

const defineProperties = defineRainbowProperties({
  conditions: {
    rest: {},
    active: { selector: "&:active" },
    hover: { selector: "&:hover" },
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
