import React, { useCallback } from "react";
import { tabs } from "@nimbus-ds/styles";

import { ButtonProps } from "./button.types";

import { generateID } from "../../tabs.definitions";

const Button: React.FC<ButtonProps> = ({
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
      className={tabs.style.tabElement[fullWidth ? "fullWidth" : "default"]}
      role="presentation"
      {...rest}
    >
      <button
        className={tabs.style.tabButton[active ? "active" : "default"]}
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

Button.displayName = "Tabs.Button";
export { Button };
