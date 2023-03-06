import { Conditions } from "../../../types";
import { popoverSprinkle } from "./popover.sprinkle.css";

const { properties: propertiesPopover } = popoverSprinkle;

type PopoverColorProperties = keyof typeof propertiesPopover.color;
type PopoverBackgroundColorProperties =
  keyof typeof propertiesPopover.backgroundColor;
type PopoverPaddingProperties = keyof typeof propertiesPopover.padding;

export interface PopoverSprinkle {
  width?: string | Conditions<string>;
  height?: string | Conditions<string>;
  zIndex?: number | Conditions<number>;
  backgroundColor?:
    | PopoverBackgroundColorProperties
    | Conditions<PopoverBackgroundColorProperties>;
  color?: PopoverColorProperties | Conditions<PopoverColorProperties>;
  padding?: PopoverPaddingProperties | Conditions<PopoverPaddingProperties>;
}
