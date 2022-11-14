import React, { useState } from "react";
import { tabs } from "@nimbus-ds/styles";

import { TabsProps, TabsComponents } from "./tabs.types";
import { Button , Item } from "./components";

const Tabs: React.FC<TabsProps> & TabsComponents = ({
  className: _className,
  style: _style,
  children,
  preSelectedTab,
  fullWidth = false,
  ...rest
}: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState<number>(preSelectedTab || 0);
  return (
    <div {...rest}>
      <ul role="tablist" className={tabs.style.container}>
        {React.Children.map(children, (item, index) => {
          const {
            props: { label },
          } = item;
          return (
            <Tabs.Button
              key={label}
              label={label}
              index={index}
              active={index === selectedTab}
              setActiveTab={setSelectedTab}
              fullWidth={fullWidth}
            />
          );
        })}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

Tabs.Button = Button;
Tabs.Item = Item;

Tabs.displayName = "Tabs";

export { Tabs };
