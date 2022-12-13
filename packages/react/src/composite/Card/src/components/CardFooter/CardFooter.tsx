import React from "react";
import { card } from "@nimbus-ds/styles";

import { CardFooterProps } from "./cardFooter.types";

const CardFooter: React.FC<CardFooterProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}) => (
  <div className={card.style.footer} {...rest}>
    {children}
  </div>
);

export { CardFooter };
