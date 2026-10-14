import React, { useState } from "react";

import { Box } from "@nimbus-ds/box";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";
import { Tooltip } from "@nimbus-ds/tooltip";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  InfoCircleIcon,
} from "@nimbus-ds/icons";

/**
 * How a cell decides whether it is expandable (the API under comparison):
 * - "legacy": today's behaviour. Container `expandable` makes every cell
 *   interactive, even a cell without children.
 * - "explicit": proposed optional item prop `expandable`. Unset inherits the
 *   container; `false` opts out; a cell is only interactive if it has children.
 * - "derived": no new prop. A cell is interactive when the container is
 *   expandable and the cell has children.
 */
export type ExpandableApi = "legacy" | "explicit" | "derived";

export interface StatItem {
  id: string;
  value: string;
  description: string;
  infoTooltip?: string;
  /** Simulated proposed prop. Only read when api === "explicit". */
  expandable?: boolean;
  /** Content revealed when the cell is active. */
  details?: React.ReactNode;
}

export interface ExplorationPatterns204Props {
  items?: StatItem[];
  /** Container-level `expandable` (existing prop). */
  expandable?: boolean;
  api?: ExpandableApi;
}

const defaultItems: StatItem[] = [
  {
    id: "balance",
    value: "$ 12.450,00",
    description: "Available balance",
    infoTooltip: "Credit customers can still spend in the store.",
    details: (
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="medium" color="neutral-textHigh">
          Balance by origin
        </Text>
        <Text color="neutral-textLow">Refunds: $ 8.200,00</Text>
        <Text color="neutral-textLow">Manual credits: $ 4.250,00</Text>
      </Box>
    ),
  },
  { id: "issued", value: "$ 31.900,00", description: "Total issued" },
  { id: "used", value: "$ 19.450,00", description: "Total used" },
  { id: "customers", value: "86", description: "Customers with credit" },
];

const isExpandableItem = (
  item: StatItem,
  container: boolean,
  api: ExpandableApi
): boolean => {
  if (!container) return false;
  const hasChildren = Boolean(item.details);
  if (api === "legacy") return true;
  if (api === "derived") return hasChildren;
  return (item.expandable ?? container) && hasChildren;
};

const ExplorationPatterns204: React.FC<ExplorationPatterns204Props> = ({
  items = defaultItems,
  expandable = true,
  api = "explicit",
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = items.find((item) => item.id === activeId);
  const activeIsExpandable =
    active && isExpandableItem(active, expandable, api);

  const toggle = (id: string) => setActiveId((cur) => (cur === id ? null : id));

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      backgroundColor="neutral-background"
      boxShadow="2"
      borderRadius="2"
      overflow="hidden"
    >
      <Box display="flex" flexDirection="row" alignItems="stretch" padding="1">
        {items.map((item, index) => {
          const interactive = isExpandableItem(item, expandable, api);
          const isActive = interactive && activeId === item.id;
          const isLast = index === items.length - 1;
          return (
            <Box key={item.id} display="flex" flex="1" alignItems="stretch">
              <Box
                display="flex"
                flexDirection="column"
                gap="1"
                padding="2"
                flex="1"
                borderRadius="2"
                backgroundColor={{
                  xs: isActive ? "primary-surface" : "neutral-background",
                  ...(interactive && {
                    hover: isActive ? "primary-surface" : "neutral-surface",
                  }),
                }}
                cursor={interactive ? "pointer" : undefined}
                tabIndex={interactive ? 0 : undefined}
                role={interactive ? "button" : undefined}
                aria-expanded={interactive ? isActive : undefined}
                onClick={interactive ? () => toggle(item.id) : undefined}
                onKeyDown={
                  interactive
                    ? (event: React.KeyboardEvent) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggle(item.id);
                        }
                      }
                    : undefined
                }
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="2"
                >
                  <Text
                    fontSize="base"
                    fontWeight="medium"
                    color="neutral-textHigh"
                  >
                    {item.value}
                  </Text>
                  {interactive && (
                    <Icon
                      color="neutral-textLow"
                      source={
                        isActive ? (
                          <ChevronUpIcon size="small" />
                        ) : (
                          <ChevronDownIcon size="small" />
                        )
                      }
                    />
                  )}
                </Box>
                <Box display="flex" alignItems="center" gap="1">
                  <Text fontSize="caption" color="neutral-textLow">
                    {item.description}
                  </Text>
                  {item.infoTooltip && (
                    <Tooltip content={item.infoTooltip} position="bottom">
                      <Icon
                        color="neutral-textLow"
                        source={<InfoCircleIcon size="small" />}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Box>
              {!isLast && (
                <Box display="flex" alignItems="center" marginX="1">
                  <Box
                    width="1px"
                    height="100%"
                    backgroundColor="neutral-surfaceDisabled"
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
      {activeIsExpandable && active?.details && (
        <Box
          display="flex"
          flexDirection="column"
          padding="4"
          backgroundColor="neutral-background"
        >
          {active.details}
        </Box>
      )}
    </Box>
  );
};

ExplorationPatterns204.displayName = "ExplorationPatterns204";

export { ExplorationPatterns204 };
