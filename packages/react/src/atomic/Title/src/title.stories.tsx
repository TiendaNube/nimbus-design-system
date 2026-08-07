import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { title } from "@nimbus-ds/styles";
import { argTypesConvert } from ".storybook/utils";
import { Title } from "./Title";

const meta: Meta<typeof Title> = {
  title: "Atomic/Title",
  component: Title,
  argTypes: {
    children: { control: { type: "text" } },
    ...argTypesConvert(title.properties),
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Title>;

export const basic: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet",
  },
};

export const h1: Story = {
  args: {
    as: "h1",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const h2: Story = {
  args: {
    as: "h2",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const h3: Story = {
  args: {
    as: "h3",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const h4: Story = {
  args: {
    as: "h4",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const h5: Story = {
  args: {
    as: "h5",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const h6: Story = {
  args: {
    as: "h6",
    children: "Lorem ipsum dolor sit amet",
  },
};

export const colors: Story = {
  render: () => (
    <>
      <Title as="h3" color="neutral-textHigh">
        neutral-textHigh
      </Title>
      <Title as="h3" color="neutral-textLow">
        neutral-textLow
      </Title>
      <Title as="h3" color="neutral-textDisabled">
        neutral-textDisabled
      </Title>
      <Title as="h3" color="primary-interactive">
        primary-interactive
      </Title>
      <Title as="h3" color="success-surface">
        success-surface
      </Title>
      <Title as="h3" color="danger-interactive">
        danger-interactive
      </Title>
      <Title as="h3" color="currentColor">
        currentColor
      </Title>
    </>
  ),
};

export const responsive: Story = {
  args: {
    textAlign: {
      xs: "left",
      md: "center",
      lg: "right",
    },
    children: "Lorem ipsum dolor sit amet",
  },
};
