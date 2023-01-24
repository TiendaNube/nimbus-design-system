import React from "react";

import { SelectOptionProps } from "./selectOption.types";

const SelectOption: React.FC<SelectOptionProps> = ({
  className: _className,
  style: _style,
  label,
  value,
  ...rest
}) => <option {...rest} label={label} value={value} />;

export { SelectOption };
