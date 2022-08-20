import React from "react";

import { title } from "@nimbus-ds/styles";
import { TitleProps } from "./title.types";

const Title: React.FC<TitleProps> = ({
  className: _className,
  style: _style,
  children,
  textAlign,
  as: As = "h1",
  ...rest
}) => (
  <As {...rest} className={title({ as: As, textAlign })}>
    {children}
  </As>
);

export { Title };
