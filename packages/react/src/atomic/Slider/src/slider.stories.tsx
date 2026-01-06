import React, { useState, useEffect, forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Title } from "@nimbus-ds/title";

import { Slider } from "./Slider";
import type { SliderSingleBaseProps } from "./Slider";

// ============================================================================
// Wrapper Component for Storybook (internal, not exported as story)
// ============================================================================

const Basic: React.FC<SliderSingleBaseProps> = forwardRef(
  (props: SliderSingleBaseProps) => {
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
) as React.FC<SliderSingleBaseProps>;
Basic.displayName = "Slider";

// ============================================================================
// Meta Configuration
// ============================================================================

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
    showInputs: true,
    showRangeLabels: true,
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
    showInputs: {
      control: { type: "boolean" },
      description: "Show/hide the current value display",
    },
    showRangeLabels: {
      control: { type: "boolean" },
      description: "Show/hide the range labels",
    },
    label: {
      control: { type: "text" },
      description: "Label displayed above the value",
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

// ============================================================================
// Single Value Stories
// ============================================================================

export const basic: Story = {};

export const withLabel: Story = {
  args: {
    value: 75,
    label: "Volume",
    labelSuffix: "%",
  },
};

export const disabled: Story = {
  args: {
    value: 30,
    disabled: true,
  },
};

export const minimal: Story = {
  args: {
    value: 40,
    showInputs: false,
    showRangeLabels: false,
  },
};

export const customStep: Story = {
  args: {
    min: 0,
    max: 1000,
    value: 500,
    step: 50,
    labelPrefix: "R$",
  },
};

// ============================================================================
// Range Stories (Slider.Range)
// ============================================================================

export const range: Story = {
  render: () => {
    const RangeSlider = () => {
      const [minValue, setMinValue] = useState(25);
      const [maxValue, setMaxValue] = useState(75);

      return (
        <Slider.Range
          min={0}
          max={100}
          minValue={minValue}
          maxValue={maxValue}
          step={1}
          appearance="primary"
          showInputs
          showRangeLabels
          onChange={(min, max) => {
            setMinValue(min);
            setMaxValue(max);
          }}
        />
      );
    };

    return <RangeSlider />;
  },
};

export const rangeWithLabels: Story = {
  render: () => {
    const RangeSlider = () => {
      const [minValue, setMinValue] = useState(20);
      const [maxValue, setMaxValue] = useState(80);

      return (
        <Slider.Range
          min={0}
          max={100}
          minValue={minValue}
          maxValue={maxValue}
          minLabel="Min."
          maxLabel="Máx."
          inputSeparator="↔"
          onChange={(min, max) => {
            setMinValue(min);
            setMaxValue(max);
          }}
        />
      );
    };

    return <RangeSlider />;
  },
};

export const priceRange: Story = {
  render: () => {
    const PriceSlider = () => {
      const [minValue, setMinValue] = useState(200);
      const [maxValue, setMaxValue] = useState(7200);

      return (
        <Box display="flex" flexDirection="column" gap="4" maxWidth="400px">
          <Title as="h3">Price Filter</Title>
          <Slider.Range
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

// ============================================================================
// Comparison Story
// ============================================================================

export const comparison: Story = {
  render: () => {
    const Comparison = () => {
      const [singleValue, setSingleValue] = useState(50);
      const [minValue, setMinValue] = useState(25);
      const [maxValue, setMaxValue] = useState(75);

      return (
        <Box display="flex" flexDirection="column" gap="6" maxWidth="400px">
          <Box display="flex" flexDirection="column" gap="2">
            <Title as="h3">{"<Slider />"}</Title>
            <Slider
              min={0}
              max={100}
              value={singleValue}
              label="Value"
              onChange={(val) => setSingleValue(val)}
            />
          </Box>

          <Box display="flex" flexDirection="column" gap="2">
            <Title as="h3">{"<Slider.Range />"}</Title>
            <Slider.Range
              min={0}
              max={100}
              minValue={minValue}
              maxValue={maxValue}
              minLabel="Min"
              maxLabel="Max"
              onChange={(min, max) => {
                setMinValue(min);
                setMaxValue(max);
              }}
            />
          </Box>
        </Box>
      );
    };

    return <Comparison />;
  },
};
