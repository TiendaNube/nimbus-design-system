import React from "react";
import { removeStylesProperties } from "@nimbus/properties";

import { TitleProps } from "./title.types";

const Title: React.FC<TitleProps> = ({ children, as: As = "h1", ...rest }) => {
  removeStylesProperties(rest);
  return <As {...rest}>{children}</As>;
};

export { Title };
