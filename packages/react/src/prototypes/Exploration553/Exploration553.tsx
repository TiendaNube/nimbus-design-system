import React, { useMemo, useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Link } from "@nimbus-ds/link";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { ChevronRightIcon } from "@nimbus-ds/icons";

/**
 * Exploration-only types and component for Nimbus request #553 (Breadcrumb).
 * Not a proposed public API: props, names and behavior are simulated for this
 * Playground and are expected to change if a contract is drafted.
 */
export interface BreadcrumbItemData {
  id: string;
  label: string;
}

export interface BreadcrumbProps {
  /** Full path from the root to the current position. The last item is the current page. */
  items: BreadcrumbItemData[];
  /** Called when the person activates a non-current item to go back to that level. */
  onNavigate: (id: string) => void;
  /** Simulated "how many crumbs fit" budget — stands in for a real container-width measurement. */
  maxVisible?: number;
  /** Simulated small-viewport mode: this prototype cannot read real breakpoints, so a story toggle sets it. */
  compact?: boolean;
}

type VisibleEntry =
  | { kind: "item"; item: BreadcrumbItemData; isCurrent: boolean }
  | { kind: "ellipsis" };

function buildVisibleEntries(
  items: BreadcrumbItemData[],
  effectiveMax: number,
  expanded: boolean
): VisibleEntry[] {
  const lastIndex = items.length - 1;

  if (expanded || items.length <= effectiveMax) {
    return items.map((item, index) => ({
      kind: "item",
      item,
      isCurrent: index === lastIndex,
    }));
  }

  // Collapse every level between the root and the visible tail behind one
  // ellipsis. How many levels stay visible at the tail is a guess, not a
  // measured fit — recorded as a simulation.
  const tailCount = Math.max(effectiveMax - 1, 1);
  const tailStart = Math.max(items.length - tailCount, 1);

  const head: VisibleEntry = {
    kind: "item",
    item: items[0],
    isCurrent: 0 === lastIndex,
  };
  const tail: VisibleEntry[] = items.slice(tailStart).map((item, i) => ({
    kind: "item",
    item,
    isCurrent: tailStart + i === lastIndex,
  }));

  return [head, { kind: "ellipsis" }, ...tail];
}

const Separator: React.FC = () => (
  <Icon
    aria-hidden="true"
    color="neutral-textDisabled"
    source={<ChevronRightIcon />}
  />
);

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  maxVisible = 4,
  compact = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Simulated mobile treatment: shrink the budget instead of reading a real
  // media query. A production component would need an actual answer here.
  const effectiveMax = compact ? Math.min(maxVisible, 2) : maxVisible;

  const entries = useMemo(
    () => buildVisibleEntries(items, effectiveMax, expanded),
    [items, effectiveMax, expanded]
  );

  return (
    <Box
      as="nav"
      aria-label="Breadcrumb"
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      gap="1"
    >
      {entries.map((entry, position) => {
        const isLast = position === entries.length - 1;
        const key =
          entry.kind === "ellipsis" ? "ellipsis" : entry.item.id;

        return (
          <Box key={key} display="flex" alignItems="center" gap="1">
            {entry.kind === "ellipsis" ? (
              <Link
                as="button"
                appearance="neutral"
                textDecoration="none"
                onClick={() => setExpanded(true)}
                aria-label="Show hidden levels of this path"
              >
                …
              </Link>
            ) : entry.isCurrent ? (
              <Text
                as="span"
                fontWeight="bold"
                color="neutral-textHigh"
                aria-current="page"
              >
                {entry.item.label}
              </Text>
            ) : (
              <Link
                as="button"
                appearance="neutral"
                textDecoration="none"
                onClick={() => onNavigate(entry.item.id)}
              >
                {entry.item.label}
              </Link>
            )}
            {!isLast && <Separator />}
          </Box>
        );
      })}
    </Box>
  );
};

Breadcrumb.displayName = "Breadcrumb";
