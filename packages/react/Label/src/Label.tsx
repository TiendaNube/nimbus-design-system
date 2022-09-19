import React from "react";
import { label } from "@nimbus-ds/styles";

import { LabelProps, LabelComponents } from "./label.types";
import { Skeleton } from "./components";

const Label: React.FC<LabelProps> & LabelComponents = ({
  className: _className,
  style: _style,
  children,
  htmlFor,
  hidden = false,
  ...rest
}: LabelProps) => (
  <label {...rest} className={label.style({ hidden })} htmlFor={htmlFor}>
    {children}
  </label>
);

Label.Skeleton = Skeleton;

export { Label };
