import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Atomic/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "currentColor",
        "primary-surface",
        "primary-interactive",
        "primary-textLow",
        "success-surface",
        "success-interactive",
        "success-textLow",
        "danger-surface",
        "danger-interactive",
        "danger-textLow",
        "neutral-background",
        "neutral-surface",
        "neutral-interactive",
        "neutral-textLow",
        "warning-textLow",
        "ai-generativeTextLow",
      ],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
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

const colorRows = [
  { label: "Primary", color: "primary-textLow" },
  { label: "Neutral", color: "neutral-textLow" },
  { label: "Success", color: "success-textLow" },
  { label: "Warning", color: "warning-textLow" },
  { label: "Danger", color: "danger-textLow" },
  { label: "AI", color: "ai-generativeTextLow" },
] as const;

export const colors: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      {colorRows.map(({ label, color }) => (
        <div
          key={color}
          style={{ display: "flex", alignItems: "center", gap: 24 }}
        >
          <span style={{ width: 80 }}>{label}</span>
          <Spinner color={color} size="large" />
          <Spinner color={color} size="medium" />
          <Spinner color={color} size="small" />
          <Spinner color={color} size={12} />
        </div>
      ))}
    </div>
  ),
};
