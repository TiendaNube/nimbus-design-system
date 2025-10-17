import React, { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ExternalLinkIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { Badge } from "@nimbus-ds/badge";
import { Spinner } from "@nimbus-ds/spinner";

import { Box } from "@nimbus-ds/box";
import { Button as ButtonComponent, ButtonProps } from "./Button";

export const Basic: React.FC<ButtonProps> = forwardRef(
  ({ children = "Button", ...props }: ButtonProps) => (
    <ButtonComponent {...props}>{children}</ButtonComponent>
  )
) as React.FC<ButtonProps>;
Basic.displayName = "Button";

const meta: Meta<typeof Basic> = {
  title: "Atomic/Button",
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

export const basic: Story = {
  args: {
    appearance: "primary",
    children: (
      <>
        Button
        <Badge appearance="primary" count={2} theme="light" />
      </>
    ),
  },
};

export const icon: Story = {
  args: {
    appearance: "primary",
    children: (
      <>
        Button
        <Icon color="currentColor" source={<ExternalLinkIcon />} />
      </>
    ),
  },
};

export const loading: Story = {
  args: {
    appearance: "primary",
    children: (
      <>
        <Spinner color="currentColor" size="small" />
        Button
      </>
    ),
  },
};

export const disabled: Story = {
  args: {
    disabled: true,
    children: "Button",
  },
};

export const asLink = {
  args: {
    as: "a",
    children: "Button as anchor",
    href: "https://nimbus.tiendanube.com/",
    target: "_blank",
  },
};

export const primary: Story = {
  args: {
    children: "Button",
    appearance: "primary",
  },
};

export const danger: Story = {
  args: {
    children: "Button",
    appearance: "danger",
  },
};

export const neutral: Story = {
  args: {
    children: "Button",
    appearance: "neutral",
  },
};

export const transparent: Story = {
  args: {
    children: "Button",
    appearance: "transparent",
  },
};

export const fullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
    appearance: "primary",
  },
  render: (args) => (
    <Box width="400px">
      <Basic {...args} />
    </Box>
  ),
};

export const aiPrimary: Story = {
  args: {
    children: "Button",
    appearance: "ai-primary",
  },
};

export const aiSecondary: Story = {
  args: {
    children: "Button",
    appearance: "ai-secondary",
  },
};

export const small: Story = {
  args: {
    children: "Small Button",
    size: "small",
    appearance: "primary",
  },
};

export const medium: Story = {
  args: {
    children: "Medium Button",
    size: "medium",
    appearance: "primary",
  },
};
