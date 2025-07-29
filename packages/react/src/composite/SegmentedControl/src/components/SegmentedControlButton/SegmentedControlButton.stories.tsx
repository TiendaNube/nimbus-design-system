import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@nimbus-ds/icon";
import { ExternalLinkIcon } from "@nimbus-ds/icons";
import { Tooltip } from "@nimbus-ds/tooltip";
import { Box } from "@nimbus-ds/box";
import { SegmentedControlButton } from "./SegmentedControlButton";

const meta: Meta<typeof SegmentedControlButton> = {
  title: "Composite/SegmentedControl/SegmentedControlButton",
  component: SegmentedControlButton,
  tags: ["autodocs"],
  argTypes: {
    selected: {
      control: "boolean",
      description: "Controls the selected state of the button",
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
    fullWidth: {
      control: "boolean",
      description: "Controls whether the button spans the full width",
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

export const Selected: Story = {
  args: {
    selected: true,
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
    <SegmentedControlButton<"a"> as="a" href="#" label="Option 1" id="option-1">
      Option 1
    </SegmentedControlButton>
  ),
};

export const IconButton: Story = {
  render: () => (
    <SegmentedControlButton label="With icon" id="with-icon">
      <Icon source={<ExternalLinkIcon />} />
    </SegmentedControlButton>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <SegmentedControlButton label="With icon" id="with-icon">
      With icon
      <Icon source={<ExternalLinkIcon />} />
    </SegmentedControlButton>
  ),
};

export const WithTooltip: Story = {
  render: () => (
    <Tooltip content="Tooltip content">
      <SegmentedControlButton label="With tooltip" id="with-tooltip">
        With tooltip
      </SegmentedControlButton>
    </Tooltip>
  ),
};

export const fullWidth: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <SegmentedControlButton
        label="Full Width Button"
        fullWidth
        id="full-width-button"
      >
        Full Width Button
      </SegmentedControlButton>
    </div>
  ),
};

export const SkeletonState: Story = {
  render: () => <SegmentedControlButton.Skeleton />,
};

// Example of multiple buttons in a group
export const GroupExample: Story = {
  render: () => (
    <Box display="flex" gap="1" padding="1">
      <SegmentedControlButton label="Option 1" id="option-1">
        Option 1
      </SegmentedControlButton>
      <SegmentedControlButton label="Option 2" id="option-2">
        Option 2
      </SegmentedControlButton>
      <SegmentedControlButton label="Option 3" id="option-3">
        Option 3
      </SegmentedControlButton>
    </Box>
  ),
};

// Example of multiple buttons with fullWidth
export const FullWidthGroupExample: Story = {
  render: () => (
    <Box display="flex" gap="1" padding="1" width="100%">
      <SegmentedControlButton label="Option 1" fullWidth id="option-1">
        Option 1
      </SegmentedControlButton>
      <SegmentedControlButton label="Option 2" fullWidth id="option-2">
        Option 2
      </SegmentedControlButton>
      <SegmentedControlButton label="Option 3" fullWidth id="option-3">
        Option 3
      </SegmentedControlButton>
    </Box>
  ),
};
