import React from "react";
import { modal } from "@nimbus-ds/styles";

import { type ModalFooterProps } from "./modalFooter.types";

const ModalFooter: React.FC<ModalFooterProps> = ({
  className,
  style: _style,
  padding = "none",
  children,
  ...rest
}) => (
  <div
    className={[
      className,
      modal.subComponents.body.sprinkle({ padding }),
      modal.classnames.container__footer,
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {children}
  </div>
);

export { ModalFooter };
