import React from "react";
import { title } from "@nimbus-ds/styles";

import { TitleProps, TitleComponents } from "./title.types";
import { TitleSkeleton } from "./components";

const Title: React.FC<TitleProps> & TitleComponents = ({
  className: _className,
  style: _style,
  as: As = "h1",
  color = "neutral-textHigh",
  textAlign = "left",
  lineHeight,
  fontWeight = "bold",
  fontSize,
  children,
  ...rest
}: TitleProps) => (
  <As
    {...rest}
    className={[
      title.sprinkle({ color, textAlign, lineHeight, fontWeight, fontSize }),
      title.classnames.appearance[As],
    ].join(" ")}
  >
    {children}
  </As>
);

Title.displayName = "Title";
Title.Skeleton = TitleSkeleton;
Title.Skeleton.displayName = "Title.Skeleton";

export { Title };
