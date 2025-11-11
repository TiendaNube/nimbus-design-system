import React from "react";

import { ScrollPaneItemProps } from "./scrollPaneItem.types";
import { useScrollPaneContext } from "../../contexts/ScrollPaneContext";
import { scrollItemIntoView } from "./ScrollPaneItem.definitions";
import { scrollPane } from "@nimbus-ds/styles";


/**
 * ScrollPaneItem is a wrapper component for items within a ScrollPane.
 * It handles click events to scroll the item into view when clicked.
 */
const ScrollPaneItem: React.FC<ScrollPaneItemProps> = ({
  children,
  onClick,
  ...rest
}) => {
  const context = useScrollPaneContext();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }

    // Scroll item into view if enabled
    if (context.scrollToItemOnClick && event.currentTarget) {
      const container = context.containerRef?.current;
      const item = event.currentTarget;

      if (container && item && context.direction) {
        scrollItemIntoView(container, item, context.direction);
      }
    }
  };

  return (
    <div className={scrollPane.classnames.item} onClick={handleClick}>
      {children}
    </div>
  );
};

export { ScrollPaneItem };
