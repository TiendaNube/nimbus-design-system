import React from "react";
import { title } from "@nimbus-ds/styles";

import { TitleProps, TitleComponents } from "./title.types";
import { Skeleton } from "./components";

const Title: React.FC<TitleProps> & TitleComponents = ({
  className: _className,
  style: _style,
  as: As = "h1",
  color = "primary.textHigh",
  children,
  textAlign,
  ...rest
}: TitleProps) => (
  <As
    {...rest}
    className={[
      title.sprinkle({ color }),
      title.style({ as: As, textAlign }),
    ].join(" ")}
  >
    {children}
  </As>
);

Title.Skeleton = Skeleton;

export { Title };
