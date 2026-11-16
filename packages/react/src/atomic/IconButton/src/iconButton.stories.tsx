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
    // Only the Norte UI sizes from Figma, plus the theme default (no value),
    // so stories do not promote hand-picked sizes.
    size: {
      control: "select",
      options: ["default", "small", "medium"],
      mapping: {
        default: undefined,
        small: "1.5rem",
        medium: "1.75rem",
      },
      description:
        "small = 24px, medium = 28px. Without a value it uses the theme default (44px, or 28px under Norte UI).",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// No size: shows the theme default (44px, or 28px under Norte UI).
export const basic: Story = {
  args: {
    source: <TiendanubeIcon size="small" />,
  },
};

export const small: Story = {
  args: {
    size: "small",
    source: <TiendanubeIcon size="small" />,
  },
};

export const medium: Story = {
  args: {
    size: "medium",
    source: <TiendanubeIcon size="small" />,
  },
};

export const transparent: Story = {
  args: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    source: <TiendanubeIcon size="small" />,
  },
};

export const disabled: Story = {
  args: {
    disabled: true,
    source: <TiendanubeIcon size="small" />,
  },
};

export const primaryColor: Story = {
  args: {
    color: "primary-textHigh",
    source: <TiendanubeIcon size="small" />,
  },
};

export const aiGenerative: Story = {
  args: {
    color: "neutral-surface",
    appearance: "ai-generative",
    source: <GenerativeStarsIcon size="small" />,
  },
};

export const aiGenerativeDisabled: Story = {
  args: {
    color: "neutral-textDisabled",
    appearance: "ai-generative",
    source: <GenerativeStarsIcon size="small" />,
    disabled: true,
  },
};

export const aiGenerativeSurface: Story = {
  args: {
    borderColor: "transparent",
    color: "ai-generative",
    backgroundColor: "ai-generativeSurface",
    source: <GenerativeStarsIcon size="small" />,
  },
};
