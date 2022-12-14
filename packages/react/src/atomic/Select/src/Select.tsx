import React from "react";
import { select } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";
import { ChevronDownIcon } from "@tiendanube/icons";

import { SelectComponents, SelectProps } from "./select.types";
import { SelectGroup, SelectOption, SelectSkeleton } from "./components";

const Select: React.FC<SelectProps> & SelectComponents = ({
  className: _className,
  style: _style,
  name,
  id,
  children,
  appearance = "neutral",
  ...rest
}: SelectProps) => (
  <div className={select.classnames.wrapper}>
    <div className={select.classnames.icon}>
      <Icon source={<ChevronDownIcon />} color="primary.textHigh" />
    </div>
    <select
      {...rest}
      id={id}
      name={name}
      className={select.classnames.appearance[appearance]}
    >
      {children}
    </select>
  </div>
);

Select.Group = SelectGroup;
Select.Option = SelectOption;
Select.Skeleton = SelectSkeleton;
Select.displayName = "Select";

export { Select };
