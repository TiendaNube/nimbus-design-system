import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Box } from "@nimbus-ds/box";

import { scrollPane } from "@nimbus-ds/styles";

import { ScrollPaneProps, ScrollPaneComponents } from "./scrollPane.types";
import {
  ScrollPaneItem,
  ScrollPaneContext,
  ScrollPaneArrowHorizontalStart,
  ScrollPaneArrowHorizontalEnd,
  ScrollPaneArrowVerticalStart,
  ScrollPaneArrowVerticalEnd,
} from "./components";
import { getPosition } from "./ScrollPane.definitions";

/**
 * ScrollPane component handles responsive scrolls in lists that are overflowing inside a container.
 * It provides gradient overlays, optional navigation arrows, and scroll-to-item functionality.
 *
 * @example
 * <ScrollPane showArrows showGradients showScrollbar>
 *   <ScrollPane.Item>Item 1</ScrollPane.Item>
 *   <ScrollPane.Item>Item 2</ScrollPane.Item>
 * </ScrollPane>
 */
const ScrollPane: React.FC<ScrollPaneProps> & ScrollPaneComponents = ({
  children,
  showGradients = true,
  showArrows = false,
  showScrollbar = true,
  direction = "horizontal",
  scrollToItemOnClick = true,
  enableGrabScroll = false,
  scrollPaneArrowStart,
  scrollPaneArrowEnd,
  contentContainerProps,
  ...rest
}: ScrollPaneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const grabScrollRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
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
  }, [direction]);

  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
    }

    checkScrollPosition();

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Debounce scroll end detection
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, [checkScrollPosition, isScrolling]);

  const scrollToDirection = useCallback(
    (scrollDirection: "start" | "end") => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollAmount =
        direction === "horizontal"
          ? container.clientWidth * 0.8
          : container.clientHeight * 0.8;

      if (direction === "horizontal") {
        const newScrollLeft =
          scrollDirection === "start"
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;

        container.scrollTo({
          left: Math.max(
            0,
            Math.min(
              newScrollLeft,
              container.scrollWidth - container.clientWidth
            )
          ),
          behavior: "smooth",
        });
      } else {
        const newScrollTop =
          scrollDirection === "start"
            ? container.scrollTop - scrollAmount
            : container.scrollTop + scrollAmount;

        container.scrollTo({
          top: Math.max(
            0,
            Math.min(
              newScrollTop,
              container.scrollHeight - container.clientHeight
            )
          ),
          behavior: "smooth",
        });
      }
    },
    [direction]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableGrabScroll || !containerRef.current) return;

      const container = containerRef.current;
      grabScrollRef.current.isDown = true;
      grabScrollRef.current.startX = e.pageX - container.offsetLeft;
      grabScrollRef.current.startY = e.pageY - container.offsetTop;
      grabScrollRef.current.scrollLeft = container.scrollLeft;
      grabScrollRef.current.scrollTop = container.scrollTop;
      setIsGrabbing(true);
    },
    [enableGrabScroll]
  );

  const handleMouseLeave = useCallback(() => {
    if (!enableGrabScroll) return;
    grabScrollRef.current.isDown = false;
    setIsGrabbing(false);
  }, [enableGrabScroll]);

  const handleMouseUp = useCallback(() => {
    if (!enableGrabScroll) return;
    grabScrollRef.current.isDown = false;
    setIsGrabbing(false);
  }, [enableGrabScroll]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableGrabScroll || !grabScrollRef.current.isDown || !containerRef.current) return;

      e.preventDefault();
      const container = containerRef.current;
      const x = e.pageX - container.offsetLeft;
      const y = e.pageY - container.offsetTop;
      const walkX = x - grabScrollRef.current.startX;
      const walkY = y - grabScrollRef.current.startY;

      if (direction === "horizontal") {
        container.scrollLeft = grabScrollRef.current.scrollLeft - walkX;
      } else {
        container.scrollTop = grabScrollRef.current.scrollTop - walkY;
      }
    },
    [enableGrabScroll, direction]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    // Initial check
    checkScrollPosition();

    // Add scroll listener
    container.addEventListener("scroll", handleScroll);

    // Add resize observer to check when content changes
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();

      // Clear any pending timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [checkScrollPosition, handleScroll]);

  const contextValue = useMemo(
    () => ({
      direction,
      scrollToItemOnClick,
      enableGrabScroll,
      containerRef,
      scrollToDirection,
    }),
    [direction, scrollToItemOnClick, enableGrabScroll, scrollToDirection]
  );

  return (
    <ScrollPaneContext.Provider value={contextValue}>
      <Box as="div" position="relative" {...rest}>
        <div
          ref={containerRef}
          className={[
            scrollPane.classnames.scrollArea,
            scrollPane.classnames.direction[direction],
            !showScrollbar && scrollPane.classnames.scrollAreaHidden,
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            cursor: enableGrabScroll
              ? isGrabbing
                ? "grabbing"
                : "grab"
              : undefined,
            userSelect: enableGrabScroll ? "none" : undefined,
          }}
        >
          <Box display="flex" margin="1" {...contentContainerProps}>
            {children}
          </Box>

          {showGradients && (
            <>
              {canScrollStart && (
                <div
                  className={[
                    scrollPane.classnames.gradient,
                    scrollPane.classnames.gradientVariants[
                      getPosition("start", direction)
                    ],
                  ].join(" ")}
                />
              )}
              {canScrollEnd && (
                <div
                  className={[
                    scrollPane.classnames.gradient,
                    scrollPane.classnames.gradientVariants[
                      getPosition("end", direction)
                    ],
                  ].join(" ")}
                />
              )}
            </>
          )}

          {showArrows && (
            <>
              {canScrollStart && scrollPaneArrowStart}
              {canScrollEnd && scrollPaneArrowEnd}
            </>
          )}
        </div>
      </Box>
    </ScrollPaneContext.Provider>
  );
};

ScrollPane.displayName = "ScrollPane";

ScrollPane.Item = ScrollPaneItem;

ScrollPane.ArrowHorizontalStart = ScrollPaneArrowHorizontalStart;
ScrollPane.ArrowHorizontalEnd = ScrollPaneArrowHorizontalEnd;
ScrollPane.ArrowVerticalStart = ScrollPaneArrowVerticalStart;
ScrollPane.ArrowVerticalEnd = ScrollPaneArrowVerticalEnd;

ScrollPane.Item.displayName = "ScrollPane.Item";
ScrollPane.ArrowHorizontalStart.displayName = "ScrollPane.ArrowHorizontalStart";
ScrollPane.ArrowHorizontalEnd.displayName = "ScrollPane.ArrowHorizontalEnd";
ScrollPane.ArrowVerticalStart.displayName = "ScrollPane.ArrowVerticalStart";
ScrollPane.ArrowVerticalEnd.displayName = "ScrollPane.ArrowVerticalEnd";

export { ScrollPane };
