import React from "react";
import { modal } from "@nimbus-ds/styles";

import { ModalBodyProps } from "./modalBody.types";

const ModalBody: React.FC<ModalBodyProps> = ({
  className: _className,
  style: _style,
  padding = "base",
  children,
  ...rest
}) => {
  const { className, style, otherProps } = modal.sprinkle({
    ...(rest as Parameters<typeof modal.sprinkle>[0]),
    padding: padding as any,
  });

  return (
    <div
      {...otherProps}
      style={style}
      className={[modal.classnames.container__body, className].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
};

export { ModalBody };
