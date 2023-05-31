import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@nimbus-ds/text";
import { Toast } from "../../Toast";

const meta: Meta<typeof Toast.Provider> = {
  title: "Atomic/Toast/Toast.Provider",
  component: Toast.Provider,
  argTypes: { children: { control: { disable: true } } },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast.Provider>;

export const basic: Story = {
  args: {
    children: <Text>App</Text>,
  },
};
