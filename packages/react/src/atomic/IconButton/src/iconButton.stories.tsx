import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiendanubeIcon } from "@nimbus-ds/icons";

import { IconButton } from "./IconButton";

TiendanubeIcon.displayName = "TiendanubeIcon";

const meta: Meta<typeof IconButton> = {
  title: "Atomic/IconButton/IconButton",
  component: IconButton,
  argTypes: {
    source: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const basic: Story = {
  args: {
    size: "2.75rem",
    source: <TiendanubeIcon size="small" />,
  },
};
