import React from "react";

import { title } from "@nimbus-ds/styles";
import { TitleProps, TitleComponents } from "./title.types";
import { Skeleton } from "./components";

const Title: React.FC<TitleProps> & TitleComponents = ({
  className: _className,
  style: _style,
  children,
  textAlign,
  as: As = "h1",
  ...rest
}: TitleProps) => (
  <As {...rest} className={title({ as: As, textAlign })}>
    {children}
  </As>
);

Title.Skeleton = Skeleton;

export { Title };
