import React from "react";
import { stack } from "@nimbus-ds/styles";

import { StackProps } from "./stack.types";

const Stack: React.FC<StackProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}) => {
  const { className, style, otherProps } = stack.sprinkle(rest);
  return (
    <div className={className} style={style} {...otherProps}>
      {children}
    </div>
  );
};

Stack.displayName = "Stack";
export { Stack };
