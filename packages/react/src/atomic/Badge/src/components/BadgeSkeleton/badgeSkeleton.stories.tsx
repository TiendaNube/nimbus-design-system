import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../../Badge";

const meta: Meta<typeof Badge.Skeleton> = {
  title: "atomic/Badge/Badge.Skeleton",
  component: Badge.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge.Skeleton>;

export const basic: Story = { args: {} };
