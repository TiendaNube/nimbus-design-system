import { Dispatch, SetStateAction } from "react";

export interface CollapsibleContextProps {
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
}
