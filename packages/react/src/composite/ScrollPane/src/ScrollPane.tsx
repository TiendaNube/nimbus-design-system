import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import ScrollContainer from "react-indiana-drag-scroll";
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
const ScrollPaneComponent = forwardRef<HTMLDivElement, ScrollPaneProps>(
  (
    {
      children,
      showGradients = true,
      showArrows = false,
      showScrollbar = true,
      scrollContainerRef: externalScrollContainerRef,
      direction = "horizontal",
      scrollToItemOnClick = true,
      scrollBehavior = "hidden-items",
      enableGrabScroll = false,
      scrollPaneArrowStart,
      scrollPaneArrowEnd,
      contentContainerProps,
      ...rest
    },
    ref
  ) => {
    const internalScrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef =
      externalScrollContainerRef || internalScrollContainerRef;
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [canScrollStart, setCanScrollStart] = useState(false);
    const [canScrollEnd, setCanScrollEnd] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const checkScrollPosition = useCallback(() => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
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
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
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
      [direction, scrollContainerRef]
    );

    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return undefined;

      // Initial check with a small delay for ScrollContainer initialization
      const initialCheckTimeout = setTimeout(
        () => {
          checkScrollPosition();
        },
        enableGrabScroll ? 50 : 0
      );

      // Add scroll listener
      container.addEventListener("scroll", handleScroll);

      // Add resize observer to check when content changes
      const resizeObserver = new ResizeObserver(() => {
        // Add small delay for ScrollContainer to update its internal state
        setTimeout(checkScrollPosition, enableGrabScroll ? 10 : 0);
      });
      resizeObserver.observe(container);

      // For ScrollContainer, also observe children to catch dynamic content
      if (enableGrabScroll && container.firstElementChild) {
        resizeObserver.observe(container.firstElementChild);
      }

      return () => {
        clearTimeout(initialCheckTimeout);
        container.removeEventListener("scroll", handleScroll);
        resizeObserver.disconnect();

        // Clear any pending timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [
      checkScrollPosition,
      handleScroll,
      enableGrabScroll,
      scrollContainerRef,
    ]);

    const contextValue = useMemo(
      () => ({
        direction,
        scrollToItemOnClick,
        scrollBehavior,
        enableGrabScroll,
        containerRef: scrollContainerRef,
        scrollToDirection,
      }),
      [
        direction,
        scrollToItemOnClick,
        scrollBehavior,
        enableGrabScroll,
        scrollContainerRef,
        scrollToDirection,
      ]
    );

    const scrollAreaClassName = [
      scrollPane.classnames.scrollArea,
      scrollPane.classnames.direction[direction],
      !showScrollbar && scrollPane.classnames.scrollAreaHidden,
    ]
      .filter(Boolean)
      .join(" ");

    const scrollAreaStyle = {
      cursor: enableGrabScroll ? "grab" : undefined,
    };

    const scrollContent = (
      <>
        <Box
          display="flex"
          flexDirection={direction === "horizontal" ? "row" : "column"}
          margin="1"
          {...contentContainerProps}
        >
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
      </>
    );

    return (
      <ScrollPaneContext.Provider value={contextValue}>
        <Box ref={ref} position="relative" {...rest}>
          {enableGrabScroll ? (
            <ScrollContainer
              hideScrollbars={false}
              horizontal={direction === "horizontal"}
              vertical={direction === "vertical"}
              innerRef={scrollContainerRef}
              className={scrollAreaClassName}
              style={scrollAreaStyle}
            >
              {scrollContent}
            </ScrollContainer>
          ) : (
            <div
              ref={scrollContainerRef}
              className={scrollAreaClassName}
              style={scrollAreaStyle}
            >
              {scrollContent}
            </div>
          )}
        </Box>
      </ScrollPaneContext.Provider>
    );
  }
);

ScrollPaneComponent.displayName = "ScrollPane";

const ScrollPane = ScrollPaneComponent as typeof ScrollPaneComponent &
  ScrollPaneComponents;

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
