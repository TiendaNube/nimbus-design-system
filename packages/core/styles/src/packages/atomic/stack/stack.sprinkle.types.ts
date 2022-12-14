import {
  stackSpaceProperties,
  stackDisplayProperties,
  stackJustifyContentProperties,
  stackFlexDirectionProperties,
  stackAlignItemsProperties,
  stackFlexWrapProperties,
} from "./stack.sprinkle.css";

type StackJustifyContentProperties =
  typeof stackJustifyContentProperties[number];
type StackSpaceProperties = keyof typeof stackSpaceProperties;
type StackDisplayProperties = typeof stackDisplayProperties[number];
type StackFlexDirectionProperties = typeof stackFlexDirectionProperties[number];
type StackAlignItemsProperties = typeof stackAlignItemsProperties[number];
type StackFlexWrapProperties = typeof stackFlexWrapProperties[number];

interface Conditions<T> {
  xs?: T;
  md?: T;
  lg?: T;
}

export interface StackSprinkle {
  width?: string | Conditions<string>;
  height?: string | Conditions<string>;
  flex?: string | Conditions<string>;
  gridTemplateColumns?: string | Conditions<string>;
  gridTemplateAreas?: string | Conditions<string>;
  gridTemplateRows?: string | Conditions<string>;
  display?: StackDisplayProperties | Conditions<StackDisplayProperties>;
  flexWrap?: StackFlexWrapProperties | Conditions<StackFlexWrapProperties>;
  justifyContent?:
    | StackJustifyContentProperties
    | Conditions<StackJustifyContentProperties>;
  flexDirection?:
    | StackFlexDirectionProperties
    | Conditions<StackFlexDirectionProperties>;
  alignItems?:
    | StackAlignItemsProperties
    | Conditions<StackAlignItemsProperties>;
  gap?: StackSpaceProperties | Conditions<StackSpaceProperties>;
  gridGap?: StackSpaceProperties | Conditions<StackSpaceProperties>;
}
