import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent
} from "react";
import { Box } from "@nimbus-ds/box";
import { Icon } from "@nimbus-ds/icon";
import { Link } from "@nimbus-ds/link";
import { Text } from "@nimbus-ds/text";
import { ChevronRightIcon, EllipsisIcon } from "@nimbus-ds/icons";

import { type BreadcrumbProps } from "./breadcrumb.types";
import {
  FOCUSABLE_SELECTOR,
  computeHiddenLevels,
  getLevelKeys,
  type BreadcrumbMetrics
} from "./breadcrumb.definitions";

type FocusPart = "strip" | "panel" | "trigger";

interface FocusSnapshot {
  part: FocusPart;
  key?: string;
  element: HTMLElement;
}

/**
 * Only one panel can be open across instances (B-014). The open instance registers
 * how to close itself so the next one to open can dismiss it without moving focus.
 */
let closeOpenPanel: (() => void) | null = null;

const isSameMetrics = (a: BreadcrumbMetrics | null, b: BreadcrumbMetrics) =>
  !!a &&
  a.container === b.container &&
  a.separator === b.separator &&
  a.trigger === b.trigger &&
  a.levels.length === b.levels.length &&
  a.levels.every((width, index) => width === b.levels[index]);

const Separator: React.FC<{ measure: boolean }> = ({ measure }) => (
  <Box
    as="span"
    aria-hidden="true"
    display="flex"
    alignItems="center"
    flexShrink="0"
    px="1"
    data-breadcrumb-measure={measure ? "separator" : undefined}
  >
    <Icon color="neutral-textLow" source={<ChevronRightIcon size="small" />} />
  </Box>
);

