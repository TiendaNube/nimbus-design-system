"use client";

import * as React from "react";
import { Button as NimbusButton } from "@nimbus-ds/components";

export type ButtonProps = React.ComponentProps<typeof NimbusButton>;

export const Button: React.FC<ButtonProps> = (props) => {
  return <NimbusButton {...props} />;
};

Button.displayName = "Button";

export default Button;


