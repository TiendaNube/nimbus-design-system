import React from "react";
import { select } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";
import { ChevronDownIcon } from "@tiendanube/icons";

import { SelectComponents, SelectProps } from "./select.types";
import { Group, Option, Skeleton } from "./components";

const Select: React.FC<SelectProps> & SelectComponents = ({
  className: _className,
  style: _style,
  name,
  id,
  children,
  appearance = "neutral",
  ...rest
}: SelectProps) => (
  <div className={select.style.wrapper}>
    <div className={select.style.icon}>
      <Icon source={<ChevronDownIcon />} color="primary.textHigh" />
    </div>
    <select
      {...rest}
      id={id}
      name={name}
      className={select.style.appearance[appearance]}
    >
      {children}
    </select>
  </div>
);

Select.Group = Group;
Select.Option = Option;
Select.Skeleton = Skeleton;
Select.displayName = "Select";

export { Select };
