import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import {
  PolymorphicForwardRefComponent,
  useRefObjectAsForwardedRef,
} from "@nimbus-ds/typings";
import { segmentedControl } from "@nimbus-ds/styles";

import { generateID } from "../../segmentedControl.definitions";
import {
  SegmentedControlButtonComponents,
  SegmentedControlButtonProps,
} from "./SegmentedControlButton.types";
import { SegmentedControlButtonSkeleton } from "./components/SegmentedControlButtonSkeleton/SegmentedControlButtonSkeleton";

const SegmentedControlButton = forwardRef(
  (
    {
      className: _className,
      style: _style,
      as: As = "button",
      label,
      selected = false,
      disabled = false,
      fullWidth = false,
      children,
      ...rest
    }: SegmentedControlButtonProps & { as: any },
    ref
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    useRefObjectAsForwardedRef(ref, innerRef);

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

    // Generate a unique ID for the button and aria attributes
    const ariaID = generateID(label);

    const { classnames } = segmentedControl.subcomponents.button;
    const buttonClassName = [
      classnames.appearance[selected ? "selected" : "default"],
    ]
      .concat(fullWidth && classnames.fullWidth ? classnames.fullWidth : "")
      .filter(Boolean)
      .join(" ");

    return (
      <As
        {...(rest as any)}
        className={buttonClassName}
        id={`segment-${ariaID}`}
        role="button"
        aria-pressed={selected}
        disabled={disabled}
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
SegmentedControlButton.displayName = "SegmentedControlButton";
SegmentedControlButton.Skeleton.displayName = "SegmentedControlButton.Skeleton";

export { SegmentedControlButton };
