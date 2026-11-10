import React from "react";
import { title } from "@nimbus-ds/styles";

import { type TitleProps, type TitleComponents } from "./title.types";
import { TitleSkeleton } from "./components";

const Title: React.FC<TitleProps> & TitleComponents = ({
  className,
  style: _style,
  as: As = "h1",
  color = "neutral-textHigh",
  textAlign = "left",
  lineHeight,
  fontWeight,
  fontSize,
  children,
  ...rest
}: TitleProps) => {
  const defaultFontWeightClass = title.classnames.defaultFontWeight;
  // Fall back to "bold" when the styles package in use predates `defaultFontWeight`.
  const resolvedFontWeight =
    fontWeight ?? (defaultFontWeightClass ? undefined : "bold");

  return (
    <As
      {...rest}
      className={[
        className,
        title.sprinkle({
          color,
          textAlign,
          lineHeight,
          fontWeight: resolvedFontWeight,
          fontSize,
        }),
        title.classnames.appearance[As],
        fontWeight === undefined && defaultFontWeightClass,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </As>
  );
};

Title.displayName = "Title";
Title.Skeleton = TitleSkeleton;
Title.Skeleton.displayName = "Title.Skeleton";

export { Title };
