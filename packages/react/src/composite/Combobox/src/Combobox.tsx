import React, { forwardRef } from "react";

import type { ComboboxProps } from "./combobox.types";

/**
 * Skeleton of the Combobox: the planned export and public types with an empty
 * render. The behavior is built on top of it, criterion by criterion.
 */
const Combobox = forwardRef<HTMLInputElement, ComboboxProps>((props, ref) => (
  <input
    ref={ref}
    role="combobox"
    aria-label={props["aria-label"]}
    aria-expanded={false}
    aria-controls=""
    readOnly
  />
));

Combobox.displayName = "Combobox";

export { Combobox };
