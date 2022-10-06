import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { Text } from "@nimbus-ds/text";

import { Popover } from "./Popover";

export default {
  title: "Atomic/Popover",
  component: Popover,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    children: { control: { disable: true } },
    content: { control: { disable: true } },
  },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <Popover {...args}>
      <Text>Hover</Text>
    </Popover>
  </div>
);

export const base = Template.bind({});
base.args = {
  content: <Text color="primary.textLow">Replace me with your content</Text>,
};

export const top = Template.bind({});
top.args = {
  content: <Text color="primary.textLow">Replace me with your content</Text>,
  position: "top",
};

export const bottom = Template.bind({});
bottom.args = {
  content: <Text color="primary.textLow">Replace me with your content</Text>,
  position: "bottom",
};

export const right = Template.bind({});
right.args = {
  content: <Text color="primary.textLow">Replace me with your content</Text>,
  position: "right",
};

export const left = Template.bind({});
left.args = {
  content: <Text color="primary.textLow">Replace me with your content</Text>,
  position: "left",
};
