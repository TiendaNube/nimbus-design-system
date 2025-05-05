import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControlButtonSkeleton } from "./SegmentedControlButtonSkeleton";

const meta: Meta<typeof SegmentedControlButtonSkeleton> = {
  title: "Composite/SegmentedControl/SegmentedControlButtonSkeleton",
  component: SegmentedControlButtonSkeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Skeleton loader component for SegmentedControlButton, used to show loading states."
      }
    }
  },
  argTypes: {
    width: {
      description: "Width of the skeleton button",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "100%" }
      }
    },
    height: {
      description: "Height of the skeleton button",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "2rem" }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof SegmentedControlButtonSkeleton>;

export const Default: Story = {
  args: {}
};

export const CustomSize: Story = {
  args: {
    width: "200px",
    height: "3rem"
  }
};

export const InGroup: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <SegmentedControlButtonSkeleton width="100px" />
      <SegmentedControlButtonSkeleton width="100px" />
      <SegmentedControlButtonSkeleton width="100px" />
    </div>
  )
};

export const ResponsiveWidth: Story = {
  args: {
    width: "100%",
    height: "2.5rem"
  },
  parameters: {
    docs: {
      description: {
        story: "The skeleton adapts to its container width while maintaining a fixed height."
      }
    }
  }
}; 