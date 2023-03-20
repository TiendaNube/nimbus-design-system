import React from "react";
import { Title } from "@nimbus-ds/title";
import { modal } from "@nimbus-ds/styles";

import { ModalHeaderProps } from "./modalHeader.types";

const ModalHeader: React.FC<ModalHeaderProps> = ({
  className: _className,
  style: _style,
  title,
  children,
  ...rest
}) => (
  <div {...rest} className={modal.classnames.container__header}>
    {title && (
      <Title data-testid="header-title" as="h3">
        {title}
      </Title>
    )}
    {children}
  </div>
);

export { ModalHeader };
