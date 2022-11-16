import React from "react";
import { sidebar } from "@nimbus-ds/styles";

import { FooterProps } from "./footer.types";

const Footer: React.FC<FooterProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}) => (
  <div className={sidebar.style.footer} {...rest}>
    {children}
  </div>
);

export { Footer };
