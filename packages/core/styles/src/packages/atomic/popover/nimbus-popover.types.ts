import { Conditions } from "../../../types";
import { popoverSprinkle } from "./nimbus-popover.css";

const { properties: propertiesPopover } = popoverSprinkle;

type PopoverColorProperties = keyof typeof propertiesPopover.color;
type PopoverBackgroundColorProperties =
  keyof typeof propertiesPopover.backgroundColor;
type PopoverPaddingProperties = keyof typeof propertiesPopover.padding;
type PopoverZIndexProperties = keyof typeof propertiesPopover.zIndex;

export interface PopoverSprinkle {
  /**
   * The width property specifies the width of a popover's content area.
   * @default 17.5rem
   */
  width?: string | Conditions<string>;
  /**
   * The height property specifies the height of a popover's content area.
   */
  height?: string | Conditions<string>;
  /**
   * The zIndex property specifies the stack order of the popover.
   */
  zIndex?: PopoverZIndexProperties | Conditions<PopoverZIndexProperties>;
  /**
   * The backgroundColor property sets the background color of the popover.
   * @default neutral-background
   * @examples ["neutral-interactive", { xs: "neutral-surface", md: "neutral-interactive" }]
   */
  backgroundColor?:
    | PopoverBackgroundColorProperties
    | Conditions<PopoverBackgroundColorProperties>;
  /**
   * The color property is used to set the color of the popover.
   * @default neutral-background
   */
  color?: PopoverColorProperties | Conditions<PopoverColorProperties>;
  /**
   * The padding properties are used to generate space around an popover's content area.
   * @default base
   */
  padding?: PopoverPaddingProperties | Conditions<PopoverPaddingProperties>;
}
