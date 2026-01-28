import React, { useMemo } from "react";
import { accordion } from "@nimbus-ds/styles";

import type { AccordionBodyProps } from "./accordionBody.types";
import { useAccordion, useAccordionItem } from "../../hooks";

const AccordionBody: React.FC<AccordionBodyProps> = ({
  className: _className,
  style: _style,
  children,
  borderBottom = "none",
  borderTop = "none",
  padding = "base",
  ...rest
}) => {
  const { selected } = useAccordion();
  const { index } = useAccordionItem();

  const isOpen = useMemo(() => selected === index, [selected, index]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={[
        accordion.classnames.body,
        accordion.sprinkle({ borderBottom, borderTop, padding }),
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
};

export { AccordionBody };
