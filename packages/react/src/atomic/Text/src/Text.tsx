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
  textDecoration = "none",
  children,
  lineClamp,
  wordBreak,
  ...rest
}: TextProps) => {
  const { className, style, otherProps } = text.sprinkle({
    ...(rest as Parameters<typeof text.sprinkle>[0]),
    color: color as any,
    textAlign,
    lineHeight: lineHeight as any,
    fontWeight: fontWeight as any,
    fontSize: fontSize as any,
    textDecoration: textDecoration as any,
    WebkitLineClamp: lineClamp as any,
    wordBreak: wordBreak as any,
  });

  return (
    <As
      {...rest}
      className={[
        text.classnames.base,
        lineClamp && text.classnames.trim,
        className,
      ].join(" ")}
      style={style}
      {...otherProps}
    >
      {children}
    </As>
  );
};

Text.Skeleton = TextSkeleton;
Text.displayName = "Text";
Text.Skeleton.displayName = "Text.Skeleton";

export { Text };
