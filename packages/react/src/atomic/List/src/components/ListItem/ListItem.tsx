import React from "react";
import { list } from "@nimbus-ds/styles";

import { ListItemProps } from "./listItem.types";

const ListItem: React.FC<ListItemProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}) => (
  <li {...rest} className={list.style.item}>
    {children}
  </li>
);

ListItem.displayName = "List.Item";

export { ListItem };
