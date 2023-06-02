import React, { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box as BoxComponent, BoxProps } from "./Box";

export const Basic: React.FC<BoxProps> = forwardRef((props: BoxProps) => (
  <BoxComponent {...props} />
)) as React.FC<BoxProps>;
Basic.displayName = "Box";

const meta: Meta<typeof Basic> = {
  title: "Atomic/Box",
  component: Basic,
  argTypes: {
    as: {
      description:
        "The underlying element to render — an HTML element name of type a or button or a React component of type HTMLAnchorElement or HTMLButtonElement.",
    },
    ref: {
      description:
        "A ref to the element rendered by this component. Because this component is polymorphic, the type will vary based on the value of the as prop.",
    },
    children: { control: { type: "text" } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Basic>;

export const basic = {
  args: {
    height: "5rem",
    width: "12rem",
    borderColor: "neutral-interactive",
    borderWidth: "2",
    borderStyle: "dashed",
    borderRadius: "2",
  },
};

export const responsive: Story = {
  args: {
    height: {
      xl: "6rem",
      lg: "4rem",
      md: "3rem",
      xs: "2rem",
    },
    width: {
      xl: "12rem",
      lg: "10rem",
      md: "8rem",
      xs: "2rem",
    },
    backgroundColor: {
      xl: "warning-interactive",
      lg: "success-interactive",
      md: "danger-interactive",
      xs: "primary-interactive",
    },
    paddingX: {
      xl: "8",
      lg: "6",
      md: "4",
      xs: "none",
    },
    borderRadius: {
      xl: "0-5",
      lg: "2",
      md: "4",
      xs: "full",
    },
  },
};
