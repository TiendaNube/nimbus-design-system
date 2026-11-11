import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Icon } from "../../Icon";

const meta: Meta<typeof Icon.Skeleton> = {
  title: "atomic/Icon/Icon.Skeleton",
  component: Icon.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon.Skeleton>;

export const basic: Story = { args: {} };

/**
 * Figma (Norte UI) `size` expressed with the existing `width` / `height` props:
 * small = 16px (default), medium = 24px, large = 32px.
 */
export const sizes: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap="4">
      <Icon.Skeleton width="2rem" height="2rem" />
      <Icon.Skeleton width="1.5rem" height="1.5rem" />
      <Icon.Skeleton />
    </Box>
  ),
};
