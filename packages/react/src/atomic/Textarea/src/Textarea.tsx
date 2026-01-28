import type { ForwardRefExoticComponent, ComponentPropsWithRef } from "react";
import React, {
  forwardRef,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { textarea } from "@nimbus-ds/styles";

import type { TextareaComponents, TextareaBaseProps } from "./textarea.types";
import { TextareaSkeleton } from "./components";
import { adjustTextareaHeightFallback } from "./Textarea.definitions";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaBaseProps>(
  (
    {
      className: _className,
      style: _style,
      appearance = "neutral",
      aiGenerated = false,
      lines = 2,
      autoGrow = false,
      maxLines,
      minLines,
      id,
      resize = true,
      value,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const supportsFieldSizing = useMemo(
      () =>
        typeof CSS !== "undefined" &&
        CSS.supports &&
        CSS.supports("field-sizing", "content"),
      []
    );
    const lastScrollHeightRef = useRef<number>(0);

    // Adjust the height of the textarea based on the minLines and maxLines properties. Fallback for browsers that don't support field-sizing.
    const adjustTextareaHeight = useCallback(() => {
      const textarea = textAreaRef.current;
      if (!textarea || !autoGrow || supportsFieldSizing) return;

      const currentScrollHeight = textarea.scrollHeight;

      // Only call the fallback function if scrollHeight has changed
      if (currentScrollHeight !== lastScrollHeightRef.current) {
        adjustTextareaHeightFallback(textarea, minLines, maxLines);
        lastScrollHeightRef.current = currentScrollHeight;
      }
    }, [autoGrow, minLines, maxLines, supportsFieldSizing]);

    // AutoGrow fallback for browsers that don't support field-sizing
    useEffect(() => {
      // Initial height adjustment
      adjustTextareaHeight();
    }, [
      adjustTextareaHeight,
      autoGrow,
      supportsFieldSizing,
      value,
      defaultValue,
    ]);

    const handleRef = useCallback(
      (element: HTMLTextAreaElement | null) => {
        textAreaRef.current = element;
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          // eslint-disable-next-line no-param-reassign
          ref.current = element;
        }
      },
      [ref]
    );

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

    const handleInput = useCallback(
      (e: React.FormEvent<HTMLTextAreaElement>) => {
        rest.onInput?.(e);
        adjustTextareaHeight();
      },
      [rest, adjustTextareaHeight]
    );
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        rest.onChange?.(e);
        adjustTextareaHeight();
      },
      [rest, adjustTextareaHeight]
    );

    const className = [
      aiGenerated && textarea.classnames.aiGenerated,
      textarea.classnames.appearance[appearance],
      autoGrow && textarea.classnames.fieldSizing,
      textarea.classnames.resize[resize ? "enabled" : "disabled"],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <textarea
        {...rest}
        onInput={handleInput}
        onChange={handleChange}
        ref={handleRef}
        className={className}
        rows={lines}
        id={id}
        style={computedStyle}
        value={value}
        defaultValue={defaultValue}
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
