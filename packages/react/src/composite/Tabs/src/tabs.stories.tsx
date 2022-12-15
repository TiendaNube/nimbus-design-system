import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

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
    <Tabs.Item label="Tab 1">Tab 1 content</Tabs.Item>
    <Tabs.Item label="Tab 2">Tab 2 content</Tabs.Item>
    <Tabs.Item label="Tab 3">Tab 3 content</Tabs.Item>
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
