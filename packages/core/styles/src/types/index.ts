export interface Conditions<T> {
  xs?: T;
  md?: T;
  lg?: T;
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
export type Cursor = "auto" | "pointer";
export type Display = "block" | "flex" | "inline-flex" | "grid" | "inline-grid";
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
export type TextAlign = "left" | "right" | "center" | "justify";
export type TextDecoration = "none" | "underline";
