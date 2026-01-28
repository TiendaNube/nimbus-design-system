import React, { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import type { InputSearchProps } from "./InputSearch";
import { InputSearch as InputSearchComponent } from "./InputSearch";

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
