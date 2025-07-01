import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as allIcons from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";

const meta: Meta<typeof Icon> = {
  title: "atomic/Icon/Demo/List",
  component: Icon,
  argTypes: {
    source: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon>;

const iconList = (
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {Object.entries(allIcons).map(([name, IconComponent]) => (
      <div
        key={name}
        style={{
          margin: "10px",
          border: "1px dashed rgba(255, 182, 193, 0.3)",
        }}
      >
        <IconComponent size="medium" aria-label={name} />
      </div>
    ))}
  </div>
);

export const all: Story = {
  args: {
    source: iconList,
    color: "primary-textLow",
  },
};
