import React, { useMemo } from "react";

import { AccordionItemContext } from "../../contexts";
import { AccordionItemProps } from "./accordionItem.types";

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  index,
  interactive = true,
  testId,
}) => {
  const context = useMemo(
    () => ({ index, interactive, testId }),
    [index, interactive, testId]
  );
  return (
    <AccordionItemContext.Provider value={context}>
      {children}
    </AccordionItemContext.Provider>
  );
};

export { AccordionItem };
