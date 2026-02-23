import React from "react";
import { label } from "@nimbus-ds/styles";

import { type LabelProps, type LabelComponents } from "./label.types";
import { LabelSkeleton } from "./components";

const Label: React.FC<LabelProps> & LabelComponents = ({
  className,
  style: _style,
  children,
  htmlFor,
  hidden = false,
  ...rest
}: LabelProps) => (
  <label
    {...rest}
    className={[
      className,
      label.classnames.base,
      hidden ? label.classnames.hidden : "",
    ]
      .filter(Boolean)
      .join(" ")}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);

Label.Skeleton = LabelSkeleton;
Label.displayName = "Label";
Label.Skeleton.displayName = "Label.Skeleton";

export { Label };
