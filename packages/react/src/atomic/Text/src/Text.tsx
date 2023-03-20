import React from "react";
import { text } from "@nimbus-ds/styles";

import { TextProps, TextComponents } from "./text.types";
import { TextSkeleton } from "./components";

const Text: React.FC<TextProps> & TextComponents = ({
  className: _className,
  style: _style,
  as: As = "p",
  color = "neutral-textLow",
  textAlign = "left",
  lineHeight = "base",
  fontWeight = "regular",
  fontSize = "base",
  children,
  ...rest
}: TextProps) => (
  <As
    {...rest}
    className={[
      text.sprinkle({ color, textAlign, lineHeight, fontWeight, fontSize }),
      text.classnames.base,
    ].join(" ")}
  >
    {children}
  </As>
);

Text.Skeleton = TextSkeleton;
Text.displayName = "Text";
Text.Skeleton.displayName = "Text.Skeleton";

export { Text };
