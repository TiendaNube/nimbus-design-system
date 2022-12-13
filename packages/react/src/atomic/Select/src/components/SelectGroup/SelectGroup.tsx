import React from "react";

import { SelectGroupProps } from "./selectGroup.types";

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

SelectGroup.displayName = "Select.Group";

export { SelectGroup };
