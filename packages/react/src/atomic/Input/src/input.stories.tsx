import React, { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiendanubeIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";

import type { InputProps } from "./Input";
import { Input as InputComponent } from "./Input";

export const Basic: React.FC<InputProps> = forwardRef((props: InputProps) => (
  <InputComponent {...props} />
)) as React.FC<InputProps>;
Basic.displayName = "Input";

const meta: Meta<typeof Basic> = {
  title: "Atomic/Input",
  component: Basic,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Basic>;

export const basic: Story = {
  args: {
    placeholder: "Placeholder",
  },
};

export const iconStart: Story = {
  args: {
    placeholder: "Placeholder",
    append: <Icon source={<TiendanubeIcon />} />,
    appendPosition: "start",
  },
};

export const iconEnd: Story = {
  args: {
    placeholder: "Placeholder",
    append: <Icon source={<TiendanubeIcon />} />,
    appendPosition: "end",
  },
};

export const success: Story = {
  args: {
    placeholder: "Placeholder",
    appearance: "success",
  },
};

export const warning: Story = {
  args: {
    placeholder: "Placeholder",
    appearance: "warning",
  },
};

export const danger: Story = {
  args: {
    placeholder: "Placeholder",
    appearance: "danger",
  },
};

export const aiGenerative: Story = {
  args: {
    placeholder: "Placeholder",
    appearance: "ai-generative",
  },
};

export const aiGenerated: Story = {
  args: {
    placeholder: "Placeholder",
    aiGenerated: true,
  },
};

export const disabled: Story = {
  args: {
    placeholder: "Placeholder",
    disabled: true,
  },
};
