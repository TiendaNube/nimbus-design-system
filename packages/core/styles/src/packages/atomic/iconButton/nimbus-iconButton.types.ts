import { type Conditions } from "../../../types";
import { iconButtonSprinkle } from "./nimbus-iconButton.css";

const { properties: propertiesIconButton } = iconButtonSprinkle;

type IconButtonBackgroundColorProperties =
  keyof typeof propertiesIconButton.backgroundColor;
type IconButtonBorderColorProperties =
  keyof typeof propertiesIconButton.borderColor;

interface IconButtonConditions<T> extends Conditions<T> {
  focus?: T;
  active?: T;
  hover?: T;
}

export interface IconButtonSprinkle {
  /**
   * The size of the component.
   * @default 2.75rem
   */
  size?: string | IconButtonConditions<string>;
  /**
   * The borderColor property sets the color of the icon button's four borders.
   * @default { xs: "neutral-interactive", active: "neutral-interactivePressed", hover: "neutral-interactiveHover", focus: "primary-interactive" }
   */
  borderColor?:
    | IconButtonBorderColorProperties
    | IconButtonConditions<IconButtonBorderColorProperties>;
  /**
   * The backgroundColor property sets the background color of the icon button.
   * @default {  xs: "neutral-surface", active: "neutral-interactive", hover: "neutral-surfaceHighlight" }
   */
  backgroundColor?:
    | IconButtonBackgroundColorProperties
    | IconButtonConditions<IconButtonBackgroundColorProperties>;
}
