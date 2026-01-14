/* eslint-disable react/require-default-props */
import React, { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ExternalLinkIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";

import { Link as LinkComponent, LinkProps } from "./Link";

export const Basic: React.FC<LinkProps & { disabled?: boolean }> = forwardRef(
  ({
    children = "Link",
    disabled = false,
    ...props
  }: LinkProps & { disabled?: boolean }) => {
    const buttonProps = props.as === "button" ? { disabled } : {};
    return (
      <LinkComponent
        {...props}
        {...buttonProps}
        as={disabled ? "button" : props.as}
      >
        {children}
      </LinkComponent>
    );
  }
) as React.FC<LinkProps & { disabled?: boolean }>;

Basic.displayName = "Link";

const meta: Meta<typeof Basic> = {
  title: "Atomic/Link",
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
    children: "Link",
    href: "mailto: hola@tiendanube.com",
  },
};

export const icon: Story = {
  args: {
    appearance: "primary",
    children: (
      <>
        Link
        <Icon color="currentColor" source={<ExternalLinkIcon />} />
      </>
    ),
  },
};

export const stressed: Story = {
  render: (props) => (
    <Text>
      This is a paragraph followed by a link.
      <Basic {...props} />
    </Text>
  ),
  args: {
    appearance: "primary",
    children: (
      <>
        Stressed link with a lot of characters
        <Icon color="currentColor" source={<ExternalLinkIcon />} />
      </>
    ),
  },
};

export const primary: Story = {
  args: {
    appearance: "primary",
    children: "Link",
  },
};

export const danger: Story = {
  args: {
    appearance: "danger",
    children: "Link",
  },
};

export const neutral: Story = {
  args: {
    appearance: "neutral",
    children: "Link",
  },
};

export const neutralBackground: Story = {
  args: {
    appearance: "neutral-background",
    children: "Link",
  },
};

export const asButton: Story = {
  args: {
    children: "Link as button",
    as: "button",
  },
};

export const disabled: Story & { args: LinkProps & { disabled: boolean } } = {
  args: {
    as: "button",
    disabled: true,
    children: "Link",
    textDecoration: "none",
  },
};
