import React, { forwardRef } from "react";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";
import { box } from "@nimbus-ds/styles";

import { BoxProps } from "./box.types";

const Box = forwardRef(
  (
    {
      className: _className,
      style: _style,
      as: As = "div",
      ...rest
    }: BoxProps & { as: any },
    ref
  ) => {
    const { className, style, otherProps } = box.sprinkle(
      rest as Parameters<typeof box.sprinkle>[0]
    );

    return <As ref={ref} className={className} style={style} {...otherProps} />;
  }
) as PolymorphicForwardRefComponent<"div", BoxProps>;

Box.displayName = "Box";
export { Box };
