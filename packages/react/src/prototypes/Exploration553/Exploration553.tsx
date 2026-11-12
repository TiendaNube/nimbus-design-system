import React, { useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Link } from "@nimbus-ds/link";
import { Icon } from "@nimbus-ds/icon";
import { ChevronRightIcon } from "@nimbus-ds/icons";

export interface Crumb {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  items: Crumb[];
  /** Max visible levels before middle levels collapse. 0 disables collapsing. */
  maxVisible?: number;
  onNavigate?: (crumb: Crumb) => void;
}

/** Simulated Breadcrumb composed from Link, Text and Icon. Not a production API. */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  maxVisible = 4,
  onNavigate,
}) => {
  const [expanded, setExpanded] = useState(false);
  const collapse = !expanded && maxVisible > 0 && items.length > maxVisible;
  const last = items.length - 1;

  type Entry = Crumb | "ellipsis";
  const entries: Entry[] = collapse
    ? [items[0], "ellipsis", ...items.slice(items.length - (maxVisible - 2))]
    : items;

  return (
    <nav aria-label="Breadcrumb">
      <Box
        as="ol"
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap="1"
        margin="none"
        padding="none"
        style={{ listStyle: "none" }}
      >
        {entries.map((entry, i) => {
          const isLast = i === entries.length - 1;
          return (
            <Box as="li" key={entry === "ellipsis" ? "ellipsis" : entry.href}
              display="flex" alignItems="center" gap="1" style={{ minWidth: 0 }}>
              {entry === "ellipsis" ? (
                <Link
                  as="button"
                  aria-label={`Show ${items.length - maxVisible + 1} hidden levels`}
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
                  title={entry.label}
                  style={{
                    display: "block",
                    maxWidth: "240px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {entry.label}
                </Text>
              ) : (
                <Link
                  href={entry.href}
                  appearance="neutral"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    onNavigate?.(entry);
                  }}
                >
                  {entry.label}
                </Link>
              )}
              {!isLast && (
                <Icon color="neutral-textDisabled" source={<ChevronRightIcon size="small" />} />
              )}
            </Box>
          );
        })}
      </Box>
    </nav>
  );
};

const short: Crumb[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Shirts", href: "#shirts" },
];
const long: Crumb[] = [
  { label: "Home", href: "#home" },
  { label: "Catalog", href: "#catalog" },
  { label: "Apparel", href: "#apparel" },
  { label: "Men", href: "#men" },
  { label: "Shirts", href: "#shirts" },
  { label: "Linen shirt – summer collection 2026 – relaxed fit, long sleeve, natural dye", href: "#linen" },
];

export const Exploration553: React.FC<{ maxVisible?: number }> = ({ maxVisible = 4 }) => {
  const [current, setCurrent] = useState<string>("");
  return (
    <Box display="flex" flexDirection="column" gap="6" padding="4" maxWidth="600px">
      <Text fontWeight="bold">Short path (3 levels)</Text>
      <Breadcrumb items={short} onNavigate={(c) => setCurrent(c.label)} />
      <Text fontWeight="bold">Long path (6 levels, collapses to {maxVisible})</Text>
      <Breadcrumb items={long} maxVisible={maxVisible} onNavigate={(c) => setCurrent(c.label)} />
      <Text fontWeight="bold">Narrow container (300px, wraps)</Text>
      <Box maxWidth="300px">
        <Breadcrumb items={long} maxVisible={0} onNavigate={(c) => setCurrent(c.label)} />
      </Box>
      <Text color="neutral-textLow">
        {current ? `Navigated to: ${current} (simulated)` : "Click an ancestor level to go back (simulated)."}
      </Text>
    </Box>
  );
};

export default Exploration553;
