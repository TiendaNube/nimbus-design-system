import React, { useMemo } from "react";

import { OptionProps } from "./option.types";

const Option: React.FC<OptionProps> = ({
  className: _className,
  style: _style,
  label,
  value,
  ...rest
}: OptionProps) => {
  const hasLabel = useMemo(() => label || value, [label, value]);

  return <option {...rest} label={hasLabel} value={value} />;
};

Option.displayName = "Select.Option";

export { Option };
