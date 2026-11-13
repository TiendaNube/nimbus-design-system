import React from "react";
import { combobox } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";
import { ChevronRightIcon } from "@nimbus-ds/icons";

import type { ComboboxValuePathProps } from "./ComboboxValuePath.types";

const CHEVRON_SIZE = 12;

/**
 * Full path of a selected hierarchical value, painted over the text input with
 * decorative chevrons between levels. When it does not fit, its start is
 * truncated with an ellipsis so the option's own label stays visible.
 */
const ComboboxValuePath: React.FC<ComboboxValuePathProps> = ({ path }) => (
  <span className={combobox.classnames.valuePath} aria-hidden="true">
    <span className={combobox.classnames.valuePathText}>
      <span className={combobox.classnames.valuePathInner}>
        {path.map((option, position) => (
          <React.Fragment key={option.value}>
            {position > 0 && (
              <span className={combobox.classnames.valuePathSeparator}>
                <Icon
                  source={<ChevronRightIcon size={CHEVRON_SIZE} />}
                  color="neutral-textLow"
                />
              </span>
            )}
            {option.label}
          </React.Fragment>
        ))}
      </span>
    </span>
  </span>
);

ComboboxValuePath.displayName = "ComboboxValuePath";

export { ComboboxValuePath };
