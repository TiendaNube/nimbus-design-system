import React from "react";
import { card } from "@nimbus-ds/styles";

import { FooterProps } from "./footer.types";

const Footer: React.FC<FooterProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}) => (
  <div className={card.style.footer} {...rest}>
    {children}
  </div>
);

export { Footer };
