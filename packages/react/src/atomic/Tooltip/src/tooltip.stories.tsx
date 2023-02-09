import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";

import { Tooltip } from "./Tooltip";

export default {
  title: "Atomic/Tooltip",
  component: Tooltip,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    children: { control: { disable: true } },
  },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Box display="flex" justifyContent="center">
    <Tooltip {...args}>
      <Text>Hover</Text>
    </Tooltip>
  </Box>
);

export const base = Template.bind({});
base.args = {
  content: "Lorem ipsum dolor site amet",
};

export const top = Template.bind({});
top.args = {
  content: "Lorem ipsum dolor site amet",
  position: "top",
};

export const bottom = Template.bind({});
bottom.args = {
  content: "Lorem ipsum dolor site amet",
  position: "bottom",
};

export const right = Template.bind({});
right.args = {
  content: "Lorem ipsum dolor site amet",
  position: "right",
};

export const left = Template.bind({});
left.args = {
  content: "Lorem ipsum dolor site amet",
  position: "left",
};
