import React from "react";

import { text } from "@nimbus-ds/styles";
import { TextProps } from "./text.types";

const Text: React.FC<TextProps> = ({
  className: _className,
  style: _style,
  as: As = "p",
  children,
  textAlign,
  lineHeight,
  appearance,
  bold,
  size,
  ...rest
}) => (
  <As
    className={text({ appearance, bold, size, textAlign, lineHeight })}
    {...rest}
  >
    {children}
  </As>
);

export { Text };
