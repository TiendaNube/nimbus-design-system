import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
  HTMLAttributes,
  useState,
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
import { useSegmentedControlContext } from "../../SegmentedControlContext";

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
      onClick,
      ...rest
    }: SegmentedControlButtonProps & { as: any },
    ref
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    useRefObjectAsForwardedRef(ref, innerRef);

    // Context integration - get ID once on mount
    const context = useSegmentedControlContext();
    const [buttonId] = useState<number | null>(() => 
      context ? context.getNextId() : null
    );

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

    // Determine selection state and behavior based on context availability
    const isSelected = context && buttonId !== null 
      ? context.isSelected(buttonId) 
      : selected;
    
    const shouldUseFullWidth = context 
      ? context.fullWidth 
      : fullWidth;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (context && buttonId !== null) {
        // Use context toggle when within SegmentedControl
        context.toggleSegment(buttonId);
      }
      
      // Always call the original onClick handler
      onClick?.(event);
    };

    const { classnames } = segmentedControl.subcomponents.button;
    const buttonClassName = [
      classnames.appearance[isSelected ? "selected" : "default"],
    ]
      .concat(shouldUseFullWidth && classnames.fullWidth ? classnames.fullWidth : "")
      .filter(Boolean)
      .join(" ");

    return (
      <As
        id={`segment-${ariaID}`}
        role="button"
        {...(rest as HTMLAttributes<HTMLButtonElement>)}
        className={buttonClassName}
        aria-pressed={isSelected}
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
