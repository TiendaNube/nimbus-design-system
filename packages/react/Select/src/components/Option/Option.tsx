import React from "react";

import { OptionProps } from "./option.types";

const Option: React.FC<OptionProps> = ({
  className: _className,
  style: _style,
  label,
  value,
  ...rest
}: OptionProps) => <option {...rest} label={label} value={value} />;

Option.displayName = "Select.Option";

export { Option };
