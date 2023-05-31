import React, { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  InputPassword as InputPasswordComponent,
  InputPasswordProps,
} from "./InputPassword";

export const Basic: React.FC<InputPasswordProps> = forwardRef(
  (props: InputPasswordProps) => <InputPasswordComponent {...props} />
) as React.FC<InputPasswordProps>;

Basic.displayName = "Input.Password";

const meta: Meta<typeof Basic> = {
  title: "Atomic/Input/Input.Password",
  component: Basic,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Basic>;

export const basic: Story = {
  name: "Input.Password",
  args: {
    placeholder: "Placeholder",
  },
};
