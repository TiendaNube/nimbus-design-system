/**
 * Helper function to check if an item is fully visible within the container
 */
const isItemFullyVisible = (
  containerRect: DOMRect,
  itemRect: DOMRect,
  direction: "horizontal" | "vertical"
): boolean => {
  if (direction === "horizontal") {
    return (
      itemRect.left >= containerRect.left && itemRect.right <= containerRect.right
    );
  } 
    return (
      itemRect.top >= containerRect.top && itemRect.bottom <= containerRect.bottom
    );
  
};

/**
 * Helper function to handle scroll logic for both horizontal and vertical directions
 */
export const scrollItemIntoView = (
  container: HTMLElement,
  item: HTMLElement,
  direction: "horizontal" | "vertical"
) => {
  // Get current positions and dimensions including any padding/borders
  const containerRect = container.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();

  // Check if the item needs to be scrolled into view
  if (isItemFullyVisible(containerRect, itemRect, direction)) {
    return; // Item is already fully visible, no need to scroll
  }

  if (direction === "horizontal") {
    // Calculate the optimal horizontal scroll position
    // We want to center the item within the container viewport
    const containerCenter = containerRect.width / 2;
    const itemCenter = itemRect.width / 2;

    // Calculate scroll offset needed to center the item
    const scrollOffset =
      itemRect.left - containerRect.left - containerCenter + itemCenter;

    // Add current scroll position to get absolute scroll position
    const scrollPosition = container.scrollLeft + scrollOffset;

    container.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: "smooth",
    });
  } else {
    // Calculate the optimal vertical scroll position
    // We want to center the item within the container viewport
    const containerCenter = containerRect.height / 2;
    const itemCenter = itemRect.height / 2;

    // Calculate scroll offset needed to center the item
    const scrollOffset =
      itemRect.top - containerRect.top - containerCenter + itemCenter;

    // Add current scroll position to get absolute scroll position
    const scrollPosition = container.scrollTop + scrollOffset;

    container.scrollTo({
      top: Math.max(0, scrollPosition),
      behavior: "smooth",
    });
  }
};
