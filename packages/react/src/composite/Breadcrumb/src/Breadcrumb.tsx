import React, { type MouseEventHandler, useMemo } from "react";
import { breadcrumb } from "@nimbus-ds/styles";
import { Link } from "@nimbus-ds/link";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { ChevronRightIcon, EllipsisIcon } from "@nimbus-ds/icons";

import { type BreadcrumbItem, type BreadcrumbProps } from "./breadcrumb.types";
import {
  DEFAULT_ARIA_LABEL,
  DEFAULT_HIDDEN_LEVELS_LABEL,
  TRIGGER_KEY
} from "./breadcrumb.definitions";
import { getCollapsedPath, getVisibleLimit } from "./utils";
import { useHiddenLevelsPanel } from "./hooks";

const { classnames } = breadcrumb;

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  maxVisible,
  linkAs,
  ariaLabel = DEFAULT_ARIA_LABEL,
  hiddenLevelsLabel = DEFAULT_HIDDEN_LEVELS_LABEL
}: BreadcrumbProps) => {
  const limit = getVisibleLimit(maxVisible);
  const { visible, hidden } = useMemo(
    () => getCollapsedPath(items, limit),
    [items, limit]
  );
  const valueKey = useMemo(
    () =>
      JSON.stringify([
        limit,
        items.map(({ label, href }) => [label, href ?? null])
      ]),
    [items, limit]
  );
  const panel = useHiddenLevelsPanel(valueKey);

  if (!items.length) return null;

  // Link only types its intrinsic elements; consumers must render a native anchor.
  const LinkAs = (linkAs ?? "a") as "a";

  const renderLevel = (
    level: BreadcrumbItem,
    isCurrent: boolean,
    onClick?: MouseEventHandler<HTMLElement>
  ) => {
    if (isCurrent) {
      return (
        <Text
          as="span"
          aria-current="page"
          color="neutral-textHigh"
          fontWeight="bold"
          className={classnames.label}
        >
          {level.label}
        </Text>
      );
    }
    if (level.href === undefined) {
      return (
        <Text as="span" className={classnames.label}>
          {level.label}
        </Text>
      );
    }
    return (
      <Link
        as={LinkAs}
        href={level.href}
        appearance="neutral"
        textDecoration="none"
        className={classnames.label}
        onClick={onClick}
      >
        {level.label}
      </Link>
    );
  };

  const separator = (
    <span aria-hidden="true" className={classnames.separator}>
      <Icon source={<ChevronRightIcon />} />
    </span>
  );

  return (
    <nav aria-label={ariaLabel}>
      <ol className={classnames.list}>
        {visible.map((entry, position) => {
          const isLast = position === visible.length - 1;

          if (entry === "trigger") {
            return (
              <li
                key={TRIGGER_KEY}
                ref={panel.groupRef}
                className={classnames.item}
              >
                {/* Link renders a native button here; the rule reads Link as an anchor. */}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  as="button"
                  type="button"
                  ref={panel.triggerRef}
                  appearance="neutral"
                  textDecoration="none"
                  className={classnames.trigger}
                  aria-label={hiddenLevelsLabel}
                  aria-expanded={panel.open}
                  aria-controls={panel.open ? panel.panelId : undefined}
                  onClick={panel.toggle}
                >
                  <Icon aria-hidden="true" source={<EllipsisIcon />} />
                </Link>
                {panel.open && (
                  <nav
                    id={panel.panelId}
                    ref={panel.panelRef}
                    aria-label={hiddenLevelsLabel}
                    className={classnames.panel}
                    style={panel.floatingStyles}
                  >
                    <ol className={classnames.panelList}>
                      {hidden.map((level, index) => (
                        <li
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${index}-${level.label}`}
                          className={classnames.item}
                        >
                          {renderLevel(
                            level,
                            false,
                            panel.handlePanelLinkClick
                          )}
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                {separator}
              </li>
            );
          }

          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`${position}-${entry.label}`}
              className={classnames.item}
            >
              {renderLevel(entry, isLast)}
              {!isLast && separator}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
