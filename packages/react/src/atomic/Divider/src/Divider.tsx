import React from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { divider, dividerVars } from "@nimbus-ds/styles";

import { type DividerProps } from "./divider.types";

const Divider: React.FC<DividerProps> = ({
  className,
  style: _style,
  orientation = "horizontal",
  appearance = "neutral",
  thickness = 1,
  width,
  marginLeft,
  marginRight,
  ...rest
}: DividerProps) => {
  const internalClasses = [
    divider.classnames.orientation[orientation],
    divider.classnames.appearance[appearance],
    orientation === "horizontal"
      ? divider.classnames.horizontalThickness[thickness]
      : divider.classnames.verticalThickness[thickness],
    width !== undefined && divider.classnames.customWidth,
    marginLeft !== undefined && divider.classnames.customMarginLeft,
    marginRight !== undefined && divider.classnames.customMarginRight,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inlineVars: Record<string, string> = {};
  if (width !== undefined) inlineVars[dividerVars.width] = width;
  if (marginLeft !== undefined) inlineVars[dividerVars.marginLeft] = marginLeft;
  if (marginRight !== undefined)
    inlineVars[dividerVars.marginRight] = marginRight;

  return (
    <hr
      {...rest}
      aria-orientation={orientation === "vertical" ? "vertical" : "horizontal"}
      className={internalClasses}
      style={assignInlineVars(inlineVars)}
    />
  );
};

Divider.displayName = "Divider";

export { Divider };
export type { DividerProps };
