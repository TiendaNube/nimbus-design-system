import React from "react";
import { box } from "@nimbus-ds/styles";

import { BoxProps } from "./box.types";

const Box: React.FC<BoxProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}) => {
  const { className, style, otherProps } = box.sprinkle(rest);
  return (
    <div
      className={[className, box.style.container].join(" ")}
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  );
};

Box.displayName = "Box";
export { Box };
