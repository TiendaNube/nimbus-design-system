import React, {
  type ComponentPropsWithRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type ForwardedRef,
} from "react";
import {
  type PolymorphicForwardRefComponent,
  useRefObjectAsForwardedRef,
} from "@nimbus-ds/typings";
import { link } from "@nimbus-ds/styles";

import { type LinkBaseProps, type LinkComponents } from "./link.types";
import { LinkSkeleton } from "./components";

const Link = forwardRef(
  (
    {
      className: _className,
      style: _style,
      as: As = "a",
      children,
      ...props
    }: LinkBaseProps & { as: any },
    ref
  ) => {
    const {
      appearance = "neutral",
      textDecoration = "underline",
      fontSize = "base",
      lineHeight = "base",
      ...rest
    } = props;

    const innerRef = useRef<HTMLAnchorElement>(null);
    useRefObjectAsForwardedRef(
      ref as ForwardedRef<HTMLAnchorElement | null>,
      innerRef
    );

    useImperativeHandle<
      HTMLAnchorElement | HTMLButtonElement | null,
      HTMLAnchorElement | null
    >(ref, () => innerRef?.current);

    useEffect(() => {
      if (
        innerRef.current &&
        !(innerRef.current instanceof HTMLButtonElement) &&
        !(innerRef.current instanceof HTMLAnchorElement)
      ) {
        console.error(
          "Error: Found `Link` component that renders an inaccessible element",
          innerRef.current,
          "Please ensure `Link` always renders as <a> or <button>"
        );
      }
    }, [innerRef]);

    return (
      <As
        {...(rest as any)}
        className={[
          link.classnames.appearance[appearance],
          link.sprinkle({ textDecoration, fontSize, lineHeight }),
        ].join(" ")}
        ref={innerRef}
      >
        {children}
      </As>
    );
  }
) as PolymorphicForwardRefComponent<"a" | "button", LinkBaseProps> &
  LinkComponents;

Link.Skeleton = LinkSkeleton;
Link.displayName = "Link";
Link.Skeleton.displayName = "Link.Skeleton";

export type LinkProps = ComponentPropsWithRef<typeof Link>;
export { Link };
