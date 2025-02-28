import { styles, tootipSprinkle } from "./nimbus-tooltip.css";

export const tooltip = {
  classnames: { ...styles },
  ...tootipSprinkle,
};

export type { TooltipSprinkle } from "./nimbus-tooltip.types";
