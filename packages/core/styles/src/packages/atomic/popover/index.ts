import { styles, popoverSprinkle } from "./nimbus-popover.css";

export const popover = {
  classnames: { ...styles },
  ...popoverSprinkle,
};

export type { PopoverSprinkle } from "./nimbus-popover.types";
