import {
  Conditions,
  BorderStyle,
  Cursor,
  BoxSizing,
  Position,
  Overflow,
} from "../../../types";
import { boxSprinkle } from "./box.sprinkle.css";

const { properties: propertiesBox } = boxSprinkle;

type BoxBorderColorProperties = keyof typeof propertiesBox.borderColor;
type BoxBackgroundColorProperties = keyof typeof propertiesBox.backgroundColor;
type BoxSpaceProperties = keyof typeof propertiesBox.space;
type BoxMarginProperties = keyof typeof propertiesBox.margin;

export interface BoxSprinkle {
  width?: string | Conditions<string>;
  height?: string | Conditions<string>;
  maxWidth?: string | Conditions<string>;
  maxHeight?: string | Conditions<string>;
  bottom?: string | Conditions<string>;
  left?: string | Conditions<string>;
  right?: string | Conditions<string>;
  top?: string | Conditions<string>;
  position?: Position | Conditions<Position>;
  overflow?: Overflow | Conditions<Overflow>;
  overflowX?: Overflow | Conditions<Overflow>;
  overflowY?: Overflow | Conditions<Overflow>;
  cursor?: Cursor | Conditions<Cursor>;
  backgroundColor?:
    | BoxBackgroundColorProperties
    | Conditions<BoxBackgroundColorProperties>;
  borderRadius?: string | Conditions<string>;
  borderWidth?: string | Conditions<string>;
  borderColor?: BoxBorderColorProperties | Conditions<BoxBorderColorProperties>;
  borderStyle?: BorderStyle | Conditions<BorderStyle>;
  boxSizing?: BoxSizing | Conditions<BoxSizing>;
  padding?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingTop?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingBottom?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingLeft?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingRight?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  margin?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  marginTop?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  marginBottom?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  marginLeft?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  marginRight?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  paddingX?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  paddingY?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  p?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  pl?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  pr?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  pt?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  pb?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  px?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  py?: BoxSpaceProperties | Conditions<BoxSpaceProperties>;
  marginX?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  marginY?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  m?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  mr?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  ml?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  mt?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  mb?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  mx?: BoxMarginProperties | Conditions<BoxMarginProperties>;
  my?: BoxMarginProperties | Conditions<BoxMarginProperties>;
}
