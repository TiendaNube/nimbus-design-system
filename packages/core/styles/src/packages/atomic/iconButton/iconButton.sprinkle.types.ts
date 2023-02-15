import { Conditions } from "../../../types";
import { iconButtonSprinkle } from "./iconButton.sprinkle.css";

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
  size?: string | IconButtonConditions<string>;
  borderColor?:
    | IconButtonBorderColorProperties
    | IconButtonConditions<IconButtonBorderColorProperties>;
  backgroundColor?:
    | IconButtonBackgroundColorProperties
    | IconButtonConditions<IconButtonBackgroundColorProperties>;
}
