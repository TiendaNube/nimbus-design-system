import React, {
  forwardRef,
  createRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";
import { link } from "@nimbus-ds/styles";

import { LinkProps, LinkComponents } from "./link.types";
import { LinkSkeleton } from "./components";

const Link = forwardRef(
  (
    {
      className: _className,
      style: _style,
      as: As = "a",
      appearance = "neutral",
      textDecoration = "underline",
      size = "base",
      children,
      ...rest
    }: LinkProps & { as: any },
    ref
  ) => {
    const innerRef = createRef<HTMLAnchorElement>();
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
        {...rest}
        className={[
          link.classnames.appearance[appearance],
          link.classnames.size[size],
          link.sprinkle({ textDecoration }),
        ].join(" ")}
        ref={innerRef}
      >
        {children}
      </As>
    );
  }
) as PolymorphicForwardRefComponent<"a" | "button", LinkProps> & LinkComponents;

Link.Skeleton = LinkSkeleton;
Link.displayName = "Link";
Link.Skeleton.displayName = "Link.Skeleton";

export { Link };
