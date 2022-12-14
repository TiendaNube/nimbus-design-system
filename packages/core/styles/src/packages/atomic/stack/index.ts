import {
  sprinkle,
  stackDisplayProperties,
  stackFlexDirectionProperties,
  stackFlexWrapProperties,
  stackJustifyContentProperties,
  stackAlignItemsProperties,
  stackSpaceProperties,
} from "./stack.sprinkle.css";

export const stack = {
  sprinkle,
  properties: {
    display: stackDisplayProperties,
    flexDirection: stackFlexDirectionProperties,
    flexWrap: stackFlexWrapProperties,
    justifyContent: stackJustifyContentProperties,
    alignItems: stackAlignItemsProperties,
    gap: stackSpaceProperties,
    gridGap: stackSpaceProperties,
  },
};

export type { StackSprinkle } from "./stack.sprinkle.types";
