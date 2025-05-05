import React, {
  ComponentPropsWithRef,
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
  useCallback,
} from "react";
import {
  PolymorphicForwardRefComponent,
  useRefObjectAsForwardedRef,
} from "@nimbus-ds/typings";
import { segmentedControl } from "@nimbus-ds/styles";

import { generateID } from "../../segmentedControl.definitions";
import {
  SegmentedControlButtonBaseProps,
  SegmentedControlButtonComponents,
} from "./SegmentedControlButton.types";
import { SegmentedControlButtonSkeleton } from "./components/SegmentedControlButtonSkeleton/SegmentedControlButtonSkeleton";

const SegmentedControlButton = forwardRef(
  (
    {
      className: _className,
      style: _style,
      as: As = "button",
      label,
      active = false,
      index,
      setActiveSegment,
      disabled = false,
      ...rest
    }: SegmentedControlButtonBaseProps & { as: any },
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

    const handleOnClick = useCallback(() => {
      if (!disabled) {
        setActiveSegment(index);
      }
    }, [setActiveSegment, index, disabled]);

    const ariaID = generateID(label);

    // Using Nimbus DS styles
    const appearance = active ? "selected" : "default";

    // Combine classNames for appearance and fullWidth if needed
    const buttonClassName =
      segmentedControl.subcomponents.button.classnames.appearance[appearance];

    return (
      <As
        {...(rest as any)}
        className={buttonClassName}
        onClick={handleOnClick}
        type={As === "button" ? "button" : undefined}
        id={`segment-${ariaID}`}
        role="button"
        aria-pressed={active}
        disabled={disabled}
        ref={innerRef}
      >
        {label}
      </As>
    );
  }
) as PolymorphicForwardRefComponent<
  "button" | "a",
  SegmentedControlButtonBaseProps
> &
  SegmentedControlButtonComponents;

SegmentedControlButton.Skeleton = SegmentedControlButtonSkeleton;
SegmentedControlButton.displayName = "SegmentedControlButton";
SegmentedControlButton.Skeleton.displayName = "SegmentedControlButton.Skeleton";

export type SegmentedControlButtonProps = ComponentPropsWithRef<
  typeof SegmentedControlButton
>;
export { SegmentedControlButton };
