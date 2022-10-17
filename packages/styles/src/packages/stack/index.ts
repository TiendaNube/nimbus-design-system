import {
  sprinkle,
  displayProperties,
  flexDirectionProperties,
  flexWrapProperties,
  justifyContentProperties,
  alignItemsProperties,
  spaceProperties,
} from "./stack.sprinkle.css";

export const stack = {
  sprinkle,
  properties: {
    display: displayProperties,
    flexDirection: flexDirectionProperties,
    flexWrap: flexWrapProperties,
    justifyContent: justifyContentProperties,
    alignItems: alignItemsProperties,
    gap: spaceProperties,
    gridGap: spaceProperties,
  },
};
