import { Dispatch, SetStateAction } from "react";

export interface AccordionContextProps {
  selected: string;
  onSelect: Dispatch<SetStateAction<string>>;
}
