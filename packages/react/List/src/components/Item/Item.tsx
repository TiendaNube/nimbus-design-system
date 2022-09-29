import React from "react";
import { list } from "@nimbus-ds/styles";

import { ItemProps } from "./item.types";

const Item: React.FC<ItemProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}) => (
  <li {...rest} className={list.style.item}>
    {children}
  </li>
);

export { Item };
