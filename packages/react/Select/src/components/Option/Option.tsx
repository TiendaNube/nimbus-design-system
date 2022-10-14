import React, { useMemo } from "react";

import { OptionProps } from "./option.types";

const Option: React.FC<OptionProps> = ({
  className: _className,
  style: _style,
  disabled = false,
  selected = false,
  label,
  value,
  ...rest
}: OptionProps) => {
  const hasLabel = useMemo(() => label || value, [label, value]);

  return (
    <option {...rest} disabled={disabled} selected={selected} label={hasLabel}>
      {value}
    </option>
  );
};

Option.displayName = "Select.Option";

export { Option };
