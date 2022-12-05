import React from "react";
import { SearchIcon } from "@tiendanube/icons";
import { input } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";

import { SearchProps } from "./search.types";

const Search: React.FC<SearchProps> = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  ...rest
}) => (
  <div className={input.style.container}>
    <div data-testid="icon-search" className={input.style.append.start}>
      <Icon color="neutral.textDisabled" source={<SearchIcon />} />
    </div>
    <input
      {...rest}
      className={[
        input.style.inputAppearance[appearance],
        input.style.inputAppend.start,
      ].join(" ")}
      type="search"
    />
  </div>
);

Search.displayName = "Input.Search";

export { Search };
