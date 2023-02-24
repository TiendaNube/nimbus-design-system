import { varsThemeBase } from "../themes";
import {
  AlignItems,
  AspectRatio,
  BorderStyle,
  BoxSizing,
  Cursor,
  Display,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  TextAlign,
  TextDecoration,
  Position,
  Overflow,
  PointerEvents,
  TransitionTiming,
} from "../types";
import { baseColors } from "./base";

export const aspectRatioProperties: AspectRatio[] = [
  "1/1",
  "16/9",
  "9/16",
  "4/3",
  "3/4",
  "2/1",
  "1/2",
];

export const backgroundColorProperties = baseColors;
export const borderColorProperties = baseColors;
export const colorProperties = baseColors;
export const boxShadowProperties = {
  card: varsThemeBase.shadow.card,
  popover: varsThemeBase.shadow.popover,
  modal: varsThemeBase.shadow.modal,
  focusRing: varsThemeBase.utils.focus,
};
export const boxSizingProperties: BoxSizing[] = ["border-box", "content-box"];
export const cursorProperties: Cursor[] = [
  "auto",
  "pointer",
  "not-allowed",
  "grab",
  "inherit",
];
export const borderStyleProperties: BorderStyle[] = [
  "solid",
  "none",
  "hidden",
  "dashed",
  "dotted",
];
export const displayProperties: Display[] = [
  "block",
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "none",
];
export const flexDirectionProperties: FlexDirection[] = [
  "row",
  "row-reverse",
  "column",
  "column-reverse",
];
export const flexWrapProperties: FlexWrap[] = [
  "nowrap",
  "wrap",
  "wrap-reverse",
];
export const alignItemsProperties: AlignItems[] = [
  "stretch",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
];
export const justifyContentProperties: JustifyContent[] = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
];
export const textAlignProperties: TextAlign[] = [
  "left",
  "right",
  "center",
  "justify",
];
export const pointerEventsProperties: PointerEvents[] = [
  "auto",
  "none",
  "visiblePainted",
  "visibleFill",
  "visibleStroke",
  "visible",
  "painted",
  "fill",
  "stroke",
  "all",
  "inherit",
];

export const textDecorationProperties: TextDecoration[] = ["none", "underline"];
export const fontWeightProperties = {
  regular: varsThemeBase.fontWeight.regular,
  medium: varsThemeBase.fontWeight.medium,
  bold: varsThemeBase.fontWeight.bold,
};
export const fontSizeProperties = {
  caption: varsThemeBase.fontSize.body.caption,
  base: varsThemeBase.fontSize.body.base,
  highlight: varsThemeBase.fontSize.body.highlight,
};
export const lineHeightProperties = {
  caption: varsThemeBase.lineWeight.body.caption,
  base: varsThemeBase.lineWeight.body.base,
  highlight: varsThemeBase.lineWeight.body.highlight,
} as const;
export const titleFontSizeProperties = {
  h1: varsThemeBase.fontSize.title.h1,
  h2: varsThemeBase.fontSize.title.h2,
  h3: varsThemeBase.fontSize.title.h3,
  h4: varsThemeBase.fontSize.title.h4,
  h5: varsThemeBase.fontSize.title.h5,
  h6: varsThemeBase.fontSize.title.h6,
};
export const titleLineHeightProperties = {
  h1: varsThemeBase.lineWeight.title.h1,
  h2: varsThemeBase.lineWeight.title.h2,
  h3: varsThemeBase.lineWeight.title.h3,
  h4: varsThemeBase.lineWeight.title.h4,
  h5: varsThemeBase.lineWeight.title.h5,
  h6: varsThemeBase.lineWeight.title.h6,
};
export const paddingProperties = {
  base: varsThemeBase.spacing[4],
  small: varsThemeBase.spacing[2],
  none: "0",
};
export const gapProperties = {
  none: "0",
  "0,5": varsThemeBase.spacing["0,5"],
  "1": varsThemeBase.spacing[1],
  "1,5": varsThemeBase.sizes["1,5"],
  "2": varsThemeBase.spacing[2],
  "2,5": varsThemeBase.sizes["2,5"],
  "4": varsThemeBase.spacing[4],
  "6": varsThemeBase.spacing[6],
  "8": varsThemeBase.spacing[8],
  "10": varsThemeBase.spacing[10],
  "12": varsThemeBase.spacing[12],
  "14": varsThemeBase.spacing[14],
  "16": varsThemeBase.spacing[16],
  "18": varsThemeBase.spacing[18],
  "20": varsThemeBase.spacing[20],
};
export const positionProperties: Position[] = [
  "absolute",
  "fixed",
  "relative",
  "static",
  "sticky",
];
export const overflowProperties: Overflow[] = [
  "visible",
  "hidden",
  "scroll",
  "auto",
];

export const transitionTimingProperties: TransitionTiming[] = [
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "linear",
  "step-start",
  "step-end",
];
export const transitionSpeedProperties = {
  base: varsThemeBase.motion.speed.base,
  fast: varsThemeBase.motion.speed.fast,
  slow: varsThemeBase.motion.speed.slow,
  slower: varsThemeBase.motion.speed.slower,
};

export const gridGapProperties = gapProperties;

export const sizeProperties = {
  "0,5": varsThemeBase.sizes["0,5"],
  "1": varsThemeBase.sizes[1],
  "1,5": varsThemeBase.sizes["1,5"],
  "2": varsThemeBase.sizes[2],
  "2,5": varsThemeBase.sizes["2,5"],
  "3": varsThemeBase.sizes[3],
  "3,5": varsThemeBase.sizes["3,5"],
  "4": varsThemeBase.sizes[4],
  "4,5": varsThemeBase.sizes["4,5"],
  "5": varsThemeBase.sizes[5],
  "6": varsThemeBase.sizes[6],
  "7": varsThemeBase.sizes[7],
  "8": varsThemeBase.sizes[8],
  "9": varsThemeBase.sizes[9],
  "10": varsThemeBase.sizes[10],
  "11": varsThemeBase.sizes[11],
  "12": varsThemeBase.sizes[12],
  "14": varsThemeBase.sizes[14],
  "16": varsThemeBase.sizes[16],
  "18": varsThemeBase.sizes[18],
  "20": varsThemeBase.sizes[20],
};
