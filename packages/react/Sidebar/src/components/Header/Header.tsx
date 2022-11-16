import React from "react";
import { Title } from "@nimbus-ds/title";
import { sidebar } from "@nimbus-ds/styles";

import { HeaderProps } from "./header.types";

const Header: React.FC<HeaderProps> = ({
  className: _className,
  style: _style,
  title,
  children,
  ...rest
}) => (
  <div {...rest} className={sidebar.style.header}>
    {title && <Title data-testid="header-title">{title}</Title>}
    {children}
  </div>
);

export { Header };
