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
export const boxSizingProperties: BoxSizing[] = ["border-box", "content-box"];
export const cursorProperties: Cursor[] = ["auto", "pointer"];
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
export const paddingProperties = {
  base: varsThemeBase.spacing[4],
  none: 0,
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

export const gridGapProperties = gapProperties;
