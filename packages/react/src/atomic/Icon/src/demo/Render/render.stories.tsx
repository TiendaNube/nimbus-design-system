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
      control: {
        type: "select",
        options: ["primary-textLow", "secondary-textLow", "tertiary-textLow"],
      },
    },
  },
  render: ({ source, color }) => {
    const iconByName = Object.entries(allIcons);

    const Icons =
      source && typeof source === "string"
        ? iconByName.filter(([name]) =>
            // If the source contains the name, return the icon
            name.toLowerCase().includes(source.toLowerCase())
          )
        : iconByName;

    return (
      <Box
        display="flex"
        flexWrap="wrap"
        role="list"
        aria-label="Icon showcase"
      >
        {Icons.map(
          ([name, IconComponent]: [string, React.ComponentType<any>]) => (
            <Box
              key={name}
              margin="3"
              padding="1"
              borderStyle="dashed"
              borderColor="danger-surface"
              role="listitem"
            >
              <Tooltip content={name} position="top">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Icon
                    source={<IconComponent size="medium" />}
                    aria-label={name}
                    color={color}
                  />
                </Box>
              </Tooltip>
            </Box>
          )
        )}
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
