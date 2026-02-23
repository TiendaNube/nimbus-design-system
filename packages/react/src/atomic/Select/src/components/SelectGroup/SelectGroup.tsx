import React from "react";

import { type SelectGroupProps } from "./selectGroup.types";

const SelectGroup: React.FC<SelectGroupProps> = ({
  className,
  style: _style,
  label,
  children,
  ...rest
}) => (
  <optgroup className={className} {...rest} label={label}>
    {children}
  </optgroup>
);

export { SelectGroup };
