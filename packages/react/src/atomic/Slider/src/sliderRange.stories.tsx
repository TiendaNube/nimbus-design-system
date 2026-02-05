import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Title } from "@nimbus-ds/title";
import { Text } from "@nimbus-ds/text";
import { Input } from "@nimbus-ds/input";

import { Slider } from "./Slider";
import type { SliderRangeBaseProps } from "./Slider";

const RangeWrapper: React.FC<SliderRangeBaseProps> = ({
  min = 0,
  max = 100,
  minValue: minValueProp = 25,
  maxValue: maxValueProp = 75,
  step = 1,
  appearance = "primary",
  disabled = false,
  ...rest
}) => {
  const [minValue, setMinValue] = useState(minValueProp);
  const [maxValue, setMaxValue] = useState(maxValueProp);

  useEffect(() => {
    setMinValue(minValueProp);
  }, [minValueProp]);

  useEffect(() => {
    setMaxValue(maxValueProp);
  }, [maxValueProp]);

  return (
    <Slider.Range
      min={min}
      max={max}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      appearance={appearance}
      disabled={disabled}
      onChange={(newMin, newMax) => {
        setMinValue(newMin);
        setMaxValue(newMax);
      }}
      {...rest}
    />
  );
};
RangeWrapper.displayName = "Slider.Range";

const meta: Meta<typeof RangeWrapper> = {
  title: "Atomic/Slider/Range",
  component: RangeWrapper,
  tags: ["autodocs"],
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    step: 1,
    appearance: "primary",
    disabled: false,
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
  },
};

export default meta;
type Story = StoryObj<typeof RangeWrapper>;

export const basic: Story = {};

export const disabled: Story = {
  args: {
    disabled: true,
  },
};

const PriceRangeFilter: React.FC<SliderRangeBaseProps> = ({
  min = 0,
  max = 1000,
  step = 10,
  appearance = "primary",
  minValue: minValueProp = 150,
  maxValue: maxValueProp = 850,
}) => {
  const [minPrice, setMinPrice] = useState(minValueProp);
  const [maxPrice, setMaxPrice] = useState(maxValueProp);

  useEffect(() => {
    setMinPrice(minValueProp);
  }, [minValueProp]);

  useEffect(() => {
    setMaxPrice(maxValueProp);
  }, [maxValueProp]);

  const formatPrice = (value: number) => `R$ ${value.toLocaleString("pt-BR")}`;

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replaceAll(/\D/g, ""));
    if (value < maxPrice - step) {
      setMinPrice(Math.max(min, value));
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replaceAll(/\D/g, ""));
    if (value > minPrice + step) {
      setMaxPrice(Math.min(max, value));
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="4" maxWidth="400px">
      <Title as="h4">Filtrar por preço</Title>

      <Box display="flex" gap="2" alignItems="center">
        <Box flex="1">
          <Input
            type="text"
            value={formatPrice(minPrice)}
            onChange={handleMinInputChange}
            aria-label="Preço mínimo"
          />
        </Box>
        <Text color="neutral-textLow">até</Text>
        <Box flex="1">
          <Input
            type="text"
            value={formatPrice(maxPrice)}
            onChange={handleMaxInputChange}
            aria-label="Preço máximo"
          />
        </Box>
      </Box>

      <Slider.Range
        min={min}
        max={max}
        minValue={minPrice}
        maxValue={maxPrice}
        step={step}
        appearance={appearance}
        onChange={(newMin, newMax) => {
          setMinPrice(newMin);
          setMaxPrice(newMax);
        }}
      />

      <Box display="flex" justifyContent="space-between">
        <Text fontSize="caption" color="neutral-textLow">
          {formatPrice(min)}
        </Text>
        <Text fontSize="caption" color="neutral-textLow">
          {formatPrice(max)}
        </Text>
      </Box>
    </Box>
  );
};

export const priceRangeExample: Story = {
  render: (args) => <PriceRangeFilter {...args} />,
  args: {
    min: 0,
    max: 1000,
    minValue: 150,
    maxValue: 850,
    step: 10,
    appearance: "primary",
  },
};

const AgeRangeFilter: React.FC<SliderRangeBaseProps> = ({
  min = 18,
  max = 65,
  step = 1,
  minValue: minValueProp = 25,
  maxValue: maxValueProp = 45,
  appearance = "primary",
}) => {
  const [minAge, setMinAge] = useState(minValueProp);
  const [maxAge, setMaxAge] = useState(maxValueProp);

  useEffect(() => {
    setMinAge(minValueProp);
  }, [minValueProp]);

  useEffect(() => {
    setMaxAge(maxValueProp);
  }, [maxValueProp]);

  return (
    <Box display="flex" flexDirection="column" gap="2" maxWidth="400px">
      <Title as="h4">Filter by age</Title>
      <Slider.Range
        min={min}
        max={max}
        minValue={minAge}
        maxValue={maxAge}
        step={step}
        appearance={appearance}
        onChange={(newMin, newMax) => {
          setMinAge(newMin);
          setMaxAge(newMax);
        }}
      />
    </Box>
  );
};

export const withLabelsExample: Story = {
  render: (args) => <AgeRangeFilter {...args} />,
  args: {
    min: 18,
    max: 65,
    minValue: 25,
    maxValue: 45,
    step: 1,
    appearance: "primary",
  },
};
