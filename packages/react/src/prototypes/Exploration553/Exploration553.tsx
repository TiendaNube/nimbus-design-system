import React from "react";
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
  /** Ancestors + current shown before the path collapses behind an ellipsis. */
  maxVisibleItems?: number;
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

const Separator: React.FC = () => <Icon source={<ChevronRightIcon />} />;

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  maxVisibleItems = 4,
}) => {
  if (items.length === 0) return null;

  const current = items[items.length - 1];
  const ancestors = items.slice(0, -1);
  const collapse = ancestors.length > maxVisibleItems - 1;
  const tailCount = Math.max(maxVisibleItems - 2, 1);
  const hiddenAncestors = collapse
    ? ancestors.slice(1, ancestors.length - tailCount)
    : [];
  const leadingAncestors = collapse ? [ancestors[0]] : ancestors;
  const trailingAncestors = collapse
    ? ancestors.slice(ancestors.length - tailCount)
    : [];

  const renderAncestor = (item: BreadcrumbItem) => (
    <React.Fragment key={item.id}>
      <Box display="flex" alignItems="center" gap="1" role="listitem">
        <Crumb item={item} />
      </Box>
      <Separator />
    </React.Fragment>
  );

  return (
    <Box as="nav" aria-label="Breadcrumb">
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap="1"
        role="list"
      >
        {leadingAncestors.map(renderAncestor)}
        {collapse && (
          <React.Fragment>
            <Box display="flex" alignItems="center" gap="1" role="listitem">
              <Popover
                position="bottom-start"
                content={
                  <Box display="flex" flexDirection="column" gap="1">
                    {hiddenAncestors.map((item) => (
                      <Link
                        key={item.id}
                        as="button"
                        type="button"
                        appearance="neutral"
                        textDecoration="none"
                        onClick={item.onNavigate}
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
                  aria-label={`Show ${hiddenAncestors.length} hidden path levels`}
                >
                  …
                </Link>
              </Popover>
            </Box>
            <Separator />
          </React.Fragment>
        )}
        {trailingAncestors.map(renderAncestor)}
        <Box display="flex" alignItems="center" role="listitem">
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
