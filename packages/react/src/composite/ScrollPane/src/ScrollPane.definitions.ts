import { ScrollPanePosition } from "./scrollPane.types";

/**
 * Helper function to get the suffix for the position based on the position and direction
 */
const getPositionSuffix = (
  position: "start" | "end",
  direction: "horizontal" | "vertical"
): string => {
  const isStart = position === "start";
  const isHorizontal = direction === "horizontal";

  if (isStart) {
    return isHorizontal ? "left" : "top";
  }
  
  return isHorizontal ? "right" : "bottom";
};

/**
 * Gets the position string for scroll pane elements (arrows, gradients, etc.)
 * based on the position and direction
 */
export const getPosition = (
  position: "start" | "end",
  direction: "horizontal" | "vertical"
): ScrollPanePosition => {
  const suffix = getPositionSuffix(position, direction);
  return `${direction}-${suffix}` as ScrollPanePosition;
};
