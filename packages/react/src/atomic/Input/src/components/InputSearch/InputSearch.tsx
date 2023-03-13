import React from "react";
import { SearchIcon } from "@nimbus-ds/icons";
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
    <div
      data-testid="icon-search"
      className={input.classnames.container__icon_append.start}
    >
      <Icon color="neutral-textDisabled" source={<SearchIcon />} />
    </div>
    <input
      {...rest}
      className={[
        input.classnames.appearance[appearance],
        input.classnames.container__input_append.start,
      ].join(" ")}
      type="search"
    />
  </div>
);

export { InputSearch };
