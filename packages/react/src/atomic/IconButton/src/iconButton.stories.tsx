import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiendanubeIcon } from "@nimbus-ds/icons";
import { iconButton } from "@nimbus-ds/styles";
import { argTypesConvert } from ".storybook/utils";
import { IconButton } from "./IconButton";

TiendanubeIcon.displayName = "TiendanubeIcon";

const meta: Meta<typeof IconButton> = {
  title: "Atomic/IconButton",
  component: IconButton,
  argTypes: {
    source: { control: { disable: true } },
    ...argTypesConvert(iconButton.properties),
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
