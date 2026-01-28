import React from "react";

import { type SelectGroupProps } from "./selectGroup.types";

const SelectGroup: React.FC<SelectGroupProps> = ({
  className: _className,
  style: _style,
  label,
  children,
  ...rest
}) => (
  <optgroup {...rest} label={label}>
    {children}
  </optgroup>
);

export { SelectGroup };
