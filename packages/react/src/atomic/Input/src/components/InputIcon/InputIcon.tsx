import React from "react";
import { input } from "@nimbus-ds/styles";

import { InputIconProps } from "./inputIcon.types";

const InputIcon: React.FC<InputIconProps> = ({
  className: _className,
  style: _style,
  appendPosition,
  children,
  ...rest
}) => (
  <button
    type="button"
    tabIndex={-1}
    data-append-position={appendPosition}
    className={[
      input.classnames.container__icon,
      input.classnames.container__icon_append[appendPosition],
    ].join(" ")}
    {...rest}
  >
    {children}
  </button>
);

export { InputIcon };
