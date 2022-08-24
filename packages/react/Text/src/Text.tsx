import React from "react";

import { text } from "@nimbus-ds/styles";
import { TextProps, TextComponents } from "./text.types";
import { Skeleton } from "./components";

const Text: React.FC<TextProps> & TextComponents = ({
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
}: TextProps) => (
  <As
    className={text({ appearance, bold, size, textAlign, lineHeight })}
    {...rest}
  >
    {children}
  </As>
);

Text.Skeleton = Skeleton;

export { Text };
