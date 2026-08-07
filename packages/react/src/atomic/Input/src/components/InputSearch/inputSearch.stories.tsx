import React, { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  InputSearch as InputSearchComponent,
  type InputSearchProps,
} from "./InputSearch";

export const Basic: React.FC<InputSearchProps> = forwardRef(
  (props: InputSearchProps) => <InputSearchComponent {...props} />
) as React.FC<InputSearchProps>;

Basic.displayName = "Input.Search";

const meta: Meta<typeof Basic> = {
  title: "Atomic/Input/Input.Search",
  component: Basic,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Basic>;

export const basic: Story = {
  name: "Input.Search",
  args: {
    placeholder: "Placeholder",
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
