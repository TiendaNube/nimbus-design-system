import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiendanubeIcon } from "@nimbus-ds/icons";
import { Box } from "@nimbus-ds/box";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Atomic/Icon",
  component: Icon,
  argTypes: {
    source: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const basic: Story = {
  args: {
    source: <TiendanubeIcon />,
    color: "primary-textLow",
  },
};

export const large: Story = {
  args: {
    source: <TiendanubeIcon size="large" />,
    color: "primary-textLow",
  },
};

export const medium: Story = {
  args: {
    source: <TiendanubeIcon size="medium" />,
    color: "primary-textLow",
  },
};

export const small: Story = {
  args: {
    source: <TiendanubeIcon size="small" />,
    color: "primary-textLow",
  },
};

export const gradientColored: Story = {
  args: {
    source: <TiendanubeIcon size="large" />,
    color: "ai-generative",
  },
};

/**
 * Figma (Norte UI) `Size` maps to the `size` prop of the `@nimbus-ds/icons` SVG
 * passed as `source`: small = 16px, medium = 24px, large = 32px.
 */
export const sizes: Story = {
  render: (args) => (
    <Box display="flex" alignItems="center" gap="4">
      <Icon {...args} source={<TiendanubeIcon size="large" />} />
      <Icon {...args} source={<TiendanubeIcon size="medium" />} />
      <Icon {...args} source={<TiendanubeIcon size="small" />} />
    </Box>
  ),
  args: {
    color: "neutral-textHigh",
  },
};
