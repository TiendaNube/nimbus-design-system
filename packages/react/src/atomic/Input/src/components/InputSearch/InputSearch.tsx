import React from "react";
import { SearchIcon } from "@tiendanube/icons";
import { input } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import { InputSearchProps } from "./inputSearch.types";

const InputSearch: React.FC<InputSearchProps> = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  ...rest
}) => (
  <div className={input.classnames.container}>
    <div data-testid="icon-search" className={input.classnames.append.start}>
      <Icon color="neutral.textDisabled" source={<SearchIcon />} />
    </div>
    <input
      {...rest}
      className={[
        input.classnames.inputAppearance[appearance],
        input.classnames.inputAppend.start,
      ].join(" ")}
      type="search"
    />
  </div>
);

InputSearch.displayName = "Input.Search";

export { InputSearch };
