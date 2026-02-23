import React from "react";
import { tabs } from "@nimbus-ds/styles";

import { generateID } from "../../tabs.definitions";
import { type TabsItemProps } from "./tabsItem.types";

const TabsItem: React.FC<TabsItemProps> = ({
  className,
  style: _style,
  label,
  children,
  ...rest
}) => {
  const ariaID = generateID(label);
  return (
    <div
      {...rest}
      id={`panel-${ariaID}`}
      role="tabpanel"
      aria-labelledby={`tab-${ariaID}`}
      className={[className, tabs.classnames.container__panel]
        .filter(Boolean)
        .join(" ")}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

export { TabsItem };
