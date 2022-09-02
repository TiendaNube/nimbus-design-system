import React from "react";
import { text } from "@nimbus-ds/styles";

import { TextProps, TextComponents } from "./text.types";
import { Skeleton } from "./components";

const Text: React.FC<TextProps> & TextComponents = ({
  className: _className,
  style: _style,
  as: As = "p",
  color = "primary.textLow",
  children,
  textAlign,
  lineHeight,
  bold,
  size,
  ...rest
}: TextProps) => (
  <As
    {...rest}
    className={[
      text.sprinkle({ color }),
      text.style({ bold, size, textAlign, lineHeight }),
    ].join(" ")}
  >
    {children}
  </As>
);

Text.Skeleton = Skeleton;

export { Text };
