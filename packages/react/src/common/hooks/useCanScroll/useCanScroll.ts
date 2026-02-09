import { useState, useCallback, type RefObject } from "react";

export type ScrollDirection = "horizontal" | "vertical";

export interface UseCanScrollOptions {
  /** Direction of the scroll container */
  direction?: ScrollDirection;
  /** Ref to the scroll container element */
  scrollContainerRef: RefObject<HTMLElement | null>;
}

export interface UseCanScrollResult {
  /** Whether the container can scroll towards the start (left for horizontal, top for vertical) */
  canScrollStart: boolean;
  /** Whether the container can scroll towards the end (right for horizontal, bottom for vertical) */
  canScrollEnd: boolean;
  /** Function to check and update scroll position state */
  checkScrollPosition: () => void;
}

/**
 * Hook to determine if a scroll container can scroll in either direction.
 * Returns flags indicating if scrolling is possible towards the start or end,
 * plus a function to manually trigger a scroll position check.
 */
export function useCanScroll({
  direction = "vertical",
  scrollContainerRef,
}: UseCanScrollOptions): UseCanScrollResult {
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const {
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    } = container;

    if (direction === "horizontal") {
      setCanScrollStart(scrollLeft > 0);
      setCanScrollEnd(scrollLeft < scrollWidth - clientWidth - 1);
    } else {
      setCanScrollStart(scrollTop > 0);
      setCanScrollEnd(scrollTop < scrollHeight - clientHeight - 1);
    }
  }, [direction, scrollContainerRef]);

  return {
    canScrollStart,
    canScrollEnd,
    checkScrollPosition,
  };
}
