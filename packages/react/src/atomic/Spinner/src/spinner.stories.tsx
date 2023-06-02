import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Atomic/Spinner",
  component: Spinner,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const basic: Story = {
  args: {},
};

export const large: Story = {
  args: {
    size: "large",
  },
};

export const medium: Story = {
  args: {
    size: "medium",
  },
};

export const small: Story = {
  args: {
    size: "small",
  },
};
