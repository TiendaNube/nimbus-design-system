import React from "react";
import { Title } from "@nimbus-ds/title";
import { modal } from "@nimbus-ds/styles";

import { type ModalHeaderProps } from "./modalHeader.types";

const ModalHeader: React.FC<ModalHeaderProps> = ({
  className,
  style: _style,
  padding = "none",
  title,
  tag,
  children,
  ...rest
}) => (
  <div
    className={[className, modal.subComponents.header.sprinkle({ padding })]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {(title || tag) && (
      <div className={modal.subComponents.header.content}>
        {title && (
          <Title data-testid="header-title" as="h4">
            {title}
          </Title>
        )}
        {tag}
      </div>
    )}
    {children}
  </div>
);

export { ModalHeader };
