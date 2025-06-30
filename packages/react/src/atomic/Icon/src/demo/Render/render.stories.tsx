import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as allIcons from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { Tooltip } from "@nimbus-ds/tooltip";
import { Box } from "@nimbus-ds/box";

const meta: Meta<typeof Icon> = {
  title: "atomic/Icon/Demo/Render",
  component: Icon,
  argTypes: {
    source: {
      control: "text",
      name: "Icon name",
      description: "Search for a specific icon",
    },
    color: {
      control: "select",
    },
  },
  render: ({ source }) => {
    const iconByName = Object.entries(allIcons);

    const Icons =
      source && typeof source === "string"
        ? iconByName.filter(([name]) =>
            // If the source contains the name, return the icon
            name.toLowerCase().includes(source.toLowerCase())
          )
        : iconByName;

    return (
      <Box display="flex" flexWrap="wrap">
        {Icons.map(([name, IconComponent]) => (
          <Box
            key={name}
            margin="3"
            padding="1"
            borderStyle="dashed"
            borderColor="danger-surface"
          >
            <Tooltip content={name} position="top">
              <Box display="flex" justifyContent="center" alignItems="center">
                <IconComponent size="medium" aria-label={name} />
              </Box>
            </Tooltip>
          </Box>
        ))}
      </Box>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const all: Story = {
  args: {
    color: "primary-textLow",
  },
};
