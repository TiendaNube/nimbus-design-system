import React, { useState } from "react";
import { tabs } from "@nimbus-ds/styles";

import { TabsProps, TabsComponents } from "./tabs.types";
import { TabsButton, TabsItem } from "./components";

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
