import {
  spaceProperties,
  displayProperties,
  justifyContentProperties,
  flexDirectionProperties,
  alignItemsProperties,
  flexWrapProperties,
} from "./stack.sprinkle.css";

type SpaceProperties = keyof typeof spaceProperties;
type DisplayProperties = typeof displayProperties[number];
type JustifyContentProperties = typeof justifyContentProperties[number];
type FlexDirectionProperties = typeof flexDirectionProperties[number];
type AlignItemsProperties = typeof alignItemsProperties[number];
type FlexWrapProperties = typeof flexWrapProperties[number];

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
  display?: DisplayProperties | Conditions<DisplayProperties>;
  flexWrap?: FlexWrapProperties | Conditions<FlexWrapProperties>;
  justifyContent?:
    | JustifyContentProperties
    | Conditions<JustifyContentProperties>;
  flexDirection?: FlexDirectionProperties | Conditions<FlexDirectionProperties>;
  alignItems?: AlignItemsProperties | Conditions<AlignItemsProperties>;
  gap?: SpaceProperties | Conditions<SpaceProperties>;
  gridGap?: SpaceProperties | Conditions<SpaceProperties>;
}
