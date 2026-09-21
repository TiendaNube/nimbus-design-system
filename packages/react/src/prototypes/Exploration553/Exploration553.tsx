import React, { useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Link } from "@nimbus-ds/link";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { IconButton } from "@nimbus-ds/icon-button";
import { ChevronRightIcon, EllipsisIcon } from "@nimbus-ds/icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /**
   * Number of items to keep visible (including the current page) before
   * collapsing the middle of the trail behind an expand control.
   * Simulated behavior: Nimbus has no shipped collapse pattern for
   * breadcrumbs today, this is the gap the prototype explores.
   */
  maxVisible?: number;
}

function Separator() {
  return (
    <Icon
      source={<ChevronRightIcon size="small" />}
      color="neutral-textDisabled"
    />
  );
}

function Crumb({
  item,
  isCurrent,
}: {
  item: BreadcrumbItem;
  isCurrent: boolean;
}) {
  if (isCurrent || !item.href) {
    return (
      <Text
        as="span"
        color={isCurrent ? "neutral-textHigh" : "neutral-textDisabled"}
        aria-current={isCurrent ? "page" : undefined}
      >
        {item.label}
      </Text>
    );
  }

  return (
    <Link as="a" href={item.href} textDecoration="none" appearance="primary">
      {item.label}
    </Link>
  );
}

export function Breadcrumb({ items, maxVisible = 3 }: BreadcrumbProps) {
  const [expanded, setExpanded] = useState(false);
  const currentItem = items[items.length - 1];

  const shouldCollapse = !expanded && items.length > maxVisible;
  const visibleItems = shouldCollapse
    ? [items[0], ...items.slice(items.length - (maxVisible - 1))]
    : items;
  const collapsedCount = items.length - visibleItems.length;

  return (
    <Box as="nav" aria-label="Breadcrumb">
      <Box
        as="ol"
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap="1"
        padding="none"
        margin="none"
      >
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isFirst = index === 0;
          const showEllipsisAfterThis = shouldCollapse && isFirst;

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <Box as="li" display="flex" alignItems="center" gap="1">
                <Crumb item={item} isCurrent={item === currentItem} />
              </Box>
              {!isLast && <Separator />}
              {showEllipsisAfterThis && (
                <>
                  <Box as="li" display="flex" alignItems="center">
                    <IconButton
                      source={<EllipsisIcon size="small" />}
                      color="neutral-textLow"
                      aria-label={`Show ${collapsedCount} hidden breadcrumb item${
                        collapsedCount === 1 ? "" : "s"
                      }`}
                      onClick={() => setExpanded(true)}
                    />
                  </Box>
                  <Separator />
                </>
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
}
