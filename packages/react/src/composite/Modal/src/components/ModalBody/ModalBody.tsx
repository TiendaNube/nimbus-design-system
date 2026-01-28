import React from "react";
import { modal } from "@nimbus-ds/styles";

import type { ModalBodyProps } from "./modalBody.types";

const ModalBody: React.FC<ModalBodyProps> = ({
  className: _className,
  style: _style,
  padding = "base",
  children,
  ...rest
}) => (
  <div className={modal.subComponents.body.sprinkle({ padding })} {...rest}>
    {children}
  </div>
);

export { ModalBody };
