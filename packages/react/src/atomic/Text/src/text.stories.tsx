import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Atomic/Text/Text",
  component: Text,
  argTypes: {
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const basic: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet",
  },
};

export const p: Story = {
  args: {
    as: "p",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const span: Story = {
  args: {
    as: "span",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const primary: Story = {
  args: {
    color: "primary-textLow",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const success: Story = {
  args: {
    color: "success-textLow",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const warning: Story = {
  args: {
    color: "warning-textLow",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const danger: Story = {
  args: {
    color: "danger-textLow",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const neutral: Story = {
  args: {
    color: "neutral-textLow",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const responsive: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet",
    textAlign: { xs: "center", md: "center", lg: "right", xl: "center" },
  },
};

export const lineClamp: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et nisi sit amet quam convallis consectetur. Vestibulum hendrerit ac urna eget rhoncus. Aliquam non velit finibus sem gravida pretium. In neque metus, interdum a quam id, pulvinar consequat leo. Proin sapien mauris, efficitur ut mi at, finibus commodo metus. Pellentesque ac pellentesque risus. Nulla facilisi.",
    textAlign: "left",
    lineClamp: 1,
  },
};
