import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "../../Title";

const meta: Meta<typeof Title.Skeleton> = {
  title: "atomic/Title/Title.Skeleton",
  component: Title.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Title.Skeleton>;

export const basic: Story = { args: {} };
