import React from "react";
import { Title } from "@nimbus-ds/title";
import { card } from "@nimbus-ds/styles";

import { CardHeaderProps } from "./cardHeader.types";

const CardHeader: React.FC<CardHeaderProps> = ({
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

export { CardHeader };
