import React, { useCallback } from "react";
import { tabs } from "@nimbus-ds/styles";

import { generateID } from "../../tabs.definitions";
import { TabsButtonProps } from "./tabsButton.types";

const TabsButton: React.FC<TabsButtonProps> = ({
  className: _className,
  style: _style,
  label,
  active = false,
  index,
  setActiveTab,
  fullWidth = false,
  ...rest
}) => {
  const handleOnClick = useCallback(() => {
    setActiveTab(index);
  }, [setActiveTab, index]);

  const ariaID = generateID(label);

  return (
    <li
      className={
        tabs.classnames.tabElement[fullWidth ? "fullWidth" : "default"]
      }
      role="presentation"
      {...rest}
    >
      <button
        className={tabs.classnames.tabButton[active ? "active" : "default"]}
        onClick={handleOnClick}
        type="button"
        id={`tab-${ariaID}`}
        role="tab"
        aria-selected={active}
        aria-controls={`panel-${ariaID}`}
        tabIndex={0}
      >
        {label}
      </button>
    </li>
  );
};

export { TabsButton };
