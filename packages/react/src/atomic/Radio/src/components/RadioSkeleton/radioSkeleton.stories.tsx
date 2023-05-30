import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "../../Radio";

const meta: Meta<typeof Radio.Skeleton> = {
  title: "atomic/Radio/Radio.Skeleton",
  component: Radio.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Radio.Skeleton>;

export const basic: Story = { args: {} };

export const button: Story = { args: { as: "button" } };
