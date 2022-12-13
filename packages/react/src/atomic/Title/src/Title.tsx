import React from "react";
import { title } from "@nimbus-ds/styles";

import { TitleProps, TitleComponents } from "./title.types";
import { TitleSkeleton } from "./components";

const Title: React.FC<TitleProps> & TitleComponents = ({
  className: _className,
  style: _style,
  as: As = "h1",
  color = "primary.textHigh",
  textAlign = "left",
  children,
  ...rest
}: TitleProps) => (
  <As
    {...rest}
    className={[
      title.sprinkle({ color, textAlign }),
      title.style({ as: As }),
    ].join(" ")}
  >
    {children}
  </As>
);

Title.Skeleton = TitleSkeleton;

export { Title };
