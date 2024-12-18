import React, { useCallback } from "react";
import { tabs } from "@nimbus-ds/styles";

import { generateID } from "../../tabs.definitions";
import { TabsButtonProps } from "./tabsButton.types";

const TabsButton: React.FC<TabsButtonProps> = ({
  className: _className,
  style: _style,
  label,
  labelContent,
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
        tabs.classnames.container__item[fullWidth ? "fullWidth" : "default"]
      }
      role="presentation"
      {...rest}
    >
      <button
        className={[
          tabs.classnames.container__button[active ? "active" : "default"],
          fullWidth ? tabs.classnames.container__button.fullWidth : "",
        ].join(" ")}
        onClick={handleOnClick}
        type="button"
        id={`tab-${ariaID}`}
        role="tab"
        aria-selected={active}
        aria-controls={`panel-${ariaID}`}
        tabIndex={0}
      >
        {label}
        {labelContent}
      </button>
    </li>
  );
};

export { TabsButton };
