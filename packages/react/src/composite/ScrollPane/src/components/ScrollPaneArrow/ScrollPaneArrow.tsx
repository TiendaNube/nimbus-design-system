import React, { useContext } from "react";
import { scrollPane } from "@nimbus-ds/styles";
import { ScrollPaneContext } from "../ScrollPaneContext";
import {
  ScrollPaneArrowBaseProps,
  ScrollPaneArrowProperties,
} from "./ScrollPaneArrow.types";

/**
 * Base arrow component for ScrollPane navigation.
 * Handles click events to trigger scrolling in the specified direction.
 *
 * @param children - The content to render inside the arrow button
 * @param variant - The visual variant determining arrow position styling
 * @param direction - The scroll direction ('start' or 'end')
 */
const ScrollPaneArrowBase: React.FC<ScrollPaneArrowBaseProps> = ({
  children,
  variant,
  direction,
}) => {
  const context = useContext(ScrollPaneContext);

  if (!context) {
    throw new Error("ScrollPaneArrowBase must be used within a ScrollPane");
  }

  const handleActivation = () => context.scrollToDirection(direction);

const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === "Enter" || event.code === "Space") {
    event.preventDefault();
    handleActivation();
  }
};

  return (
    <div
      className={[
        scrollPane.classnames.arrow,
        scrollPane.classnames.arrowVariants[variant],
      ].join(" ")}
      onClick={handleActivation}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Scroll ${direction === "start" ? "backward" : "forward"}`}
    >
      {children}
    </div>
  );
};

/**
 * Scrolls the pane towards the beginning (left in LTR layouts).
 */
const ScrollPaneArrowHorizontalStart: React.FC<ScrollPaneArrowProperties> = ({
  children,
}) => (
  <ScrollPaneArrowBase variant="horizontal-left" direction="start">
    {children}
  </ScrollPaneArrowBase>
);

/**
 * Scrolls the pane towards the end (right in LTR layouts).
 */
const ScrollPaneArrowHorizontalEnd: React.FC<ScrollPaneArrowProperties> = ({
  children,
}) => (
  <ScrollPaneArrowBase variant="horizontal-right" direction="end">
    {children}
  </ScrollPaneArrowBase>
);

/**
 * Scrolls the pane towards the beginning (top).
 */
const ScrollPaneArrowVerticalStart: React.FC<ScrollPaneArrowProperties> = ({
  children,
}) => (
  <ScrollPaneArrowBase variant="vertical-top" direction="start">
    {children}
  </ScrollPaneArrowBase>
);

/**
 * Scrolls the pane towards the end (bottom).
 */
const ScrollPaneArrowVerticalEnd: React.FC<ScrollPaneArrowProperties> = ({
  children,
}) => (
  <ScrollPaneArrowBase variant="vertical-bottom" direction="end">
    {children}
  </ScrollPaneArrowBase>
);

export {
  ScrollPaneArrowHorizontalStart,
  ScrollPaneArrowHorizontalEnd,
  ScrollPaneArrowVerticalStart,
  ScrollPaneArrowVerticalEnd,
};

export type { ScrollPaneArrowProperties };
