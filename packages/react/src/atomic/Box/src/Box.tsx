import React, { ComponentPropsWithRef, forwardRef } from "react";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";
import { box } from "@nimbus-ds/styles";

import { BoxBaseProps } from "./box.types";

const Box = forwardRef(
  (
    {
      className: _className,
      style: _style,
      as: As = "div",
      boxSizing = "border-box",
      ...rest
    }: BoxBaseProps & { as: any },
    ref
  ) => {
    const { className, style, otherProps } = box.sprinkle({
      ...(rest as Parameters<typeof box.sprinkle>[0]),
      boxSizing,
    });

    return <As ref={ref} className={className} style={style} {...otherProps} />;
  }
) as PolymorphicForwardRefComponent<"div", BoxBaseProps>;

Box.displayName = "Box";

export type BoxProps = ComponentPropsWithRef<typeof Box>;
export { Box };
