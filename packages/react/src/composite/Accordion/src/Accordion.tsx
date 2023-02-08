import React, { useState, useEffect, useMemo } from "react";

import { AccordionProps, AccordionComponents } from "./accordion.types";
import { AccordionBody, AccordionItem, AccordionHeader } from "./components";
import { AccordionContext } from "./contexts";

const Accordion: React.FC<AccordionProps> & AccordionComponents = ({
  className: _className,
  style: _style,
  children,
  selectedDefault,
  className,
  ...rest
}: AccordionProps) => {
  const [selected, onSelect] = useState("");

  useEffect(() => {
    if (selectedDefault) {
      onSelect(selectedDefault);
    }
  }, [selectedDefault]);

  const context = useMemo(
    () => ({
      selected,
      onSelect,
    }),
    [selected, onSelect]
  );

  return (
    <div {...rest}>
      <AccordionContext.Provider value={context}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

Accordion.Body = AccordionBody;
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.displayName = "Accordion";
Accordion.Body.displayName = "Accordion.Body";
Accordion.Item.displayName = "Accordion.Item";
Accordion.Header.displayName = "Accordion.Header";

export { Accordion };
