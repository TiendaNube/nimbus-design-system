import React from "react";
import { Title } from "@nimbus-ds/title";

import { HeaderProps } from "./header.types";

const Header: React.FC<HeaderProps> = ({
  className: _className,
  style: _style,
  title,
  children,
  ...rest
}) => (
  <div {...rest}>
    {title && <Title as="h3">{title}</Title>}
    {children}
  </div>
);

export { Header };
