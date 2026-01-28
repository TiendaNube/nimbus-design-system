import { useContext } from "react";

import type { AccordionItemContextProps } from "../../contexts";
import { AccordionItemContext } from "../../contexts";

export const useAccordionItem: () => AccordionItemContextProps = () => {
  const context = useContext(AccordionItemContext);

  if (context == null || Object.keys(context).length === 0) {
    throw new Error(
      "AccordionHeader or AccordionBody components must be wrapped in <AccordionItem />"
    );
  }
  return context;
};
