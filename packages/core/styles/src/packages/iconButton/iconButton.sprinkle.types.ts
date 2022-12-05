import {
  backgroundColorProperties,
  borderColorProperties,
} from "./iconButton.sprinkle.css";

type BackgroundColorProperties = keyof typeof backgroundColorProperties;
type BorderColorProperties = keyof typeof borderColorProperties;

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
  borderColor?: BorderColorProperties | Conditions<BorderColorProperties>;
  backgroundColor?:
    | BackgroundColorProperties
    | Conditions<BackgroundColorProperties>;
}
