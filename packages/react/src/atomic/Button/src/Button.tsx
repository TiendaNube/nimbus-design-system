import React, {
  ComponentPropsWithRef,
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import {
  PolymorphicForwardRefComponent,
  useRefObjectAsForwardedRef,
} from "@nimbus-ds/typings";
import { button } from "@nimbus-ds/styles";

import { ButtonBaseProps, ButtonComponents } from "./button.types";
import { ButtonSkeleton } from "./components";

const Button = forwardRef(
  (
    {
      className: _className,
      style: _style,
      as: As = "button",
      children,
      ...props
    }: ButtonBaseProps & { as: any },
    ref
  ) => {
    const { appearance = "neutral", fullWidth = false, ...rest } = props;
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
          "Error: Found `Button` component that renders an inaccessible element",
          innerRef.current,
          "Please ensure `Button` always renders as <a> or <button>"
        );
      }
    }, [innerRef]);

    const buttonClasses = [
      button.classnames.appearance[appearance],
      fullWidth && button.classnames.fullWidth,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <As
        {...(rest as any)}
        className={buttonClasses}
        ref={innerRef}
      >
        {children}
      </As>
    );
  }
) as PolymorphicForwardRefComponent<"button" | "a", ButtonBaseProps> &
  ButtonComponents;

Button.Skeleton = ButtonSkeleton;
Button.displayName = "Button";
Button.Skeleton.displayName = "Button.Skeleton";

export type ButtonProps = ComponentPropsWithRef<typeof Button>;
export { Button };
