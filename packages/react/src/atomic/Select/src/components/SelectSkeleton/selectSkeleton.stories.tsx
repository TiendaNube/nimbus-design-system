import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../../Select";

const meta: Meta<typeof Select.Skeleton> = {
  title: "atomic/Select/Select.Skeleton",
  component: Select.Skeleton,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["medium", "small"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select.Skeleton>;

export const basic: Story = { args: {} };

export const small: Story = { args: { size: "small" } };
