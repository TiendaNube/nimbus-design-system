import type { Conditions } from "../../../types";

export interface TooltipSprinkle {
  /**
   * The maxWidth property specifies the maximum width of a popover's content area.
   */
  maxWidth?: string | Conditions<string>;
}
