import React from "react";
import { Title } from "@nimbus-ds/title";
import { card } from "@nimbus-ds/styles";

import { HeaderProps } from "./header.types";

const Header: React.FC<HeaderProps> = ({
  className: _className,
  style: _style,
  title,
  children,
  ...rest
}) => (
  <div {...rest} className={card.style.header}>
    {title && (
      <Title data-testid="header-title" as="h3">
        {title}
      </Title>
    )}
    {children}
  </div>
);

export { Header };
