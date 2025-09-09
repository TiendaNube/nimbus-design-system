"use client";

import * as React from "react";
import { Box as NimbusBox } from "@nimbus-ds/components";

export type BoxProps = React.ComponentProps<typeof NimbusBox>;

export const Box: React.FC<BoxProps> = (props) => {
  return <NimbusBox {...props} />;
};

Box.displayName = "Box";

export default Box;


