import React, { useState, useEffect, forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { VolumeIcon, MicrophoneIcon } from "@nimbus-ds/icons";

import { Slider } from "./Slider";
import type { SliderBaseProps } from "./Slider";

const Basic: React.FC<SliderBaseProps> = forwardRef(
  (props: SliderBaseProps) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
      setValue(props.value);
    }, [props.value]);

    return (
      <Slider
        {...props}
        value={value}
        onChange={(val) => {
          setValue(val);
          props.onChange?.(val);
        }}
      />
    );
  }
) as React.FC<SliderBaseProps>;
Basic.displayName = "Slider";

const meta: Meta<typeof Basic> = {
  title: "Atomic/Slider",
  component: Basic,
  tags: ["autodocs"],
  args: {
    min: 0,
    max: 100,
    value: 50,
    step: 1,
    appearance: "primary",
    showLabels: false,
  },
  argTypes: {
    min: {
      control: { type: "number" },
      description: "Minimum range value",
    },
    max: {
      control: { type: "number" },
      description: "Maximum range value",
    },
    value: {
      control: { type: "number" },
      description: "Current selected value",
    },
    step: {
      control: { type: "number" },
      description: "Step increment between values",
    },
    appearance: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "neutral"],
      description: "Visual appearance of the slider fill",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the slider is disabled",
    },
    showLabels: {
      control: { type: "boolean" },
      description: "Whether to show min/max labels below the slider",
    },
    minLabel: {
      control: { type: "text" },
      description: "Custom label for the minimum value",
    },
    maxLabel: {
      control: { type: "text" },
      description: "Custom label for the maximum value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Basic>;

export const basic: Story = {};

export const disabled: Story = {
  args: {
    value: 30,
    disabled: true,
  },
};

export const customStep: Story = {
  args: {
    min: 0,
    max: 1000,
    value: 500,
    step: 50,
  },
};

const VolumeControl: React.FC<SliderBaseProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: valueProp = 65,
  appearance = "primary",
  disabled = false,
}) => {
  const [volume, setVolume] = useState(valueProp);

  useEffect(() => {
    setVolume(valueProp);
  }, [valueProp]);

  return (
    <Box display="flex" flexDirection="column" gap="2" maxWidth="300px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontWeight="medium">Volume</Text>
        <Text color="neutral-textLow">{volume}%</Text>
      </Box>
      <Box display="flex" alignItems="center" gap="2">
        <Icon source={<MicrophoneIcon />} color="neutral-textLow" />
        <Box flex="1">
          <Slider
            min={min}
            max={max}
            step={step}
            value={volume}
            appearance={appearance}
            disabled={disabled}
            onChange={setVolume}
          />
        </Box>
        <Icon source={<VolumeIcon />} color="neutral-textLow" />
      </Box>
    </Box>
  );
};

export const volumeControlExample: Story = {
  render: (args) => <VolumeControl {...args} />,
  args: {
    min: 0,
    max: 100,
    value: 65,
    step: 1,
    appearance: "primary",
  },
};

const BrightnessControl: React.FC<SliderBaseProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: valueProp = 75,
  appearance = "primary",
}) => {
  const [brightness, setBrightness] = useState(valueProp);

  useEffect(() => {
    setBrightness(valueProp);
  }, [valueProp]);

  return (
    <Box display="flex" flexDirection="column" gap="2" maxWidth="300px">
      <Text fontWeight="medium">Brightness</Text>
      <Slider
        min={min}
        max={max}
        step={step}
        value={brightness}
        appearance={appearance}
        onChange={setBrightness}
        showLabels
        minLabel="Low"
        maxLabel="High"
      />
    </Box>
  );
};

export const withLabelsExample: Story = {
  render: (args) => <BrightnessControl {...args} />,
  args: {
    min: 0,
    max: 100,
    value: 75,
    step: 1,
    appearance: "primary",
  },
};
