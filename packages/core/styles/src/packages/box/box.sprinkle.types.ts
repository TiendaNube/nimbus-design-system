import {
  backgroundColorProperties,
  borderColorProperties,
  borderStyleProperties,
  boxSizingProperties,
  cursorProperties,
  spaceProperties,
} from "./box.sprinkle.css";

type CursorProperties = typeof cursorProperties[number];
type BorderColorProperties = keyof typeof borderColorProperties;
type BackgroundColorProperties = keyof typeof backgroundColorProperties;
type BorderStyleProperties = typeof borderStyleProperties[number];
type BoxSizingProperties = typeof boxSizingProperties[number];
type SpaceProperties = keyof typeof spaceProperties;

interface Conditions<T> {
  xs?: T;
  md?: T;
  lg?: T;
}

export interface BoxSprinkle {
  width?: string | Conditions<string>;
  height?: string | Conditions<string>;
  cursor?: CursorProperties | Conditions<CursorProperties>;
  backgroundColor?:
    | BackgroundColorProperties
    | Conditions<BackgroundColorProperties>;
  borderRadius?: string | Conditions<string>;
  borderWidth?: string | Conditions<string>;
  borderColor?: BorderColorProperties | Conditions<BorderColorProperties>;
  borderStyle?: BorderStyleProperties | Conditions<BorderStyleProperties>;
  boxSizing?: BoxSizingProperties | Conditions<BoxSizingProperties>;
  padding?: SpaceProperties | Conditions<SpaceProperties>;
  paddingTop?: SpaceProperties | Conditions<SpaceProperties>;
  paddingBottom?: SpaceProperties | Conditions<SpaceProperties>;
  paddingLeft?: SpaceProperties | Conditions<SpaceProperties>;
  paddingRight?: SpaceProperties | Conditions<SpaceProperties>;
  margin?: SpaceProperties | Conditions<SpaceProperties>;
  marginTop?: SpaceProperties | Conditions<SpaceProperties>;
  marginBottom?: SpaceProperties | Conditions<SpaceProperties>;
  marginLeft?: SpaceProperties | Conditions<SpaceProperties>;
  marginRight?: SpaceProperties | Conditions<SpaceProperties>;
  paddingX?: SpaceProperties | Conditions<SpaceProperties>;
  paddingY?: SpaceProperties | Conditions<SpaceProperties>;
  p?: SpaceProperties | Conditions<SpaceProperties>;
  pl?: SpaceProperties | Conditions<SpaceProperties>;
  pr?: SpaceProperties | Conditions<SpaceProperties>;
  pt?: SpaceProperties | Conditions<SpaceProperties>;
  pb?: SpaceProperties | Conditions<SpaceProperties>;
  px?: SpaceProperties | Conditions<SpaceProperties>;
  py?: SpaceProperties | Conditions<SpaceProperties>;
  marginX?: SpaceProperties | Conditions<SpaceProperties>;
  marginY?: SpaceProperties | Conditions<SpaceProperties>;
  m?: SpaceProperties | Conditions<SpaceProperties>;
  mr?: SpaceProperties | Conditions<SpaceProperties>;
  ml?: SpaceProperties | Conditions<SpaceProperties>;
  mt?: SpaceProperties | Conditions<SpaceProperties>;
  mb?: SpaceProperties | Conditions<SpaceProperties>;
  mx?: SpaceProperties | Conditions<SpaceProperties>;
  my?: SpaceProperties | Conditions<SpaceProperties>;
}
