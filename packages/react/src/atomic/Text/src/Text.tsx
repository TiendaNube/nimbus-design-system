import React from "react";
import { text } from "@nimbus-ds/styles";

import { TextProps, TextComponents } from "./text.types";
import { TextSkeleton } from "./components";

const Text: React.FC<TextProps> & TextComponents = ({
  className: _className,
  style: _style,
  as: As = "p",
  color = "primary.textLow",
  textAlign = "left",
  lineHeight = "caption",
  fontWeight = "regular",
  fontSize = "caption",
  children,
  ...rest
}: TextProps) => (
  <As
    {...rest}
    className={[
      text.sprinkle({ color, textAlign, lineHeight, fontWeight, fontSize }),
      text.classnames.container,
    ].join(" ")}
  >
    {children}
  </As>
);

Text.Skeleton = TextSkeleton;
Text.displayName = "Text";
export { Text };
