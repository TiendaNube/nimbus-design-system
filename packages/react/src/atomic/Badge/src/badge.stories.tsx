import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atomic/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const basic: Story = {
  args: {
    count: "+99",
  },
};

export const neutral: Story = {
  args: {
    appearance: "neutral",
    count: "+99",
  },
};

export const primary: Story = {
  args: {
    appearance: "primary",
    count: "+99",
  },
};

export const success: Story = {
  args: {
    appearance: "success",
    count: "+99",
  },
};

export const warning: Story = {
  args: {
    appearance: "warning",
    count: "+99",
  },
};

export const danger: Story = {
  args: {
    appearance: "danger",
    count: "+99",
  },
};

export const dot: Story = {
  args: {
    type: "dot",
    appearance: "primary",
  },
};

export const dotNeutral: Story = {
  args: {
    type: "dot",
    appearance: "neutral",
  },
};

export const dotSuccess: Story = {
  args: {
    type: "dot",
    appearance: "success",
  },
};

export const dotWarning: Story = {
  args: {
    type: "dot",
    appearance: "warning",
  },
};

export const dotDanger: Story = {
  args: {
    type: "dot",
    appearance: "danger",
  },
};
