import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Box } from "@nimbus-ds/box";
import { HomeIcon, CopyIcon } from "@nimbus-ds/icons";
import { Button } from "@nimbus-ds/button";
import { SplitButton } from "./SplitButton";

const meta: Meta<typeof SplitButton> = {
  title: "Composite/SplitButton",
  component: SplitButton,
  argTypes: {
    disabled: { control: "boolean" },
    popoverPosition: {
      control: "select",
      options: [
        "top",
        "right",
        "bottom",
        "left",
        "bottom-start",
        "bottom-end",
        "left-start",
        "left-end",
        "right-start",
        "right-end",
        "top-start",
        "top-end",
      ],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SplitButton>;

export const basic: Story = {
  render: (args) => (
    <SplitButton {...args}>
      <SplitButton.Primary onClick={action("Primary clicked")}>
        Add product
      </SplitButton.Primary>
      <SplitButton.Secondary>
        <SplitButton.Action
          icon={<HomeIcon />}
          onClick={action("Add manually")}
        >
          Add manually
        </SplitButton.Action>
        <SplitButton.Action
          icon={<CopyIcon />}
          onClick={action("Import from CSV")}
        >
          Import from CSV
        </SplitButton.Action>
      </SplitButton.Secondary>
    </SplitButton>
  ),
  args: {
    disabled: false,
    popoverPosition: "bottom-end",
  },
};

export const disabled: Story = {
  render: () => (
    <SplitButton disabled>
      <SplitButton.Primary onClick={action("Should not fire")}>
        Disabled button
      </SplitButton.Primary>
      <SplitButton.Secondary>
        <SplitButton.Action onClick={action("Action 1")}>
          Action 1
        </SplitButton.Action>
        <SplitButton.Action onClick={action("Action 2")}>
          Action 2
        </SplitButton.Action>
      </SplitButton.Secondary>
    </SplitButton>
  ),
};

export const disabledActions: Story = {
  render: () => (
    <SplitButton>
      <SplitButton.Primary onClick={action("Primary action")}>
        Actions
      </SplitButton.Primary>
      <SplitButton.Secondary>
        <SplitButton.Action onClick={action("Action 1")}>
          Available action
        </SplitButton.Action>
        <SplitButton.Action disabled onClick={action("Should not fire")}>
          Disabled action
        </SplitButton.Action>
        <SplitButton.Action onClick={action("Action 3")}>
          Another available action
        </SplitButton.Action>
      </SplitButton.Secondary>
    </SplitButton>
  ),
};

export const controlledState: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Box display="flex" flexDirection="column" gap="4">
        <SplitButton open={open} onOpenChange={setOpen}>
          <SplitButton.Primary onClick={action("Primary action")}>
            Controlled button
          </SplitButton.Primary>
          <SplitButton.Secondary>
            <SplitButton.Action onClick={action("Action 1")}>
              Action 1
            </SplitButton.Action>
            <SplitButton.Action onClick={action("Action 2")}>
              Action 2
            </SplitButton.Action>
          </SplitButton.Secondary>
        </SplitButton>
        <Box>
          <Button onClick={() => setOpen(!open)}>
            Toggle menu externally (Current: {open ? "Open" : "Closed"})
          </Button>
        </Box>
      </Box>
    );
  },
};
