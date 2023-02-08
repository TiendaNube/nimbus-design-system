import { useContext } from "react";

import { AccordionContext, AccordionContextProps } from "../../contexts";

export const useAccordion: () => AccordionContextProps = () => {
  const context = useContext(AccordionContext);

  if (context == null || Object.keys(context).length === 0) {
    throw new Error(
      "AccordionHeader or AccordionBody components must be wrapped in <Accordion />"
    );
  }
  return context;
};
