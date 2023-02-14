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

const properties = {
  backgroundColor: tableRowBackgroundColorProperties,
  padding: paddingProperties,
};

const defineProperties = defineRainbowProperties({
  conditions: {
    rest: { selector: "&" },
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
    ...properties,
  },
});

const sprinkle = createRainbowSprinkles(defineProperties);

export const tableSprinkle = {
  sprinkle,
  properties,
};
