import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ComponentPropsWithRef,
} from "react";
import { textarea } from "@nimbus-ds/styles";

import { TextareaComponents, TextareaBaseProps } from "./textarea.types";
import { TextareaSkeleton } from "./components";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaBaseProps>(
  (
    {
      className: _className,
      style: _style,
      appearance = "neutral",
      lines = 2,
      id,
      ...rest
    },
    ref
  ) => (
    <textarea
      {...rest}
      ref={ref}
      className={textarea.classnames.appearance[appearance]}
      rows={lines}
      id={id}
    />
  )
) as ForwardRefExoticComponent<
  TextareaBaseProps &
    React.InputHTMLAttributes<HTMLTextAreaElement> &
    React.RefAttributes<HTMLTextAreaElement>
> &
  TextareaComponents;

Textarea.displayName = "Textarea";
Textarea.Skeleton = TextareaSkeleton;
Textarea.Skeleton.displayName = "Textarea.Skeleton";

export type TextareaProps = ComponentPropsWithRef<typeof Textarea>;
export { Textarea };
