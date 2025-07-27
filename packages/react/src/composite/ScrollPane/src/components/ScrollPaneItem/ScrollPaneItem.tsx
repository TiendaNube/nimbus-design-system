import React, { useContext } from "react";
import { Box } from "@nimbus-ds/box";

import { ScrollPaneItemProps } from "./scrollPaneItem.types";
import { ScrollPaneContext } from "../ScrollPaneContext";

/**
 * ScrollPaneItem is a wrapper component for items within a ScrollPane.
 * It handles click events to scroll the item into view when clicked.
 */
const ScrollPaneItem: React.FC<ScrollPaneItemProps> = ({
  children,
  className,
  style,
  onClick,
  ...rest
}) => {
  const context = useContext(ScrollPaneContext);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }

    // Scroll item into view if enabled
    if (context?.scrollToItemOnClick && event.currentTarget) {
      const container = context.containerRef?.current;
      const item = event.currentTarget;

      if (container && item) {
        const containerRect = container.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        if (context.direction === "horizontal") {
          // Check if item is partially visible or outside viewport
          const isPartiallyVisible =
            itemRect.left < containerRect.left ||
            itemRect.right > containerRect.right;

          if (isPartiallyVisible) {
            const scrollLeft =
              container.scrollLeft +
              (itemRect.left - containerRect.left) -
              (containerRect.width - itemRect.width) / 2;

            container.scrollTo({
              left: Math.max(0, scrollLeft),
              behavior: "smooth",
            });
          }
        } else {
          // Vertical scrolling
          const isPartiallyVisible =
            itemRect.top < containerRect.top ||
            itemRect.bottom > containerRect.bottom;

          if (isPartiallyVisible) {
            const scrollTop =
              container.scrollTop +
              (itemRect.top - containerRect.top) -
              (containerRect.height - itemRect.height) / 2;

            container.scrollTo({
              top: Math.max(0, scrollTop),
              behavior: "smooth",
            });
          }
        }
      }
    }
  };

  return (
    <Box className={className} style={style} onClick={handleClick} {...rest}>
      {children}
    </Box>
  );
};

ScrollPaneItem.displayName = "ScrollPane.Item";

export { ScrollPaneItem };
