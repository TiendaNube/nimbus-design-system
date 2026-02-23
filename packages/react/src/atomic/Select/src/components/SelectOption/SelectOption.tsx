import React from "react";

import { type SelectOptionProps } from "./selectOption.types";

const SelectOption: React.FC<SelectOptionProps> = ({
  className,
  style: _style,
  label,
  value,
  ...rest
}) => (
  <option className={className} {...rest} label={label} value={value}>
    {label}
  </option>
);

export { SelectOption };
