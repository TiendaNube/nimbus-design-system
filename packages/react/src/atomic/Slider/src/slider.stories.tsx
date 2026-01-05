import React, { useState, forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Title } from "@nimbus-ds/title";

import { Slider as SliderComponent, SliderProps } from "./Slider";

export const Basic: React.FC<SliderProps> = forwardRef((props: SliderProps) => {
  const [minValue, setMinValue] = useState(props.minValue);
  const [maxValue, setMaxValue] = useState(props.maxValue);

  return (
    <SliderComponent
      {...props}
      minValue={minValue}
      maxValue={maxValue}
      onChange={(min, max) => {
        setMinValue(min);
        setMaxValue(max);
        props.onChange?.(min, max);
      }}
    />
  );
}) as React.FC<SliderProps>;
Basic.displayName = "Slider";

const meta: Meta<typeof Basic> = {
  title: "Atomic/Slider",
  component: Basic,
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: { type: "number" },
      description: "Minimum range value",
    },
    max: {
      control: { type: "number" },
      description: "Maximum range value",
    },
    minValue: {
      control: { type: "number" },
      description: "Current minimum selected value",
    },
    maxValue: {
      control: { type: "number" },
      description: "Current maximum selected value",
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
    showInputs: {
      control: { type: "boolean" },
      description: "Show/hide the number inputs",
    },
    showRangeLabels: {
      control: { type: "boolean" },
      description: "Show/hide the range labels",
    },
    minLabel: {
      control: { type: "text" },
      description: "Label for the minimum input",
    },
    maxLabel: {
      control: { type: "text" },
      description: "Label for the maximum input",
    },
    inputSeparator: {
      control: { type: "text" },
      description: "Separator between inputs",
    },
    labelPrefix: {
      control: { type: "text" },
      description: "Prefix for range labels",
    },
    labelSuffix: {
      control: { type: "text" },
      description: "Suffix for range labels",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Basic>;

export const basic: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    step: 1,
    appearance: "primary",
    showInputs: true,
    showRangeLabels: true,
  },
};

export const withLabels: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 20,
    maxValue: 80,
    minLabel: "Min.",
    maxLabel: "Máx.",
    inputSeparator: "↔",
  },
};

export const priceRange: Story = {
  render: () => {
    const PriceSlider = () => {
      const [minValue, setMinValue] = useState(200);
      const [maxValue, setMaxValue] = useState(7200);

      return (
        <Box display="flex" flexDirection="column" gap="4" maxWidth="400px">
          <Title as="h3">Price</Title>
          <SliderComponent
            min={0}
            max={9800}
            minValue={minValue}
            maxValue={maxValue}
            step={100}
            minLabel="Min."
            maxLabel="Máx."
            labelPrefix="R$"
            onChange={(min, max) => {
              setMinValue(min);
              setMaxValue(max);
            }}
          />
        </Box>
      );
    };

    return <PriceSlider />;
  },
};

export const withoutInputs: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 30,
    maxValue: 70,
    showInputs: false,
    showRangeLabels: true,
  },
};

export const withoutLabels: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    showInputs: true,
    showRangeLabels: false,
  },
};

export const minimal: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    showInputs: false,
    showRangeLabels: false,
  },
};

export const disabled: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    disabled: true,
  },
};

export const customStep: Story = {
  args: {
    min: 0,
    max: 1000,
    minValue: 200,
    maxValue: 800,
    step: 50,
  },
};

export const primary: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    appearance: "primary",
  },
};

export const success: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    appearance: "success",
  },
};

export const warning: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    appearance: "warning",
  },
};

export const danger: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    appearance: "danger",
  },
};

export const neutral: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    appearance: "neutral",
  },
};

export const customSeparator: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    inputSeparator: "to",
    minLabel: "From",
    maxLabel: "To",
  },
};

export const withPrefix: Story = {
  args: {
    min: 0,
    max: 1000,
    minValue: 100,
    maxValue: 500,
    labelPrefix: "R$",
  },
};

export const withSuffix: Story = {
  args: {
    min: 0,
    max: 100,
    minValue: 20,
    maxValue: 80,
    labelSuffix: "kg",
  },
};

export const withPrefixAndSuffix: Story = {
  args: {
    min: 0,
    max: 1000,
    minValue: 200,
    maxValue: 800,
    labelPrefix: "$",
    labelSuffix: " USD",
  },
};
