import React from "react";
import { modal } from "@nimbus-ds/styles";

import { ModalFooterProps } from "./modalFooter.types";

const ModalFooter: React.FC<ModalFooterProps> = ({
  className: _className,
  style: _style,
  padding = "none",
  children,
  ...rest
}) => (
  <div
    className={[
      modal.subComponents.body.sprinkle({ padding }),
      modal.classnames.container__footer,
    ].join(" ")}
    {...rest}
  >
    {children}
  </div>
);

export { ModalFooter };
