import React from "react";
import { Box } from "@nimbus-ds/box";
import { Link } from "@nimbus-ds/link";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { ChevronRightIcon } from "@nimbus-ds/icons";

/**
 * Gap: Box has no `listStyle` sprinkle property, so the default <ol> markers
 * cannot be removed through Box props alone. This scoped class is the
 * declared custom-CSS exception for that single rule; everything else
 * (spacing, layout, color) uses Box/Text/Link/Icon props and tokens.
 */
const LIST_RESET_CLASS = "nimbus-exploration553-list";

export interface Exploration553Item {
  label: string;
  href?: string;
}

export interface Exploration553Props {
  items: Exploration553Item[];
  /**
   * true (default): hides the middle ancestors below the `md` breakpoint and
   * shows an ellipsis instead, keeping the first level and the last two
   * always visible. false: keeps every level and wraps onto multiple lines.
   * The two values are the two collapse strategies this prototype compares.
   */
  collapseOnMobile?: boolean;
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

export function Exploration553({
  items,
  collapseOnMobile = true,
}: Exploration553Props) {
  const lastIndex = items.length - 1;
  const canCollapse = collapseOnMobile && items.length > 3;
  const hiddenStart = 1;
  const hiddenEnd = lastIndex - 2;

  return (
    <Box as="nav" aria-label="Breadcrumb">
      <style>{`.${LIST_RESET_CLASS} { list-style: none; }`}</style>
      <Box
        as="ol"
        role="list"
        className={LIST_RESET_CLASS}
        display="flex"
        alignItems="center"
        flexWrap={collapseOnMobile ? "nowrap" : "wrap"}
        gap="1"
        padding="none"
        margin="none"
      >
        {items.map((item, index) => {
          const isCurrent = index === lastIndex;
          const isHiddenOnMobile =
            canCollapse && index >= hiddenStart && index <= hiddenEnd;

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              {isHiddenOnMobile && index === hiddenStart && (
                <Box
                  as="li"
                  display={{ xs: "flex", md: "none" }}
                  alignItems="center"
                  gap="1"
                >
                  <Text as="span" color="neutral-textDisabled" fontSize="base">
                    …
                  </Text>
                  <Separator />
                </Box>
              )}
              <Box
                as="li"
                display={
                  isHiddenOnMobile ? { xs: "none", md: "flex" } : "flex"
                }
                alignItems="center"
                gap="1"
              >
                {isCurrent ? (
                  <Text
                    as="span"
                    color="neutral-textHigh"
                    fontWeight="medium"
                    aria-current="page"
                  >
                    {item.label}
                  </Text>
                ) : (
                  <Link href={item.href} appearance="neutral">
                    {item.label}
                  </Link>
                )}
                {!isCurrent && <Separator />}
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
}
