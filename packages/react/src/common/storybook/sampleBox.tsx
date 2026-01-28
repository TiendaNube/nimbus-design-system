import React from "react";
import type { BoxProps } from "@nimbus-ds/box";
import { Box } from "@nimbus-ds/box";

/**
 * A styled container component for Storybook examples that provides
 * consistent centering and visual boundaries for component demonstrations.
+ */
export const SampleBox = ({ children, ...props }: BoxProps) => (
  <Box
    height="100%"
    width="100%"
    borderRadius="4"
    borderStyle="dashed"
    borderWidth="1"
    borderColor="primary-surfaceHighlight"
    padding="2"
    display="flex"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    {children}
  </Box>
);
