import {
  Conditions,
  BorderStyle,
  Cursor,
  BoxSizing,
  Position,
  Overflow,
  Display,
  FlexWrap,
  JustifyContent,
  FlexDirection,
  AlignItems,
  AlignSelf,
  PointerEvents,
  TransitionTiming,
} from "../../../types";
import { boxSprinkle } from "./nimbus-box.css";

const { properties: propertiesBox } = boxSprinkle;

type BoxBorderColorProperties = keyof typeof propertiesBox.borderColor;
type BoxBackgroundColorProperties = keyof typeof propertiesBox.backgroundColor;
type BoxColorProperties = keyof typeof propertiesBox.color;
type BoxShadowProperties = keyof typeof propertiesBox.boxShadow;
type BoxSpaceProperties = keyof typeof propertiesBox.space;
type BoxMarginProperties = keyof typeof propertiesBox.margin;
type BoxGapProperties = keyof typeof propertiesBox.gap;
type BoxGridGapProperties = keyof typeof propertiesBox.gridGap;
type TransitionDurationProperties =
  keyof typeof propertiesBox.transitionDuration;

interface BoxConditions<T> extends Conditions<T> {
  focus?: T;
  focusWithin?: T;
  active?: T;
  hover?: T;
  disabled?: T;
}

export interface BoxSprinkle {
  /**
   * The width property specifies the width of a box's content area.
   */
  width?: string | BoxConditions<string>;
  /**
   * The height property specifies the height of a box's content area.
   */
  height?: string | BoxConditions<string>;
  /**
   * The max width property specifies the width of a box's content area.
   */
  maxWidth?: string | BoxConditions<string>;
  /**
   * The max height property specifies the height of a box's content area.
   */
  maxHeight?: string | BoxConditions<string>;
  /**
   * The min width property specifies the width of a box's content area.
   */
  minWidth?: string | BoxConditions<string>;
  /**
   * The min height property specifies the height of a box's content area.
   */
  minHeight?: string | BoxConditions<string>;
  /**
   * The bottom property participates in setting the vertical position of a positioned box.
   */
  bottom?: string | BoxConditions<string>;
  /**
   * The left property participates in specifying the horizontal position of a positioned box.
   */
  left?: string | BoxConditions<string>;
  /**
   * The right property participates in specifying the horizontal position of a positioned box.
   */
  right?: string | BoxConditions<string>;
  /**
   * The top property participates in setting the vertical position of a positioned box.
   */
  top?: string | BoxConditions<string>;
  /**
   * This is the shorthand for flexGrow, flexShrink and flexBasis combined.
   */
  flex?: string | BoxConditions<string>;
  /**
   * This defines the ability for a flex item to shrink if necessary.
   */
  flexShrink?: string | BoxConditions<string>;
  /**
   * This defines the ability for a flex item to grow if necessary.
   */
  flexGrow?: string | BoxConditions<string>;
  /**
   * The flexWrap property sets whether flex items are forced onto one line or can wrap onto multiple lines.
   */
  flexWrap?: FlexWrap | BoxConditions<FlexWrap>;
  /**
   * The order property controls the order in which they appear in a flex container.
   */
  order?: string | BoxConditions<string>;
  /**
   * The gridTemplateColumns property defines the line names and track sizing functions of the grid columns.
   */
  gridTemplateColumns?: string | BoxConditions<string>;
  /**
   * The gridTemplateAreas property specifies named grid areas, establishing the cells in the grid and assigning them names.
   */
  gridTemplateAreas?: string | BoxConditions<string>;
  /**
   * The gridTemplateRows property defines the line names and track sizing functions of the grid rows.
   */
  gridTemplateRows?: string | BoxConditions<string>;
  /**
   * The gridArea shorthand property specifies a grid item's size and location within a grid by contributing a line,
   * a span, or nothing (automatic) to its grid placement, thereby specifying the edges of its grid area.
   */
  gridArea?: string | BoxConditions<string>;
  /**
   * The display property sets whether an box is treated as a block or inline element and the layout used for its children,
   * such as grid or flex.
   */
  display?: Display | BoxConditions<Display>;
  /**
   * The justifyContent property defines how the browser distributes space between and around content items along
   * the main-axis of a flex container, and the inline axis of a grid container.
   */
  justifyContent?: JustifyContent | BoxConditions<JustifyContent>;
  /**
   * The flexDirection property sets how flex items are placed in the flex container defining the main axis and the direction.
   */
  flexDirection?: FlexDirection | BoxConditions<FlexDirection>;
  /**
   * The alignItems property sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis.
   * In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.
   */
  alignItems?: AlignItems | BoxConditions<AlignItems>;
  /**
   * The alignSelf property overrides a grid or flex item's align-items value. In Grid, it aligns the item inside the grid area.
   * In Flexbox, it aligns the item on the cross axis.
   */
  alignSelf?: AlignSelf | BoxConditions<AlignSelf>;
  /**
   * The gap property sets the gaps between rows and columns. It is a shorthand for rowGap and columnGap.
   */
  gap?: BoxGapProperties | BoxConditions<BoxGapProperties>;
  /**
   * The gridGap property sets the gaps between rows and columns. It is a shorthand for rowGap and columnGap.
   */
  gridGap?: BoxGridGapProperties | BoxConditions<BoxGridGapProperties>;
  /**
   * The pointerEvents property sets under what circumstances (if any) a particular graphic element can become the target of pointer events.
   */
  pointerEvents?: PointerEvents | BoxConditions<PointerEvents>;
  /**
   * The position property sets how an box is positioned in a document.
   */
  position?: Position | BoxConditions<Position>;
  /**
   * The overflow shorthand property sets the desired behavior for an box's overflow.
   */
  overflow?: Overflow | BoxConditions<Overflow>;
  /**
   * The overflow-x property sets what shows when content overflows a block-level box's left and right edges.
   */
  overflowX?: Overflow | BoxConditions<Overflow>;
  /**
   * The overflow-y property sets what shows when content overflows a block-level box's top and bottom edges.
   */
  overflowY?: Overflow | BoxConditions<Overflow>;
  /**
   * The cursor property sets the mouse cursor, if any, to show when the mouse pointer is over an box.
   */
  cursor?: Cursor | BoxConditions<Cursor>;
  /**
   * The backgroundColor property sets the background color of the box.
   * @default neutral-background
   * @examples ["neutral-interactive", { xs: "neutral-surface", md: "neutral-interactive" }]
   */
  backgroundColor?:
    | BoxBackgroundColorProperties
    | BoxConditions<BoxBackgroundColorProperties>;
  /**
   * The color property is used to set the color of the box.
   */
  color?: BoxColorProperties | BoxConditions<BoxColorProperties>;
  /**
   * The borderRadius property rounds the corners of an box's outer border edge.
   */
  borderRadius?: string | BoxConditions<string>;
  /**
   * The borderWidth property sets the width of an box's border.
   */
  borderWidth?: string | BoxConditions<string>;
  /**
   * The borderColor property sets the color of the box's four borders.
   */
  borderColor?:
    | BoxBorderColorProperties
    | BoxConditions<BoxBorderColorProperties>;
  /**
   * borderStyle property sets the line style for all four sides of an box's border.
   */
  borderStyle?: BorderStyle | BoxConditions<BorderStyle>;
  /**
   * The boxSizing property sets how the total width and height of an box is calculated.
   * @default border-box
   */
  boxSizing?: BoxSizing | BoxConditions<BoxSizing>;
  /**
   * The boxShadow property adds shadow effects around an box's frame.
   */
  boxShadow?: BoxShadowProperties | BoxConditions<BoxShadowProperties>;
  /**
   * The padding properties are used to generate space around an box's content area.
   */
  padding?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The paddingTop property sets the height of the padding area on the top of an box.
   */
  paddingTop?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The paddingBottom property sets the height of the padding area on the bottom of an box.
   */
  paddingBottom?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The paddingLeft property sets the width of the padding area to the left of an box.
   */
  paddingLeft?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The paddingLeft property sets the width of the padding area to the right of an box.
   */
  paddingRight?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The margin shorthand property sets the margin area on all four sides of an box.
   */
  margin?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The marginTop property sets the margin area on the top of an box.
   */
  marginTop?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The marginBottom property sets the margin area on the bottom of an box.
   */
  marginBottom?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The marginLeft property sets the margin area on the left side of an box.
   */
  marginLeft?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The marginRight property sets the margin area on the right side of an box.
   */
  marginRight?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The transitionTimingFunction property sets how intermediate values are calculated for CSS properties being affected by a transition effect.
   */
  transitionTimingFunction?: TransitionTiming | BoxConditions<TransitionTiming>;
  /**
   * The transitionProperty property sets the CSS properties to which a transition effect should be applied.
   */
  transitionProperty?: string | BoxConditions<string>;
  /**
   * The transitionDelay property specifies the duration to wait before starting a property's transition effect when its value changes.
   */
  transitionDelay?: string | BoxConditions<string>;
  /**
   * The transitionDuration property sets the length of time a transition animation should take to complete. By default, the value is 0s, meaning that no animation will occur.
   */
  transitionDuration?:
    | TransitionDurationProperties
    | BoxConditions<TransitionDurationProperties>;
  /**
   * The zIndex property specifies the stack order of the box.
   */
  zIndex?: number | BoxConditions<number>;
  /**
   * The backgroundImage property sets one or more background images on an element.
   */
  backgroundImage?: string | BoxConditions<string>;
  /**
   * The backgroundPosition property sets the initial position for each background image.
   * The position is relative to the position layer set by background-origin.
   */
  backgroundPosition?: string | BoxConditions<string>;
  /**
   * The backgroundBlendMode property sets how an element's background images should blend with each
   * other and with the element's background color.
   */
  backgroundBlendMode?: string | BoxConditions<string>;
  /**
   * The backgroundRepeat property sets how background images are repeated. A background image can be repeated along the horizontal and vertical axes, or not repeated at all.
   */
  backgroundRepeat?: string | BoxConditions<string>;
  /**
   * The backgroundSize property sets the size of the element's background image. The image can be left to its natural size, stretched, or constrained to fit the available space.
   */
  backgroundSize?: string | BoxConditions<string>;
  /**
   * The p shorthand property sets the margin area on all four sides of an box.
   */
  p?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The pl shorthand property sets the width of the padding area to the left of an box.
   */
  pl?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The pl shorthand property sets the width of the padding area to the right of an box.
   */
  pr?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The pt shorthand property sets the height of the padding area on the top of an box.
   */
  pt?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The pb shorthand property sets the height of the padding area on the botton of an box.
   */
  pb?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The px shorthand property defines the width of the left and right padding area of a box.
   */
  px?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The py pt shorthand property sets the height of the padding area at the top and bottom of a box.
   */
  py?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The paddingX shorthand property defines the width of the left and right padding area of a box.
   */
  paddingX?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The paddingY pt shorthand property sets the height of the padding area at the top and bottom of a box.
   */
  paddingY?: BoxSpaceProperties | BoxConditions<BoxSpaceProperties>;
  /**
   * The m shorthand property sets the margin area on all four sides of an box.
   */
  m?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The mr property sets the margin area on the right side of an box.
   */
  mr?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The ml property sets the margin area on the left side of an box.
   */
  ml?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The mt property sets the margin area on the top of an box.
   */
  mt?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The marginBottom property sets the margin area on the bottom of an box.
   */
  mb?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The mx property defines the margin area on the left and right side of a box.
   */
  mx?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The my property defines the margin area on the top and bottom of a box
   */
  my?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The marginX property defines the margin area on the left and right side of a box.
   */
  marginX?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
  /**
   * The marginY property defines the margin area on the top and bottom of a box
   */
  marginY?: BoxMarginProperties | BoxConditions<BoxMarginProperties>;
}
