import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../../Label";

const meta: Meta<typeof Label.Skeleton> = {
  title: "atomic/Label/Label.Skeleton",
  component: Label.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label.Skeleton>;

export const basic: Story = { args: {} };
