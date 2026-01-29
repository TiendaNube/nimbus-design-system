import { type Dispatch, type SetStateAction } from "react";

export interface CollapsibleContextProps {
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
}
