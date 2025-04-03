import React, { useState } from "react";
import { tabs } from "@nimbus-ds/styles";

import { TabsProps, TabsComponents, ControlledTabsProperties, BaseTabsProperties } from "./tabs.types";
import { TabsButton, TabsItem } from "./components";

const isControlled = (props: BaseTabsProperties | ControlledTabsProperties): props is ControlledTabsProperties => {
  return 'selected' in props && 'onSelect' in props;
};

const Tabs: React.FC<TabsProps> & TabsComponents = (props) => {
  const {
    className: _className,
    style: _style,
    children,
    preSelectedTab,
    fullWidth = false,
    ...rest
  } = props;

  // Internal state for uncontrolled mode
  const [internalSelectedTab, setInternalSelectedTab] = useState<number>(preSelectedTab || 0);

  // Use controlled or uncontrolled state
  const selectedTab = isControlled(props) ? props.selected : internalSelectedTab;
  const setSelectedTab = isControlled(props) ? props.onTabSelect : setInternalSelectedTab;

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
