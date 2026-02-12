import React from "react";
import { list } from "@nimbus-ds/styles";

import { type ListItemProps } from "./listItem.types";

const ListItem: React.FC<ListItemProps> = ({
  className,
  style: _style,
  children,
  ...rest
}) => (
  <li
    {...rest}
    className={[className, list.classnames.container__item]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </li>
);

export { ListItem };
