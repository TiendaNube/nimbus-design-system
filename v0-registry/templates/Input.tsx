"use client";

import * as React from "react";
import { Input as NimbusInput } from "@nimbus-ds/components";

export type InputProps = React.ComponentProps<typeof NimbusInput>;

export const Input: React.FC<InputProps> = (props) => {
  return <NimbusInput {...props} />;
};

Input.displayName = "Input";

export default Input;


