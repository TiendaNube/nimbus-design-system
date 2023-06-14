export interface Conditions<T> {
  xs?: T;
  md?: T;
  lg?: T;
  xl?: T;
}
export type AspectRatio =
  | "1/1"
  | "16/9"
  | "9/16"
  | "4/3"
  | "3/4"
  | "2/1"
  | "1/2";
export type BorderStyle = "solid" | "none" | "hidden" | "dashed" | "dotted";
export type BoxSizing = "border-box" | "content-box";
export type Cursor = "auto" | "pointer" | "not-allowed" | "grab" | "inherit";
export type Display =
  | "block"
  | "flex"
  | "inline-flex"
  | "grid"
  | "inline-grid"
  | "none";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type AlignItems =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline";
export type AlignSelf =
  | "auto"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";
export type TextAlign = "left" | "right" | "center" | "justify";
export type TextDecoration = "none" | "underline";
export type Position = "absolute" | "fixed" | "relative" | "static" | "sticky";
export type Overflow = "visible" | "hidden" | "scroll" | "auto";
export type PointerEvents =
  | "auto"
  | "none"
  | "visiblePainted"
  | "visibleFill"
  | "visibleStroke"
  | "visible"
  | "painted"
  | "fill"
  | "stroke"
  | "all"
  | "inherit";
export type TransitionTiming =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear"
  | "step-start"
  | "step-end";
export type WordBreak = "normal" | "break-all" | "keep-all" | "break-word";