const TriggerGlyph: React.FC = () => (
  <Icon color="neutral-textHigh" source={<EllipsisIcon size="small" />} />
);

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className,
  style: _style,
  items,
  label,
  hiddenLevelsLabel,
  as: LinkAs = "a",
  ...rest
}) => {
  const count = items?.length ?? 0;
  const hasItems = count > 0;
  const navRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const triggerItemRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const tabOutRef = useRef(false);
  const lastFocusRef = useRef<FocusSnapshot | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const panelId = useId();

  const [metrics, setMetrics] = useState<BreadcrumbMetrics | null>(null);
  const [open, setOpen] = useState(false);

  const levelKeys = useMemo(() => getLevelKeys(items ?? []), [items]);

  const measure = useCallback(() => {
    const nav = navRef.current;
    const layer = measureRef.current;
    if (!nav || !layer) return;
    const width = (element: Element | null) =>
      element ? element.getBoundingClientRect().width : 0;
    const next: BreadcrumbMetrics = {
      container: nav.getBoundingClientRect().width,
      levels: Array.from(
        layer.querySelectorAll("[data-breadcrumb-measure='level']")
      ).map(width),
      separator: width(
        layer.querySelector("[data-breadcrumb-measure='separator']")
      ),
      trigger: width(layer.querySelector("[data-breadcrumb-measure='trigger']"))
    };
    setMetrics((previous) => (isSameMetrics(previous, next) ? previous : next));
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, items]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => measure());
    observer.observe(nav);
    return () => observer.disconnect();
  }, [measure, hasItems]);

  // Until the new levels are measured, keep the previously hidden levels hidden so a
  // transient render does not unmount the panel or the focused element.
  const hiddenKeysRef = useRef<Set<string>>(new Set());
  const hidden = useMemo(() => {
    if (count < 2) return [];
    if (metrics && metrics.levels.length === count) {
      return computeHiddenLevels(metrics);
    }
    return levelKeys
      .map((key, index) => (hiddenKeysRef.current.has(key) ? index : -1))
      .filter((index) => index >= 0 && index < count - 1);
  }, [metrics, count, levelKeys]);
  const isMeasured = count < 2 || metrics?.levels.length === count;
  const hasHidden = hidden.length > 0;
  const isOpen = open && hasHidden;

  useLayoutEffect(() => {
    if (isMeasured) {
      hiddenKeysRef.current = new Set(hidden.map((index) => levelKeys[index]));
    }
  }, [isMeasured, hidden, levelKeys]);

  const closePanel = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    []
  );

  // B-015 rule 1: the trigger disappears and the panel closes.
  useLayoutEffect(() => {
    if (open && isMeasured && !hasHidden) setOpen(false);
  }, [open, isMeasured, hasHidden]);

  // B-014: opening dismisses any other open panel, without moving focus away from this one.
  // B-009: focus always enters the panel on its first link.
  useLayoutEffect(() => {
    if (!isOpen) return undefined;
    const dismiss = () => setOpen(false);
    if (closeOpenPanel && closeOpenPanel !== dismiss) closeOpenPanel();
    closeOpenPanel = dismiss;
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      if (closeOpenPanel === dismiss) closeOpenPanel = null;
    };
  }, [isOpen]);

  // B-010: Escape and outside presses dismiss the panel.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel(true);
    };
    const onOutsidePress = (event: Event) => {
      const target = event.target as Element | null;
      if (!target || triggerItemRef.current?.contains(target)) return;
      closePanel(false);
      // Focus stays on a pressed focusable control; otherwise it returns to the trigger.
      if (!target.closest?.(FOCUSABLE_SELECTOR)) {
        closeTimerRef.current = setTimeout(
          () => triggerRef.current?.focus(),
          0
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onOutsidePress, true);
    document.addEventListener("touchstart", onOutsidePress, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onOutsidePress, true);
      document.removeEventListener("touchstart", onOutsidePress, true);
    };
  }, [isOpen, closePanel]);

  // B-015: follow the focused level when an update removes the focused element.
  useLayoutEffect(() => {
    const last = lastFocusRef.current;
    if (!last || last.element.isConnected) return;
    lastFocusRef.current = null;
    const nav = navRef.current;
    if (!nav) return;
    const find = (part: FocusPart, index: number) =>
      nav.querySelector<HTMLElement>(
        `[data-breadcrumb-part="${part}"][data-breadcrumb-index="${index}"]`
      );

    if (!hasHidden) {
      if (last.part !== "strip" && count >= 2) find("strip", 0)?.focus();
      return;
    }
    if (last.part === "panel") {
      if (isOpen) panelRef.current?.querySelector<HTMLElement>("a")?.focus();
      return;
    }
    if (last.part === "strip" && last.key) {
      const index = levelKeys.indexOf(last.key);
      if (index >= 0 && index < count - 1 && hidden.includes(index)) {
        if (open) find("panel", index)?.focus();
        else triggerRef.current?.focus();
      }
    }
  });

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    const element = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-breadcrumb-part]"
    );
    if (!element) return;
    lastFocusRef.current = {
      part: element.dataset.breadcrumbPart as FocusPart,
      key: element.dataset.breadcrumbKey,
      element
    };
  };

  const handleNavBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !navRef.current?.contains(next)) lastFocusRef.current = null;
  };

  // B-009: Tab from the last panel link or Shift+Tab from the first one leaves the panel, which
  // closes; focus is already where the browser sent it. Focus moved by script or assistive
  // technology does not close it (B-015 rule 3).
  const handleTriggerItemKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab" || !isOpen) return;
    const links = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>("a") ?? []
    );
    const boundary = event.shiftKey ? links[0] : links[links.length - 1];
    if (event.target === boundary) {
      tabOutRef.current = true;
      setTimeout(() => {
        tabOutRef.current = false;
      }, 0);
    }
  };

  const handleTriggerItemBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (
      isOpen &&
      tabOutRef.current &&
      next &&
      !panelRef.current?.contains(next)
    ) {
      tabOutRef.current = false;
      closePanel(false);
    }
  };

  if (count === 0) return null;

  const currentIndex = count - 1;
  const current = items[currentIndex];

  const currentLevel = () => (
    <Text
      as="span"
      color="neutral-textHigh"
      fontWeight="bold"
      lineClamp={1}
      aria-current="page"
    >
      {current.label}
    </Text>
  );

  const linkFor = (
    index: number,
    part: FocusPart,
    extra?: Record<string, unknown>
  ) => (
    <Link
      as={LinkAs as any}
      {...(items[index].linkProps as any)}
      href={items[index].href}
      data-breadcrumb-part={part}
      data-breadcrumb-index={index}
      data-breadcrumb-key={levelKeys[index]}
      {...(extra as any)}
    >
      {items[index].label}
    </Link>
  );

  const parts: Array<{ type: "level" | "trigger"; index: number }> = [];
  if (count >= 2) {
    for (let index = 0; index < count; index += 1) {
      if (index === hidden[0]) parts.push({ type: "trigger", index });
      if (!hidden.includes(index)) parts.push({ type: "level", index });
    }
  }

  const renderPart = (part: (typeof parts)[number], position: number) => {
    const separator = position > 0 ? <Separator measure={false} /> : null;

    if (part.type === "trigger") {
      return (
        <Box
          as="li"
          key="trigger"
          ref={triggerItemRef}
          display="flex"
          alignItems="center"
          flexShrink="0"
          position="relative"
          onBlur={handleTriggerItemBlur}
          onKeyDown={handleTriggerItemKeyDown}
        >
          {separator}
          <Box
            as="button"
            ref={triggerRef}
            type="button"
            aria-label={hiddenLevelsLabel}
            aria-expanded={isOpen}
            aria-controls={isOpen ? panelId : undefined}
            data-breadcrumb-part="trigger"
            display="flex"
            alignItems="center"
            backgroundColor="transparent"
            borderStyle="none"
            borderRadius="1"
            padding="none"
            cursor="pointer"
            onClick={() => (isOpen ? closePanel(true) : setOpen(true))}
          >
            <TriggerGlyph />
          </Box>
          {isOpen && (
            <Box
              as="ul"
              id={panelId}
              ref={panelRef}
              position="absolute"
              top="100%"
              left="0"
              zIndex="900"
              display="block"
              m="none"
              p="2"
              width="max-content"
              maxWidth="min(20rem, 90vw)"
              backgroundColor="neutral-background"
              borderStyle="solid"
              borderWidth="1"
              borderColor="neutral-surfaceHighlight"
              borderRadius="2"
              boxShadow="2"
            >
              {hidden.map((index) => (
                <Box as="li" key={levelKeys[index]} display="block" py="1">
                  {linkFor(index, "panel", {
                    onClick: (event: ReactMouseEvent<HTMLElement>) => {
                      (
                        items[index].linkProps?.onClick as
                          | ((e: ReactMouseEvent<HTMLElement>) => void)
                          | undefined
                      )?.(event);
                      // Closing right away would unmount the anchor before the browser follows it.
                      closeTimerRef.current = setTimeout(
                        () => closePanel(true),
                        0
                      );
                    }
                  })}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      );
    }

    const isCurrent = part.index === currentIndex;
    return (
      <Box
        as="li"
        key={levelKeys[part.index]}
        display="flex"
        alignItems="center"
        flexShrink={isCurrent ? "1" : "0"}
        minWidth={isCurrent ? "0" : undefined}
        overflow={isCurrent ? "hidden" : undefined}
      >
        {separator}
        {isCurrent ? currentLevel() : linkFor(part.index, "strip")}
      </Box>
    );
  };

  return (
    <Box
      {...rest}
      as="nav"
      className={className}
      aria-label={label}
      display="block"
      position="relative"
      width="100%"
      minWidth="0"
      onFocus={handleFocus}
      onBlur={handleNavBlur}
      ref={navRef}
    >
      <Box
        as="ol"
        display="flex"
        flexWrap="nowrap"
        alignItems="center"
        m="none"
        p="none"
      >
        {count === 1 ? (
          <Box
            as="li"
            display="flex"
            alignItems="center"
            flexShrink="1"
            minWidth="0"
            overflow="hidden"
          >
            {currentLevel()}
          </Box>
        ) : (
          parts.map(renderPart)
        )}
      </Box>
      {count >= 2 && (
        <Box
          aria-hidden="true"
          ref={measureRef}
          position="absolute"
          top="0"
          left="0"
          display="flex"
          flexWrap="nowrap"
          height="0"
          overflow="hidden"
          pointerEvents="none"
        >
          {items.map((item, index) => (
            <Box
              as="span"
              key={levelKeys[index]}
              display="flex"
              flexShrink="0"
              data-breadcrumb-measure="level"
            >
              <Text
                as="span"
                fontWeight={index === currentIndex ? "bold" : undefined}
              >
                {item.label}
              </Text>
            </Box>
          ))}
          <Separator measure />
          <Box
            as="span"
            display="flex"
            flexShrink="0"
            data-breadcrumb-measure="trigger"
          >
            <TriggerGlyph />
          </Box>
        </Box>
      )}
    </Box>
  );
};

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
