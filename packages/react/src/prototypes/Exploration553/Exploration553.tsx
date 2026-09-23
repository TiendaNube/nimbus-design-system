import React, { useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Link } from "@nimbus-ds/link";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { Popover } from "@nimbus-ds/popover";
import { ChevronRightIcon, ChevronLeftIcon } from "@nimbus-ds/icons";

// Prototype-only: explores a possible Breadcrumb anatomy for Nimbus.
// Nimbus has no Breadcrumb component today, so every prop, collapsing rule
// and the compact treatment below are simulations for this experiment, not
// an implemented or approved contract.

export interface Exploration553Item {
  label: string;
  href?: string;
  onNavigate?: (item: Exploration553Item, index: number) => void;
}

export interface Exploration553Props {
  /**
   * Ordered path from the root of the hierarchy to the current page.
   * The last item is treated as the current position and is never a link.
   */
  items: Exploration553Item[];
  /**
   * Simulated collapsing rule: when there are more items than this, the
   * middle ones are hidden behind an expandable "…" affordance.
   * Real Nimbus tokens/breakpoints for this threshold do not exist yet.
   * @default 4
   */
  maxVisible?: number;
  /**
   * Simulates a narrow/mobile treatment (a single "back to parent" link)
   * instead of the full path. There is no real responsive hook wired up:
   * this is a manual toggle standing in for a breakpoint decision.
   * @default false
   */
  compact?: boolean;
}

function Separator() {
  return (
    <Icon
      source={<ChevronRightIcon />}
      color="neutral-textDisabled"
      aria-hidden="true"
    />
  );
}

function Crumb({
  item,
  index,
  isCurrent,
}: {
  item: Exploration553Item;
  index: number;
  isCurrent: boolean;
}) {
  if (isCurrent) {
    return (
      <Text
        as="span"
        fontWeight="medium"
        color="neutral-textHigh"
        aria-current="page"
      >
        {item.label}
      </Text>
    );
  }

  return (
    <Link
      as={item.href ? "a" : "button"}
      href={item.href}
      appearance="neutral"
      textDecoration="none"
      onClick={(event: React.SyntheticEvent) => {
        if (item.onNavigate) {
          if (!item.href) event.preventDefault();
          item.onNavigate(item, index);
        }
      }}
    >
      {item.label}
    </Link>
  );
}

function CollapsedCrumbs({
  hiddenItems,
}: {
  hiddenItems: { item: Exploration553Item; index: number }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      visible={open}
      onVisibility={setOpen}
      position="bottom-start"
      content={
        <Box display="flex" flexDirection="column" gap="1">
          {hiddenItems.map(({ item, index }) => (
            <Crumb key={index} item={item} index={index} isCurrent={false} />
          ))}
        </Box>
      }
    >
      <Link
        as="button"
        appearance="neutral"
        textDecoration="none"
        aria-label="Show hidden levels in this path"
        aria-expanded={open}
      >
        …
      </Link>
    </Popover>
  );
}

export function Exploration553({
  items,
  maxVisible = 4,
  compact = false,
}: Exploration553Props) {
  if (items.length === 0) return null;

  const lastIndex = items.length - 1;

  if (compact) {
    const parent = items.length > 1 ? items[lastIndex - 1] : null;
    return (
      <Box
        as="nav"
        aria-label="Breadcrumb"
        display="flex"
        alignItems="center"
        gap="1"
      >
        {parent && (
          <>
            <Icon
              source={<ChevronLeftIcon />}
              color="neutral-textLow"
              aria-hidden="true"
            />
            <Crumb item={parent} index={lastIndex - 1} isCurrent={false} />
          </>
        )}
        {!parent && (
          <Text as="span" fontWeight="medium" color="neutral-textHigh">
            {items[lastIndex].label}
          </Text>
        )}
      </Box>
    );
  }

  let visibleEntries: { item: Exploration553Item; index: number }[];
  let hiddenEntries: { item: Exploration553Item; index: number }[] = [];

  const allEntries = items.map((item, index) => ({ item, index }));

  if (items.length > maxVisible && maxVisible >= 3) {
    const headCount = 1;
    const tailCount = maxVisible - headCount - 1;
    const head = allEntries.slice(0, headCount);
    const tail = allEntries.slice(allEntries.length - tailCount);
    hiddenEntries = allEntries.slice(headCount, allEntries.length - tailCount);
    visibleEntries = [...head, ...tail];
  } else {
    visibleEntries = allEntries;
  }

  return (
    <Box
      as="nav"
      aria-label="Breadcrumb"
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      gap="1"
    >
      {visibleEntries.map(({ item, index }, position) => {
        const isFirstVisible = position === 0;
        const showCollapseHere =
          hiddenEntries.length > 0 && index === hiddenEntries[0].index - 1;

        return (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            gap="1"
            as="span"
          >
            {!isFirstVisible && <Separator />}
            <Crumb item={item} index={index} isCurrent={index === lastIndex} />
            {showCollapseHere && (
              <>
                <Separator />
                <CollapsedCrumbs hiddenItems={hiddenEntries} />
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
