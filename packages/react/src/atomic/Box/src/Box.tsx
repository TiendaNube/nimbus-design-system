import React from "react";
import { box } from "@nimbus-ds/styles";

import { BoxProps } from "./box.types";

const Box: React.FC<BoxProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}) => {
  const { className, style, otherProps } = box.sprinkle(
    rest as Parameters<typeof box.sprinkle>[0]
  );
  return (
    <div className={className} style={style} {...otherProps}>
      {children}
    </div>
  );
};

Box.displayName = "Box";
export { Box };
