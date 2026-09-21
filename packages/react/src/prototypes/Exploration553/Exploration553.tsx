import React, { useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Link } from "@nimbus-ds/link";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { ChevronRightIcon } from "@nimbus-ds/icons";

export interface Exploration553Item {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface Exploration553Props {
  items: Exploration553Item[];
  maxVisibleItems?: number;
}

type Slot = Exploration553Item | null;

const Separator = () => (
  <Icon color="neutral-textLow" source={<ChevronRightIcon />} />
);

export function Exploration553({
  items,
  maxVisibleItems = 4,
}: Exploration553Props) {
  const [expanded, setExpanded] = useState(false);

  const collapsible = maxVisibleItems >= 2 && items.length > maxVisibleItems;
  const shouldCollapse = collapsible && !expanded;

  const slots: Slot[] = shouldCollapse
    ? [items[0], null, ...items.slice(items.length - (maxVisibleItems - 1))]
    : items;

  return (
    <Box as="nav" aria-label="Breadcrumb">
      <Box
        role="list"
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap="1"
      >
        {slots.map((item, index) => {
          const isLast = index === slots.length - 1;
          const key = item ? `${item.label}-${index}` : `ellipsis-${index}`;

          return (
            <Box
              key={key}
              role="listitem"
              display="flex"
              alignItems="center"
              gap="1"
            >
              {item === null ? (
                <Link
                  as="button"
                  type="button"
                  appearance="neutral"
                  textDecoration="none"
                  aria-label="Show hidden breadcrumb levels"
                  onClick={() => setExpanded(true)}
                >
                  …
                </Link>
              ) : isLast ? (
                <Text
                  as="span"
                  color="neutral-textHigh"
                  fontWeight="medium"
                  aria-current="page"
                >
                  {item.label}
                </Text>
              ) : (
                <Link
                  as={item.href ? "a" : "button"}
                  type={item.href ? undefined : "button"}
                  href={item.href}
                  appearance="neutral"
                  textDecoration="none"
                  onClick={item.onClick}
                >
                  {item.label}
                </Link>
              )}
              {!isLast && <Separator />}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
