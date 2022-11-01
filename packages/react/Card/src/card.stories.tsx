import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { card } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";

import { Card } from "./Card";

export default {
  title: "Composite/Card",
  component: Card,
  subcomponents: { "Card.Skeleton": Card.Skeleton },

  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    children: { control: { disable: true } },
    backgroundColor: { options: Object.keys(card.properties.backgroundColor) },
    padding: { options: Object.keys(card.properties.padding) },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const base = Template.bind({});
base.args = {
  children: <Text textAlign="center">Replace me with your content</Text>,
};

export const header = Template.bind({});
header.args = {
  children: (
    <>
      <Card.Header title="Title" />
      <Box
        borderStyle="dashed"
        padding="0.5rem"
        borderWidth="1px"
        borderColor="neutral.interactive"
      >
        <Text textAlign="center">Replace me with your content</Text>
      </Box>
    </>
  ),
};
