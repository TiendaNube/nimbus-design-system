import React, { useId, useRef, useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Link } from "@nimbus-ds/link";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { ChevronRightIcon } from "@nimbus-ds/icons";
import { Popover } from "@nimbus-ds/popover";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbLinkRenderProps {
  item: BreadcrumbItem;
  index: number;
  href: string;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbProps {
  /**
   * Ordered path from the top of the hierarchy to the current level. The
   * last item is treated as the current, non-interactive position and is
   * never rendered through `renderLink` or a plain anchor.
   */
  items: BreadcrumbItem[];
  /**
   * Maximum number of levels shown before the path collapses behind an
   * expandable "…" control. Assumed to be 3 or higher.
   * @default 4
   */
  maxVisible?: number;
  /**
   * Called when the person activates an ancestor level with an unmodified
   * primary click (or its keyboard equivalent). Not called for
   * modifier-clicks, middle-clicks, or any click a `renderLink` override
   * already prevented, so the browser can still open the link in a new tab.
   */
  onNavigate?: (item: BreadcrumbItem, index: number) => void;
  /**
   * Renders each ancestor link, so a router-aware component (e.g. a
   * React Router or Next.js Link) can be substituted for the default plain
   * anchor. Breadcrumb does not depend on any specific router. Whatever is
   * returned must render a real anchor-like element and call the supplied
   * `onClick`, so native behavior (new tab, modifier-click) keeps working.
   * @default A Nimbus `Link` rendered with `href`.
   */
  renderLink?: (props: BreadcrumbLinkRenderProps) => React.ReactNode;
}

interface RenderEntry {
  key: string;
  kind: "item" | "ellipsis";
  item?: BreadcrumbItem;
  index?: number;
}

const isUnmodifiedPrimaryClick = (event: React.MouseEvent) =>
  event.button === 0 &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey;

const defaultRenderLink = ({ href, children, onClick }: BreadcrumbLinkRenderProps) => (
  <Link href={href} appearance="neutral" textDecoration="none" onClick={onClick}>
    {children}
  </Link>
);

interface HiddenLevelsMenuProps {
  items: { item: BreadcrumbItem; index: number }[];
  renderLink: (props: BreadcrumbLinkRenderProps) => React.ReactNode;
  createClickHandler: (
    item: BreadcrumbItem,
    index: number,
    afterNavigate?: () => void
  ) => (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Disclosure for the ancestor levels hidden by collapsing. Uses navigation
 * semantics (a "nav" landmark of real links), not a listbox: nothing here is
 * being selected as a value, each entry is a destination. A raw <button> with
 * an explicit reset is used for the trigger (not Box/Link) because neither
 * exposes a way to strip the browser's native button chrome (background,
 * border, border-radius) that made this control read as a circular pill; the
 * default focus outline is left untouched so keyboard focus stays visible.
 */
const HiddenLevelsMenu: React.FC<HiddenLevelsMenuProps> = ({
  items,
  renderLink,
  createClickHandler,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentId = useId();

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <Popover
      visible={open}
      onVisibility={(next) => (next ? setOpen(true) : close())}
      position="bottom-start"
      arrow={false}
      content={
        <Box
          as="nav"
          id={contentId}
          aria-label="Hidden levels"
          display="flex"
          flexDirection="column"
          gap="1"
        >
          {items.map(({ item, index }) => (
            <Box key={`hidden-${index}`}>
              {renderLink({
                item,
                index,
                href: item.href ?? "#",
                children: item.label,
                onClick: createClickHandler(item, index, close),
              })}
            </Box>
          ))}
        </Box>
      }
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label="Show hidden levels"
        aria-expanded={open}
        aria-controls={contentId}
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
    </Popover>
  );
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  maxVisible = 4,
  onNavigate,
  renderLink = defaultRenderLink,
}) => {
  const shouldCollapse = items.length > maxVisible;
  const tailCount = maxVisible - 2;
  const hiddenEnd = items.length - tailCount;

  const hiddenEntries = shouldCollapse
    ? items
        .slice(1, hiddenEnd)
        .map((item, offset) => ({ item, index: 1 + offset }))
    : [];

  const entries: RenderEntry[] = shouldCollapse
    ? [
        { key: "first", kind: "item", item: items[0], index: 0 },
        { key: "ellipsis", kind: "ellipsis" },
        ...items.slice(hiddenEnd).map((item, offset) => ({
          key: `tail-${offset}`,
          kind: "item" as const,
          item,
          index: hiddenEnd + offset,
        })),
      ]
    : items.map((item, index) => ({
        key: `item-${index}`,
        kind: "item" as const,
        item,
        index,
      }));

  const createClickHandler =
    (item: BreadcrumbItem, index: number, afterNavigate?: () => void) =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (event.defaultPrevented || !isUnmodifiedPrimaryClick(event)) {
        return;
      }
      event.preventDefault();
      onNavigate?.(item, index);
      afterNavigate?.();
    };

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
                  <HiddenLevelsMenu
                    items={hiddenEntries}
                    renderLink={renderLink}
                    createClickHandler={createClickHandler}
                  />
                ) : isLast ? (
                  <Text as="span" fontWeight="medium" aria-current="page">
                    {entry.item!.label}
                  </Text>
                ) : (
                  renderLink({
                    item: entry.item!,
                    index: entry.index!,
                    href: entry.item!.href ?? "#",
                    children: entry.item!.label,
                    onClick: createClickHandler(entry.item!, entry.index!),
                  })
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
