import {
  AlignItems,
  Conditions,
  Display,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  PointerEvents,
} from "../../../types";
import { stackSprinkle } from "./stack.sprinkle.css";

const { properties: propertiesStack } = stackSprinkle;

type StackGapProperties = keyof typeof propertiesStack.gap;
type StackGridGapProperties = keyof typeof propertiesStack.gridGap;

export interface StackSprinkle {
  width?: string | Conditions<string>;
  height?: string | Conditions<string>;
  flex?: string | Conditions<string>;
  flexShrink?: string | Conditions<string>;
  gridTemplateColumns?: string | Conditions<string>;
  gridTemplateAreas?: string | Conditions<string>;
  gridTemplateRows?: string | Conditions<string>;
  gridArea?: string | Conditions<string>;
  display?: Display | Conditions<Display>;
  flexWrap?: FlexWrap | Conditions<FlexWrap>;
  justifyContent?: JustifyContent | Conditions<JustifyContent>;
  flexDirection?: FlexDirection | Conditions<FlexDirection>;
  alignItems?: AlignItems | Conditions<AlignItems>;
  gap?: StackGapProperties | Conditions<StackGapProperties>;
  gridGap?: StackGridGapProperties | Conditions<StackGridGapProperties>;
  pointerEvents?: PointerEvents | Conditions<PointerEvents>;
}
