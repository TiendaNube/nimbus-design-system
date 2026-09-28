import React, { useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Link } from "@nimbus-ds/link";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { ChevronRightIcon } from "@nimbus-ds/icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  /**
   * Ordered path from the top of the hierarchy to the current level. The
   * last item is treated as the current, non-interactive position.
   */
  items: BreadcrumbItem[];
  /**
   * Maximum number of levels shown before the path collapses behind an
   * expandable "…" control. Assumed to be 3 or higher.
   * @default 4
   */
  maxVisible?: number;
  /**
   * Called when the person activates an ancestor level.
   */
  onNavigate?: (item: BreadcrumbItem, index: number) => void;
}

interface RenderEntry {
  key: string;
  kind: "item" | "ellipsis";
  item?: BreadcrumbItem;
  index?: number;
}

/**
 * Bare "…" disclosure trigger for hidden levels. A raw <button> with an
 * explicit reset is used here (not Box/Link) because neither exposes a way
 * to strip the browser's native button chrome (background, border,
 * border-radius) that made this control read as a circular pill; the
 * default focus outline is left untouched so keyboard focus stays visible.
 */
const EllipsisTrigger: React.FC<{ onExpand: () => void }> = ({
  onExpand,
}) => (
  <button
    type="button"
    aria-label="Show hidden levels"
    onClick={onExpand}
    style={{
      WebkitAppearance: "none",
      appearance: "none",
      background: "transparent",
      border: "none",
      borderRadius: 0,
      margin: 0,
      padding: "4px 6px",
      font: "inherit",
      color: "inherit",
      lineHeight: 1,
      cursor: "pointer",
    }}
  >
    <Text as="span" fontWeight="medium">
      …
    </Text>
  </button>
);

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  maxVisible = 4,
  onNavigate,
}) => {
  const [expanded, setExpanded] = useState(false);
  const shouldCollapse = !expanded && items.length > maxVisible;

  const entries: RenderEntry[] = shouldCollapse
    ? [
        { key: "first", kind: "item", item: items[0], index: 0 },
        { key: "ellipsis", kind: "ellipsis" },
        ...items
          .slice(items.length - (maxVisible - 2))
          .map((item, offset) => ({
            key: `tail-${offset}`,
            kind: "item" as const,
            item,
            index: items.length - (maxVisible - 2) + offset,
          })),
      ]
    : items.map((item, index) => ({
        key: `item-${index}`,
        kind: "item" as const,
        item,
        index,
      }));

  return (
    <Box as="nav" aria-label="Breadcrumb">
      <Box
        as="div"
        role="list"
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap="1"
      >
        {entries.map((entry, position) => {
          const isLast = position === entries.length - 1;

          return (
            <React.Fragment key={entry.key}>
              <Box as="div" role="listitem" display="flex" alignItems="center">
                {entry.kind === "ellipsis" ? (
                  <EllipsisTrigger onExpand={() => setExpanded(true)} />
                ) : isLast ? (
                  <Text as="span" fontWeight="medium" aria-current="page">
                    {entry.item!.label}
                  </Text>
                ) : (
                  <Link
                    href={entry.item!.href ?? "#"}
                    appearance="neutral"
                    textDecoration="none"
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate?.(entry.item!, entry.index!);
                    }}
                  >
                    {entry.item!.label}
                  </Link>
                )}
              </Box>
              {!isLast ? (
                <Box as="div" role="presentation" display="flex" alignItems="center">
                  <Icon source={<ChevronRightIcon />} />
                </Box>
              ) : null}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
