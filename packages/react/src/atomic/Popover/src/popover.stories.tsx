import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";

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
  <Box display="flex" justifyContent="center">
    <Popover {...args} onVisibility={undefined}>
      <Text>Click-Hover</Text>
    </Popover>
  </Box>
);

export const base = Template.bind({});
base.args = {
  content: <Text color="primary.textLow">Replace me with your content</Text>,
};

export const top = Template.bind({});
top.args = {
  content: <Text color="primary.textLow">Replace me with your content</Text>,
  position: "top",
  enabledHover: true,
  enabledDismiss: false,
};

export const bottom = Template.bind({});
bottom.args = {
  content: <Text color="primary.textLow">Replace me with your content</Text>,
  position: "bottom",
  enabledHover: true,
  enabledDismiss: false,
};

export const right = Template.bind({});
right.args = {
  content: <Text color="primary.textLow">Replace me with your content</Text>,
  position: "right",
  enabledHover: true,
  enabledDismiss: false,
};

export const left = Template.bind({});
left.args = {
  content: <Text color="primary.textLow">Replace me with your content</Text>,
  position: "left",
  enabledHover: true,
  enabledDismiss: false,
};
