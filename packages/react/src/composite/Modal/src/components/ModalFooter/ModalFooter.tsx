import React from "react";
import { modal } from "@nimbus-ds/styles";

import { ModalFooterProps } from "./modalFooter.types";

const ModalFooter: React.FC<ModalFooterProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}) => (
  <div className={modal.classnames.footer} {...rest}>
    {children}
  </div>
);

export { ModalFooter };
