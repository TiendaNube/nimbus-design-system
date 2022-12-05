import React from "react";
import { tabs } from "@nimbus-ds/styles";

import { ItemProps } from "./item.types";

import { generateID } from "../../tabs.definitions";

const Item: React.FC<ItemProps> = ({
  className: _className,
  style: _style,
  label,
  children,
  ...rest
}: ItemProps) => {
  const ariaID = generateID(label);

  return (
    <div
      {...rest}
      id={`panel-${ariaID}`}
      role="tabpanel"
      aria-labelledby={`tab-${ariaID}`}
      className={tabs.style.panel}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

Item.displayName = "Tabs.Item";
export { Item };
