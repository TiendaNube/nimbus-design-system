import React, { useState } from "react";
import { tabs } from "@nimbus-ds/styles";

import { TabsProps, TabsComponents } from "./tabs.types";
import { TabsButton, TabsItem } from "./components";
import { isControlled } from "./tabs.definitions";

const Tabs: React.FC<TabsProps> & TabsComponents = ({
  className: _className,
  style: _style,
  children,
  preSelectedTab,
  fullWidth = false,
  ...rest
}: TabsProps) => {
  // Internal state for uncontrolled mode
  const [internalSelectedTab, setInternalSelectedTab] = useState<number>(
    preSelectedTab || 0
  );

  // Use controlled or uncontrolled state
  const selectedTab = isControlled(rest) ? rest.selected : internalSelectedTab;
  const setSelectedTab = isControlled(rest)
    ? rest.onTabSelect
    : setInternalSelectedTab;

  return (
    <div {...rest}>
      <ul role="tablist" className={tabs.classnames.container}>
        {React.Children.map(children, (item, index) => {
          const {
            props: { label, labelContent },
          } = item;
          return (
            <Tabs.Button
              key={label}
              label={label}
              index={index}
              active={index === selectedTab}
              setActiveTab={setSelectedTab}
              fullWidth={fullWidth}
              labelContent={labelContent}
            />
          );
        })}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

Tabs.Button = TabsButton;
Tabs.Item = TabsItem;

Tabs.displayName = "Tabs";
Tabs.Item.displayName = "Tabs.Item";
Tabs.Button.displayName = "Tabs.Button";

export { Tabs };
