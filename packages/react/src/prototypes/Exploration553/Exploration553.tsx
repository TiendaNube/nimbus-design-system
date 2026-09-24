import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Link } from "@nimbus-ds/link";
import { Icon } from "@nimbus-ds/icon";
import { Popover } from "@nimbus-ds/popover";
import { ChevronRightIcon } from "@nimbus-ds/icons";

export interface BreadcrumbItem {
  id: string;
  label: string;
  onNavigate?: () => void;
}

export interface BreadcrumbProps {
  /** Full path from root to the current location, root first. */
  items: BreadcrumbItem[];
}

const Crumb: React.FC<{ item: BreadcrumbItem }> = ({ item }) => (
  <Link
    as="button"
    type="button"
    appearance="neutral"
    textDecoration="none"
    onClick={item.onNavigate}
  >
    {item.label}
  </Link>
);

const Separator: React.FC = () => (
  <Box flexShrink="0" display="flex" alignItems="center">
    <Icon source={<ChevronRightIcon />} />
  </Box>
);

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const current = items.length > 0 ? items[items.length - 1] : undefined;
  const ancestors = items.length > 0 ? items.slice(0, -1) : [];
  const pathKey = items.map((item) => item.id).join("/");

  // Number of ancestors (closest to the current item) kept visible before
  // the rest collapse behind the overflow trigger. Starts optimistic
  // (everything visible) and the shrink pass below trims it down.
  const [tailCount, setTailCount] = useState(ancestors.length);

  // Controlled so the trigger button can expose aria-expanded, and so a
  // selection inside the menu can close it explicitly (same pattern as
  // SplitButton.Secondary's Popover: visible/onVisibility, not the
  // uncontrolled default).
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    setTailCount(ancestors.length);
    // Re-measure from scratch whenever the path itself changes (navigation).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathKey]);

  // A path change means the previous menu content (the old hidden
  // ancestors) no longer applies to the current page; close it rather than
  // leaving a stale menu open after navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathKey]);

  // Single-line constraint: if the row overflows its container, hide one
  // more ancestor (from the root side) and try again. The current item is
  // never part of this count, so it is never removed.
  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (node.scrollWidth > node.clientWidth && tailCount > 0) {
      setTailCount((count) => Math.max(count - 1, 0));
    }
  }, [tailCount, pathKey]);

  // A container/viewport resize can free up space again: re-expand
  // optimistically and let the effect above shrink it back if it still
  // doesn't fit.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => {
      setTailCount(ancestors.length);
    });
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ancestors.length]);

  if (!current) return null;

  const hiddenAncestors = ancestors.slice(0, ancestors.length - tailCount);
  const visibleAncestors = ancestors.slice(ancestors.length - tailCount);
  const collapsed = hiddenAncestors.length > 0;

  const renderAncestor = (item: BreadcrumbItem) => (
    <React.Fragment key={item.id}>
      <Box
        flexShrink="0"
        display="flex"
        alignItems="center"
        gap="1"
        role="listitem"
      >
        <Crumb item={item} />
      </Box>
      <Separator />
    </React.Fragment>
  );

  return (
    <Box as="nav" aria-label="Breadcrumb">
      <Box
        ref={containerRef}
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        overflow="hidden"
        gap="1"
        role="list"
      >
        {collapsed && (
          <React.Fragment>
            <Box
              flexShrink="0"
              display="flex"
              alignItems="center"
              gap="1"
              role="listitem"
            >
              <Popover
                position="bottom-start"
                visible={menuOpen}
                onVisibility={setMenuOpen}
                content={
                  <Box display="flex" flexDirection="column" gap="1">
                    {hiddenAncestors.map((item) => (
                      <Link
                        key={item.id}
                        as="button"
                        type="button"
                        appearance="neutral"
                        textDecoration="none"
                        onClick={() => {
                          // Close first: navigation replaces the whole
                          // hidden-ancestor list this menu was built from.
                          setMenuOpen(false);
                          item.onNavigate?.();
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </Box>
                }
              >
                <Link
                  as="button"
                  type="button"
                  appearance="neutral"
                  textDecoration="none"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  aria-label={`Show ${hiddenAncestors.length} hidden path levels`}
                >
                  …
                </Link>
              </Popover>
            </Box>
            <Separator />
          </React.Fragment>
        )}
        {visibleAncestors.map(renderAncestor)}
        <Box flexShrink="0" display="flex" alignItems="center" role="listitem">
          <Text
            as="span"
            fontWeight="bold"
            color="neutral-textHigh"
            aria-current="page"
          >
            {current.label}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
