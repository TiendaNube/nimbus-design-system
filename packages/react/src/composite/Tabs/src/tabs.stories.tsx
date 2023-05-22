import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";

import { Tabs } from "./Tabs";

export default {
  title: "Composite/Tabs",
  component: Tabs,
  subcomponents: {
    "Tabs.Button": Tabs.Button,
    "Tabs.Item": Tabs.Item,
  },
  argTypes: {
    children: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <Tabs.Item label="Tab 1">
      <Box
        borderColor="neutral-interactive"
        borderStyle="dashed"
        borderWidth="1"
        padding="2"
      >
        <Text fontSize="base" textAlign="center">
          Replace me with your tab 1 content
        </Text>
      </Box>
    </Tabs.Item>
    <Tabs.Item label="Tab 2">
      <Box
        borderColor="neutral-interactive"
        borderStyle="dashed"
        borderWidth="1"
        padding="2"
      >
        <Text fontSize="base" textAlign="center">
          Replace me with your tab 2 content
        </Text>
      </Box>
    </Tabs.Item>
    <Tabs.Item label="Tab 3">
      <Box
        borderColor="neutral-interactive"
        borderStyle="dashed"
        borderWidth="1"
        padding="2"
      >
        <Text fontSize="base" textAlign="center">
          Replace me with your tab 3 content
        </Text>
      </Box>
    </Tabs.Item>
  </Tabs>
);

export const base = Template.bind({});
base.args = {
  preSelectedTab: 2,
};

export const fullWidth = Template.bind({});
fullWidth.args = {
  fullWidth: true,
};
