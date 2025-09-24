import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ComponentPropsWithRef,
  useMemo,
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
      autoGrow = false,
      maxLines,
      minLines,
      id,
      resize = true,
      ...rest
    },
    ref
  ) => {
    const computedStyle: React.CSSProperties = useMemo(
      () => ({
        ...(maxLines && {
          maxHeight: `calc(${maxLines}lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))`,
          overflowY: "auto",
        }),
        ...(minLines && {
          minHeight: `calc(${minLines}lh + var(--textarea-vertical-padding) + var(--textarea-vertical-borders))`,
        }),
      }),
      [maxLines, minLines]
    );

    const className = [
      textarea.classnames.appearance[appearance],
      autoGrow && textarea.classnames.fieldSizing,
      textarea.classnames.resize[resize ? "enabled" : "disabled"],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <textarea
        {...rest}
        ref={ref}
        className={className}
        rows={lines}
        id={id}
        style={computedStyle}
      />
    );
  }
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
