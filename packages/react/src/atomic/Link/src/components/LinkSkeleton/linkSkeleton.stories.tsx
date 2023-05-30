import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "../../Link";

const meta: Meta<typeof Link.Skeleton> = {
  title: "atomic/Link/Link.Skeleton",
  component: Link.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Link.Skeleton>;

export const basic: Story = { args: {} };
