import React from "react";
import { Title } from "@nimbus-ds/title";
import { Box } from "@nimbus-ds/box";
import { modal } from "@nimbus-ds/styles";

import { ModalHeaderProps } from "./modalHeader.types";

const ModalHeader: React.FC<ModalHeaderProps> = ({
  className: _className,
  style: _style,
  padding = "none",
  title,
  tag,
  children,
  ...rest
}) => (
  <div className={modal.subComponents.header.sprinkle({ padding })} {...rest}>
    {(title || tag) && (
      <Box display="flex" alignItems="center" gap="2">
        {title && (
          <Title data-testid="header-title" as="h4">
            {title}
          </Title>
        )}
        {tag}
      </Box>
    )}
    {children}
  </div>
);

export { ModalHeader };
