import {
  boxBackgroundColorProperties,
  boxBorderColorProperties,
  boxBorderStyleProperties,
  boxBoxSizingProperties,
  boxCursorProperties,
  boxSpaceProperties,
} from "./box.sprinkle.css";

type BoxCursorProperties = typeof boxCursorProperties[number];
type BoxBorderColorProperties = keyof typeof boxBorderColorProperties;
type BoxBackgroundColorProperties = keyof typeof boxBackgroundColorProperties;
type BoxBorderStyleProperties = typeof boxBorderStyleProperties[number];
type BoxBoxSizingProperties = typeof boxBoxSizingProperties[number];
type BoxSpaceProperties = keyof typeof boxSpaceProperties;

interface Conditions<T> {
  xs?: T;
  md?: T;
  lg?: T;
}

export interface BoxSprinkle {
  width?: string | Conditions<string>;
  height?: string | Conditions<string>;
  cursor?: BoxCursorProperties | Conditions<BoxCursorProperties>;
  backgroundColor?:
    | BoxBackgroundColorProperties
    | Conditions<BoxBackgroundColorProperties>;
  borderRadius?: string | Conditions<string>;
  borderWidth?: string | Conditions<string>;
  borderColor?: BoxBorderColorProperties | Conditions<BoxBorderColorProperties>;
  borderStyle?: BoxBorderStyleProperties | Conditions<BoxBorderStyleProperties>;
  boxSizing?: BoxBoxSizingProperties | Conditions<BoxBoxSizingProperties>;
  padding?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingTop?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingBottom?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingLeft?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingRight?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  margin?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  marginTop?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  marginBottom?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  marginLeft?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  marginRight?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingX?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingY?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  p?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  pl?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  pr?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  pt?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  pb?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  px?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  py?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  marginX?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  marginY?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  m?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  mr?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  ml?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  mt?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  mb?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  mx?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  my?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
}
