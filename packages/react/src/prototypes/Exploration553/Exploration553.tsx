import React from "react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Link } from "@nimbus-ds/link";
import { Icon } from "@nimbus-ds/icon";
import { IconButton } from "@nimbus-ds/icon-button";
import { Popover } from "@nimbus-ds/popover";
import { ChevronRightIcon, EllipsisIcon } from "@nimbus-ds/icons";

/**
 * Exploration for issue #553 (Breadcrumb component request).
 * Composed entirely from existing Nimbus atomic/composite components; no
 * production export, no new package. See stories.tsx for scenarios.
 */

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  onNavigate?: (item: BreadcrumbItem) => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /**
   * Number of levels shown before the middle of the trail collapses behind
   * an overflow menu. The first level and the trailing levels (up to this
   * count) always stay visible.
   */
  maxVisible?: number;
}

const TRUNCATE_WIDTH = "160px";

function TruncatedLabel({
  label,
  isCurrent,
}: {
  label: string;
  isCurrent: boolean;
}) {
  return (
    <Box minWidth="0" maxWidth={TRUNCATE_WIDTH} overflow="hidden">
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

export function Breadcrumb({ items, maxVisible = 4 }: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  const lastItem = items[items.length - 1];
  const firstItem = items[0];
  const shouldCollapse = items.length > maxVisible;
  const tailCount = Math.max(maxVisible - 1, 1);
  const tailItems = shouldCollapse ? items.slice(-tailCount) : items.slice(1);
  const hiddenItems = shouldCollapse
    ? items.slice(1, items.length - tailCount)
    : [];

  return (
    <Box as="nav" aria-label="Breadcrumb">
      <Box
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        gap="1"
        overflow="hidden"
        minWidth="0"
        role="list"
      >
        <Box
          display="flex"
          alignItems="center"
          minWidth="0"
          role="listitem"
        >
          {firstItem === lastItem ? (
            <CurrentBreadcrumbItem item={firstItem} />
          ) : (
            <BreadcrumbLink item={firstItem} />
          )}
        </Box>

        {hiddenItems.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <Box display="flex" alignItems="center" flexShrink="0" role="listitem">
              <HiddenLevelsMenu items={hiddenItems} />
            </Box>
          </>
        )}

        {tailItems.map((item) => {
          const isCurrent = item === lastItem;
          return (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              minWidth="0"
              gap="1"
            >
              <BreadcrumbSeparator />
              <Box display="flex" alignItems="center" minWidth="0" role="listitem">
                {isCurrent ? (
                  <CurrentBreadcrumbItem item={item} />
                ) : (
                  <BreadcrumbLink item={item} />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
