import React, {
  forwardRef,
  createRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";
import { button } from "@nimbus-ds/styles";

import { ButtonProps, ButtonComponents } from "./button.types";
import { ButtonSkeleton } from "./components";

const Button = forwardRef(
  (
    {
      className: _className,
      style: _style,
      as: As = "button",
      appearance = "neutral",
      children,
      ...rest
    }: ButtonProps & { as: any },
    ref
  ) => {
    const innerRef = createRef<HTMLButtonElement>();
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

    return (
      <As
        {...rest}
        className={button.classnames.appearance[appearance]}
        ref={innerRef}
      >
        {children}
      </As>
    );
  }
) as PolymorphicForwardRefComponent<"button" | "a", ButtonProps> &
  ButtonComponents;

Button.Skeleton = ButtonSkeleton;
Button.displayName = "Button";
Button.Skeleton.displayName = "Button.Skeleton";

export { Button };
