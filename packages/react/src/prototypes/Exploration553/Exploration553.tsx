import React, { useState, type ReactNode } from "react";
import { Box } from "@nimbus-ds/box";
import { Link } from "@nimbus-ds/link";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { ChevronRightIcon } from "@nimbus-ds/icons";

export interface BreadcrumbItem {
  /** Visible label for this level of the hierarchy. */
  label: string;
  /** Destination for this level. Omit for the current page (last item). */
  href?: string;
  /** Called instead of following `href`, e.g. for a client-side router. */
  onClick?: () => void;
}

export interface BreadcrumbProps {
  /** Ancestor levels first, current page last. */
  items: BreadcrumbItem[];
  /**
   * Once there are more than this many items, collapse the middle of the
   * trail behind an expandable "…". The first item and the last
   * `maxVisible - 1` items stay visible; clicking "…" reveals the rest
   * inline. Omit to always show the full trail.
   */
  maxVisible?: number;
  /** Visual separator rendered between levels. Defaults to a chevron icon. */
  separator?: ReactNode;
}

const LIST_RESET_CLASS = "nimbus-playground-breadcrumb-list";

type BreadcrumbNode =
  | { kind: "item"; item: BreadcrumbItem; originalIndex: number }
  | { kind: "ellipsis"; hiddenCount: number };

function buildNodes(
  items: BreadcrumbItem[],
  maxVisible: number | undefined,
  expanded: boolean
): BreadcrumbNode[] {
  const asItemNodes: BreadcrumbNode[] = items.map((item, originalIndex) => ({
    kind: "item",
    item,
    originalIndex,
  }));

  const shouldCollapse =
    !expanded &&
    typeof maxVisible === "number" &&
    maxVisible >= 2 &&
    items.length > maxVisible;

  if (!shouldCollapse) {
    return asItemNodes;
  }

  // maxVisible is defined and >= 2 here, guarded by shouldCollapse above.
  const tailCount = (maxVisible as number) - 1;
  const hiddenCount = items.length - 1 - tailCount;

  return [
    asItemNodes[0],
    { kind: "ellipsis", hiddenCount },
    ...asItemNodes.slice(asItemNodes.length - tailCount),
  ];
}

function DefaultSeparator() {
  return (
    <Icon
      source={<ChevronRightIcon size="small" />}
      color="neutral-textDisabled"
    />
  );
}

export function Breadcrumb({ items, maxVisible, separator }: BreadcrumbProps) {
  const [expanded, setExpanded] = useState(false);
  const nodes = buildNodes(items, maxVisible, expanded);
  const lastOriginalIndex = items.length - 1;
  const separatorNode = separator ?? <DefaultSeparator />;

  return (
    <Box as="nav" aria-label="Breadcrumb">
      {/*
        Box intentionally drops an inline `style` prop (see Box.tsx) and its
        style-prop surface has no `listStyleType`/`listStyle` token, so a
        native <ol> rendered through Box still shows default list markers.
        This scoped reset is the declared custom-CSS exception for that gap.
      */}
      <style>{`.${LIST_RESET_CLASS} { list-style: none; margin: 0; padding: 0; }`}</style>
      <Box
        as="ol"
        className={LIST_RESET_CLASS}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap="2"
      >
        {nodes.map((node, index) => {
          const isLastNode = index === nodes.length - 1;
          const key = node.kind === "item" ? `item-${node.originalIndex}` : "ellipsis";

          return (
            <Box as="li" key={key} display="flex" alignItems="center" gap="2">
              {node.kind === "ellipsis" ? (
                <Link
                  as="button"
                  type="button"
                  appearance="neutral"
                  textDecoration="none"
                  onClick={() => setExpanded(true)}
                  aria-label={`Show ${node.hiddenCount} hidden level${
                    node.hiddenCount === 1 ? "" : "s"
                  }`}
                >
                  …
                </Link>
              ) : node.originalIndex === lastOriginalIndex ? (
                <Text
                  as="span"
                  fontWeight="medium"
                  color="neutral-textHigh"
                  aria-current="page"
                >
                  {node.item.label}
                </Text>
              ) : (
                <Link
                  as="a"
                  href={node.item.href ?? "#"}
                  appearance="neutral"
                  textDecoration="none"
                  onClick={node.item.onClick}
                >
                  {node.item.label}
                </Link>
              )}
              {!isLastNode ? separatorNode : null}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
