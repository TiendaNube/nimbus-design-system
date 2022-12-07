import React from "react";
import { textarea } from "@nimbus-ds/styles";

import { TextareaComponents, TextareaProps } from "./textarea.types";
import { Skeleton } from "./components";

const Textarea: React.FC<TextareaProps> & TextareaComponents = ({
  className: _className,
  style: _style,
  appearance = "neutral",
  lines = 2,
  id,
  ...rest
}: TextareaProps) => (
  <textarea
    {...rest}
    className={textarea.style.appearance[appearance]}
    rows={lines}
    id={id}
  />
);

Textarea.Skeleton = Skeleton;

export { Textarea };