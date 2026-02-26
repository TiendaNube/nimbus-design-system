import React from "react";
import { modal } from "@nimbus-ds/styles";

import { type ModalBodyProps } from "./modalBody.types";

const ModalBody: React.FC<ModalBodyProps> = ({
  className,
  style: _style,
  padding = "base",
  children,
  ...rest
}) => (
  <div
    className={[className, modal.subComponents.body.sprinkle({ padding })]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {children}
  </div>
);

export { ModalBody };
