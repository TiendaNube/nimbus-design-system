import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "Composite/TimePicker",
  component: TimePicker,
  argTypes: {
    value: { control: "text" },
    mode: {
      control: "radio",
      options: ["scroll", "dropdown"],
    },
    format: {
      control: "radio",
      options: ["12h", "24h"],
    },
    step: {
      control: "number",
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    labels: {
      control: "object",
      description: "Translatable labels for localization",
    },
  },
  tags: ["autodocs"],
  render: ({ value, ...rest }) => {
    const [time, setTime] = useState<string | null>(value as string | null);

    return (
      <Box display="flex" flexDirection="column" gap="2">
        <TimePicker
          {...rest}
          value={time}
          onChange={(value) => setTime(value)}
        />
        <Text fontSize="caption" color="neutral-textLow">
          Selected: {time || "None"}
        </Text>
      </Box>
    );
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const basic: Story = {
  args: {
    placeholder: "Select time",
  },
};

export const withValue: Story = {
  args: {
    value: "14:30",
    format: "24h",
  },
};

export const format12h: Story = {
  render: () => {
    const [time, setTime] = useState<string | null>();
    return (
      <Box display="flex" flexDirection="column" gap="2">
        <TimePicker
          value={time}
          onChange={(value) => setTime(value)}
          format="12h"
          placeholder="Select time (12h)"
        />
        <Text fontSize="caption" color="neutral-textLow">
          Selected: {time || "None"}
        </Text>
      </Box>
    );
  },
};

export const dropdownMode: Story = {
  render: () => {
    const [time, setTime] = useState<string | null>();
    return (
      <Box display="flex" flexDirection="column" gap="2">
        <TimePicker
          mode="dropdown"
          value={time}
          onChange={(value) => setTime(value)}
          step={30}
          placeholder="Select time (dropdown)"
        />
        <Text fontSize="caption" color="neutral-textLow">
          Selected: {time || "None"}
        </Text>
      </Box>
    );
  },
};

export const dropdownMode12h: Story = {
  render: () => {
    const [time, setTime] = useState<string | null>(null);
    return (
      <Box display="flex" flexDirection="column" gap="2">
        <TimePicker
          mode="dropdown"
          value={time}
          onChange={(value) => setTime(value)}
          format="12h"
          step={30}
          placeholder="Select time"
        />
        <Text fontSize="caption" color="neutral-textLow">
          Selected: {time || "None"}
        </Text>
      </Box>
    );
  },
};

export const customStep1: Story = {
  render: () => {
    const [time, setTime] = useState<string | null>(null);
    return (
      <Box display="flex" flexDirection="column" gap="2">
        <TimePicker
          value={time}
          onChange={(value) => setTime(value)}
          step={15}
          placeholder="15-minute intervals"
        />
        <Text fontSize="caption" color="neutral-textLow">
          Step: 15 minutes
        </Text>
      </Box>
    );
  },
};

export const customStepDropdown: Story = {
  render: () => {
    const [time, setTime] = useState<string | null>(null);
    return (
      <Box display="flex" flexDirection="column" gap="2">
        <TimePicker
          mode="dropdown"
          value={time}
          onChange={(value) => setTime(value)}
          step={15}
          placeholder="15-minute intervals"
        />
        <Text fontSize="caption" color="neutral-textLow">
          Step: 15 minutes (dropdown mode)
        </Text>
      </Box>
    );
  },
};

export const disabled: Story = {
  args: {
    value: "10:00",
    disabled: true,
    placeholder: "Disabled picker",
  },
};

export const controlled: Story = {
  render: () => {
    const [time, setTime] = useState<string | null>("14:30");
    const [open, setOpen] = useState(false);

    return (
      <Box display="flex" flexDirection="column" gap="4">
        <TimePicker
          value={time}
          onChange={(value) => setTime(value)}
          open={open}
          onOpenChange={setOpen}
          placeholder="Controlled picker"
        />
        <Box display="flex" gap="2" alignItems="center">
          <Text fontSize="caption">
            Value: <strong>{time || "None"}</strong>
          </Text>
          <Text fontSize="caption">
            Open: <strong>{open ? "Yes" : "No"}</strong>
          </Text>
        </Box>
      </Box>
    );
  },
};

export const playground: Story = {
  render: (args) => {
    const [time, setTime] = useState<string | null>(
      args.value as string | null
    );

    return (
      <Box display="flex" flexDirection="column" gap="4">
        <TimePicker
          {...args}
          value={time}
          onChange={(value, date) => {
            setTime(value);
            console.log("Time changed:", value, date);
          }}
        />
        <Box padding="2" backgroundColor="neutral-surface" borderRadius="2">
          <Text fontSize="caption" color="neutral-textLow">
            Selected value: <strong>{time || "None"}</strong>
          </Text>
        </Box>
      </Box>
    );
  },
  args: {
    value: "10:30",
    format: "24h",
    step: 1,
    disabled: false,
    placeholder: "Select time",
  },
};
