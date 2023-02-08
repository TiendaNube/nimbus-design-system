import React, { useMemo } from "react";

import { AccordionItemContext } from "../../contexts";
import { AccordionItemProps } from "./accordionItem.types";

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  index,
  testId,
}) => {
  const context = useMemo(() => ({ index, testId }), [index, testId]);
  return (
    <AccordionItemContext.Provider value={context}>
      {children}
    </AccordionItemContext.Provider>
  );
};

export { AccordionItem };
