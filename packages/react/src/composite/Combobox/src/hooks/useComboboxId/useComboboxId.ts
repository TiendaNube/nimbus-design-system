import { useRef } from "react";
import { useId } from "@floating-ui/react";

let fallbackCounter = 0;

/**
 * A unique id for each Combobox instance. `useId` of Floating UI is React's
 * own on React 18 and later; on React 17 it is `undefined` until the first
 * effect, so each instance takes a unique fallback until then (instances never
 * share an id, so the ids that reference each other stay unambiguous).
 */
export const useComboboxId = (): string => {
  const generated = useId();
  const fallback = useRef<string | null>(null);
  if (fallback.current === null) {
    fallbackCounter += 1;
    fallback.current = `nimbus-combobox-${fallbackCounter}`;
  }
  return (generated ?? fallback.current).replace(/:/g, "");
};
