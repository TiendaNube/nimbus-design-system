import React from "react";
import { Title } from "@nimbus-ds/title";
import { card } from "@nimbus-ds/styles";

import { type CardHeaderProps } from "./cardHeader.types";

const CardHeader: React.FC<CardHeaderProps> = ({
  className: _className,
  style: _style,
  padding = "none",
  title,
  children,
  ...rest
}) => (
  <div className={card.subComponents.header.sprinkle({ padding })} {...rest}>
    {title && (
      <Title data-testid="header-title" as="h4">
        {title}
      </Title>
    )}
    {children}
  </div>
);

export { CardHeader };
