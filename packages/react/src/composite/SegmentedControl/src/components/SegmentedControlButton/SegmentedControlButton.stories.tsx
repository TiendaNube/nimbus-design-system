import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControlButton } from "./SegmentedControlButton";
import { Icon } from "@nimbus-ds/icon";
import { ExternalLinkIcon } from "@nimbus-ds/icons";
import { Tooltip } from "@nimbus-ds/tooltip";

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
      control: { disable: true },
    },
    onClick: {
      description: "Function called when the button is clicked",
    },
    as: {
      control: "select",
      options: ["button", "a"],
      description: "HTML element to render as",
    },
    disabled: {
      control: "boolean",
      description: "Controls the disabled state of the button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControlButton>;

export const Default: Story = {
  args: {
    label: "Option 1",
    children: "Option 1",
  },
};

export const active: Story = {
  args: {
    active: true,
    label: "Option 1",
    children: "Option 1",
  },
};

export const disabled: Story = {
  args: {
    children: "Option 1",
    disabled: true,
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

export const IconButton: Story = {
  render: () => (
    <SegmentedControlButton
      label="With icon"
      index={0}
      setActiveSegment={() => {}}
    >
      <Icon source={<ExternalLinkIcon />} />
    </SegmentedControlButton>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <SegmentedControlButton
      label="With icon"
      index={0}
      setActiveSegment={() => {}}
    >
      With icon
      <Icon source={<ExternalLinkIcon />} />
    </SegmentedControlButton>
  ),
};

export const WithTooltip: Story = {
  render: () => (
    <Tooltip content="Tooltip content">
      <SegmentedControlButton
        label="With tooltip"
        index={0}
        setActiveSegment={() => {}}
      >
        With tooltip
      </SegmentedControlButton>
    </Tooltip>
  ),
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
      ></SegmentedControlButton>
    </div>
  ),
};
