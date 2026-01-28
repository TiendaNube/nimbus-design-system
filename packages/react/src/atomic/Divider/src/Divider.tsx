import React from "react";
import { divider } from "@nimbus-ds/styles";

import { DividerProps } from "./divider.types";

const Divider: React.FC<DividerProps> = ({
  className,
  style,
  orientation = "horizontal",
  appearance = "neutral",
  thickness = 1,
  ...rest
}: DividerProps) => {
  const internalClasses = [
    divider.classnames.orientation[orientation],
    divider.classnames.appearance[appearance],
    orientation === "horizontal"
      ? divider.classnames.horizontalThickness[thickness]
      : divider.classnames.verticalThickness[thickness],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <hr
      {...rest}
      aria-orientation={orientation === "vertical" ? "vertical" : "horizontal"}
      className={internalClasses}
      style={style}
    />
  );
};

Divider.displayName = "Divider";

export { Divider };
export type { DividerProps };
