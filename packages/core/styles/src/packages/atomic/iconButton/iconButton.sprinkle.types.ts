import {
  iconButtonBackgroundColorProperties,
  iconButtonBorderColorProperties,
} from "./iconButton.sprinkle.css";

type IconButtonBackgroundColorProperties =
  keyof typeof iconButtonBackgroundColorProperties;
type IconButtonBorderColorProperties =
  keyof typeof iconButtonBorderColorProperties;

interface Conditions<T> {
  xs?: T;
  md?: T;
  lg?: T;
  focus?: T;
  active?: T;
  hover?: T;
}

export interface IconButtonSprinkle {
  size?: string | Conditions<string>;
  borderColor?:
    | IconButtonBorderColorProperties
    | Conditions<IconButtonBorderColorProperties>;
  backgroundColor?:
    | IconButtonBackgroundColorProperties
    | Conditions<IconButtonBackgroundColorProperties>;
}
