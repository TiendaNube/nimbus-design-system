import React from "react";
import { link } from "@nimbus-ds/styles";

import { LinkButtonProps } from "./linkButton.types";

const LinkButton: React.FC<LinkButtonProps> = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  textDecoration = "underline",
  size = "base",
  ...rest
}: LinkButtonProps) => (
  <button
    {...rest}
    type="button"
    className={[
      link.classnames.appearance[appearance],
      link.classnames.size[size],
      link.sprinkle({ textDecoration }),
    ].join(" ")}
  />
);

LinkButton.displayName = "Link.Button";

export { LinkButton };
