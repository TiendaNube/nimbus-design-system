import React from "react";

import { type SelectOptionProps } from "./selectOption.types";

const SelectOption: React.FC<SelectOptionProps> = ({
  className: _className,
  style: _style,
  label,
  value,
  ...rest
}) => (
  <option {...rest} label={label} value={value}>
    {label}
  </option>
);

export { SelectOption };
