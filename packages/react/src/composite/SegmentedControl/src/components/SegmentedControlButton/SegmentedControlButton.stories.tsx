import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControlButton } from "./SegmentedControlButton";

const meta: Meta<typeof SegmentedControlButton> = {
  title: "Composite/SegmentedControl/SegmentedControlButton",
  component: SegmentedControlButton,
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "boolean",
      description: "Controls the active state of the button",
    },
    children: {
      control: "text",
      description: "Content to be displayed inside the button",
    },
    onClick: {
      description: "Function called when the button is clicked",
    },
    as: {
      control: "select",
      options: ["button", "a"],
      description: "HTML element to render as",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControlButton>;

export const Default: Story = {
  args: {
    children: "Option 1",
    label: "Option 1",
  },
};

export const active: Story = {
  args: {
    children: "Option 1",
    active: true,
    label: "Option 1",
  },
};

export const AsLink: Story = {
  render: () => (
    <SegmentedControlButton<"a">
      as="a"
      href="#"
      label="Option 1"
      index={0}
      /* eslint-disable-next-line @typescript-eslint/no-empty-function */
      setActiveSegment={() => {}}
    >
      Option 1
    </SegmentedControlButton>
  ),
};

export const WithCustomContent: Story = {
  args: {
    children: (
      <>
        <span>🌟</span>
        <span>With Icon</span>
      </>
    ),
    label: "With Icon",
  },
};

export const SkeletonState: Story = {
  render: () => <SegmentedControlButton.Skeleton />,
};

// Example of multiple buttons in a group
export const GroupExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1px",
        background: "#e0e0e0",
        padding: "1px",
      }}
    >
      <SegmentedControlButton
        label="Option 1"
        index={0}
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        setActiveSegment={() => {}}
      >
        Option 1
      </SegmentedControlButton>
      <SegmentedControlButton
        label="Option 2"
        index={1}
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        setActiveSegment={() => {}}
      >
        Option 2
      </SegmentedControlButton>
      <SegmentedControlButton
        label="Option 3"
        index={2}
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        setActiveSegment={() => {}}
      >
        Option 3
      </SegmentedControlButton>
    </div>
  ),
};
