import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
  HTMLAttributes,
  ForwardedRef,
} from "react";
import {
  PolymorphicForwardRefComponent,
  useRefObjectAsForwardedRef,
} from "@nimbus-ds/typings";
import { segmentedControl } from "@nimbus-ds/styles";

import {
  SegmentedControlButtonComponents,
  SegmentedControlButtonProps,
} from "./SegmentedControlButton.types";
import { SegmentedControlButtonSkeleton } from "./components/SegmentedControlButtonSkeleton/SegmentedControlButtonSkeleton";
import { useSegmentedControlContext } from "../../contexts/SegmentedControlContext";

const SegmentedControlButton = forwardRef(
  (
    {
      className: _className,
      style: _style,
      as: As = "button",
      id,
      label,
      disabled = false,
      fullWidth = false,
      children,
      onClick,
      ...rest
    }: SegmentedControlButtonProps & { as: any },
    ref
  ) => {
    const innerRef = useRef<HTMLButtonElement | null>(null);
    useRefObjectAsForwardedRef(
      ref as ForwardedRef<HTMLButtonElement | null>,
      innerRef
    );

    const context = useSegmentedControlContext();

    // Register and unregister with the provided ID
    useEffect(() => {
      if (!id) return undefined;

      context.registerButton(id);

      return () => {
        context.unregisterButton(id);
      };
    }, [context, id]);

    useImperativeHandle<
      HTMLButtonElement | HTMLAnchorElement | null,
      HTMLButtonElement | null
    >(ref, () => innerRef?.current);

    useEffect(() => {
      if (
        innerRef.current &&
        !(innerRef.current instanceof HTMLAnchorElement) &&
        !(innerRef.current instanceof HTMLButtonElement)
      ) {
        console.error(
          "Error: Found `SegmentedControlButton` component that renders an inaccessible element",
          innerRef.current,
          "Please ensure `SegmentedControlButton` always renders as <a> or <button>"
        );
      }
    }, [innerRef]);

    // Use the context value to determine if the button is selected, or default to the selected prop
    const isSelected = context.isSelected(id);

    const shouldUseFullWidth = context ? context.fullWidth : fullWidth;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (context && id) {
        context.toggleSegment(id);
      }

      onClick?.(event);
    };

    const { classnames } = segmentedControl.subcomponents.button;
    const buttonClassName = [
      classnames.appearance[isSelected ? "selected" : "default"],
    ]
      .concat(shouldUseFullWidth ? classnames.fullWidth : "")
      .join(" ");

    return (
      <As
        id={id}
        role="button"
        {...(rest as HTMLAttributes<HTMLButtonElement>)}
        className={buttonClassName}
        aria-pressed={isSelected}
        aria-label={label}
        disabled={disabled}
        onClick={handleClick}
        ref={innerRef}
      >
        {children}
      </As>
    );
  }
) as PolymorphicForwardRefComponent<
  "button" | "a",
  SegmentedControlButtonProps
> &
  SegmentedControlButtonComponents;

SegmentedControlButton.Skeleton = SegmentedControlButtonSkeleton;
SegmentedControlButton.Skeleton.displayName = "SegmentedControlButton.Skeleton";

export { SegmentedControlButton };
