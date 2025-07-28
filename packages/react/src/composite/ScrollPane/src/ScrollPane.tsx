import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Box } from "@nimbus-ds/box";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@nimbus-ds/icons";
import { scrollPane } from "@nimbus-ds/styles";

import { ScrollPaneProps, ScrollPaneComponents } from "./scrollPane.types";
import { ScrollPaneItem, ScrollPaneContext } from "./components";
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
const ScrollPaneComponent: React.FC<ScrollPaneProps> = ({
  children,
  showGradients = true,
  showArrows = false,
  showScrollbar = true,
  direction = "horizontal",
  scrollToItemOnClick = true,
  scrollEndDebounceDelay = 150,
  className,
  style,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

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
    }, scrollEndDebounceDelay);
  }, [checkScrollPosition, isScrolling, scrollEndDebounceDelay]);

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
      containerRef,
    }),
    [direction, scrollToItemOnClick]
  );

  return (
    <ScrollPaneContext.Provider value={contextValue}>
      <Box
        as="div"
        className={[scrollPane.classnames.container, className]
          .filter(Boolean)
          .join(" ")}
        style={style}
        position="relative"
        {...rest}
      >
        {/* Scroll area */}
        <div
          ref={containerRef}
          className={[
            scrollPane.classnames.scrollArea,
            scrollPane.classnames.direction[direction],
            !showScrollbar && scrollPane.classnames.scrollAreaHidden,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}

          {/* Gradient overlays  */}
          {showGradients && (
            <>
              {canScrollStart && (
                <div
                  className={[
                    scrollPane.classnames.gradient,
                    scrollPane.classnames.gradientVariants[
                      getPosition("start", direction)
                    ],
                    scrollPane.classnames.gradientVisible,
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
                    scrollPane.classnames.gradientVisible,
                  ].join(" ")}
                />
              )}
            </>
          )}

          {/* Navigation arrows */}
          {showArrows && (
            <>
              {canScrollStart && (
                <button
                  type="button"
                  className={[
                    scrollPane.classnames.arrow,
                    scrollPane.classnames.arrowVariants[
                      getPosition("start", direction)
                    ],
                  ].join(" ")}
                  onClick={() => scrollToDirection("start")}
                  aria-label={`Scroll ${
                    direction === "horizontal" ? "left" : "up"
                  }`}
                >
                  {direction === "horizontal" ? (
                    <ChevronLeftIcon size={16} />
                  ) : (
                    <ChevronUpIcon size={16} />
                  )}
                </button>
              )}
              {canScrollEnd && (
                <button
                  type="button"
                  className={[
                    scrollPane.classnames.arrow,
                    scrollPane.classnames.arrowVariants[
                      getPosition("end", direction)
                    ],
                  ].join(" ")}
                  onClick={() => scrollToDirection("end")}
                  aria-label={`Scroll ${
                    direction === "horizontal" ? "right" : "down"
                  }`}
                >
                  {direction === "horizontal" ? (
                    <ChevronRightIcon size={16} />
                  ) : (
                    <ChevronDownIcon size={16} />
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </Box>
    </ScrollPaneContext.Provider>
  );
};

// Assign static properties using Object.assign to avoid complex typing issues
const ScrollPane = Object.assign(ScrollPaneComponent, {
  Item: ScrollPaneItem,
  displayName: "ScrollPane",
}) as React.FC<ScrollPaneProps> & ScrollPaneComponents;

ScrollPane.Item.displayName = "ScrollPane.Item";

export { ScrollPane };
