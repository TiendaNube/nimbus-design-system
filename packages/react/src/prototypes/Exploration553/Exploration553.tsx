import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Link } from "@nimbus-ds/link";
import { Icon } from "@nimbus-ds/icon";
import { IconButton } from "@nimbus-ds/icon-button";
import { Popover } from "@nimbus-ds/popover";
import { ChevronRightIcon, EllipsisIcon } from "@nimbus-ds/icons";

/**
 * Exploration for issue #553 (Breadcrumb component request), iteration 2.
 * Composed entirely from existing Nimbus atomic/composite components; no
 * production export, no new package. See stories.tsx for scenarios.
 *
 * Iteration 1 collapsed the trail by a fixed item count. Per human review,
 * this iteration collapses by measured container width instead: the first
 * and current levels always stay visible, and whatever no longer fits
 * between them moves into the overflow menu. The measurement lives inside
 * Breadcrumb itself, not a shared primitive, per the same review.
 */

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  onNavigate?: (item: BreadcrumbItem) => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const ITEM_MAX_WIDTH = "240px";
// Mirrors the `gap="1"` token (packages/core/tokens/src/spacing/ref.json,
// 0.25rem) used on the row below, so the fit math matches actual layout.
const GAP_PX = 4;

function TruncatedLabel({
  label,
  isCurrent,
}: {
  label: string;
  isCurrent: boolean;
}) {
  return (
    <Box minWidth="0" maxWidth={ITEM_MAX_WIDTH} overflow="hidden">
      <Text
        as="p"
        title={label}
        fontSize="caption"
        fontWeight={isCurrent ? "bold" : "regular"}
        color={isCurrent ? "neutral-textHigh" : "neutral-textLow"}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {label}
      </Text>
    </Box>
  );
}

function BreadcrumbSeparator() {
  return (
    <Box display="flex" alignItems="center" flexShrink="0" aria-hidden="true">
      <Icon source={<ChevronRightIcon />} color="neutral-textLow" />
    </Box>
  );
}

function BreadcrumbLink({ item }: { item: BreadcrumbItem }) {
  return (
    <Link
      as="a"
      href={item.href ?? "#"}
      appearance="neutral"
      fontSize="caption"
      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
        if (item.onNavigate) {
          event.preventDefault();
          item.onNavigate(item);
        }
      }}
    >
      <TruncatedLabel label={item.label} isCurrent={false} />
    </Link>
  );
}

function CurrentBreadcrumbItem({ item }: { item: BreadcrumbItem }) {
  return (
    <Box aria-current="page">
      <TruncatedLabel label={item.label} isCurrent />
    </Box>
  );
}

function HiddenLevelsMenu({ items }: { items: BreadcrumbItem[] }) {
  return (
    <Popover
      position="bottom-start"
      content={
        <Box display="flex" flexDirection="column" gap="1" minWidth="180px">
          {items.map((item) => (
            <BreadcrumbLink key={item.id} item={item} />
          ))}
        </Box>
      }
    >
      <IconButton
        source={<EllipsisIcon />}
        aria-label={`Show ${items.length} hidden breadcrumb ${
          items.length === 1 ? "level" : "levels"
        }`}
      />
    </Popover>
  );
}

type TrailNode =
  | { kind: "item"; item: BreadcrumbItem; isCurrent: boolean }
  | { kind: "menu"; items: BreadcrumbItem[] };

/**
 * Off-screen copies of every level, the separator, and the overflow trigger,
 * built from the same components the visible trail renders, so their
 * measured widths match what actually gets painted. Box discards a
 * consumer-supplied `style` prop (confirmed in Box.tsx), so the off-screen
 * wrapper is a plain element, not a Box.
 */
function useTrailWidths(items: BreadcrumbItem[]) {
  const [widths, setWidths] = useState<Record<string, number>>({});
  const [chrome, setChrome] = useState<{
    separator: number;
    overflow: number;
  } | null>(null);
  const itemNodes = useRef(new Map<string, HTMLDivElement>());
  const separatorNode = useRef<HTMLDivElement | null>(null);
  const overflowNode = useRef<HTMLDivElement | null>(null);
  const measureKey = items.map((item) => `${item.id}:${item.label}`).join("|");

  useLayoutEffect(() => {
    const nextWidths: Record<string, number> = {};
    itemNodes.current.forEach((node, id) => {
      nextWidths[id] = node.getBoundingClientRect().width;
    });
    setWidths(nextWidths);

    if (separatorNode.current && overflowNode.current) {
      setChrome({
        separator: separatorNode.current.getBoundingClientRect().width,
        overflow: overflowNode.current.getBoundingClientRect().width,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measureKey]);

  const ruler = (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: -9999,
        left: -9999,
        display: "flex",
        visibility: "hidden",
        pointerEvents: "none",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          ref={(node) => {
            if (node) {
              itemNodes.current.set(item.id, node);
            } else {
              itemNodes.current.delete(item.id);
            }
          }}
        >
          <TruncatedLabel label={item.label} isCurrent={false} />
        </div>
      ))}
      <div ref={separatorNode}>
        <BreadcrumbSeparator />
      </div>
      <div ref={overflowNode}>
        <IconButton source={<EllipsisIcon />} aria-label="" />
      </div>
    </div>
  );

  return { widths, chrome, ruler };
}

function useContainerWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(node);
    setWidth(node.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}

/**
 * Picks how many trailing middle levels (closest to the current one) still
 * fit, given every node's measured width. Checked from the largest
 * candidate count down, rather than accumulated incrementally, because
 * whether the overflow trigger itself is needed depends on whether any
 * middle levels remain hidden, which changes the width budget.
 */
function fitMiddleItems(
  middleItems: BreadcrumbItem[],
  widths: Record<string, number>,
  chrome: { separator: number; overflow: number },
  firstWidth: number,
  lastWidth: number,
  containerWidth: number
) {
  for (let shown = middleItems.length; shown >= 0; shown--) {
    const hidden = middleItems.slice(0, middleItems.length - shown);
    const visible = middleItems.slice(middleItems.length - shown);
    if (visible.some((item) => widths[item.id] == null)) {
      continue;
    }
    const hasMenu = hidden.length > 0;
    const nodeCount = 2 + visible.length + (hasMenu ? 1 : 0);
    const nodesWidth =
      firstWidth +
      lastWidth +
      visible.reduce((sum, item) => sum + widths[item.id], 0) +
      (hasMenu ? chrome.overflow : 0);
    const separatorsWidth = (nodeCount - 1) * chrome.separator;
    const gapsWidth = (2 * nodeCount - 2) * GAP_PX;

    if (nodesWidth + separatorsWidth + gapsWidth <= containerWidth) {
      return { visible, hidden };
    }
  }
  return { visible: [] as BreadcrumbItem[], hidden: middleItems };
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const { ref: containerRef, width: containerWidth } = useContainerWidth();
  const { widths, chrome, ruler } = useTrailWidths(items);

  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const middleItems = items.length > 2 ? items.slice(1, -1) : [];

  const nodes = useMemo<TrailNode[]>(() => {
    if (items.length === 0) {
      return [];
    }
    if (items.length === 1) {
      return [{ kind: "item", item: firstItem, isCurrent: true }];
    }
    if (
      containerWidth == null ||
      chrome == null ||
      widths[firstItem.id] == null ||
      widths[lastItem.id] == null
    ) {
      // Not measured yet: collapse every middle level so the first paint
      // never overflows its container.
      return [
        { kind: "item", item: firstItem, isCurrent: false },
        ...(middleItems.length > 0
          ? [{ kind: "menu", items: middleItems } as TrailNode]
          : []),
        { kind: "item", item: lastItem, isCurrent: true },
      ];
    }

    const { visible, hidden } = fitMiddleItems(
      middleItems,
      widths,
      chrome,
      widths[firstItem.id],
      widths[lastItem.id],
      containerWidth
    );

    return [
      { kind: "item", item: firstItem, isCurrent: false },
      ...(hidden.length > 0
        ? [{ kind: "menu", items: hidden } as TrailNode]
        : []),
      ...visible.map(
        (item) => ({ kind: "item", item, isCurrent: false } as TrailNode)
      ),
      { kind: "item", item: lastItem, isCurrent: true },
    ];
  }, [items, containerWidth, chrome, widths, firstItem, lastItem, middleItems]);

  if (items.length === 0) {
    return null;
  }

  return (
    <Box as="nav" aria-label="Breadcrumb">
      {ruler}
      <Box
        ref={containerRef}
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        gap="1"
        overflow="hidden"
        minWidth="0"
        role="list"
      >
        {nodes.map((node, index) => (
          <React.Fragment key={node.kind === "menu" ? "menu" : node.item.id}>
            {index > 0 && <BreadcrumbSeparator />}
            <Box
              display="flex"
              alignItems="center"
              minWidth="0"
              flexShrink="0"
              role="listitem"
            >
              {node.kind === "menu" ? (
                <HiddenLevelsMenu items={node.items} />
              ) : node.isCurrent ? (
                <CurrentBreadcrumbItem item={node.item} />
              ) : (
                <BreadcrumbLink item={node.item} />
              )}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
