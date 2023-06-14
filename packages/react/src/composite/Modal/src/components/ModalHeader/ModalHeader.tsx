import React from "react";
import { Title } from "@nimbus-ds/title";
import { modal } from "@nimbus-ds/styles";

import { ModalHeaderProps } from "./modalHeader.types";

const ModalHeader: React.FC<ModalHeaderProps> = ({
  className: _className,
  style: _style,
  padding = "none",
  title,
  children,
  ...rest
}) => (
  <div className={modal.subComponents.header.sprinkle({ padding })} {...rest}>
    {title && (
      <Title data-testid="header-title" as="h3">
        {title}
      </Title>
    )}
    {children}
  </div>
);

export { ModalHeader };
