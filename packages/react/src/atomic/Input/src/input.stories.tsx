import React, { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiendanubeIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";

import { Input as InputComponent, type InputProps } from "./Input";

export const Basic: React.FC<InputProps> = forwardRef((props: InputProps) => (
  <InputComponent {...props} />
)) as React.FC<InputProps>;
Basic.displayName = "Input";

const meta: Meta<typeof InputComponent> = {
  title: "Atomic/Input",
  component: InputComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputComponent>;

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

export const prefix: Story = {
  args: {
    placeholder: "0,00",
    prefix: "$",
  },
};

export const suffix: Story = {
  args: {
    placeholder: "0",
    suffix: "kg",
  },
};

export const prefixAndSuffix: Story = {
  args: {
    placeholder: "0,00",
    prefix: "$",
    suffix: "USD",
  },
};

export const prefixWithAppendIcon: Story = {
  name: "Recipe: currency input with prefix and append icon",
  args: {
    placeholder: "0,00",
    prefix: "$",
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
