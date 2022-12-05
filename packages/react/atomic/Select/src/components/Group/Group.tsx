import React from "react";

import { GroupProps } from "./group.types";

const Group: React.FC<GroupProps> = ({
  className: _className,
  style: _style,
  label,
  children,
  ...rest
}: GroupProps) => (
  <optgroup {...rest} label={label}>
    {children}
  </optgroup>
);

Group.displayName = "Select.Group";

export { Group };
