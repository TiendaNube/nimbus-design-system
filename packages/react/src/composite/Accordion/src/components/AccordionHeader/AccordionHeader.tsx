import React, { useCallback } from "react";
import { Title } from "@nimbus-ds/title";
import { Text } from "@nimbus-ds/text";
import { Icon as NimbusIcon } from "@nimbus-ds/icon";
import { ChevronDownIcon, ChevronUpIcon } from "@nimbus-ds/icons";
import { accordion } from "@nimbus-ds/styles";

import type { AccordionHeaderProps } from "./accordionHeader.types";
import { useAccordion, useAccordionItem } from "../../hooks";

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  className: _className,
  style: _style,
  children,
  title,
  subtitle,
  icon,
  noIconToggle = false,
  borderTop = "base",
  borderBottom,
  ...rest
}) => {
  const { selected, onSelect } = useAccordion();
  const { index, interactive = true, testId } = useAccordionItem();

  const isOpen = selected === index;

  const handleSelect = useCallback(
    () => onSelect(isOpen ? "" : index),
    [isOpen, index, onSelect]
  );

  // Shared content between interactive and static variants
  const headerContent = (
    <div className={accordion.classnames.header__content}>
      {typeof children === "function"
        ? children({
            selected,
            index,
          })
        : children}

      <div className={accordion.classnames.header__description}>
        {icon && <NimbusIcon source={icon} color="primary-textHigh" />}
        <div className={accordion.classnames.header__title}>
          {title && (
            <Title data-testid="accordion-header-title" as="h5">
              {title}
            </Title>
          )}
          {subtitle && (
            <Text fontSize="caption" data-testid="accordion-header-subtitle">
              {subtitle}
            </Text>
          )}
        </div>
      </div>

      {!noIconToggle && interactive && (
        <NimbusIcon
          data-testid="accordion-icon-Toggle"
          color="primary-textHigh"
          source={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        />
      )}
    </div>
  );

  // Render as static div when not interactive
  if (!interactive) {
    return (
      <div
        data-testid={testId || `accordion-header-${index}`}
        {...rest}
        className={[
          accordion.classnames.header_static,
          accordion.sprinkle({
            borderTop,
            borderBottom,
          }),
        ].join(" ")}
      >
        {headerContent}
      </div>
    );
  }

  // Render as interactive button (default behavior)
  return (
    <button
      type="button"
      data-testid={testId || `accordion-header-${index}`}
      {...rest}
      onClick={handleSelect}
      className={[
        accordion.classnames.header,
        accordion.sprinkle({
          borderTop,
          borderBottom: !isOpen ? borderBottom : "none",
        }),
        isOpen && accordion.classnames.header_active,
      ].join(" ")}
    >
      {headerContent}
    </button>
  );
};

export { AccordionHeader };
