import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GenerativeStarsIcon, TiendanubeIcon } from "@nimbus-ds/icons";
import { iconButton } from "@nimbus-ds/styles";
import { argTypesConvert } from ".storybook/utils";
import { IconButton } from "./IconButton";

TiendanubeIcon.displayName = "TiendanubeIcon";

const meta: Meta<typeof IconButton> = {
  title: "Atomic/IconButton",
  component: IconButton,
  argTypes: {
    source: { control: { disable: true } },
    ...argTypesConvert(iconButton.properties),
    disabled: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const basic: Story = {
  args: {
    size: "1.75rem",
    source: <TiendanubeIcon size="small" />,
  },
};

export const transparent: Story = {
  args: {
    size: "1.75rem",
    appearance: "transparent",
    source: <TiendanubeIcon size="small" />,
  },
};

export const aiGenerative: Story = {
  args: {
    size: "1.75rem",
    color: "neutral-surface",
    appearance: "ai-generative",
    source: <GenerativeStarsIcon size="small" />,
  },
};

export const aiSecondary: Story = {
  args: {
    size: "1.75rem",
    color: "ai-gradientPurpleHigh",
    appearance: "ai-secondary",
    source: <GenerativeStarsIcon size="small" />,
  },
};

export const small: Story = {
  args: {
    size: "1.5rem",
    source: <TiendanubeIcon size="small" />,
  },
};

export const medium: Story = {
  args: {
    size: "1.75rem",
    source: <TiendanubeIcon size="small" />,
  },
};
